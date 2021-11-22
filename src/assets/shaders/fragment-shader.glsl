varying float vNoise;
varying vec2 vUv;
uniform sampler2D imageTexture;
uniform float time;

void main() {
  /** Basic color rendering */
  vec3 color1 = vec3(0.0, 0.2078, 0.1725);
  vec3 color2 = vec3(0.0392, 0.6078, 0.3686);
  // vec3 finalColor = mix(color1, color2, 0.5*(vNoise + 1.));

  vec2 newUV = vUv;
  // newUV = vec2(newUV.x, newUV.y + 0.01*sin(newUV.x*10. + time));
  gl_FragColor = vec4(vUv, 0., 1.);
  // gl_FragColor = vec4(vNoise);

  /** Img rendering */
  // vec4 flowerView = texture2D(imageTexture, newUV);
  // gl_FragColor = flowerView;
}
