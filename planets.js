import "./style.css";
import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import scene from "./main.js";
import {loadPlanet} from './main.js';

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
  
  
  
  // sunButton.addEventListener("click", loadSunModel);
  // sunButton.addEventListener("click", loadPlanet(scene, loader, allplanets[1].name, allplanets[1].position, allplanets[1].scale));

  // mercuryButton.addEventListener("click", loadPlanet1);

  // mercuryButton.addEventListener("click", () => loadPlanet(scene, loader, "Mercury", new THREE.Vector3(0, 0, 0), new THREE.Vector3(0.005, 0.005, 0.005)));
});


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


function loadSelectedPlanet(planetData) {
  if (scene.children.length > 0) {
    clearScene(); // Clear the scene if there's an existing planet
  }
    const ambientLight = new THREE.AmbientLight(0xffffff, 2);
    ambientLight.position.set(0, 0, 0);
    scene.add(ambientLight);
    loadPlanet(scene, new GLTFLoader(), planetData.name, new THREE.Vector3(0, 0, 0),  new THREE.Vector3(1, 1, 1));
}


function clearScene() {
  while (scene.children.length > 0) {
    scene.remove(scene.children[0]);
  }
}

// function loadMercuryModel() {
//   const loader = new GLTFLoader();
//   scene.remove.apply(scene, scene.children);

//   loader.load("files/Mercury.glb", function (gltf) {
//     const mercury = gltf.scene;
//     console.log("fanctionn22");
//     mercury.scale.set(0.03, 0.03, 0.03);
//     const ambientLight = new THREE.AmbientLight(0xffffff, 2);
//     ambientLight.position.set(0, 0, 0);
//     scene.add(ambientLight);

//     scene.add(mercury);
//   });

//PLanets
let allplanets = 
[ { name: "sun", position: new THREE.Vector3(0, 0, 0), scale: new THREE.Vector3(0.005, 0.005, 0.005)},
  { name: "Mercury", position: new THREE.Vector3(0, 0, 0), scale: new THREE.Vector3(0.005, 0.005, 0.005)},
  { name: "Venus", position: new THREE.Vector3(0, 0, 0), scale: new THREE.Vector3(0.005, 0.005, 0.005)},
  { name: "earth", position: new THREE.Vector3(0, 0, 0), scale: new THREE.Vector3(0.004, 0.004, 0.004) },
  { name: "Mars", position: new THREE.Vector3(0, 0, 0), scale: new THREE.Vector3(0.005, 0.005, 0.005)},
  { name: "Jupiter", position: new THREE.Vector3(0, 0, 0),scale: new THREE.Vector3(0.005, 0.005, 0.005)},
  { name: "Saturn", position: new THREE.Vector3(0, 0, 0), scale: new THREE.Vector3(0.008, 0.008, 0.008)},
  { name: "Uranus", position: new THREE.Vector3(0, 0, 0), scale: new THREE.Vector3(0.005, 0.005, 0.005)},
  { name: "Neptune", position: new THREE.Vector3(0, 0, 0), scale:new THREE.Vector3(0.0049, 0.0049, 0.0049)}
  // ,{ position: new THREE.Vector3(0, 0, 0), scale:new THREE.Vector3(0.005, 0.005, 0.005)}
];

