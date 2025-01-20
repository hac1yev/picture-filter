import { createBackgroundProcess } from "../main/channel";
import { drawImageBitmap } from "../utils/canvas";

const EdgeDetection = ({ filters,setFilters }: any) => {
    const { addMessageListener, sendMessage } = createBackgroundProcess();

    addMessageListener((responseFromBackground: any) => {
        (async function() {        
            const imageBitmap = await createImageBitmap(responseFromBackground);         
            const canvas = document.getElementById("generated-image") as HTMLCanvasElement;
            drawImageBitmap(imageBitmap, canvas);
            setFilters((prev: any) => {
                return [
                    ...prev, 
                    {
                        ...prev.at(-1),
                        latestBitmap: imageBitmap,
                        edge: true,
                    }
                ]
            });
        })();   
    });

    const handleEdgeDetection = () => {
        sendMessage({ anyValue: {
            latestBitmap: filters.at(-1).latestBitmap,
        }, type: 'edgeDetection' });
    };

    return (
        <div className="apply-effects">
            <label htmlFor="blurFilter">Edge detection</label>
            <button onClick={handleEdgeDetection}>Apply</button>
        </div>
    );
};

export default EdgeDetection;