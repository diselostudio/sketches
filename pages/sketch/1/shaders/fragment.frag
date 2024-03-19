varying vec2 vUv;

void main() {
    // center is 0,0 & canvas streches, not taken resolution into acount
    // vec2 uv = fragCoord / iResolution.xy * 2.0  - 1.0;

    // center is 0,0 & canvas keeps aspect ratio
    // vec2 uv = (fragCord * 2.0 - iResolution.xy) / iResolution.y;

    gl_FragColor = vec4(vUv.xy, 0.5, 1.0);
}