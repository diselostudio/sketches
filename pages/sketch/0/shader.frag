#ifdef GL_ES
precision highp float;
#endif

#define PI 3.1415926538

uniform vec2 u_resolution;
uniform vec2 u_mouse;
uniform float u_time;

vec3 cosPalette( float t , vec3 brightness, vec3 contrast, vec3 osc, vec3 phase){
    return brightness + contrast*cos( 6.28318*(osc*t+phase) );
}


float rand(vec2 n) { 
    return fract(sin(dot(n, vec2(12.9898, 4.1414))) * 43758.5453);
}

float noise(vec2 p){
    vec2 ip = floor(p);
    vec2 u = fract(p);
    u = u*u*(3.0-2.0*u);
    
    float res = mix(
        mix(rand(ip),rand(ip+vec2(1.0,0.0)),u.x),
        mix(rand(ip+vec2(0.0,1.0)),rand(ip+vec2(1.0,1.0)),u.x),u.y);
    return res*res;
}


void main() {
      vec2 uv = (gl_FragCoord.xy - (u_resolution.xy * .5)) / u_resolution.yy;
      //vec2 st = gl_FragCoord.xy/u_resolution;
      
      float n = noise(vec2(uv.y, sin(u_time)));
      
      vec3 color = vec3(0.0);
      
      float angle = noise(vec2(atan(uv.y * uv.y), cos(u_time * 2.0)));
      
      color.r = noise(vec2(sin(angle * u_time))) * cos(u_time);
      color.g = tan(step(0.2, cos(distance(uv, vec2(0.0) * 10.0 + u_time))));
      color.b = smoothstep(cos(angle + cos(distance(vec2(uv.x), vec2(angle + u_time)))), 0.6, uv.y);
      
      vec3 brightness = vec3(0.6, uv.x, uv.y);
      vec3 contrast = vec3(sin(PI), sin(PI - u_time), .5);
      vec3 osc = vec3(.7);
      vec3 phase = vec3(0.5);

      vec3 palette = cosPalette(color.b, brightness, contrast, osc, phase);
      
      color.r = color.r + noise(vec2(palette.g, palette.r));
    //   color.g = rand(vec2(0.9, color.r + noise(vec2(palette.g, palette.r))));
      color.g = noise(vec2(rand(vec2(0.9, 250.0)), 300.0));
      
      gl_FragColor = vec4(color,1.0);
}