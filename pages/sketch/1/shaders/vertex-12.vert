uniform float uTime;

varying vec2 vUv;

void main(){
    vUv = uv;
    vec3 newPosition = position;
    float planew = 30.0;
    float barw = 3.0;

    float cycle = mod(uTime * 10., planew + 12.0);

    float elevationy = step(abs(position.y), barw);
    
    float reference = cycle - (planew / 2.0);
    
    float elevationx = abs(step(position.x, reference) - step(position.x, reference - 6.0)); //clamp(position.x, 3.0, 6.0);//step(abs(position.x), 3.0);
    
    float elevation = min((elevationx + elevationy), 1.0) * -1. * 3.0;
    
    newPosition.z += elevation;

    gl_Position = projectionMatrix * viewMatrix * modelMatrix * vec4(newPosition, 1.0);   
}