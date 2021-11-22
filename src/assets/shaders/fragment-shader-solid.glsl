// fragment shader set a pixel of each vertex shader

varying float vNoise;
varying vec2 vUv;
varying vec2 vectorNormal;

void main() {
  vec3 color1 = vec3(0.0039, 0.2549, 0.5451);
  vec3 color2 = vec3(0.1098, 0.3804, 0.6941);
  vec3 finalColor = mix(color1, color2, 0.5*(vNoise + 1.));

  vec2 newUV = vUv;

  // newUV = vec2(newUV.x, newUV.y + 0.01*sin(newUV.x*10. + time));

  gl_FragColor = vec4(finalColor, 2.);
}
