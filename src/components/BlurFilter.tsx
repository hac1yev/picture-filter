import { ChangeEvent } from "react";
import { createBackgroundProcess } from "../main/channel";
import { drawImageBitmap } from "../utils/canvas";

const BlurFilter = ({ filters,setFilters }: any) => {
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

    const handleBlur = () => {
        sendMessage({ anyValue: filters, type: 'blur' });
    };

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        setFilters((prev: any) => {
            return {
                ...prev,
                blur: Math.trunc(parseInt(e.target.value) / 10)
            }
        });
    };
    
    return (
        <div className="apply-effects">
            <label htmlFor="blurFilter">Blur filter</label>
            <input type="range" id="blurFilter" onChange={handleChange} />
            <button onClick={handleBlur}>Apply</button>
        </div>
    );
};

export default BlurFilter;