import "./style.css";
import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import scene from "./main.js";
// import directionalLight  from './main.js';

document.addEventListener("DOMContentLoaded", function () {
  const sunButton = document.getElementById("Sun");
  const mercuryButton = document.getElementById("Mercury");
  // const venusButton = document.getElementById('Venus');

  sunButton.addEventListener("click", loadSunModel);
  mercuryButton.addEventListener("click", loadMercuryModel);
  // venusButton.addEventListener('click', loadVenusModel);
});

//wait for models
function loadSunModel() {
  const loader = new GLTFLoader();
  // Code to clear the scene (if needed)
  console.log(scene.children.length);
  scene.remove.apply(scene, scene.children);

  // Code to load the Sun model using your GLTFLoader
  loader.load("files/sun.glb", function (gltf) {
    const sun = gltf.scene;
    console.log("fanctionn");
    const ambientLight = new THREE.AmbientLight(0xffffff, 2);
    ambientLight.position.set(0, 0, 0);
    scene.add(ambientLight);
    scene.add(sun);
  });
}

function loadMercuryModel() {
  const loader = new GLTFLoader();
  scene.remove.apply(scene, scene.children);

  loader.load("files/Mercury.glb", function (gltf) {
    const mercury = gltf.scene;
    console.log("fanctionn22");
    mercury.scale.set(0.03, 0.03, 0.03);
    const ambientLight = new THREE.AmbientLight(0xffffff, 2);
    ambientLight.position.set(0, 0, 0);
    scene.add(ambientLight);

    scene.add(mercury);
  });
}
