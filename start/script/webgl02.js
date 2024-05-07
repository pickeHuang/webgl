

/**
 * 绘制简单图形，三角形
 */

import { hy } from "./shaderDll.js";

/**
 * @type {HTMLCanvasElement}
 */
let canvas = document.getElementById("canvas");

canvas.width = 500;
canvas.height = 500;

let gl = canvas.getContext("webgl");
gl.clearColor(0.0, 0.0, 0.0, 1.0);  // clear rgba
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

    const size = 5.0;
    const lsize = gl.getUniformLocation(program, "u_size");
    gl.uniform1f(lsize, size);

    const triangles = [
        -0.5, -0.5, 0.1, 0.3, 0.1,
        0.5, -0.5, 0.2, 0.5, 0.7,
        0.0, 0.3, 0.8, 0.2, 0.3,
    ];

    const floatTringle = new Float32Array(triangles);
    // 拿到每个数据所占用的字节
    const FSIZE = floatTringle.BYTES_PER_ELEMENT;
    console.log("fsize:", FSIZE);

    // 创建buffer
    const buffer = gl.createBuffer();
    // 绑定buffer
    gl.bindBuffer(gl.ARRAY_BUFFER, buffer)
    // 设置buffer data
    gl.bufferData(gl.ARRAY_BUFFER, floatTringle, gl.STATIC_DRAW);
    // 设置pointer数据
    const lpos = gl.getAttribLocation(program, "a_position");
    gl.vertexAttribPointer(lpos, 2, gl.FLOAT, false, 5 * FSIZE, 0);

    const lcolor = gl.getAttribLocation(program, "a_color");
    gl.vertexAttribPointer(lcolor, 3, gl.FLOAT, false, 5 * FSIZE, 2 * FSIZE);

    // 确认属性赋值
    gl.enableVertexAttribArray(lpos);
    gl.enableVertexAttribArray(lcolor);

    let n = 3;

    // 绘制点
    gl.drawArrays(gl.POINTS, 0, n);

    // 绘制点
    gl.drawArrays(gl.LINES, 1, 3);

    // 绘制点
    gl.drawArrays(gl.TRIANGLES, 0, n);
}