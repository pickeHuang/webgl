import { webglShader } from "../../webgl-common/webgl-shader-common.js";

function main() {
  const cv = webglShader.createCanvas(512, 512);
  const gl = cv.getContext("webgl");
  if (!gl) {
    return;
  }

  const vShaderSource = `
     attribute vec4 a_position;
     void main() {
        gl_Position = a_position;    
     }
    `;

  const fShaderSource = `
      void main() {
        gl_FragColor = vec4(1.0,0.0,0.0,1.0);
      }
    `;

  const vShader = webglShader.createShader(gl, gl.VERTEX_SHADER, vShaderSource);
  if (!vShader) {
    return;
  }
  const fShader = webglShader.createShader(
    gl,
    gl.FRAGMENT_SHADER,
    fShaderSource
  );
  if (!fShader) {
    return;
  }

  const program = webglShader.createProgram(gl, vShader, fShader);
  if (!program) {
    return;
  }

  webglShader.clearGlColor(gl,1.0, 1.0, 1.0, 1.0);
  gl.useProgram(program);

  var pointNum = initVertextBuffers(gl, program);
  gl.drawArrays(gl.TRIANGLE_STRIP,0,pointNum);
}

/**
 * 初始化顶点buffer
 * @param {WebGL2RenderingContext} gl
 * @param {WebGLProgram}
 */
function initVertextBuffers(gl, program) {
  var point = new Float32Array([-0.5, 0.5, -0.5, -0.5, 0.5, 0.5, 0.5,-0.5]);
  // var point = new Float32Array([-0.5, -0.5, 0.5, -0.5, 0.5, 0.5, -0.5,0.5]);

  var n = 4;
  var buffer = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
  gl.bufferData(gl.ARRAY_BUFFER, point, gl.STATIC_DRAW);

  var a_position = gl.getAttribLocation(program, "a_position");
  // 将缓冲区对象分配给a_position属性
  gl.vertexAttribPointer(a_position, 2, gl.FLOAT,false, 0, 0);
  // 链接a_position和分配给它的缓冲区
  gl.enableVertexAttribArray(a_position);

  return n;
}

main();
