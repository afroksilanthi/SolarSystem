import './style.css'
import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import gsap from 'gsap';

//scene
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000); 
camera.position.set(0, 0, 5); // Set camera position to see the Earth model

//renderer 
const renderer = new THREE.WebGLRenderer(); 
renderer.setPixelRatio(2); //smoother sphere
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);


//CONTROLS 
const controls = new OrbitControls( camera, renderer.domElement );
controls.enableDamping = true; //more weight
controls.enablePan = false; //not moving around
controls.autoRotate = true; //rotate
controls.autoRotateSpeed = 5;

controls.update();


// Earth
const loader = new GLTFLoader(); // Create a new loader instance

loader.load('files/earth.glb', function ( gltf ) { 

  const eObject = gltf.scene; // Get the loaded scene
  eObject.position.set(0, 0, 0); // Set x, y, z coordinates as needed
  eObject.scale.set(0.002, 0.002, 0.002); // Adjust the scale as needed
  scene.add( eObject );   // Add the scaled object to the scene
}, undefined, function ( error ) {

  console.error( error );

} );


//LIGHTS
const ambientLight = new THREE.AmbientLight(0xffffff, 0.2); // Ambient light
scene.add(ambientLight);

const directionalLight = new THREE.DirectionalLight(0xffffff, 5); // Directional light
directionalLight.position.set(0, 1, 0);
scene.add(directionalLight);



//
function render() {
  requestAnimationFrame(render);
  renderer.render(scene, camera);
}
render();



//Timeline magicc//Animation
const t1 = gsap.timeline({defaults: { duration: 1}})
t1.fromTo(mesh.scale, {z: 0, x: 0, y:0 }, {z: 1, x: 1, y:1 })
// t1.fromTo({ y: "-100%" }, { y: "0%" })
// t1.fromTo({ opacity: 0 }, { opacity: 1})



//window size 

window.onresize = function () {

  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();

  renderer.setSize( window.innerWidth, window.innerHeight );

};


//Background
//const spacetexture = new THREE.TextureLoader().load('planetss/spacee.jpg');
//scene.background = spacetexture;