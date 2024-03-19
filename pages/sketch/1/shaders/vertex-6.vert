uniform float uTime;

varying vec2 vUv;

void main(){
    vUv = uv;
    vec3 newPosition = position;
    
    newPosition.z += 1.5 * sin(((newPosition.x + newPosition.y / 2.0) + (uTime * 2.5))) ;

    gl_Position = projectionMatrix * viewMatrix * modelMatrix * vec4(newPosition, 1.0);   
}