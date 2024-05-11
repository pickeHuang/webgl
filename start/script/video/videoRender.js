

import { hy } from "../shaderDll.js";
import { vertexShader } from "../../shaders/video/vertexShader.js";
import { fragmentShader } from "../../shaders/video/fragmentShader.js";


// 普通播放视频
document.addEventListener("DOMContentLoaded", function () {
    // 在文档加载完毕后执行的代码
    console.log("文档加载完毕");

    const canvas = document.createElement("canvas");
    document.body.appendChild(canvas);
    canvas.style.border = "2px solid red";
    canvas.width = 1334;
    canvas.height = 750;

    /**
     * @type {WebGL2RenderingContext}
     */
    const gl = canvas.getContext("webgl");
    gl.clearColor(0.0, 0.5, 0.0, 1.0);  // clear rgba
    gl.clear(gl.COLOR_BUFFER_BIT)
    // createVideo1()
    createVideo(gl);
});


function createVideo(gl) {
    const video = document.createElement("video");
    video.autoplay = true;
    video.loop = true;
    video.crossOrigin = "anonymous";
    video.src = "../../video/big_buck_bunny_720p_surround.mp4";
    video.oncanplay = function () {
        console.log("oncanplay");

    }
    video.onloadeddata = function () {
        console.log("onloadeddata")
        shaderRender(gl, video)
    }

    globalThis["videoIns"] = video;
    return video;
}



/**
 * 
 * @param {WebGL2RenderingContext} gl
 * @param {HTMLMediaElement} videoIns
 */
function shaderRender(gl, videoIns) {
    const shaderProgram = hy.initShader(gl, vertexShader, fragmentShader);


    const lpos = gl.getAttribLocation(shaderProgram, "a_position");
    const videoTexture = gl.getUniformLocation(shaderProgram, "videoTexture");
   
    const glBuffer = gl.createBuffer();
    const originData = [
        -1.0, -1.0, //0.0, 1.0, 0.0,
        1.0, -1.0, //0.0, 1.0, 0.0,
        1.0, 1.0,// 0.0, 1.0, 0.0,
        -1.0, 1.0, //0.0, 1.0, 0.0,
    ]
    const bufferData = new Float32Array(originData);
    const BYTE_SIZE = bufferData.BYTES_PER_ELEMENT;

    const vidTexture = gl.createTexture();
    gl.bindTexture(gl.TEXTURE_2D, vidTexture);
    gl.activeTexture(gl.TEXTURE0);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
    gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, true);


    // 设置纹理采样到贴图位置
    gl.uniform1i(videoTexture, 0);

    function render() {
        console.log("video render");
        // 更新纹理
        gl.bindTexture(gl.TEXTURE_2D, vidTexture);
        gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, videoIns);
        // 清除画布
        gl.clear(gl.COLOR_BUFFER_BIT)
        gl.bindBuffer(gl.ARRAY_BUFFER, glBuffer);
        gl.bufferData(gl.ARRAY_BUFFER, bufferData, gl.STATIC_DRAW);
        gl.vertexAttribPointer(lpos, 2, gl.FLOAT, false, 2 * BYTE_SIZE, 0);
        gl.enableVertexAttribArray(lpos);

        // 绘制图像
        gl.drawArrays(gl.TRIANGLE_FAN, 0, 4);
        // 每一帧执行
        requestAnimationFrame(render);
    }


    render()
}

