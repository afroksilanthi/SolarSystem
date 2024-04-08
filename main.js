import './style.css';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { UnrealBloomPass } from 'three/addons/postprocessing/UnrealBloomPass.js';
import { EffectComposer } from 'three/addons/postprocessing/EffectComposer.js';
import { RenderPass } from 'three/addons/postprocessing/RenderPass.js';


// Setup
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

camera.position.set(-3,0, 30);

// camera.lookAt( 0, 0, 0 );

//Renderer
const renderer = new THREE.WebGLRenderer({
  canvas: document.querySelector('#bg'),
  antialias: true 
});
renderer.setPixelRatio(2); //smoother sphere (or can put: window.devicePixelRatio)
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

renderer.render(scene, camera);


//CONTROLS
const controls = new OrbitControls( camera, renderer.domElement );
controls.enableDamping = true; //more weight
controls.enablePan = false; //not moving around
// controls.autoRotate = true; //rotate
// controls.autoRotateSpeed = 5;
controls.update();

// Lights

//not in need
// const pointLight = new THREE.PointLight(0xffffff, 1);
// pointLight.position.set(0, 0, 0);
// scene.add( pointLight );

const ambientLight = new THREE.AmbientLight(0xffffff, 0.02);
ambientLight.position.set(0, 0, 0)
scene.add(ambientLight);


/////////Earth Spotlight
let spotLightE

spotLightE = new THREE.SpotLight( 0xffffff, 100 );
spotLightE.position.set( -3, 5, 3.5);
spotLightE.angle = Math.PI / 8;
spotLightE.penumbra = 1.5; // Set the penumbra to soften the edges of the spotLight
spotLightE.decay = 2;
spotLightE.distance = 0;

scene.add( spotLightE );

//Spotlight Venus
// const spotLightV = new THREE.SpotLight( 0xffffff, 100);
// spotLightV.position.set( -35, 0, 20);
// spotLightV.angle = Math.PI / 8;
// spotLightV.penumbra = 0.5; // Set the penumbra to soften the edges of the spotLight
// spotLightV.decay = 2;
// spotLightV.distance = 28;

// scene.add( spotLightV );

///Dir Light
const directionalLight = new THREE.DirectionalLight( 0xffffff, 5);
directionalLight.position.set(-18, 58, 12); // Set position of the light(-10, -1, 10)
scene.add(directionalLight);



// SEE THE SPOTLIGHT
// const lightHelper = new THREE.SpotLightHelper( spotLightV );
// const lightHelper2 = new THREE.DirectionalLightHelper( directionalLight)

// scene.add( lightHelper, lightHelper2 );

//EARTH 3
let earth;
const loader = new GLTFLoader()
loader.load( 'files/earth.glb', function(gltf){
  earth = gltf.scene; // Get the loaded scene
  earth.position.set(0, 0, 0); // Set x, y, z coordinates as needed
  earth.scale.set(0.0022, 0.0022, 0.0022); // Adjust the scale as needed
  scene.add( earth );   // Add the scaled object to the scene
},(xhr) => {
  console.log((xhr.loaded / xhr.total) * 100 + '% loaded')
},
(error) => {
  console.log(error)
})

//VENUS 2
let venus;
loader.load( 'files/Venus.glb', function(gltf){
   venus = gltf.scene
   venus.position.set(-10, -1, 10); // Set x, y, z coordinates as needed 
   venus.scale.set(0.004, 0.004, 0.004); // Adjust the scale as needed
   venus.layers.set(-1);
   scene.add( venus )
})

// Mercury 1
let mercury;
loader.load( 'files/Mercury.glb', function(gltf){
  mercury = gltf.scene
  mercury.position.set(-30, 0, 30); // Set x, y, z coordinates as needed 
  mercury.scale.set(0.003, 0.003, 0.003); // Adjust the scale as needed
   scene.add( mercury )
})

//Mars 4
let mars;
loader.load( 'files/Mars.glb', function(gltf){
  mars = gltf.scene; 
  mars.position.set(10, 0, -10); // Set x, y, z coordinates as needed
  mars.scale.set(0.003, 0.003, 0.003); // Adjust the scale as needed
  scene.add( mars );   // Add the scaled object to the scene
})

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
    mercury.rotation.z += 0.05; }
  if(mars){
    mars.rotation.x += 0.05;
    mars.rotation.y += 0.085;
    mars.rotation.z += 0.05;  }

    camera.position.z = t * -0.01;
    camera.position.x = t * -0.0002;
    camera.rotation.y = t * -0.0002;
}

document.body.onscroll = moveCamera;
moveCamera();

// Animation Loop
// function animate() {
//   requestAnimationFrame(animate);
//   // torus.rotation.x += 0.01;
  // torus.rotation.y += 0.005;
  // torus.rotation.z += 0.01;
  // mercury.rotation.x += 0.005;
  // controls.update();
  // renderer.render(scene, camera);
// }

// animate();


/////////////////////////////
// galaxy geometry
const starGeometry = new THREE.SphereGeometry(80, 64, 64);
const gtexture = new THREE.TextureLoader().load('files/galaxy1.png' ); 
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



//Sun Glow
const renderScene = new RenderPass( scene, camera );
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
Sunsphere.position.set(-70, 0, 50);
Sunsphere.scale.set(22, 22, 22);
Sunsphere.layers.set(1);
scene.add(Sunsphere);

bloomComposer.render(Sunsphere);

bloomComposer.addPass(renderScene);
bloomComposer.addPass(bloomPass);



camera.layers.set(1);
bloomComposer.render();

starMesh.layers.set(1);
Sunsphere.layers.set(1);

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
  renderer.setSize( window.innerWidth, window.innerHeight );
};

// Background
// const spaceTexture = new THREE.TextureLoader().load('files/spacee2.jpg');
// scene.background = spaceTexture;


/*Topothesies planith
kai array kai for loop*/

