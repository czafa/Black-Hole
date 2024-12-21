// Código com ajustes na iluminação e material do disco
// Inclui também a modificação na animação para ajudar na visualização do disco

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.set(0, 5, 10);
camera.lookAt(new THREE.Vector3(0, 0, 0));

const canvas = document.createElement('canvas');
const context = canvas.getContext('webgl2', { alpha: false });
const renderer = new THREE.WebGLRenderer({ canvas: canvas, context: context });
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

const blackHoleGeometry = new THREE.SphereGeometry(1, 32, 32);
const blackHoleMaterial = new THREE.MeshBasicMaterial({ color: 0xff0000 });
const blackHole = new THREE.Mesh(blackHoleGeometry, blackHoleMaterial);
scene.add(blackHole);

const accretionDiskGeometry = new THREE.RingGeometry(1.5, 3, 64);
const accretionDiskMaterial = new THREE.MeshBasicMaterial({ color: 0xffd700, side: THREE.DoubleSide, opacity: 0.75, transparent: true });
const accretionDisk = new THREE.Mesh(accretionDiskGeometry, accretionDiskMaterial);
accretionDisk.rotation.x = Math.PI / 2;
scene.add(accretionDisk);

const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
scene.add(ambientLight);
const directionalLight = new THREE.DirectionalLight(0xffffff, 1.5);
directionalLight.position.set(0, 10, 10);
scene.add(directionalLight);

function addStars() {
    const starsGeometry = new THREE.Geometry();
    for (let i = 0; i < 1000; i++) {
        const star = new THREE.Vector3();
        star.x = THREE.Math.randFloatSpread(2000);
        star.y = THREE.Math.randFloatSpread(2000);
        star.z = THREE.Math.randFloatSpread(2000);
        starsGeometry.vertices.push(star);
    }
    const starsMaterial = new THREE.PointsMaterial({ color: 0x888888 });
    const starField = new THREE.Points(starsGeometry, starsMaterial);
    scene.add(starField);
}
addStars();

function animate() {
    requestAnimationFrame(animate);
    accretionDisk.rotation.x += 0.01;  // Ajusta a rotação do disco
    renderer.render(scene, camera);
}

animate();
