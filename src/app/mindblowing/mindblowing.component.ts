import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import fragmentShaderSolid from '../../assets/shaders/fragment-shader-solid.glsl';
import vertexShaderSolid from '../../assets/shaders/vertex-shader-solid.glsl';

@Component({
  selector: 'app-mindblowing',
  templateUrl: './mindblowing.component.html',
  styleUrls: ['./mindblowing.component.scss']
})
export class MindblowingComponent implements OnInit {

  renderer = new THREE.WebGLRenderer();
  scene;
  camera;
  mesh;
  controls;

  geometry;
  material;
  sphere;
  stars;
  moon;

  pointLight;
  ambientLight;
  lightHelper;
  gridHelper;

  @ViewChild('bg', { static: true }) bg: ElementRef;

  constructor() {
    this.scene = new THREE.Scene();
    this.camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 1, 1000);
    this.camera.position.z = 100;

    this.controls = new OrbitControls(this.camera, this.renderer.domElement);

    this.addObject();
    this.setupResize();
    this.resize();
  }

  ngOnInit() {
    this.stars = () => {
      this.sphere = new THREE.SphereGeometry(0.25, 24, 24);
      const material = new THREE.MeshStandardMaterial({ color: 0xffffff })
      const star = new THREE.Mesh(this.sphere, material);
      const [x, y, z] = Array(3).fill(3).map(() => THREE.MathUtils.randFloatSpread(100));
      star.position.set(x, y,z);
      this.scene.add(star);
    };

    this.onLoadPage();
  }

  ngAfterViewInit() {
    this.renderer.setSize(window.innerWidth, window.innerHeight);
    this.bg.nativeElement.appendChild(this.renderer.domElement);
    this.animate();
  }

  resize() {
    this.renderer.setSize(window.innerWidth, window.innerHeight);
    this.camera.aspect = window.innerWidth / window.innerHeight;
    this.camera.updateProjectionMatrix();
  }

  setupResize() {
    window.addEventListener('resize', this.resize.bind(this))
  }

  addObject() {
    this.geometry = new THREE.TorusGeometry(10, 3, 16, 100);
    this.material = new THREE.MeshNormalMaterial();

    // light works behind image texture
    this.pointLight = new THREE.PointLight(0xffffff);
    this.ambientLight = new THREE.AmbientLight(0xffffff);
    this.scene.add(this.pointLight, this.ambientLight);

    this.lightHelper = new THREE.PointLightHelper(this.pointLight)
    this.gridHelper = new THREE.GridHelper(200, 50);
    this.scene.add(this.lightHelper, this.gridHelper);

    this.material = new THREE.ShaderMaterial({
      uniforms: {
        time: {value: 0},
      },
      side: THREE.DoubleSide,
      fragmentShader: fragmentShaderSolid,
      vertexShader: vertexShaderSolid,
      wireframe: true,
    })

    this.mesh = new THREE.Mesh(this.geometry, this.material);
    this.scene.add(this.mesh, this.pointLight);
  }

  onLoadPage() {
    Array(200).fill(150).forEach(this.stars);
    const texture = new THREE.TextureLoader().load('../assets/images/black-blue-sky.jpeg');
    this.scene.background = texture;

    // header cube
    const header = new THREE.TextureLoader().load('../assets/images/header1.jpg');
    const img = new THREE.Mesh(
      new THREE.BoxGeometry(3,3,3),
      new THREE.MeshBasicMaterial({map: header}),
    )

    // moon sphere
    const moonImg = new THREE.TextureLoader().load('../assets/images/moon.jpg');
    const normalTexture = new THREE.TextureLoader().load('../assets/images/normal.jpg');
    const moon = new THREE.Mesh(
      new THREE.SphereGeometry(3,32,32),
      new THREE.MeshStandardMaterial({
        map: moonImg,
        normalMap: normalTexture,
      }),
    )

    moon.rotation.x += 0.01;
    moon.rotation.y += 0.02;
    moon.rotation.z += 0.01;
    // moon.position.setX(-10);

    this.scene.add(moon);
    this.moveCamera(moon, header);
  }

  // doesn't work
  moveCamera(moon, header) {
    const t = document.body.getBoundingClientRect().top;
    moon.position.z += 0.05;
    moon.position.y += 0.075;
    moon.position.x += 0.05;

    header.rotation.y += 0.01;
    header.rotation.z += 0.01;

    this.camera.position.z = t * -0.1;
    this.camera.position.x = t * -0.0002;
    this.camera.position.y = t * -0.0002;
  }

  animate() {
    window.requestAnimationFrame(() => this.animate());
    this.mesh.rotation.x += 0.01;
    this.mesh.rotation.y += 0.02;
    this.mesh.rotation.z += 0.01;
    this.renderer.render(this.scene, this.camera);
    // document.body.onscroll = this.moveCamera(item, item);
  }
}
