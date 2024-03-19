uniform float uTime;

varying vec2 vUv;

void main(){
    vUv = uv;
    vec3 newPosition = position;

    float direction = 2.0 * step(newPosition.x, 0.0) - 1.0;
    float amplitude = newPosition.x * 0.22;
    newPosition.z += amplitude * sin((newPosition.x + (uTime * direction * 2.5))) + 1.0 ;

    gl_Position = projectionMatrix * viewMatrix * modelMatrix * vec4(newPosition, 1.0);   
}