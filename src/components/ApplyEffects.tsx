import { useState } from "react";
import BlurFilter from "./BlurFilter";
import EdgeDetection from "./EdgeDetection";
import LoadImage from "./LoadImage";
import TopText from "./TopText";
import { createBackgroundProcess } from "../main/channel";
import { drawImageBitmap } from "../utils/canvas";

const ApplyEffects = () => {
    const { sendMessage,addMessageListener } = createBackgroundProcess();
    const [steps,setSteps] = useState<any>(-1);
    const [filters,setFilters] = useState([{
        link: "",
        topText: "",
        latestBitmap: null,
        blur: 0,
        edge: false
    }]);

    addMessageListener((responseFromBackground: any) => {
        (async function() {        
            const imageBitmap = await createImageBitmap(responseFromBackground);         
            const canvas = document.getElementById("generated-image") as HTMLCanvasElement;
            drawImageBitmap(imageBitmap, canvas);
        })();   
    });
    
    const handleUndo = () => {
        if(steps === -1) {            
            const latestBitmap = filters.at(-2)?.latestBitmap;            
            sendMessage({ anyValue: {
                latestBitmap,
            }});
            setSteps(filters.length - 2);
        }else if(steps > 1){
            const latestBitmap = filters.at(steps - 1)?.latestBitmap;                        
            sendMessage({ anyValue: {
                latestBitmap,
            }});
            setSteps((prev: any) => prev - 1);
        }else{                        
            return;
        }
    }    

    const handleRedo = () => {
        if(steps === -1 || steps === filters.length - 1) {
            return;
        }else if(steps >= 0 && steps < filters.length - 1){
            const latestBitmap = filters.at(steps + 1)?.latestBitmap;            
            sendMessage({ anyValue: {
                latestBitmap,
            }});
            setSteps((prev: any) => prev + 1);
        }
    }

    return (
        <div className="apply-effects-wrap">
            <h1>Apply effects</h1>
            <div className="undo-redo-wrap">
                <button onClick={handleUndo}>Undo</button>
                <button onClick={handleRedo}>Redo</button>
            </div>
            <LoadImage filters={filters} setFilters={setFilters} />
            <TopText filters={filters} setFilters={setFilters} />
            <BlurFilter filters={filters} setFilters={setFilters} />
            <EdgeDetection filters={filters} setFilters={setFilters} />
        </div>
    );
};

export default ApplyEffects;