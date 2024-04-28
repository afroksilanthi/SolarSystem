import "./style.css";
import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import scene from "./main.js";
import {loadPlanet, controls} from './main.js';

document.addEventListener("DOMContentLoaded", function () {
  const sunButton = document.getElementById("Sun");
  const mercuryButton = document.getElementById("Mercury");
  const venusButton = document.getElementById("Venus");

  const earthButton = document.getElementById('Earth');
  const marsButton = document.getElementById('Mars');
  const jupiButton = document.getElementById('Jupiter');
  const saturnButton = document.getElementById('Saturn');
  const uranusButton = document.getElementById('Uranus');
  const neptButton = document.getElementById('Neptune');

  sunButton.addEventListener("click", () => loadSelectedPlanet(allplanets[0])); 
  mercuryButton.addEventListener("click", () => loadSelectedPlanet(allplanets[1])); 
  venusButton.addEventListener("click", () => loadSelectedPlanet(allplanets[2])); 
  earthButton.addEventListener("click", () => loadSelectedPlanet(allplanets[3])); 
  marsButton.addEventListener("click", () => loadSelectedPlanet(allplanets[4])); 
  jupiButton.addEventListener("click", () => loadSelectedPlanet(allplanets[5])); 
  saturnButton.addEventListener("click", () => loadSelectedPlanet(allplanets[6])); 
  uranusButton.addEventListener("click", () => loadSelectedPlanet(allplanets[7])); 
  neptButton.addEventListener("click", () => loadSelectedPlanet(allplanets[8])); 

});

function loadSelectedPlanet(planetData) {
  if (scene.children.length > 0) {
    clearScene(); // Clear the scene if there's an existing planet
  }
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
    ambientLight.position.set(0, 0, 0);
    scene.add(ambientLight);
    loadPlanet(scene, new GLTFLoader(), planetData.name, new THREE.Vector3(0, 0, 0),  planetData.scale);
    controls.enableZoom = false;
}   


function clearScene() {
  while (scene.children.length > 0) {
    scene.remove(scene.children[0]);
  }
}


//PLanets
let allplanets = 
[ { name: "sun", position: new THREE.Vector3(0, 0, 0), scale: new THREE.Vector3(2.5, 2.5, 2.5)},
  { name: "Mercury", position: new THREE.Vector3(0, 0, 0), scale: new THREE.Vector3(0.05, 0.05, 0.05)},
  { name: "Venus", position: new THREE.Vector3(0, 0, 0), scale: new THREE.Vector3(0.05, 0.05, 0.05)},
  { name: "earth", position: new THREE.Vector3(0, 0, 0), scale: new THREE.Vector3(0.05, 0.05, 0.05) },
  { name: "Mars", position: new THREE.Vector3(0, 0, 0), scale: new THREE.Vector3(0.05, 0.05, 0.05)},
  { name: "Jupiter", position: new THREE.Vector3(0, 0, 0),scale: new THREE.Vector3(0.05, 0.05, 0.05)},
  { name: "Saturn", position: new THREE.Vector3(0, 0, 0), scale: new THREE.Vector3(0.05, 0.05, 0.05)},
  { name: "Uranus", position: new THREE.Vector3(0, 0, 0), scale: new THREE.Vector3(0.05, 0.05, 0.05)},
  { name: "Neptune", position: new THREE.Vector3(0, 0, 0), scale:new THREE.Vector3(0.05, 0.05, 0.05)}
];

// Function to navigate to home page
function goToHomePage() {
  window.location.href = "/";
}

// Add event listener to home button
document.getElementById("homeButton").addEventListener("click", goToHomePage);

// Check if it's not the home page, then show the button
if (window.location.pathname !== '/') {
    document.getElementById("homeButton").style.visibility = 'visible';
} else {
    document.getElementById("homeButton").style.visibility = 'hidden';
}



// function loadSunModel() {
//   const loader = new GLTFLoader();
//   // scene.remove.apply(scene, scene.children);
//   clearScene();

//   loader.load("files/sun.glb", function (gltf) {
//     const sun = gltf.scene;
//     console.log("function");
//     const ambientLight = new THREE.AmbientLight(0xffffff, 2);
//     ambientLight.position.set(0, 0, 0);
//     scene.add(ambientLight);
//     scene.add(sun);
//   });
// }
