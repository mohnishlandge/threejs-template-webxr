import './style/main.css'
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import { Reflector } from 'three/examples/jsm/objects/Reflector.js'
/**
 * GUI Controls
 */
import * as dat from 'dat.gui'
const gui = new dat.GUI()

/**
 * Base
 */
// Canvas
const canvas = document.querySelector('canvas.webgl')

// Scene
const scene = new THREE.Scene()

/**
 * Object
 */

const torusGeometry = new THREE.TorusKnotGeometry(0.5, 0.2, 150, 20, 2, 3)
const torusMaterial = new THREE.MeshNormalMaterial({
  roughness: 0.01,
  metalness: 0.2,
})
const torus = new THREE.Mesh(torusGeometry, torusMaterial)
torus.name = 'torus'
torus.position.y = -0.5
torus.position.z = -2
torus.castShadow = true
torus.receiveShadow = true
scene.add(torus)

const cylinderGeometry = new THREE.CylinderGeometry(2, 2, 0.1, 50)
const cylinderMaterial = new THREE.MeshNormalMaterial({
  roughness: 0.5,
  metalness: 0.9,
})
const cylinder = new THREE.Mesh(cylinderGeometry, cylinderMaterial)
cylinder.position.z = -2
cylinder.position.y = -1.5
cylinder.castShadow = true
cylinder.receiveShadow = true
scene.add(cylinder)

const light1 = new THREE.DirectionalLight(0x8800ff)
light1.position.set(-1, 1.5, -1.5)
light1.castShadow = true
light1.shadow.camera.zoom = 4
scene.add(light1)
light1.target.position.set(0, 0, -2)
scene.add(light1.target)

// const helper1 = new THREE.CameraHelper( light.shadow.camera );
// scene.add( helper1 );

const light2 = new THREE.DirectionalLight(0xff0000)
light2.position.set(1, 1.5, -2.5)
light2.castShadow = true
light2.shadow.camera.zoom = 4
scene.add(light2)
light2.target.position.set(0, 0, -2)
scene.add(light2.target)

const reflector = new Reflector(new THREE.PlaneGeometry(4, 4), {
  textureWidth: window.innerWidth * window.devicePixelRatio,
  textureHeight: window.innerHeight * window.devicePixelRatio,
})
reflector.position.x = 0
reflector.position.y = -0.5
reflector.position.z = -3
reflector.rotation.y = -Math.PI / 4
scene.add(reflector)

const frameGeometry = new THREE.BoxGeometry(4.1, 4.1, 0.1)
const frameMaterial = new THREE.MeshNormalMaterial()
const frame = new THREE.Mesh(frameGeometry, frameMaterial)
frame.position.z = -0.07
frame.castShadow = true
frame.receiveShadow = true
reflector.add(frame)

//

/**
 * Sizes
 */
const sizes = {
  width: window.innerWidth,
  height: window.innerHeight,
}

window.addEventListener('resize', () => {
  // Update sizes
  sizes.width = window.innerWidth
  sizes.height = window.innerHeight

  // Update camera
  camera.aspect = sizes.width / sizes.height
  camera.updateProjectionMatrix()

  // Update renderer
  renderer.setSize(sizes.width, sizes.height)
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
})

/**
 * Camera
 */
// Base camera
const camera = new THREE.PerspectiveCamera(
  75,
  sizes.width / sizes.height,
  0.001,
  5000
)
camera.position.x = 1
camera.position.y = 10
camera.position.z = 50
scene.add(camera)

// Controls
const controls = new OrbitControls(camera, canvas)
controls.enableDamping = true
//controls.autoRotate = true
// controls.enableZoom = false
controls.enablePan = false
controls.dampingFactor = 0.05
controls.maxDistance = 1
controls.touches = {
  ONE: THREE.TOUCH.ROTATE,
  TWO: THREE.TOUCH.DOLLY_PAN,
}
/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({
  canvas: canvas,
  antialias: true,
})
renderer.setSize(sizes.width, sizes.height)
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))

/**
 * Animate
 */
const clock = new THREE.Clock()
const tick = () => {
  const elapsedTime = clock.getElapsedTime()

  //mesh.rotation.y += 0.01 * Math.sin(1)
  torus.rotation.x = time * 2
  torus.rotation.y = time * 5
  // Update controls
  controls.update()
  // Render
  renderer.render(scene, camera)

  // Call tick again on the next frame
  window.requestAnimationFrame(tick)
}

tick()
