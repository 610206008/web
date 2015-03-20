var camera, scene, renderer, sun, earth,
    clock, control;

var texture;
var material, sceneBack, cameraBack;
var earthRevolution = 0,
    earthRotate = 0,
    moonRotate = 0;
	
var keyboard = new KeyboardState();
var backgroundsound;
var stateM = 1, stateT = 1;

init();
animate();

function init() {
	backgroundsound = document.getElementById ('backgroundsound');
	backgroundsound.volume = THREE.Math.clamp (10.0, 0, 1);
    /////////////////////////////////////////////
    sceneBack = new THREE.Scene();
    cameraBack = new THREE.OrthographicCamera(-10, 10, 10, -10, 1, 100);
    cameraBack.position.z = 5;
    cameraBack.lookAt(new THREE.Vector3(0, 0, 0));

    THREE.ImageUtils.crossOrigin = '';
    texture = THREE.ImageUtils.loadTexture('http://610206008.github.io/web/hw1/images/sky.jpg');

    var back = new THREE.Mesh(new THREE.PlaneGeometry(20, 20),
    new THREE.MeshBasicMaterial({
        map: texture,
        transparent: true,
        opacity: 1
    }));
    back.material.depthTest = false;
    back.material.depthWrite = false;
    sceneBack.add(back);

    ////////////////////////////////////////////////    

    clock = new THREE.Clock();
    scene = new THREE.Scene();

    camera = new THREE.PerspectiveCamera(50, window.innerWidth / window.innerHeight, 1, 1000);
    //camera.position.y = 250;
    camera.position.x = 150;  camera.position.y = 85; camera.position.z = 10;//show
    scene.add(camera);

    THREE.ImageUtils.crossOrigin = '';
    texture = THREE.ImageUtils.loadTexture('http://610206008.github.io/web/hw1/images/sun2.jpg');

    sun = new THREE.Mesh(new THREE.SphereGeometry(20, 20, 20),
    new THREE.MeshBasicMaterial({
        //wireframe: true,
        map: texture,
        transparent: true,
        opacity: 1
    }));
    sun.material.depthTest = false;
    sun.material.depthWrite = false;

    THREE.ImageUtils.crossOrigin = '';
    texture = THREE.ImageUtils.loadTexture('http://610206008.github.io/web/hw1/images/earth2.jpg');
    earth = new THREE.Mesh(new THREE.SphereGeometry(10, 20, 20),
    new THREE.MeshBasicMaterial({
        //wireframe: true
        map: texture,
        transparent: true,
        opacity: 1
    }));

    THREE.ImageUtils.crossOrigin = '';
    texture = THREE.ImageUtils.loadTexture('http://610206008.github.io/web/hw1/images/moon.jpg');
    moon = new THREE.Mesh(new THREE.SphereGeometry(3, 20, 20),
    new THREE.MeshBasicMaterial({
        //wireframe: true
        map: texture,
        transparent: true,
        opacity: 1
    }));
    earth.add(moon);
    sun.add(earth);
    scene.add(sun);

    //var gridXZ = new THREE.GridHelper(100, 10);
    //gridXZ.setColors(new THREE.Color(0xff0000), new THREE.Color(0xffffff));
    //scene.add(gridXZ);

    light = new THREE.PointLight(0xffffff);
    light.position.set(100, 300, 200);
    scene.add(light);

    renderer = new THREE.WebGLRenderer();
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setClearColor(0x888888);
    renderer.autoClear = false;

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
	keyboard.update();
	if ( keyboard.down("T"))  // yes, must use UPPER CASE
		stateT ^= 1;
	if(keyboard.down("M")){
		stateM ^= 1;
		if(stateM == 0)
			backgroundsound.volume = THREE.Math.clamp (0.0, 0, 1);
		else
			backgroundsound.volume = THREE.Math.clamp (10.0, 0, 1);
	
	
	}
	
    control.update();
    requestAnimationFrame(animate);
    render();
}

function render() {
    var tmp = 10;
    //angle = clock.getElapsedTime();
	if(stateT == 1){
		earthRevolution += (0.0167 / tmp); //地球公轉
		earthRotate += (6 / tmp); //地球自轉
		moonRotate += (0.2 / tmp); //月球自轉及公轉
	}

    earth.position.set(80 * Math.cos(earthRevolution), 0, -80 * Math.sin(earthRevolution));
    earth.rotation.y = earthRotate;

    moon.position.set(20 * Math.cos(moonRotate - earthRotate), 0, -20 * Math.sin(moonRotate - earthRotate));
    moon.rotation.y = moonRotate- earthRotate;

    renderer.clear();
    renderer.render(sceneBack, cameraBack);
    renderer.render(scene, camera);


}