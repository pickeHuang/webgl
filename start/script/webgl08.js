

/**
 * 使用WEGBL贴图
 */

import { mat4 } from "../glmatrix/esm/index.js";
import { hy } from "./shaderDll.js";
console.log("mat4:", mat4);

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
attribute vec3 a_position;
attribute vec3 a_color;
attribute vec2 a_uv;
varying vec3 v_color;
varying vec2 v_uv;

void main() {
    v_color = a_color;
    v_uv = a_uv;
    gl_Position = vec4(a_position,1.0);
}`;

let fragmentSource = `
precision mediump float;
varying vec3 v_color;
varying vec2 v_uv;
uniform sampler2D u_sampler;

void main() {
    vec4 color = texture2D(u_sampler,v_uv);
    gl_FragColor = color;
}
`;




const shaderProgram = hy.initShader(gl, vertexSource, fragmentSource);
if (shaderProgram) {
    initTextrues();
}


function initTextrues() {
    const texture = gl.createTexture();
    const lsampler = gl.getUniformLocation(shaderProgram, "u_sampler");
    const imgins = new Image();
    imgins.onload = function () {

        console.log("image onload");
        gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, true);
        // 激活贴图，放在第0个贴图单元
        gl.activeTexture(gl.TEXTURE0);
        // 绑定贴图，贴图类型与贴图目标
        gl.bindTexture(gl.TEXTURE_2D, texture);
        // 设置贴图参数,贴图类型、参数名称、具体值
        // gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
        // gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
        // gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);

        // gl.texParameterf(gl.TEXTURE_2D,gl.TEXTURE_WRAP_S,gl.REPEAT);
        gl.texParameterf(gl.TEXTURE_2D,gl.TEXTURE_WRAP_S,gl.CLAMP_TO_EDGE);
        gl.texParameterf(gl.TEXTURE_2D,gl.TEXTURE_WRAP_T,gl.CLAMP_TO_EDGE);
        // gl.texParameterf(gl.TEXTURE_2D,gl.TEXTURE_WRAP_S,gl.MIRRORED_REPEAT);
        // gl.texParameterf(gl.TEXTURE_2D,gl.TEXTURE_WRAP_T,gl.MIRRORED_REPEAT);

        // 指定贴图图片
        gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, imgins);

        gl.uniform1i(lsampler, 0);

        draw();

    }

    // 解决网络图片跨域问题
    imgins.crossOrigin = "";

    imgins.src = `../image/HD/img_1920x1080.png`;


}

/**
 * 绘制三角形
 */
function draw() {

    const lpos = gl.getAttribLocation(shaderProgram, "a_position");
    const lcolor = gl.getAttribLocation(shaderProgram, "a_color");
    const luv = gl.getAttribLocation(shaderProgram, "a_uv");

    const bufferData = [
       -0.5, -0.5, 0.0, 0.1, 0.2, 0.2,
        0.5, -0.5, 0.0, 0.1, 0.5, 0.5,
        0.5, 0.5, 0.0, 0.1, 0.9, 0.9,
        -0.5, 0.5, 0.0, 0.1, 0.6, 0.6,
    ];


    const uvData = [
        0.0, 0.0,
        1.3, 0.0,
        1.3, 1.0,
        0.0, 1.0,
    ]

    const float32 = new Float32Array(bufferData);
    const buffersize = float32.BYTES_PER_ELEMENT;

    const posBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, posBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, float32, gl.STATIC_DRAW);
    gl.vertexAttribPointer(lpos, 3, gl.FLOAT, false, 6 * buffersize, 0);
    gl.enableVertexAttribArray(lpos);


    const colorbuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, colorbuffer);
    gl.bufferData(gl.ARRAY_BUFFER, float32, gl.STATIC_DRAW);
    gl.vertexAttribPointer(lcolor, 3, gl.FLOAT, false, 6 * buffersize, 3 * buffersize);
    gl.enableVertexAttribArray(lcolor);


    const uvbuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, uvbuffer);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(uvData), gl.STATIC_DRAW);
    gl.vertexAttribPointer(luv, 2, gl.FLOAT, false, 2 * buffersize, 0);
    gl.enableVertexAttribArray(luv);

    gl.drawArrays(gl.TRIANGLES, 0, 4);

    // // 绘制点
    // // gl.drawArrays(gl.POINTS, 0, cycleCount);
    // // 绘制线
    // // gl.drawArrays(gl.LINES, 0,cycleCount);
    // // gl.drawArrays(gl.LINE_STRIP, 0, cycleCount);
    // // gl.drawArrays(gl.LINE_LOOP, 0, cycleCount);
    // // 绘制面
    // gl.drawArrays(gl.TRIANGLES, 0, 3);
    // // gl.drawArrays(gl.TRIANGLE_STRIP, 0, cycleCount);
    // // gl.drawArrays(gl.TRIANGLE_FAN, 0, cycleCount);

}

