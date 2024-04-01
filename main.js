import './style.css'
import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';


const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000); 
camera.position.set(0, 0, 5); // Set camera position to see the Earth model

const renderer = new THREE.WebGLRenderer(); 
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);


const controls = new OrbitControls( camera, renderer.domElement );
controls.update();

const loader = new GLTFLoader(); // Create a new loader instance

loader.load('planetss/earth.glb', function ( gltf ) { 

  const eObject = gltf.scene; // Get the loaded scene
  eObject.position.set(0, 0, 0); // Set x, y, z coordinates as needed
  eObject.scale.set(0.002, 0.002, 0.002); // Adjust the scale as needed
  scene.add( eObject );   // Add the scaled object to the scene
}, undefined, function ( error ) {

  console.error( error );

} );

const ambientLight = new THREE.AmbientLight(0xffffff, 0.5); // Ambient light
scene.add(ambientLight);

const directionalLight = new THREE.DirectionalLight(0xffffff, 6); // Directional light
directionalLight.position.set(0, 1, 0);
scene.add(directionalLight);



// Add a simple grid helper to visualize the scene
const gridHelper = new THREE.GridHelper(100, 100);
//scene.add(gridHelper);


function render() {
  requestAnimationFrame(render);
  renderer.render(scene, camera);
}
render();
//Background
//const spacetexture = new THREE.TextureLoader().load('planetss/spacee.jpg');
//scene.background = spacetexture;