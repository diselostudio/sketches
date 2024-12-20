#ifdef GL_ES
precision highp float;
#endif

#define PI 3.1415926538

uniform vec2 u_resolution;
uniform float u_time;

void main() {
    vec2 baseuv = gl_FragCoord.xy / u_resolution.y;
    vec2 uv = (gl_FragCoord.xy * 2.0 - u_resolution.xy) / u_resolution.y;
    vec3 light = vec3(1., 0.757, 0.078);
    vec3 dark = vec3(0.192, 0.129, 0.);
    vec3 absence = vec3(0.11, 0.078, 0.012);

    vec3 bg = vec3(baseuv.y + 0.15);

    vec3 linearrep = vec3(smoothstep(1., .99, sin(tan(baseuv.y * tan(baseuv.y - 0.15)) * 12.0 - u_time * 3.2)));

    vec3 wavebg = vec3(smoothstep(-0.1, 1., sin(baseuv.y * 12.0 - u_time * 0.5)));

    vec3 color = mix(absence, light, ((wavebg - (.8 * uv.y)) + bg) * (linearrep));
    color = mix(absence, color, uv.y + 1.4);
    color = clamp(color - (bg * 0.2) + 0.12 * uv.y, absence, light);

    gl_FragColor = vec4(color, 1.0);
}