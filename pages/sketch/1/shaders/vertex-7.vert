uniform float uTime;

varying vec2 vUv;

void main(){
    vUv = uv;
    vec3 newPosition = position;
    float sizex = 15.0;

    float d = distance(newPosition.xy, vec2(0.0,0.0));
    
    float a = atan(newPosition.x, newPosition.y) + (uTime * 0.66);

    newPosition.z += clamp(newPosition.z + cos(a  * 8.0) * 1.75, -1.0, 1.0);

    gl_Position = projectionMatrix * viewMatrix * modelMatrix * vec4(newPosition, 1.0);   
}