import * as THREE from "three";
import { Octokit } from "@octokit/rest";

import { OrbitControls } from "three/addons/controls/OrbitControls.js";
import { TransformControls } from "three/addons/controls/TransformControls.js";

function init() {
  // create a scene, that will hold all our elements such as objects, cameras and lights.
  const scene = new THREE.Scene();
  // create a camera, which defines where we're looking at
  const camera = new THREE.PerspectiveCamera(
    75,
    window.innerWidth / window.innerHeight,
    0.1,
    100
  );
  // tell the camera where to look
  camera.position.set(0, 5, 10);
  // create a render and set the size
  const sizes = {
    width: window.innerWidth,
    height: window.innerHeight,
  };
  const renderer = new THREE.WebGLRenderer();
  renderer.setSize(sizes.width, sizes.height);
  // add the output of the render function to the HTML
  document.body.appendChild(renderer.domElement);

  const geometry = new THREE.BoxGeometry(1, 1, 1);
  const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
  const cube = new THREE.Mesh(geometry, material);
  scene.add(cube);

  const orbit = new OrbitControls(camera, renderer.domElement);
  orbit.update();
  orbit.addEventListener("change", render);

  const control = new TransformControls(camera, renderer.domElement);
  control.addEventListener("change", render);

  control.addEventListener("dragging-changed", function (event) {
    orbit.enabled = !event.value;
  });

  scene.add(cube);

  // function for re-rendering/animating the scene
  function tick() {
    requestAnimationFrame(tick);
    renderer.render(scene, camera);
  }
  tick();

  function render() {
    renderer.render(scene, camera);
  }
}
init();

const octokit = new Octokit({});
// async function logInfo() {
//   const req = await octokit.request("GET /repos/kolyaVol/music-app");
//   console.log(req);
// }
// logInfo();

const owner = "kolyaVol";
const repo = "music-app";

async function getCommitHistory() {
  try {
    // Fetch the commits using the "repos.listCommits" endpoint
    const { data: commits } = await octokit.repos.listCommits({
      owner,
      repo,
    });
    console.log(commits);

    // Print the commit details
    // commits.forEach((commit) => {
    //   console.log(commit);
    //   //   console.log(`Commit SHA: ${commit.sha}`);
    //   //   console.log(`Author: ${commit.author?.login}`);
    //   //   console.log(`Message: ${commit.commit.message}`);
    //   console.log("-----");
    // });
  } catch (error) {
    console.error("Error fetching commit history:", error);
  }
}

// Call the function to get the commit history
getCommitHistory();
