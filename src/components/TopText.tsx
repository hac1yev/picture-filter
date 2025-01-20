import { useState } from "react";
import { createBackgroundProcess } from "../main/channel";
import { drawImageBitmap } from "../utils/canvas";

const TopText = ({ filters,setFilters }: any) => {
    const { addMessageListener, sendMessage } = createBackgroundProcess();
    const [topText,setTopText] = useState("");

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
                        topText
                    }
                ]
            });
        })(); 
    });

    const handleTopText = () => {
        sendMessage({ anyValue: {
            latestBitmap: filters.at(-1).latestBitmap,
            topText
        }, type: 'topText' });
        setTopText("");
    };    

    return (
        <div className="apply-effects">
            <label htmlFor="topText">Top Text</label>
            <input type="text" id="topText" value={topText} onChange={(e) => setTopText(e.target.value)} />
            <button onClick={handleTopText}>Apply</button>
        </div>
    );
};

export default TopText;