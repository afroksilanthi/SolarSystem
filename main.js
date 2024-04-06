import './style.css';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';

// Setup
const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

const renderer = new THREE.WebGLRenderer({
  canvas: document.querySelector('#bg'),
});

renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);
camera.position.setZ(30);
camera.position.setX(-3);

renderer.render(scene, camera);

// Torus

// const geometry = new THREE.TorusGeometry(10, 3, 16, 100);
// const material = new THREE.MeshStandardMaterial({ color: 0xff6347 });
// const torus = new THREE.Mesh(geometry, material);

// scene.add(torus);
//CONTROLS

const controls = new OrbitControls( camera, renderer.domElement );
controls.enableDamping = true; //more weight
controls.enablePan = false; //not moving around
// controls.autoRotate = true; //rotate
// controls.autoRotateSpeed = 5;

controls.update();

// Lights

const pointLight = new THREE.PointLight(0xffffff, 1);
pointLight.position.set(0, 0, 0);
scene.add( pointLight );

const ambientLight = new THREE.AmbientLight(0xffffff, 1);
ambientLight.position.set(0, 0, 0)
scene.add(ambientLight);

/////////
let spotLightE
let spotLightV
// let spotLightMer
spotLightE = new THREE.SpotLight( 0xf3ffc4, 500 );
spotLightE.position.set( -2.5, 5, 3);
spotLightE.angle = Math.PI / 8;
spotLightE.penumbra = 0.5; // Set the penumbra to soften the edges of the spotLight
spotLightE.decay = 2;
spotLightE.distance = 0;

// spotLightE.castShadow = true;
// spotLightE.shadow.camera.near = 1;
// spotLightE.shadow.camera.far = 100;
scene.add( spotLightE );

//SEE THE SPOTLIGHT
// const lightHelper = new THREE.spotLightHelper( spotLight );
// scene.add( lightHelper );

// const directionalLight = new THREE.DirectionalLight(0xffffff); 
// // directionalLight.position.set(0, 1, 0);
// scene.add(directionalLight);

// Helpers

// const lightHelper = new THREE.PointLightHelper(pointLight)
// const gridHelper = new THREE.GridHelper(200, 50);
// scene.add(lightHelper, gridHelper)

// const controls = new OrbitControls(camera, renderer.domElement);

function addStar() {
  const geometry = new THREE.SphereGeometry(0.2, 3, 4, 0, 6.3, 0, 6.3);
  const material = new THREE.MeshStandardMaterial({ color: 0xffffff });
  const star = new THREE.Mesh(geometry, material);
  star.rotation.x = 20
  const [x, y, z] = Array(3)
    .fill()
    .map(() => THREE.MathUtils.randFloatSpread(100));

  star.position.set(x, y, z);
  scene.add(star);
}

Array(200).fill().forEach(addStar);

// Background

const spaceTexture = new THREE.TextureLoader().load('files/spacee.jpg');
scene.background = spaceTexture;

// Avatar
// const jeffTexture = new THREE.TextureLoader().load('jeff.png');
// const jeff = new THREE.Mesh(new THREE.BoxGeometry(3, 3, 3), new THREE.MeshBasicMaterial({ map: jeffTexture }));
// scene.add(jeff);

//EARTH
let earth;
const loader = new GLTFLoader()
loader.load( 'files/earth.glb', function(gltf){
  earth = gltf.scene; // Get the loaded scene
  earth.position.set(0, 0, 0); // Set x, y, z coordinates as needed
  earth.scale.set(0.002, 0.002, 0.002); // Adjust the scale as needed
  scene.add( earth );   // Add the scaled object to the scene
},(xhr) => {
  console.log((xhr.loaded / xhr.total) * 100 + '% loaded')
},
(error) => {
  console.log(error)
})

//VENUS
let venus;
loader.load( 'files/Venus.glb', function(gltf){
   venus = gltf.scene
   venus.position.set(-10, 0, 10); // Set x, y, z coordinates as needed 
   venus.scale.set(0.004, 0.004, 0.004); // Adjust the scale as needed
   scene.add( venus )
})

// Moon

let mercury;
loader.load( 'files/Mercury.glb', function(gltf){
  mercury = gltf.scene
  mercury.position.set(-10, 0, 30); // Set x, y, z coordinates as needed 
  mercury.scale.set(0.004, 0.004, 0.004); // Adjust the scale as needed
   scene.add( mercury )
})


// moon.position.z = 30;
// moon.position.setX(-10);

// earth.position.z = -5;
// earth.position.x = 2;

// Scroll Animation

function moveCamera() {
  const t = document.body.getBoundingClientRect().top;
  if (earth){
    earth.rotation.y += 0.01;
    earth.rotation.z += 0.01;
  }
  if (venus){
    venus.rotation.x += 0.03;
    venus.rotation.y += 0.08;
    venus.rotation.z += 0.05;
  }
  if(mercury){
    mercury.rotation.x += 0.05;
    mercury.rotation.y += 0.075;
    mercury.rotation.z += 0.05;
  }

  camera.position.z = t * -0.01;
  camera.position.x = t * -0.0002;
  camera.rotation.y = t * -0.0002;
}

document.body.onscroll = moveCamera;
moveCamera();

// Animation Loop

function animate() {
  requestAnimationFrame(animate);
  // torus.rotation.x += 0.01;
  // torus.rotation.y += 0.005;
  // torus.rotation.z += 0.01;

  // mercury.rotation.x += 0.005;

  // controls.update();

  renderer.render(scene, camera);
}

animate();


//WINDOW SIZE
window.onresize = function () {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize( window.innerWidth, window.innerHeight );
};


//Topethesies planith
//kai array kai for loop