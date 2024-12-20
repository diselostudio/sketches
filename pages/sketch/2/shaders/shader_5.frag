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
    
    float uvx = abs(uv.x) + 0.06;

    vec3 darkgrad = vec3(smoothstep(
        uv.y - 1.2,
        uv.y + 0.8,
        floor(uvx * 5.) / 5.
    ));

    vec3 smoothgrad = vec3(smoothstep(
        uv.y - 0.8 + 0.8,
        uv.y + pow(.41, uv.y),
        floor(uvx * 5.) / 5. * 0.4
    )) + 0.52;

    vec3 basegrad = vec3(abs(uv.y * uv.y)) * 1.5;

    vec3 color = mix(absence - 0.05, light, smoothgrad * darkgrad + (basegrad * 0.1));
    color = color * smoothgrad - 0.09;
    color = clamp(color, absence - 0.4, light + 0.08);

    gl_FragColor = vec4(color, 1.0);
}