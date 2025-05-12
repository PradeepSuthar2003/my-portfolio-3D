attribute vec3 position;

uniform mat4 projectionMatrix;
uniform mat4 modelViewMatrix;
uniform float uTime;

varying vec3 vPosition;
varying float uvTime;

void main() {
    vPosition = position;
    uvTime = uTime; 

    float waveX = sin(position.x * 3.0 + uTime) * 0.5;
    float waveY = sin(position.y * 3.0 + uTime) * 0.5;

    vec3 displacedPosition = vec3(position.x, position.y, position.z + waveX + waveY);

    gl_Position = projectionMatrix * modelViewMatrix * vec4(displacedPosition, 1.0);
}
