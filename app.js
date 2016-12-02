var example=(function() {
	"use strict";

    Physijs.scripts.worker = 'physijs_worker.js';
    Physijs.scripts.ammo = 'ammo.js';

	var scene=new Physijs.Scene(),
	renderer= window.WebGLRenderingContext?new THREE.WebGLRenderer():new THREE.CanvasRenderer,
	light=new THREE.AmbientLight(0xffffff),
	camera,
	box,
	stats,
	plane,
	cameraHelper,
	effect,
	orbitControls,
	ground;


	function initScene() {
		scene.setGravity(new THREE.Vector3(0, -50, -10));

		renderer.setSize(window.innerWidth,window.innerHeight);
		//renderer.shadowMap.enabled=true;
		/*
		effect=new THREE.AnaglyphEffect(renderer);
		effect.setSize(window.innerWidth,window.innerHeight)*/
		document.querySelector("#webgl-container").appendChild(renderer.domElement);
		scene.add(light);
		camera=new THREE.PerspectiveCamera(35,window.innerWidth/window.innerHeight,1,1000);
        camera.position.set(60, 50, 60);
        camera.lookAt(scene.position);
		scene.add(camera);


		//orbitControls= new THREE.OrbitControls(camera);
		//orbitControls.addEventListener("change",render);

		/*		plane=new THREE.Mesh(new THREE.PlaneGeometry(200,200),new THREE.MeshPhongMaterial({map:THREE.ImageUtils.loadTexture("gt.jpg"),specular:0x003344,shininess:100,shading:THREE.FlatShading,side:THREE.DoubleSide}));
 		plane.rotation.x=90*(Math.PI/180);
		plane.position.y=-10;
		plane.name="plane";
		plane.receiveShadow=true;
		scene.add(plane);*/


	/*	light=new THREE.DirectionalLight(new THREE.Color("#ffffff"));
		light.position.set(0,50,0);
		light.castShadow=true;*/
		//light.DirectionalLightShadow=new THREE.DirectionalLightShadow(camera);
		/*light.shadow.mapSize.width=2048;
		light.shadow.mapSize.height=2048;*/

		//cameraHelper=new THREE.CameraHelper(light.shadow.camera);
		//scene.add(cameraHelper);

		//scene.add(light);
		/*box=new THREE.Mesh(new THREE.BoxGeometry(20,20,20),new THREE.MeshLambertMaterial({color:0xffffff}));*/

		//create new material
		var boxMaterial=new Physijs.createMaterial(new THREE.MeshLambertMaterial({map:THREE.ImageUtils.loadTexture("tx.jpg")}),
		0.8,//friction
		1//restitution/bounciness
		);
		/*box=new THREE.Mesh(new THREE.BoxGeometry(20,20,20),boxMaterial);
		box.name="box";
		box.position.y=10;
		box.castShadow=true;
		scene.add(box);*/

		box=new Physijs.BoxMesh(new THREE.CubeGeometry(20,20,20),boxMaterial);
		box.position.y=40;
		box.rotation.z=90;
		box.rotation.y=50;
		box.name="box";
		//attaching handler if the box collides with something.
		box.addEventListener("collision", function(
		    otherObject,
		    relativeVelocity,
		    relativeRotation,
		    contactNormal) {
		    if (otherObject.name == "ground") {
		       console.log(" object hit ground");
		    }

		});
		scene.add(box);
		var groundMaterial=new Physijs.createMaterial(new THREE.MeshLambertMaterial({map:THREE.ImageUtils.loadTexture("gt.jpg")}),
			0.8,//friction
			0.5//restitution/bounciness
			);

		ground=new Physijs.BoxMesh(new THREE.CubeGeometry(150,5,150),
			groundMaterial,
			0)//mass;
		ground.position.y=-25;
		ground.name="ground";
		scene.add(ground);

		//show stats on the side of the page.
		stats=new Stats();
		stats.setMode(0);
		stats.domElement.style.position="absolute";
		stats.domElement.style.left="0px";
		stats.domElement.style.top="0px";
		document.body.appendChild(stats.domElement);
		render();
		
	}

	function render(){
		//box.rotation.x+=0.01;
		//box.rotation.y+=0.01;
		//box.position.z+=10;
		scene.simulate();
		//effect.render(scene,camera);
		renderer.render(scene,camera);
		
		requestAnimationFrame(render);
		stats.update();
	};
/*	function checkKey(e) {

	    var left = 37,
	        up = 38,
	        right = 39,
	        down = 40,
	        increment = 1;

	    e = e || window.event;

	    if (e.keyCode == up) {
	        camera.position.z -= increment;
	    } else if (e.keyCode == down) {
	        camera.position.z += increment;
	    } else if (e.keyCode == left) {
	        camera.position.x -= increment;
	    } else if (e.keyCode == right) {
	        camera.position.x += increment;
	    }
	}*/

	//window.onkeydown = checkKey;
	window.onload=initScene;

	return { scene:scene};
})();