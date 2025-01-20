import { useState } from "react";
import { createBackgroundProcess } from "../main/channel";
import { drawImageBitmap } from "../utils/canvas";

const LoadImage = ({ filters,setFilters }: any) => {
    const { addMessageListener, sendMessage } = createBackgroundProcess();
    const [link,setLink] = useState("");

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
                        link
                    }
                ]
            });
        })();    
    });

    const handleGenerateImage = () => {
        sendMessage({ anyValue: {
            latestBitmap: filters.at(-1).latestBitmap,
            link
        }, type: 'loadImage' });
        setLink("");
    };

    return (
        <div className="apply-effects">
            <label htmlFor="loadImage">Image URL</label>
            <input value={link} onChange={(e) => setLink(e.target.value)} type="url" id="loadImage" />
            <button onClick={handleGenerateImage}>Load</button>
        </div>
    );
};

export default LoadImage;