

/**
 * 矩阵变换
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

uniform mat4 u_matrix;
void main() {
    v_color = a_color;
    gl_Position = u_matrix * vec4(a_position,0.0,1.0);
    gl_PointSize = u_size;
}`;

let fragmentSource = `
precision mediump float;

varying vec3 v_color;
void main() {
    gl_FragColor = vec4(v_color, 1.0);
}
`;



// 缩放矩阵

let Sx = 0.5, Sy = 0.5, Sz = 1;
let scale_matrix = [
    Sx, 0, 0, 0,
    0, Sy, 0, 0,
    0, 0, Sz, 0,
    0, 0, 0, 1,
]

// 平移矩阵
let Tx = 0, Ty = 0, Tz = 0;
let translate_matrix = [
    1, 0, 0, 0,
    0, 1, 0, 0,
    0, 0, 1, 0,
    Tx, Ty, Tz, 1,
]

// 旋转矩阵
let deg = 20;
let cos = Math.cos(deg / 180 * Math.PI);
let sin = Math.sin(deg / 180 * Math.PI);
// 旋转矩阵
let rotate_matrix = [
    cos, sin, 0, 0,
    -sin, cos, 0, 0,
    0, 0, 1, 0,
    0, 0, 0, 1,
]


const shaderProgram = hy.initShader(gl, vertexSource, fragmentSource);
if (shaderProgram) {
    // draw()
    tick();
}

// tick()



/**
 * 绘制三角形
 * @param {WebGLProgram} program 
 */
function draw() {

    const lmatrix = gl.getUniformLocation(shaderProgram, "u_matrix");
    gl.uniformMatrix4fv(lmatrix, false, new Float32Array(rotate_matrix));

    const bufferData = [
        0.5, -0.5, 0.2, 0.4, 0.6,
        -0.5, -0.5, 0.1, 0.3, 0.5,
        0.0, 0.5, 0.3, 0.6, 0.9,
    ];
    hy.initVertexBuffers(gl, shaderProgram, bufferData, 8.0);
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
    deg += 8;
    cos = Math.cos(deg / 180 * Math.PI);
    sin = Math.sin(deg / 180 * Math.PI);
    // 旋转矩阵
    rotate_matrix = [
        cos, sin, 0, 0,
        -sin, cos, 0, 0,
        0, 0, 1, 0,
        0, 0, 0, 1,
    ]
    console.log("deg:", deg);
    draw();
    requestAnimationFrame(tick);
}


/**
 * 
 *  -------- 平移矩阵 ----------
 * [
 *      1, 0, 0, Tx,
 *      0, 1, 0, Ty,
 *      0, 0, 1, Tz,
 *      0, 0, 0, 1,
 * ]
 * 
 * -------- 旋转矩阵 ----------
 * [
 *      cos, -sin, 0, 0,
 *      sin, cos, 0, 0,
 *      0, 0, 1, 0,
 *      0, 0, 0, 1,
 * ]
 * 
 * -------- 缩放矩阵 ----------
 * [
 *      Sx, 0, 0, 0,
 *      0, Sy, 0, 0,
 *      0, 0, Sz, 0,
 *      0, 0, 0, 1,
 * ]
 */