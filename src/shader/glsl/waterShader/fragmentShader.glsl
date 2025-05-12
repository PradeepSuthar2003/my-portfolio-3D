precision mediump float;

uniform vec3 color;
uniform vec3 uFogColor;
uniform float uFogDensity;

varying vec3 vPosition;
varying float uvTime;

void main() {
    float sinY = sin(vPosition.y + 3.0 + uvTime);
    float sinX = sin(vPosition.x + 3.0 + uvTime);

    float maskX = smoothstep(0.1, 2.0, abs(sinX));
    float maskY = smoothstep(0.1, 2.0, abs(sinY));

    float mask = maskX * maskY;

    vec3 waterColorWithMask = mix(vec3(0.0,0.6,1.0), color, mask);

    float distanceFactor = length(vPosition.xyz) * 0.01;
    distanceFactor = clamp(distanceFactor,0.0,1.0);

    float fogFactor = 1.0 - exp(-uFogDensity * distanceFactor * distanceFactor);

    gl_FragColor = vec4(mix(waterColorWithMask,uFogColor,fogFactor), 1.0);
}
