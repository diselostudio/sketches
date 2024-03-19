uniform float uTime;

varying vec2 vUv;

void main(){
    vUv = uv;
    vec3 newPosition = position;
    float sizex = 15.0;
    float x = newPosition.x + sizex;
    float amplitude = 3.0;
    float root = mod(uTime * 10.0, sizex * 2.0 + 12.0) - 8.0;
    float height = 6.0;

    float wave =
        smoothstep(root, root + height, x)
        - smoothstep(root + amplitude, root + amplitude + height, x);
    newPosition.z += wave * -5.0;

    gl_Position = projectionMatrix * viewMatrix * modelMatrix * vec4(newPosition, 1.0);   
}