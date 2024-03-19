uniform float uTime;

varying vec2 vUv;

void main(){
    vUv = uv;
    vec3 newPosition = position;

    float elevation = sign(sin(abs((position.x * position.y) + uTime * 23.0) * 0.075));

    newPosition.z += elevation;

    gl_Position = projectionMatrix * viewMatrix * modelMatrix * vec4(newPosition, 1.0);   
}