import "./style.css";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import { UnrealBloomPass } from "three/addons/postprocessing/UnrealBloomPass.js";
import { EffectComposer } from "three/addons/postprocessing/EffectComposer.js";
import { RenderPass } from "three/addons/postprocessing/RenderPass.js";

// Setup
const scene = new THREE.Scene();
export { scene as default };
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

camera.position.set(70, 0, 50);

//Renderer
const renderer = new THREE.WebGLRenderer({
  canvas: document.querySelector("#bg"),
  antialias: true,
});
renderer.setPixelRatio(2); //smoother sphere (or can put: window.devicePixelRatio)
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

renderer.render(scene, camera);

//CONTROLS
const controls = new OrbitControls(camera, renderer.domElement);
controls.minDistance = 15;
controls.maxDistance = 80;
controls.enableDamping = true; //more weight
controls.enablePan = false; //not moving around
// controls.autoRotate = true; //rotate
// controls.autoRotateSpeed = 5;

controls.update();

// Lights
const ambientLight = new THREE.AmbientLight(0xffffff, 0.02);
ambientLight.position.set(0, 0, 0);
scene.add(ambientLight);

///Earth Spotlight
let spotLightE;
spotLightE = new THREE.SpotLight(0xffffff, 100);
spotLightE.position.set(-3, 5, 3.5);
spotLightE.angle = Math.PI / 8;
spotLightE.penumbra = 1.5; // Set the penumbra to soften the edges of the spotLight
spotLightE.decay = 2;
spotLightE.distance = 0;

scene.add(spotLightE);

///Dir Light
const directionalLight = new THREE.DirectionalLight(0xffffff, 5);
directionalLight.position.set(-18, 58, 12); // Set position of the light(-10, -1, 10)
scene.add(directionalLight);

// SEE THE SPOTLIGHT
// const lightHelper = new THREE.SpotLightHelper( spotLightV );
// const lightHelper2 = new THREE.DirectionalLightHelper( directionalLight)
// scene.add( lightHelper, lightHelper2 );
// let earth;
// const loader = new GLTFLoader();

//PLanets
let allplanets = 
[ { name: "Mercury", position: new THREE.Vector3(-50, 0, 50), scale: new THREE.Vector3(0.0022, 0.0022, 0.0022)},
  { name: "Venus", position: new THREE.Vector3(-40, 0, 40), scale: new THREE.Vector3(0.003, 0.003, 0.003)},
  { name: "earth", position: new THREE.Vector3(-30, 0, 30), scale: new THREE.Vector3(0.004, 0.004, 0.004) },
  { name: "Mars", position: new THREE.Vector3(-20, 0, 20), scale: new THREE.Vector3(0.003, 0.003, 0.003)},
  { name: "Jupiter", position: new THREE.Vector3(-10, 0, 10),scale: new THREE.Vector3(0.01, 0.01, 0.01)},
  { name: "Saturn", position: new THREE.Vector3(4, 0, -4), scale: new THREE.Vector3(0.008, 0.008, 0.008)},
  { name: "Uranus", position: new THREE.Vector3(15, 0, -15), scale: new THREE.Vector3(0.005, 0.005, 0.005)},
  { name: "Neptune", position: new THREE.Vector3(25, 0, -25), scale:new THREE.Vector3(0.0049, 0.0049, 0.0049)}];

const loader = new GLTFLoader(); // Create a loader instance

export function loadPlanet(scene, loader, fileName, position, scale) {
  loader.load(`files/${fileName}.glb`, function (gltf) {
    let planet = gltf.scene; 
    planet.position.set(position.x,position.y,position.z);//(-30, 0, 30); // Set x, y, z coordinates as needed
    console.log("POSITION")
    planet.scale.set(scale.x,scale.y,scale.z);//(0.0022, 0.0022, 0.0022); // Adjust the scale as needed
    console.log("SCALE")
    scene.add(planet);
  },
  (xhr) => {
    console.log((xhr.loaded / xhr.total) * 100 + "% loaded");
  },
  (error) => {
    console.log(error);
  }
);
}

allplanets.forEach(planet => { loadPlanet(scene, loader, planet.name, planet.position, planet.scale); });

export{allplanets}

//Sun Glow
const renderScene = new RenderPass(scene, camera);
const bloomPass = new UnrealBloomPass(
  new THREE.Vector2(window.innerWidth, window.innerHeight),
  1.5,
  0.4,
  0.85
);
bloomPass.threshold = -2;
bloomPass.strength = 0.5; //intensity of glow
bloomPass.radius = 2;
const bloomComposer = new EffectComposer(renderer);
bloomComposer.setSize(window.innerWidth, window.innerHeight);

//sun object
const color = new THREE.Color("#FDB813");
const geometry = new THREE.IcosahedronGeometry(1, 15);
const material = new THREE.MeshBasicMaterial({ color: color });
const Sunsphere = new THREE.Mesh(geometry, material);
Sunsphere.position.set(-79, 0, 79);
Sunsphere.scale.set(22, 22, 22);
Sunsphere.layers.set(1);
scene.add(Sunsphere);

// galaxy geometry
const starGeometry = new THREE.SphereGeometry(90, 94, 94);
const gtexture = new THREE.TextureLoader().load("files/galaxy1.png");

// galaxy material
const starMaterial = new THREE.MeshBasicMaterial({
  map: gtexture,
  side: THREE.BackSide,
  transparent: true,
});

// galaxy mesh
const starMesh = new THREE.Mesh(starGeometry, starMaterial);

// starMesh.layers.set(0);
scene.add(starMesh);

bloomComposer.render(Sunsphere);
bloomComposer.addPass(renderScene);
bloomComposer.addPass(bloomPass);
bloomComposer.render();
// camera.layers.set(1);
// starMesh.layers.set(1);
// Sunsphere.layers.set(1);
camera.layers.enableAll(); // Render all layers
bloomComposer.render();

const animatee = () => {
  requestAnimationFrame(animatee);
  starMesh.rotation.y += 0.0001;
  // camera.layers.set(1);
  // camera.layers.enableAll();
  bloomComposer.render();
};

animatee();

//WINDOW SIZE
window.onresize = function () {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
};



// Mercury 1
// let mercury;
// loader.load("files/Mercury.glb", function (gltf) {
//   mercury = gltf.scene;
//   mercury.position.set(-50, 0, 50); // Set x, y, z coordinates as needed
//   mercury.scale.set(0.003, 0.003, 0.003); // Adjust the scale as needed
//   scene.add(mercury);
// });

//VENUS 2
// let venus;
// loader.load("files/Venus.glb", function (gltf) {
//   venus = gltf.scene;
//   venus.position.set(-40, 0, 40); // Set x, y, z coordinates as needed
//   venus.scale.set(0.004, 0.004, 0.004); // Adjust the scale as needed
//   venus.layers.set(-1);
//   scene.add(venus);
// });

//Mars 4
// let mars;
// loader.load("files/Mars.glb", function (gltf) {
//   mars = gltf.scene;
//   mars.position.set(-20, 0, 20); // Set x, y, z coordinates as needed
//   mars.scale.set(0.003, 0.003, 0.003); // Adjust the scale as needed
//   scene.add(mars); // Add the scaled object to the scene
// });

//Jupiter 5
// let jupiter;
// loader.load("files/Jupiter.glb", function (gltf) {
//   jupiter = gltf.scene;
//   jupiter.position.set(-10, 0, 10);
//   jupiter.scale.set(0.01, 0.01, 0.01);
//   scene.add(jupiter);
// });

//Saturn 6
// let saturn;
// loader.load("files/Saturn.glb", function (gltf) {
//   saturn = gltf.scene;
//   saturn.position.set(4, 0, -4);
//   saturn.rotateX(12);
//   saturn.scale.set(0.008, 0.008, 0.008);
//   scene.add(saturn);
// });

//Uranus 7
// let uranus;
// loader.load("files/Uranus.glb", function (gltf) {
//   uranus = gltf.scene;
//   uranus.position.set(15, 0, -15);
//   uranus.scale.set(0.005, 0.005, 0.005);
//   scene.add(uranus);
// });

//Neptune 8
// let neptune;
// loader.load("files/Neptune.glb", function (gltf) {
//   neptune = gltf.scene;
//   neptune.position.set(25, 0, -25);
//   neptune.scale.set(0.0049, 0.0049, 0.0049);
//   scene.add(neptune);
// });