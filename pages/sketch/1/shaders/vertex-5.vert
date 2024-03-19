uniform float uTime;

varying vec2 vUv;

void main(){
    vUv = uv;
    vec3 newPosition = position;
    float planew = 15.0;
    float wavelength = 3.0;
    float waveheight = 4.0;
    float wavecycle = mod(uTime * 4.0, planew * 1.75);
    
    float d = distance(position.xy, vec2(0.0,0.0)) + planew / 2.5;
    float elevation =
        smoothstep(wavecycle + 4.0, wavecycle + 4.0 + wavelength,d) 
        - smoothstep(wavecycle,wavecycle + wavelength,d);

    newPosition.z += elevation * waveheight;

    gl_Position = projectionMatrix * viewMatrix * modelMatrix * vec4(newPosition, 1.0);   
}