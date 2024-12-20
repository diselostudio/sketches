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

  float d = length(uv.xy);
  float speed = u_time * 1.5;
  float wave = tan(d) * 5.2 * d;
  float rings = abs(sin(wave - speed));
  rings = smoothstep(0.14, .18, rings);

  vec3 color = mix(dark, light, rings);

  gl_FragColor = vec4(color, 1.0);
}