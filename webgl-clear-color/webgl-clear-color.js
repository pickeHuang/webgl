function main() {
  console.log("run in this main ?");
  const canvas = document.createElement("canvas");
  canvas.width = 512;
  canvas.height = 512;
  canvas.style.border = "2px solid black";

  document.body.appendChild(canvas);

  // 获取webgl上下文
  const gl = canvas.getContext("webgl");
  if (!gl) {
    return;
  }
  // 指定清理画布的颜色
  gl.clearColor(gl,0.2, 0.1, 0.0, 1.0);
   /**
    * 清除缓冲区
    * gl.COLOR_BUFFER_BIT 颜色缓冲区
    * gl.DEPTH_BUFFER_BIT 深度缓冲区
    * gl.STENCIL_BUFFER_BIT 模板缓冲区
    *  */  
  gl.clear(gl.COLOR_BUFFER_BIT);
}

main();
