import { createBackgroundProcess } from "../main/channel";
import { drawImageBitmap } from "../utils/canvas";

const TopText = ({ filters,setFilters }: any) => {
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

    const handleTopText = () => {
        sendMessage({ anyValue: filters, type: 'topText' });
    };    

    console.log(filters);

    return (
        <div className="apply-effects">
            <label htmlFor="topText">Top Text</label>
            <input type="text" id="topText" onChange={(e) => setFilters((prev: any) => {
                return {
                    ...prev, 
                    topText: e.target.value 
                }
            })} />
            <button onClick={handleTopText}>Apply</button>
        </div>
    );
};

export default TopText;