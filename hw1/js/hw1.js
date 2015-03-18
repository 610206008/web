var camera, scene, renderer, sun, earth, angle = 0,
    clock, control;
var texture;
init();
animate();

function init() {
    clock = new THREE.Clock();
    scene = new THREE.Scene();

    camera = new THREE.PerspectiveCamera(50, window.innerWidth / window.innerHeight, 1, 1000);
    camera.position.z = 500;
    scene.add(camera);

    sun = new THREE.Mesh(new THREE.SphereGeometry(20),
    new THREE.MeshBasicMaterial({
        wireframe: true
    }));

	 THREE.ImageUtils.crossOrigin = '';
	var texture = THREE.ImageUtils.loadTexture('http://jyunming-chen.github.io/tutsplus/images/chia.jpg');
	
    earth = new THREE.Mesh(new THREE.SphereGeometry(10),
    new THREE.MeshBasicMaterial({
        
		bumpMap : texture,
		transparent: true,
        opacity: 1
    }));
	 earth.material.depthTest = false;
    earth.material.depthWrite = false;
	
    moon = new THREE.Mesh(new THREE.SphereGeometry(3),
    new THREE.MeshBasicMaterial({
        wireframe: true
    }));
    earth.add(moon);
    sun.add(earth);
    scene.add(sun);

    var gridXZ = new THREE.GridHelper(100, 10);
    gridXZ.setColors(new THREE.Color(0xff0000), new THREE.Color(0xffffff));
    scene.add(gridXZ);

    light = new THREE.PointLight(0xffffff);
    light.position.set(100, 300, 200);
    scene.add(light);

    renderer = new THREE.WebGLRenderer();
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setClearColor(0x888888);

    control = new THREE.OrbitControls(camera, renderer.domElement);
    document.body.appendChild(renderer.domElement);
    window.addEventListener('resize', onWindowResize, false);
	
	
	
}

function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
}

function animate() {
    control.update();
    requestAnimationFrame(animate);
    render();
}

function render() {
    angle = clock.getElapsedTime();

    earth.position.set(80 * Math.cos(angle), 0, -80 * Math.sin(angle));
    earth.rotation.y = angle;

    angle2 = angle * 2;
    moon.position.set(20 * Math.cos(angle2), 0, -20 * Math.sin(angle2));
    moon.rotation.y = angle2;

    renderer.render(scene, camera);
}