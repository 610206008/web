var renderer, geometry, material, mesh, light, controls;
var teapot;
var sceneBack, cameraBack, scene, camera;

init();
animate();

function init() {
    /////////////////////////////////////////////
    sceneBack = new THREE.Scene();
    cameraBack = new THREE.OrthographicCamera(-10, 10, 10, -10, 1, 100);
    cameraBack.position.z = 5;
    cameraBack.lookAt(new THREE.Vector3(0, 0, 0));

    THREE.ImageUtils.crossOrigin = '';
    var texture = THREE.ImageUtils.loadTexture('http://jyunming-chen.github.io/tutsplus/images/chia.jpg');

    var back = new THREE.Mesh(new THREE.PlaneGeometry(20, 20),
    new THREE.MeshBasicMaterial({
        map: texture,
        transparent: true,
        opacity: 0.315
    }));
    back.material.depthTest = false;
    back.material.depthWrite = false;
    sceneBack.add(back);

    ////////////////////////////////////////////////    
    scene = new THREE.Scene();

    camera = new THREE.PerspectiveCamera(50, window.innerWidth / window.innerHeight, 1, 1000);
    camera.position.z = 150;
    camera.lookAt(new THREE.Vector3(0, 0, 0));
    scene.add(camera);


    THREE.ImageUtils.crossOrigin = '';
    var texture = THREE.ImageUtils.loadTexture('http://jyunming-chen.github.io/tutsplus/images/wood_oak_002_bump.jpg');

    teapot = new THREE.Mesh(new THREE.TorusKnotGeometry(20, 8),
    new THREE.MeshPhongMaterial({
        color: 0x12ff43,
        bumpMap: texture,
        bumpScale: 0.32
    }));
    scene.add(teapot);

    light = new THREE.PointLight(0xffffff);
    light.position.set(100, 300, 200);
    scene.add(light);

    renderer = new THREE.WebGLRenderer();
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setClearColor(0xf6c4df);

    renderer.autoClear = false;

    controls = new THREE.OrbitControls(camera, renderer.domElement);

    document.body.appendChild(renderer.domElement);

}


function animate() {
    controls.update();
    requestAnimationFrame(animate);
    render();
}

function render() {
    renderer.clear();
    renderer.render(sceneBack, cameraBack);
    renderer.render(scene, camera);
}