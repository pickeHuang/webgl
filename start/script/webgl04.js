

/**
 * 绘制所有基本图形
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
uniform vec4 u_translate;
void main() {
    v_color = a_color;
    gl_Position = vec4(a_position,0.0,1.0) + u_translate;
    gl_PointSize = u_size;
}`;

let fragmentSource = `
precision mediump float;

varying vec3 v_color;
void main() {
    gl_FragColor = vec4(v_color, 1.0);
}
`;


// 移动参数
let tx = 0;
let ty = 0;
// 移动速度
let speed_x = 0.01;
let speed_y = 0.03;

const shaderProgram = hy.initShader(gl, vertexSource, fragmentSource);
if (shaderProgram) {
    // draw(shaderProgram);
    tick();
}

/**
 * 绘制三角形
 * @param {WebGLProgram} program 
 */
function draw(program) {

    const bufferData = [
        0.5, 0.0, 0.2, 0.4, 0.6,
        -0.5, 0.0, 0.1, 0.3, 0.5,
        0.0, 0.5, 0.3, 0.6, 0.9,
    ];
    hy.initVertexBuffers(gl, program, bufferData, 8.0);
    // 绘制点
    // gl.drawArrays(gl.POINTS, 0, cycleCount);
    // 绘制线
    // gl.drawArrays(gl.LINES, 0,cycleCount);
    // gl.drawArrays(gl.LINE_STRIP, 0, cycleCount);
    // gl.drawArrays(gl.LINE_LOOP, 0, cycleCount);
    // 绘制面
    gl.drawArrays(gl.TRIANGLES, 0, 3);
    // gl.drawArrays(gl.TRIANGLE_STRIP, 0, cycleCount);
    // gl.drawArrays(gl.TRIANGLE_FAN, 0, cycleCount);

}



function tick() {
    tx += speed_x;
    ty += speed_y;

    if(tx > 0.5 || tx < -0.5) {
         speed_x *= -1;
    }

    if(ty > 0.5 || ty < -0.5) {
         speed_y *= -1;
    }

    let ltranslate = gl.getUniformLocation(shaderProgram,"u_translate");
    gl.uniform4f(ltranslate,tx,ty,0,0);

    draw(shaderProgram);
    requestAnimationFrame(tick);
}