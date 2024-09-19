import * as THREE from 'three';

import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { TransformControls } from 'three/addons/controls/TransformControls.js';

console.log('hello world');

function init() {
    // create a scene, that will hold all our elements such as objects, cameras and lights.
    const scene = new THREE.Scene();
    // create a camera, which defines where we're looking at
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 100);
    // tell the camera where to look
    camera.position.set(0, 5, 10);
    // create a render and set the size
    const sizes = {
        width: window.innerWidth,
        height: window.innerHeight,
    }
    const renderer = new THREE.WebGLRenderer();
    renderer.setSize(sizes.width, sizes.height);
    // add the output of the render function to the HTML
    document.body.appendChild(renderer.domElement);

   const geometry = new THREE.BoxGeometry( 1, 1, 1 ); 
   const material = new THREE.MeshBasicMaterial( {color: 0x00ff00} ); 
   const cube = new THREE.Mesh( geometry, material ); 
   scene.add( cube );



   const orbit = new OrbitControls( camera, renderer.domElement );
				orbit.update();
				orbit.addEventListener( 'change', render );

				const control = new TransformControls( camera, renderer.domElement );
				control.addEventListener( 'change', render );

				control.addEventListener( 'dragging-changed', function ( event ) {

					orbit.enabled = ! event.value;

				} );





    scene.add(cube);

    // function for re-rendering/animating the scene
    function tick() {
        requestAnimationFrame(tick);
        renderer.render(scene, camera);
    }
    tick();

    function render() {

        renderer.render( scene, camera );

    }
}
init();



