uniform float uTime;

varying vec2 vUv;

void main(){
    vUv = uv;
    vec3 newPosition = position;

    float progressive = (abs(pow(position.x, 2.)) - uTime * 65.) * 0.066;

    float elevationx = sign(sin(progressive));

    newPosition.z += elevationx;

    gl_Position = projectionMatrix * viewMatrix * modelMatrix * vec4(newPosition, 1.0);   
}