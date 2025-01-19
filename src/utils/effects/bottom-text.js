export function addBottomTextToCanvas(ctx, bottomText) {
    ctx.font = "50px Impact";
    ctx.lineWidth = 3;
    ctx.strokeStyle = "black";
    ctx.fillStyle = "white";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.strokeText(bottomText, ctx.canvas.width / 2, ctx.canvas.height - 50);
    ctx.fillText(bottomText, ctx.canvas.width / 2, ctx.canvas.height - 50);
}
