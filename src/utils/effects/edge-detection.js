export function applyEdgeDetection(ctx) {
    const imgData = ctx.getImageData(0, 0, ctx.canvas.width, ctx.canvas.height);
    const pixels = imgData.data;
    const sobelData = sobelFilter(pixels, ctx.canvas.width, ctx.canvas.height);
    for (let i = 0; i < pixels.length / 4; i++) {
        pixels[i * 4] = sobelData[i];
        pixels[i * 4 + 1] = sobelData[i];
        pixels[i * 4 + 2] = sobelData[i];
    }
    ctx.putImageData(imgData, 0, 0);
}
function sobelFilter(pixels, width, height) {
    const sobelKernelX = [
        [-1, 0, 1],
        [-2, 0, 2],
        [-1, 0, 1],
    ];
    const sobelKernelY = [
        [-1, -2, -1],
        [0, 0, 0],
        [1, 2, 1],
    ];
    const grayscalePixels = grayscale(pixels, width, height);
    const sobelPixels = new Uint8Array(width * height);
    for (let y = 0; y < height; y++) {
        for (let x = 0; x < width; x++) {
            const pixelX = applyKernel(grayscalePixels, x, y, width, height, sobelKernelX);
            const pixelY = applyKernel(grayscalePixels, x, y, width, height, sobelKernelY);
            const magnitude = Math.sqrt(pixelX * pixelX + pixelY * pixelY) >>> 0;
            sobelPixels[y * width + x] = magnitude;
        }
    }
    return sobelPixels;
}
function applyKernel(pixels, x, y, width, height, kernel) {
    let sum = 0;
    for (let row = -1; row <= 1; row++) {
        for (let col = -1; col <= 1; col++) {
            const offsetX = x + col;
            const offsetY = y + row;
            if (offsetX > 0 && offsetY > 0 && offsetX < width && offsetY < height) {
                const pixel = pixels[offsetY * width + offsetX];
                const coefficient = kernel[row + 1][col + 1];
                sum += pixel * coefficient;
            }
        }
    }
    return sum;
}
function grayscale(pixels, width, height) {
    const grayscalePixels = new Uint8ClampedArray(width * height);
    for (let i = 0; i < pixels.length; i += 4) {
        const red = pixels[i];
        const green = pixels[i + 1];
        const blue = pixels[i + 2];
        const gray = 0.2126 * red + 0.7152 * green + 0.0722 * blue;
        grayscalePixels[Math.floor(i / 4)] = gray;
    }
    return grayscalePixels;
}
