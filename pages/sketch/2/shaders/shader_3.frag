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

    vec3 squarefluid = vec3(
        smoothstep(
            0.25,
            tan(0.4),
            max(
                fract(abs(uv.x)) * 0.2,
                abs(mod(uv.y * (0.6 + uv.y + uv.x) + u_time * 0.35, 0.6)))
        )
    );

    vec3 squarerep = vec3(
        smoothstep(
            0.45,
            0.5,
            max(
                abs(uv.x),
                abs(mod(uv.y + u_time * 0.35, 0.7) * uv.y * 1.9)
            )
        )
    );

    vec3 color = mix(absence, light, squarefluid + (squarerep * 2.0));    
    color = mix(absence, light, color * color + squarefluid);
    color = clamp(color, absence, light);

    gl_FragColor = vec4(color, 1.0);
}