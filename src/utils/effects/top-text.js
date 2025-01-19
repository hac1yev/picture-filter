export function addTopTextToCanvas(ctx, topText) {
    ctx.font = "50px Impact";
    ctx.lineWidth = 3;
    ctx.strokeStyle = "black";
    ctx.fillStyle = "white";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.strokeText(topText, ctx.canvas.width / 2, 50);
    ctx.fillText(topText, ctx.canvas.width / 2, 50);
}
