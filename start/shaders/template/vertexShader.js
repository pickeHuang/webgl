

export const vertexShader =/*glsl*/ `

    attribute vec3 a_position;
    uniform mat4 u_rotateMatrix;

    void main() {
        gl_Position = u_rotateMatrix * vec4(a_position,1.0);
    }

`