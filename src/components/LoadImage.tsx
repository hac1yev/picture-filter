import { createBackgroundProcess } from "../main/channel";
import { drawImageBitmap } from "../utils/canvas";

const LoadImage = ({ filters,setFilters }: any) => {
    const { addMessageListener, sendMessage } = createBackgroundProcess();

    addMessageListener((responseFromBackground: any) => {
        (async function() {        
            const imageBitmap = await createImageBitmap(responseFromBackground);         
            const canvas = document.getElementById("generated-image") as HTMLCanvasElement;            
            drawImageBitmap(imageBitmap, canvas);
            setFilters((prev: any) => {
                return {
                    ...prev, 
                    latestBitmap: imageBitmap
                }
            });
        })();    
    });

    const handleGenerateImage = () => {
        sendMessage({ anyValue: filters, type: 'loadImage' });
    };

    return (
        <div className="apply-effects">
            <label htmlFor="loadImage">Image URL</label>
            <input value={filters.link} onChange={(e) => setFilters((prev: any) => {
                return {
                    ...prev,
                    link: e.target.value
                }
            })} type="url" id="loadImage" />
            <button onClick={handleGenerateImage}>Load</button>
        </div>
    );
};

export default LoadImage;