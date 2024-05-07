

/**
 * 绘制所有基本图形
 * 点：1种
 * 线：3种 
 * 面：3种
 */

import { hy } from "./shaderDll.js";

/**
 * @type {HTMLCanvasElement}
 */
let canvas = document.getElementById("canvas");

canvas.width = 500;
canvas.height = 500;

let gl = canvas.getContext("webgl");
gl.clearColor(1.0, 1.0, 1.0, 1.0);  // clear rgba
gl.clear(gl.COLOR_BUFFER_BIT)


let vertexSource = `
attribute vec2 a_position;
attribute vec3 a_color;
varying vec3 v_color;
uniform float u_size;
void main() {
    v_color = a_color;
    gl_Position = vec4(a_position,0.0,1.0);
    gl_PointSize = u_size;
}`;

let fragmentSource = `
precision mediump float;

varying vec3 v_color;
void main() {
    gl_FragColor = vec4(v_color, 1.0);
}
`;

const shaderProgram = hy.initShader(gl, vertexSource, fragmentSource);
if (shaderProgram) {
    firstTriangles(shaderProgram);
}


/**
 * 绘制三角形
 * @param {WebGLProgram} program 
 */
function firstTriangles(program) {

    let cycleCount = 10;

    const bufferData = [];

    for (let i = 0; i < cycleCount; i++) {
        let x = (Math.random() - 0.5) * 2 ;
        let y = (Math.random() - 0.5) * 2 ;
        let r = (Math.random() - 0.5) * 2 ;
        let g = (Math.random() - 0.5) * 2 ;
        let b = (Math.random() - 0.5) * 2 ;
        bufferData.push(x, y, r, g, b);
    }

    hy.initVertexBuffers(gl, program, bufferData, 8.0);
    // 绘制点
    gl.drawArrays(gl.POINTS, 0, cycleCount);
    // 绘制线
    // gl.drawArrays(gl.LINES, 0,cycleCount);
    // gl.drawArrays(gl.LINE_STRIP, 0, cycleCount);
    // gl.drawArrays(gl.LINE_LOOP, 0, cycleCount);
    // 绘制面
    // gl.drawArrays(gl.TRIANGLES, 0, cycleCount);
    // gl.drawArrays(gl.TRIANGLE_STRIP, 0, cycleCount);
    gl.drawArrays(gl.TRIANGLE_FAN, 0, cycleCount);

}