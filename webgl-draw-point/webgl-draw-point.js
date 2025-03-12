import { webglShader } from "../webgl-common/webgl-shader-common.js";

function main() {
  const canvas = webglShader.createCanvas(512, 512);
  const gl = canvas.getContext("webgl");
  if (!gl) {
    return;
  }

  webglShader.clearGlColor(gl,0.0, 1.0, 1.0, 1.0);

  const vertexShaderSource = `
     void main() {
        gl_Position = vec4(0.0,0.0,0.0,1.0);  // 固定变量-顶点位置
        gl_PointSize = 20.0;      // 固定变量-点的大小 
     }
    `;

  const fragmentShaderSource = `
     void main() {
        gl_FragColor = vec4(1.0,0.0,0.0,1.0);  // 固定变量-输出颜色
     }
    `;

  const vertexShader = webglShader.createShader(
    gl,
    gl.VERTEX_SHADER,
    vertexShaderSource
  );
  if (!vertexShader) {
    return;
  }
  const fragmentShader = webglShader.createShader(
    gl,
    gl.FRAGMENT_SHADER,
    fragmentShaderSource
  );
  if (!fragmentShader) {
    return;
  }

  const program = webglShader.createProgram(gl, vertexShader, fragmentShader);
  if (!program) {
    return;
  }

  gl.useProgram(program);
  // 绘制一个点 
  gl.drawArrays(gl.POINTS, 0, 1);
}

main();
