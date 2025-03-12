export const webglShader = {
  /**
   * 创建canvas
   * @param {number} width
   * @param {number} height
   * @returns {HTMLCanvasElement}
   */
  createCanvas: (width, height) => {
    const canvas = document.createElement("canvas");
    canvas.width = width;
    canvas.height = height;
    canvas.style.border = `2px solid black`;
    document.body.appendChild(canvas);
    return canvas;
  },

  /**
   * 创建着色器
   * @param {WebGL2RenderingContext} gl
   * @param {WebGL2RenderingContextBase} shaderType
   * @param {string} shaderSource
   * @returns {WebGLShader | null}
   */
  createShader: (gl, shaderType, shaderSource) => {
    const shader = gl.createShader(shaderType);
    gl.shaderSource(shader, shaderSource);
    gl.compileShader(shader);
    const success = gl.getShaderParameter(shader, gl.COMPILE_STATUS);
    if (success) {
      return shader;
    }

    console.error(gl.getShaderInfoLog(shader));
    return null;
  },

  /**
   * 创建着色程序
   * @param {WebGL2RenderingContext} gl
   * @param {WebGLShader} vertexShader
   * @param {WebGLShader} fragmentShader
   * @param {WebGLProgram}
   */
  createProgram: (gl, vertexShader, fragmentShader) => {
    const program = gl.createProgram();
    gl.attachShader(program, vertexShader);
    gl.attachShader(program, fragmentShader);
    gl.linkProgram(program);
    const success = gl.getProgramParameter(program, gl.LINK_STATUS);
    if (success) {
      return program;
    }
    console.error(gl.getProgramInfoLog(program));
    return null;
  },

  /**
   * 清空画布颜色
   * @param {WebGL2RenderingContext} gl
   * @param {number} r
   * @param {number} g
   * @param {number} b
   * @param {number} a
   */
  clearGlColor: (gl, r, g, b, a) => {
    gl.clearColor(r, g, b, a);
    gl.clear(gl.COLOR_BUFFER_BIT);
  },
};
