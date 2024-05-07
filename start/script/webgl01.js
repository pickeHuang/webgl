

/**
 * 绘制点
 */

import { hy } from "./shaderDll.js";

/**
 * @type {HTMLCanvasElement}
 */
let canvas = document.getElementById("canvas");

canvas.width = 500;
canvas.height = 500;

let gl = canvas.getContext("webgl");
gl.clearColor(0.5, 0.5, 0.5, 1.0);  // clear rgba
gl.clear(gl.COLOR_BUFFER_BIT)


let vertexSource = `
attribute vec2 a_position;
uniform float u_size;
attribute vec3 a_color;
varying vec3 v_color;
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
    temp003(shaderProgram);
}


/**
 *  * @param {WebGLProgram} program 
 */
function temp001(program) {
    let position = [0, 0.3];
    let lpos = gl.getAttribLocation(program, "a_position");
    gl.vertexAttrib2fv(lpos, new Float32Array(position));
    gl.drawArrays(gl.POINTS, 0, 1);
}

/**
 * @param {WebGLProgram} program 
 */
function temp002(program) {
    const cycleNum = 1000;
    let x = 0;
    let y = 0;
    for (let i = 1; i < cycleNum; i++) {
        if (i > 1 && i < 4) {
            continue;
        }
        const r = i / 1000;
        x = Math.sin(i) * r;
        y = Math.cos(i) * r;
        let lpos = gl.getAttribLocation(program, "a_position");
        gl.vertexAttrib2f(lpos, x, y);
        gl.drawArrays(gl.POINTS, 0, 1);
    }
}

/**
 * @param {WebGLProgram} program 
 */
function temp003(program) {

    let u_size = gl.getUniformLocation(program, "u_size");
    gl.uniform1f(u_size, 50);
    // uniform参数无法赋值给attribite
    let a_color = gl.getAttribLocation(program, "a_color");
    gl.vertexAttrib3f(a_color, 0.5, 0.4, 0.9);

    gl.drawArrays(gl.POINTS, 0, 1);

}