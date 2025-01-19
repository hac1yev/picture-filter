import { useState } from "react";
import BlurFilter from "./BlurFilter";
import EdgeDetection from "./EdgeDetection";
import LoadImage from "./LoadImage";
import TopText from "./TopText";

const ApplyEffects = () => {
    const [filters,setFilters] = useState({
        link: "",
        topText: "",
        latestBitmap: null,
        blur: 0
    });

    return (
        <div className="apply-effects-wrap">
            <h1>Apply effects</h1>
            <div className="undo-redo-wrap">
                <button>Undo</button>
                <button>Redo</button>
            </div>
            <LoadImage filters={filters} setFilters={setFilters} />
            <TopText filters={filters} setFilters={setFilters} />
            <BlurFilter filters={filters} setFilters={setFilters} />
            <EdgeDetection filters={filters} setFilters={setFilters} />
        </div>
    );
};

export default ApplyEffects;