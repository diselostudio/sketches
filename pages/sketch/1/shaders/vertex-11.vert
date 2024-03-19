uniform float uTime;

varying vec2 vUv;

void main(){
    vUv = uv;
    vec3 newPosition = position;
    float sizex = 15.0;

    float d = distance(newPosition.xy, vec2(0.0,0.0));

    float a = cos(atan(newPosition.x, newPosition.y) * 6.0);

    float elevation = pow(sin(uTime * 5.0), 3.0) * d * 0.05;
    
    newPosition.z += a * 3.0 * elevation;// * cos(d + uTime * 2.0);

    gl_Position = projectionMatrix * viewMatrix * modelMatrix * vec4(newPosition, 1.0);   
}