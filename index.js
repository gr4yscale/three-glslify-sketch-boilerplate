var domReady = require('domready');
var THREE = require('three/three.min');
var dat = require('dat-gui');

domReady(function(){

  var params = {
    speed: 1000
  };

  var OrbitViewer = require('three-orbit-viewer')(THREE);

  var app = OrbitViewer({
    clearColor: 'rgb(50,50,50)',
    clearAlpha: 1.0,
    fov: 65,
    contextAttributes: {
      antialias: true,
      alpha: false
    }
  });

  var datgui = new dat.GUI();

  var light = new THREE.DirectionalLight(0xFFFFFF, 1.0);
  light.position.set(10, 20, -20);
  app.scene.add(light);

  var geom = new THREE.BoxGeometry(1,1,1);
  var material = new THREE.MeshLambertMaterial({color: 0x11CCFF});
  var cube = new THREE.Mesh(geom, material);

  cube.castShadow=true;

  app.scene.add(cube);

  var tickCounter = 0;
  app.on('tick', function(time) {
    tickCounter += (time / params.speed);
    cube.rotation.y = Math.sin(tickCounter) * 4.0;
  });

  datgui.add(params, "speed", 10, 2000);

});
