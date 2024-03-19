uniform float uTime;

varying vec2 vUv;

void main(){
    vUv = uv;
    vec3 newPosition = position;
    vec2 origin = vec2(-15.0, -12.5);
    
    float d = distance(newPosition.xy, origin);
    
    float a = atan(newPosition.x + 15., newPosition.y + 12.5);

    float triwave = abs(2. * fract((a + uTime * 0.3) * 5.) - 1.0) * 4.0; 

    newPosition.z += triwave * (d * 0.028);

    gl_Position = projectionMatrix * viewMatrix * modelMatrix * vec4(newPosition, 1.0);   
}