import './style.css'
import * as THREE from 'three'
import { FontLoader } from 'three/examples/jsm/loaders/FontLoader'
import { TextGeometry } from 'three/examples/jsm/geometries/TextGeometry'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import DroidSans from 'three/examples/fonts/droid/droid_sans_bold.typeface.json'

const sizes = {
  width: window.innerWidth,
  height: window.innerHeight,
}

const renderer = new THREE.WebGLRenderer({ antialias: true })
renderer.setSize(sizes.width, sizes.height)
document.body.appendChild(renderer.domElement)
renderer.domElement.setAttribute('class', 'webgl')

const camera = new THREE.PerspectiveCamera(
  45,
  sizes.width / sizes.height,
  1,
  500
)
camera.position.set(0, 2, 10)

const scene = new THREE.Scene()

const textureLoader = new THREE.TextureLoader()
const matcapTexture = textureLoader.load('/textures/lime.png')

const fontLoader = new FontLoader()
const textGeometry = new TextGeometry('Create ThreeJS Proj', {
  font: fontLoader.parse(DroidSans),
  size: 1,
  height: 0.2,
  curveSegments: 5,
  bevelEnabled: true,
  bevelThickness: 0.03,
  bevelSize: 0.02,
  bevelOffset: 0,
  bevelSegments: 4,
})
textGeometry.computeBoundingBox()
textGeometry.center()

const material = new THREE.MeshMatcapMaterial({ matcap: matcapTexture })

const text = new THREE.Mesh(textGeometry, material)
scene.add(text)

window.addEventListener('resize', () => {
  sizes.width = window.innerWidth
  sizes.height = window.innerHeight

  camera.aspect = sizes.width / sizes.height
  camera.updateProjectionMatrix()

  renderer.setSize(sizes.width, sizes.height)
})

const controls = new OrbitControls(camera, renderer.domElement)
controls.enableDamping = true

function animate() {
  requestAnimationFrame(animate)

  renderer.render(scene, camera)
}
animate()
