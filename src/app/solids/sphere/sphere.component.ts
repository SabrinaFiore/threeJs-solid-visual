import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import * as THREE from 'three';
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls"
import fragmentShader from '../../../assets/shaders/fragment-shader.glsl';
import vertexShader from '../../../assets/shaders/vertex-shader.glsl';
import fragmentShaderSolid from '../../../assets/shaders/fragment-shader-solid.glsl';
import vertexShaderSolid from '../../../assets/shaders/vertex-shader-solid.glsl';

@Component({
  selector: 'app-sphere',
  templateUrl: './sphere.component.html',
  styleUrls: ['./sphere.component.scss']
})
export class SphereComponent implements OnInit {

  camera;
  scene;
  renderer;

  container;
  geometry;
  material;
  mesh;
  time;
  options;
  controls;
  images;
  title: any;
  imageStore: any;

  texture = new THREE.TextureLoader().load('../assets/images/flower01.jpg');

  @ViewChild('dom', { static: true }) dom: ElementRef;

  constructor() {
    this.time = 0;
    this.scene = new THREE.Scene();

    // this.camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    // this.camera.position.z = 3;
    this.camera = new THREE.PerspectiveCamera(70, window.innerWidth / window.innerHeight, 0.01, 1000);
    this.camera.position.z = 50;

    this.renderer = new THREE.WebGLRenderer({
      antialias: true,
      // alpha: true
    });

    this.controls = new OrbitControls(this.camera, this.renderer.domElement);

    this.resize();
    this.setupResize();
    this.addObjects();
    this.addSecondObject();
    this.render();
  }

  ngOnInit(): void {
    this.onPageLoad(this.options);
  }

  ngAfterViewInit() {
    this.renderer.setSize(window.innerWidth, window.innerHeight);
    this.dom.nativeElement.appendChild(this.renderer.domElement);
  }

  onPageLoad(options) {
    // this.dom.nativeElement.getElementById('dom');
    // this.dom = options.dom;
  }

  setupResize() {
    window.addEventListener('resize', this.resize.bind(this))
  }

  resize() {
    this.renderer.setSize(window.innerWidth, window.innerHeight);
    this.camera.aspect = window.innerWidth / window.innerHeight;
    this.camera.updateProjectionMatrix();
  }

  addObjects() {
    /** Flat cube */
    // this.geometry = new THREE.PlaneBufferGeometry( 100, 100, 10, 10 );

    /** Flat Sphere */
    this.geometry = new THREE.SphereBufferGeometry( 0.4, 40, 40 );
    this.material = new THREE.MeshNormalMaterial();

    this.material = new THREE.ShaderMaterial({
      uniforms: {
        time: {value: 0},
        // imageTexture: {value: this.texture},
      },
      side: THREE.DoubleSide,
      fragmentShader: fragmentShader,
      vertexShader: vertexShader,
      wireframe: true,
    })

    this.mesh = new THREE.Mesh( this.geometry, this.material );
    this.scene.add( this.mesh );
    console.log(this.mesh);
  }

  addSecondObject() {
    this.geometry = new THREE.TorusGeometry(10, 3, 16, 100);
    this.material = new THREE.MeshNormalMaterial();

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
  }

  render() {
    this.time += 0.5;
    this.mesh.rotation.x = this.time / 1000;
	  this.mesh.rotation.y = this.time / 1000;

    this.material.uniforms.time.value = this.time;

    this.renderer.render(this.scene, this.camera);
    window.requestAnimationFrame(this.render.bind(this));
  }
}
