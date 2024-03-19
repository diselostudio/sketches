uniform float uTime;

varying vec2 vUv;

void main(){
    vUv = uv;
    vec3 newPosition = position;
    float d = distance(position.xy, vec2(0.0,0.0));
    newPosition.z += sin(-d + uTime * 3.5) * 2.0;

    gl_Position = projectionMatrix * viewMatrix * modelMatrix * vec4(newPosition, 1.0);   
}