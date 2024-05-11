export const fragmentShader = /*glsl*/`
    precision mediump float;
    varying vec2 v_texCoord;
    uniform sampler2D videoTexture;

    void main() {
        gl_FragColor = texture2D(videoTexture,v_texCoord);
    }
`