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

    // Grid
    vec2 space = fract(uv * 1.8);

    //Dots
    float d = distance(space, vec2(.5));
    float circle = smoothstep(0.4, 0.41, d);
    vec3 color = mix(absence, light, circle - 0.04);

    // Shadow
    float d1 = distance(space, vec2(.5));
    float maincircle = smoothstep(0.4, 0.5, d1);
    float d2 = distance(space, vec2(0.5, .65));
    float substractcircle = smoothstep(0.58, 0.20, d2);
    vec3 shadow = mix(absence, light, substractcircle + maincircle) * 1.7;

    // Marble bg
    for(int i = 0; i < 5; i++) {
        uv = vec2(sin((uv.x + u_time * 0.05) * 3. + uv.y * 9.8) * .5 + .1, cos((uv.y - u_time * 0.05) * 6.68 + uv.x * 7.3) * .5 * .5);
    }
    float x = smoothstep(.6, .8, sin((uv.x - uv.y) * 2. * 3.1415) * .5 + .5) + circle;
    vec3 bg = mix(vec3(0.), vec3(256.), x);

    // Output color grid
    color = clamp(color * shadow + (substractcircle * 0.005) * (bg * 0.105), absence, light);

    gl_FragColor = vec4(color, 1.0);
}