uniform float uTime;

varying vec2 vUv;

void main(){
    vUv = uv;
    vec3 newPosition = position;
    float height = mod((newPosition.x + uTime * 2.0) * 0.45, 3.0);
    newPosition.z += height;

    gl_Position = projectionMatrix * viewMatrix * modelMatrix * vec4(newPosition, 1.0);   
}