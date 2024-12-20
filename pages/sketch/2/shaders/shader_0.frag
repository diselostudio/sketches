#ifdef GL_ES
precision highp float;
#endif

#define PI 3.1415926538

uniform vec2 u_resolution;
uniform float u_time;

void main() {
    vec2 uv = (gl_FragCoord.xy * 2.0 - u_resolution.xy) / u_resolution.y;
    vec3 light = vec3(1., 0.757, 0.078);
    vec3 dark = vec3(0.192, 0.129, 0.);
    vec3 absence = vec3(0.11, 0.078, 0.012);

    float bg = uv.y + 1.;

    float d = length(uv.xy);

    float circle = smoothstep(0.6, 0.61 + abs(min(0., (uv.y - 0.05) * -uv.y)), d);

    float coefb = uv.y * (-uv.y * -uv.y);
    float circleb = smoothstep(
        0.6,
        0.61 + abs(
            min(
                0.,
                coefb
            )
        ),
        d
    );

    float circlec = smoothstep(
        0.6,
        0.61 + abs(
            min(
                0.,
                uv.y * (-uv.y * -uv.y) * (tan(-d))
            )
        ),
        d
    );
    
    vec3 color = mix(dark, light,circleb * bg);
    vec3 color2 = mix(dark, light, circlec * circle) + .35;
    color = clamp(color * color2, absence, light);

    gl_FragColor = vec4(color, 1.0);
}