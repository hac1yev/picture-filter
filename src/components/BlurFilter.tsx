import { ChangeEvent, useState } from "react";
import { createBackgroundProcess } from "../main/channel";
import { drawImageBitmap } from "../utils/canvas";

const BlurFilter = ({ filters,setFilters }: any) => {
    const { addMessageListener, sendMessage } = createBackgroundProcess();
    const [localBlur,setLocalBlur] = useState(0);
 
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
                        blur: Math.trunc(localBlur / 10)
                    }
                ]
            });
        })();   
    });

    const handleBlur = () => {      
        sendMessage({ anyValue: {
            latestBitmap: filters.at(-1).latestBitmap,
            blur: Math.trunc(localBlur / 10)
        }, type: 'blur' });
    };

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        setLocalBlur(parseInt(e.target.value));
    };
    
    return (
        <div className="apply-effects">
            <label htmlFor="blurFilter">Blur filter</label>
            <input type="range" id="blurFilter"  value={localBlur} onChange={handleChange} />
            <button onClick={handleBlur}>Apply</button>
        </div>
    );
};

export default BlurFilter;