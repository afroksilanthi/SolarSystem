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
const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);

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

// const pointLight = new THREE.PointLight(0xffffff, 1);
// pointLight.position.set(0, 0, 0);
// scene.add( pointLight );

const ambientLight = new THREE.AmbientLight(0xffffff, 0.02);
ambientLight.position.set(0, 0, 0);
scene.add(ambientLight);

/////////Earth Spotlight
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

//EARTH 3
let earth;
const loader = new GLTFLoader();
loader.load(
  "files/earth.glb",
  function (gltf) {
    earth = gltf.scene; // Get the loaded scene
    earth.position.set(-30, 0, 30); // Set x, y, z coordinates as needed
    earth.scale.set(0.0022, 0.0022, 0.0022); // Adjust the scale as needed
    scene.add(earth); // Add the scaled object to the scene
  },
  (xhr) => {
    console.log((xhr.loaded / xhr.total) * 100 + "% loaded");
  },
  (error) => {
    console.log(error);
  }
);

// Mercury 1
let mercury;
loader.load("files/Mercury.glb", function (gltf) {
  mercury = gltf.scene;
  mercury.position.set(-50, 0, 50); // Set x, y, z coordinates as needed
  mercury.scale.set(0.003, 0.003, 0.003); // Adjust the scale as needed
  scene.add(mercury);
});

//VENUS 2
let venus;
loader.load("files/Venus.glb", function (gltf) {
  venus = gltf.scene;
  venus.position.set(-40, 0, 40); // Set x, y, z coordinates as needed
  venus.scale.set(0.004, 0.004, 0.004); // Adjust the scale as needed
  venus.layers.set(-1);
  scene.add(venus);
});

//Mars 4
let mars;
loader.load("files/Mars.glb", function (gltf) {
  mars = gltf.scene;
  mars.position.set(-20, 0, 20); // Set x, y, z coordinates as needed
  mars.scale.set(0.003, 0.003, 0.003); // Adjust the scale as needed
  scene.add(mars); // Add the scaled object to the scene
});

//Jupiter 5
let jupiter;
loader.load("files/Jupiter.glb", function (gltf) {
  jupiter = gltf.scene;
  jupiter.position.set(-10, 0, 10);
  jupiter.scale.set(0.01, 0.01, 0.01);
  scene.add(jupiter);
});

//Saturn 6
let saturn;
loader.load("files/Saturn.glb", function (gltf) {
  saturn = gltf.scene;
  saturn.position.set(4, 0, -4);
  saturn.rotateX(12);
  saturn.scale.set(0.008, 0.008, 0.008);
  scene.add(saturn);
});

//Uranus 7
let uranus;
loader.load("files/Uranus.glb", function (gltf) {
  uranus = gltf.scene;
  uranus.position.set(15, 0, -15);
  uranus.scale.set(0.005, 0.005, 0.005);
  scene.add(uranus);
});

//Neptune 8
let neptune;
loader.load("files/Neptune.glb", function (gltf) {
  neptune = gltf.scene;
  neptune.position.set(25, 0, -25);
  neptune.scale.set(0.0049, 0.0049, 0.0049);
  scene.add(neptune);
});
//SUN
// let sun;
// loader.load( 'files/sun.glb', function(gltf){
//   sun = gltf.scene
//   sun.position.set(-50, 0, 30); // Set x, y, z coordinates as needed
//   sun.scale.set(2, 2, 2); // Adjust the scale as needed
//    scene.add( sun )
// })

// moon.position.z = 30;
// moon.position.setX(-10);

// earth.position.z = -5;
// earth.position.x = 2;

// Scroll Animation
// function moveCamera() {
//   const t = document.body.getBoundingClientRect().top;
//   if (earth){
//     earth.rotation.y += 0.01;
//     earth.rotation.z += 0.01;
//   }
//   if (venus){
//     venus.rotation.x += 0.03;
//     venus.rotation.y += 0.08;
//     venus.rotation.z += 0.05;
//   }

//   if(mercury){
//     mercury.rotation.x += 0.05;
//     mercury.rotation.y += 0.075;
//     mercury.rotation.z += 0.05; }

//   if(mars){
//     mars.rotation.x += 0.05;
//     mars.rotation.y += 0.085;
//     mars.rotation.z += 0.05;  }

//   if(jupiter){
//     mars.rotation.x += 0.04;
//     mars.rotation.y += 0.065;
//     mars.rotation.z += 0.06;  }

//     camera.position.z = t * -0.01;
//     camera.position.x = t * -0.0002;
//     camera.rotation.y = t * -0.0002;
// }

// document.body.onscroll = moveCamera;
// moveCamera();

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

///
/////////////////////////////
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
//

bloomComposer.render(Sunsphere);

bloomComposer.addPass(renderScene);
bloomComposer.addPass(bloomPass);

// camera.layers.set(1);
bloomComposer.render();

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

// Background
// const spaceTexture = new THREE.TextureLoader().load('files/spacee2.jpg');
// scene.background = spaceTexture;

/*Topothesies planith
kai array kai for loop*/
