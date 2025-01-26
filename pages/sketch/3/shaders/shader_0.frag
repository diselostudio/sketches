#ifdef GL_ES
precision highp float;
#endif

#define PI 3.1415926538

uniform vec2 u_resolution;
uniform float u_time;


vec3 palette(in float t, in vec3 a, in vec3 b, in vec3 c, in vec3 d) {
    return a + b * cos(6.28318 * (c * t + d));
}

void main() {
    vec2 baseuv = gl_FragCoord.xy / u_resolution.y;
    vec2 uv = (gl_FragCoord.xy * 2.0 - u_resolution.xy) / u_resolution.y;

    baseuv.x = fract(baseuv.x * 9.0) + uv.y * 2.0;
    float uvx = abs(uv.x) + 0.06;
    float segment = floor(uvx * 7.) / 7. + .4;

    float elevation = mod((baseuv.y) * 0.4, 1.) * tan(segment) * (segment * 4.) + (u_time * 0.4);

    vec3 color = palette(
        elevation,
        vec3(0.74, 0.00, 0.81), 
        vec3(0.53, 0.37, 0.73), 
        vec3(1.00, 0.62, 0.72), 
        vec3(0.47, 0.95, 0.91)
    );

    // vec3 color2 = palette(
    // vec3 color2 = palette(
    //     elevation,
    //     vec3(1.00, 0.00, 0.81),
    //     vec3(0.91, 0.83, 0.63),
    //     vec3(1.00, 0.62, 0.48),
    //     vec3(0.31, 0.59, 1.00)
    // );

    // if(mod(segment, 0.5) > .2) {
    //     color = mix(color, fract(color2) * uvx,color);
    // }

    color = color + vec3(smoothstep(0.96, 1.15,abs(uv.x)));

    gl_FragColor = vec4(color, 1.0);
}

// Different output
// color = vec3(fract(sin(uv.y + uvx) * 2.0));


