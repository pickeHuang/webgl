
export const hy = {

    /**
    * 初始化shader
    * @param {WebGL2RenderingContext} glContext 
    * @param {string} vertexSource 
    * @param {string} fragmentSource 
    */
    initShader: function (glContext, vertexSource, fragmentSource) {

        const vShader = this.createShader(glContext, glContext.VERTEX_SHADER, vertexSource);
        if (!vShader) {
            return null;
        }

        const fShader = this.createShader(glContext, glContext.FRAGMENT_SHADER, fragmentSource);
        if (!fShader) {
            return null;
        }

        const program = this.createProgram(glContext, vShader, fShader);
        if (!program) {
            return null;
        }

        glContext.useProgram(program);
        return program;
    },

    /**
     * 初始化shaderbuffer
     * @param {WebGL2RenderingContext} glContext 
     * @param {WebGLProgram} program 
     * @param {Array<number>} vertexDataXYRBG 
     * @param {number} pointSize 
     */
    initVertexBuffers: function (glContext, program, vertexDataXYRBG, pointSize) {

        const lsize = glContext.getUniformLocation(program, "u_size");
        glContext.uniform1f(lsize, pointSize);

        const floatVertexData = new Float32Array(vertexDataXYRBG);
        const FSIZE = floatVertexData.BYTES_PER_ELEMENT;
        // 创建buffer
        const buffer = glContext.createBuffer();
        // 绑定buffer
        glContext.bindBuffer(glContext.ARRAY_BUFFER, buffer);
        // 绑定buffer数据
        glContext.bufferData(glContext.ARRAY_BUFFER, floatVertexData, glContext.STATIC_DRAW);
        // 设置pointer数据
        const lpos = glContext.getAttribLocation(program, "a_position");
        glContext.vertexAttribPointer(lpos, 2, glContext.FLOAT, false, 5 * FSIZE, 0);

        const lcolor = glContext.getAttribLocation(program, "a_color");
        glContext.vertexAttribPointer(lcolor, 3, glContext.FLOAT, false, 5 * FSIZE, 2 * FSIZE);
        // 确认属性赋值
        glContext.enableVertexAttribArray(lpos);
        glContext.enableVertexAttribArray(lcolor);
    },

    /**
     * 创建shader
     * @param {WebGL2RenderingContext} glContext webgl上下文
     * @param {WebGLRenderingContextBase} type shader 类型
     * @param {string} shaderSource shader逻辑源
     */
    createShader: function (glContext, type, shaderSource) {
        const customShader = glContext.createShader(type);
        glContext.shaderSource(customShader, shaderSource);
        glContext.compileShader(customShader);

        const compileResult = glContext.getShaderParameter(customShader, glContext.COMPILE_STATUS);
        if (compileResult) {
            return customShader;
        } else {
            const error = glContext.getShaderInfoLog(customShader);
            console.error("create shader error:", error);
            glContext.deleteShader(customShader);
            return null;
        }
    },

    /**
     * 创建shader程序
     * @param {WebGL2RenderingContext} glContext 
     * @param {WebGLShader} vertexShader 
     * @param {WebGLShader} fragmentShader 
     */
    createProgram: function (glContext, vertexShader, fragmentShader) {

        const customProrgram = glContext.createProgram();
        if (!customProrgram) {
            console.error("customProgram is null");
            return null;
        }

        glContext.attachShader(customProrgram, vertexShader);
        glContext.attachShader(customProrgram, fragmentShader);
        glContext.linkProgram(customProrgram);

        const linkResult = glContext.getProgramParameter(customProrgram, glContext.LINK_STATUS);
        if (linkResult) {
            return customProrgram;
        } else {
            const error = glContext.getProgramInfoLog(customProrgram);
            console.error("create program error :", error);
            // 释放内存
            glContext.deleteProgram(customProrgram);
            glContext.deleteShader(vertexShader);
            glContext.deleteShader(fragmentShader);
            return null;
        }

    }
}

console.log("shaderDill:",hy);