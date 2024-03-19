uniform float uTime;

varying vec2 vUv;

void main(){
    vUv = uv;
    vec3 newPosition = position;
    float planew = 9.0;
    float diameter = 3.0;
    
    float cycle = mod(uTime * 20.0, planew * 4.0);

    float direction = 2.0 * (step(cycle, planew * 2.0) - .5);

    float center = direction * mod(cycle, planew * 2.0) - (planew * direction);

    float d = distance(newPosition.xy, vec2(center,0.0));

    newPosition.z += clamp(d, 3.0, 3.0 + diameter) * 1.5 - 8.0;

    gl_Position = projectionMatrix * viewMatrix * modelMatrix * vec4(newPosition, 1.0);   
}