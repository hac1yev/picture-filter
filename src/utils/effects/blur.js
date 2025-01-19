export function blurCanvasContext(context, radius) {
    const imageData = context.getImageData(0, 0, context.canvas.width, context.canvas.height);
    const blurredData = blurImageData(imageData, radius);
    context.putImageData(blurredData, 0, 0);
}
function blurImageData(imageData, radius) {
    const data = imageData.data;
    const height = imageData.height;
    const width = imageData.width;
    const newImageData = new ImageData(new Uint8ClampedArray(data), width, height);
    for (let y = 0; y < height; y++) {
        for (let x = 0; x < width; x++) {
            let totalR = 0, totalG = 0, totalB = 0, totalA = 0, count = 0;
            for (let i = -radius; i <= radius; i++) {
                const yy = y + i;
                if (yy < 0 || yy >= height)
                    continue;
                for (var j = -radius; j <= radius; j++) {
                    var xx = x + j;
                    if (xx < 0 || xx >= width)
                        continue;
                    var index = (yy * width + xx) * 4;
                    totalR += data[index];
                    totalG += data[index + 1];
                    totalB += data[index + 2];
                    totalA += data[index + 3];
                    count++;
                }
            }
            var newIndex = (y * width + x) * 4;
            newImageData.data[newIndex] = totalR / count;
            newImageData.data[newIndex + 1] = totalG / count;
            newImageData.data[newIndex + 2] = totalB / count;
            newImageData.data[newIndex + 3] = totalA / count;
        }
    }
    return newImageData;
}
