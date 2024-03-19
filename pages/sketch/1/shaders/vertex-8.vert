uniform float uTime;

varying vec2 vUv;

void main(){
    vUv = uv;
    vec3 newPosition = position;
    float wave = 1.0 * sin((newPosition.x - (uTime * 2.5)));
    float yd = distance(newPosition.x, 15.0) * 0.5;
    float smoty = smoothstep(0., 30., yd) * 4.;
    newPosition.z += wave * smoty;

    gl_Position = projectionMatrix * viewMatrix * modelMatrix * vec4(newPosition, 1.0);   
}