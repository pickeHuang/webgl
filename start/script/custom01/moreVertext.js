

import { hy } from "../shaderDll.js";

import { fragmentShader } from "../../shaders/custom01/fragmentShader.js";
import { vertexShader } from "../../shaders/custom01/vertexShader.js";

/**
 * @type {HTMLCanvasElement}
 */
const canvas = document.getElementById("canvas");
canvas.width = 400;
canvas.height = 400;

/**
 * @type {WebGL2RenderingContext}
 */
const gl = canvas.getContext("webgl");

const shaderProgram = hy.initShader(gl, vertexShader, fragmentShader);

if (shaderProgram) {
    draw();
}


function draw() {

    const posbufferData = [
        -0.5, -0.5, 0.0,
        0.5, -0.5, 0.0,
        0.5, 0.0, 0.0,
        0.5, 0.0, 0.0,
        -0.5, -0.0, 0.0,
        -0.5, -0.5, 0.0,
    ];

    /**
     * 
     */
    let r1 = Math.random();
    let g1 = Math.random();
    let b1 = Math.random();

    let r2 = Math.random();
    let g2 = Math.random();
    let b2 = Math.random();

    const colorBufferData = [
        r1, b1, g1,
        r1, b1, g1,
        r1, b1, g1,
        r2, b2, g2,
        r2, b2, g2,
        r2, b2, g2,
    ]

    const lpos = gl.getAttribLocation(shaderProgram, "a_position");
    const lcolor = gl.getAttribLocation(shaderProgram, "a_color");

    const floatPos = new Float32Array(posbufferData);
    const floatColor = new Float32Array(colorBufferData)

    const posSize = floatPos.BYTES_PER_ELEMENT;
    const colorSize = floatColor.BYTES_PER_ELEMENT;

    const posBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, posBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, floatPos, gl.STREAM_DRAW);
    gl.vertexAttribPointer(lpos, 3, gl.FLOAT, false, 3 * posSize, 0);
    gl.enableVertexAttribArray(lpos);

    const colorbuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, colorbuffer);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(colorBufferData), gl.STREAM_DRAW);
    gl.vertexAttribPointer(lcolor, 3, gl.UNSIGNED_BYTE, true, 3 * colorSize, 0);
    gl.enableVertexAttribArray(lcolor);


    gl.drawArrays(gl.TRIANGLES, 0,6);
}