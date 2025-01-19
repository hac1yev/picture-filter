import { addTopTextToImage, applyBlurToImage, applyEdgeDetectionToImage, createBitmapFromImageUrl, } from "../utils/effects";
import { createChannelToMainProcess } from "./channel";

const mainProcess = createChannelToMainProcess();

mainProcess.addMessageListener(async (data) => {
    const { type, anyValue } = data;
    let originalImageBitmap;

    if(anyValue.latestBitmap) {
        originalImageBitmap = anyValue.latestBitmap;         
    }else{
        originalImageBitmap = await createBitmapFromImageUrl(anyValue.link);
    }

    switch (type) {
        case 'loadImage':
            mainProcess.sendMessage(originalImageBitmap);
            break;
        case 'topText':                            
            let imageWithTopText = await addTopTextToImage(originalImageBitmap, anyValue.topText);
            mainProcess.sendMessage(imageWithTopText);
            break;
        case 'edgeDetection':
            let imageWithEdgeDetection = await applyEdgeDetectionToImage(originalImageBitmap);
            mainProcess.sendMessage(imageWithEdgeDetection);
            break;
        case 'blur':
            imageWithBlur = await applyBlurToImage(imageWithTopText, anyValue.blur);
            mainProcess.sendMessage(imageWithBlur);
            break;
        default:
            break;
    }
});