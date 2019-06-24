import React, { Component } from 'react';
import * as THREE from 'three';
import ArtistDetail from './ArtistDetail';


class ThreeContainer extends Component{

  componentDidMount(){
    const width = 600
    const height = this.mount.clientHeight
    //ADD SCENE
    this.scene = new THREE.Scene()
    //ADD CAMERA
    this.camera = new THREE.PerspectiveCamera(
      75,
      width / height,
      0.1,
      1000
    )
    const background = "#73b2ce";
    this.scene.fog = new THREE.Fog( background, 1, 300000 );
    this.camera.position.z = 50
    this.camera.position.y = 10;
    this.createLights();
    //ADD Material
    // Materials



    //ADD RENDERER
    this.renderer = new THREE.WebGLRenderer({ antialias: true })
    this.renderer.setClearColor('#fe439b')
    this.renderer.setSize(width, height)
    this.mount.appendChild(this.renderer.domElement)
    //ADD CUBE
    this.createGuineaPig();
   
    this.start()
  }
componentWillUnmount(){
    this.stop()
    this.mount.removeChild(this.renderer.domElement)
  }
start = () => {
    if (!this.frameId) {
      this.frameId = requestAnimationFrame(this.animate)
    }
  }
stop = () => {
    cancelAnimationFrame(this.frameId)
  }


createGuineaPig() {
  var GuineaPig = function() {
    var blackMat = new THREE.MeshPhongMaterial({
      color: 0x100707,
      shading:THREE.FlatShading,
    });
    
    var brownMat = new THREE.MeshPhongMaterial({
      color: 0xCCC09D,
      shininess:0,
      shading:THREE.FlatShading,
    });
    
    var earMat = new THREE.MeshPhongMaterial({
      color: 0x3B2811,
      shininess:0,
      shading:THREE.FlatShading,
    });
    
    var whiteMat = new THREE.MeshPhongMaterial({
      color: 0xa49789, 
      shading:THREE.FlatShading,
    });
  
    
   
  
    this.status = "running";
    this.runningCycle = 0;
    this.mesh = new THREE.Group();
    this.body = new THREE.Group();
    this.mesh.add(this.body);
    
    var torsoGeom = new THREE.CubeGeometry(10, 8, 13, 1);
    
    this.torso = new THREE.Mesh(torsoGeom, brownMat);
    this.torso.position.z = 0;
    this.torso.position.y = 7;
    this.torso.castShadow = true;
    this.body.add(this.torso);
    
    var pantsGeom = new THREE.CubeGeometry(9, 9, 5, 1);
    this.pants = new THREE.Mesh(pantsGeom, whiteMat);
    this.pants.position.z = -3;
    this.pants.position.y = 0;
    this.pants.castShadow = true;
    this.torso.add(this.pants);
    
    
    this.torso.rotation.x = -Math.PI/8;
    
    var headGeom = new THREE.CubeGeometry(6, 6, 8, 1);
    
    headGeom.applyMatrix(new THREE.Matrix4().makeTranslation(0,0,7.5));
    this.head = new THREE.Mesh(headGeom, brownMat);
    this.head.position.z = 2;
    this.head.position.y = 11;
    this.head.castShadow = true;
    this.body.add(this.head);
    
    
    var pawFGeom = new THREE.CubeGeometry(2,5,2, 1);
    this.pawFR = new THREE.Mesh(pawFGeom, earMat);
    this.pawFR.position.x = -2;
    this.pawFR.position.z = 6;
    this.pawFR.position.y = 1.5;
    this.pawFR.castShadow = true;
    this.body.add(this.pawFR);
    
    this.pawFL = this.pawFR.clone();
    this.pawFL.position.x = - this.pawFR.position.x;
    this.pawFL.castShadow = true;
    this.body.add(this.pawFL);
    
    this.pawBL = this.pawFL.clone();
    this.pawBL.position.y = 1.5;
    this.pawBL.position.z = -5;
    this.pawBL.position.x = 5;
    this.pawBL.castShadow = true;
    this.body.add(this.pawBL);
    
    this.pawBR = this.pawBL.clone();
    this.pawBR.position.x = - this.pawBL.position.x;
    this.pawBR.castShadow = true;
    this.body.add(this.pawBR);
    
    var earGeom = new THREE.CubeGeometry(1, 2, 2, 1);
    
    earGeom.vertices[4].z-=1;
    earGeom.vertices[4].y-=1;
    earGeom.vertices[1].z-=1;
    earGeom.vertices[1].y-=1;
    earGeom.applyMatrix(new THREE.Matrix4().makeTranslation(0,9,0));
    
    this.earL = new THREE.Mesh(earGeom, earMat);
    this.earL.position.x = 3;
    this.earL.position.z = 4.5;
    this.earL.position.y = -7;
    this.earL.castShadow = true;
    this.head.add(this.earL);
    
    this.earR = this.earL.clone();
    this.earR.position.x = -this.earL.position.x;
    this.earR.rotation.z = -this.earL.rotation.z;
    this.earR.castShadow = true;
    this.head.add(this.earR);
    
    var eyeGeom = new THREE.CubeGeometry(1,3,3);
    
    this.eyeL = new THREE.Mesh(eyeGeom, whiteMat);
    this.eyeL.position.x = 4;
    this.eyeL.position.z = 9;
    this.eyeL.position.y = 1.5;
    this.eyeL.castShadow = true;
    this.head.add(this.eyeL);
    
    var irisGeom = new THREE.CubeGeometry(.6,1,1);
    
    this.iris = new THREE.Mesh(irisGeom, blackMat);
    this.iris.position.x = 0.8;
    this.iris.position.y = 0.5;
    this.iris.position.z = 0.5;
    this.eyeL.add(this.iris);
    
    this.eyeR = this.eyeL.clone();
    this.eyeR.children[0].position.x = -this.iris.position.x;
    
    
    this.eyeR.position.x = -this.eyeL.position.x;
    this.head.add(this.eyeR);
  
    this.body.traverse(function(object) {
      if (object instanceof THREE.Mesh) {
        object.castShadow = true;
        object.receiveShadow = true;
      }
    });
  }
    const guineaPig = new GuineaPig();
    guineaPig.mesh.rotation.y = Math.PI/2;
    this.scene.add(guineaPig.mesh);
  }



    





createLights() {
  const globalLight = new THREE.AmbientLight(0xffffff,.9);
  const shadowLight = new THREE.DirectionalLight(0xfff6c6, 1);
  shadowLight.position.set(150, 350, 350);  
  shadowLight.castShadow = true;
  shadowLight.shadow.camera.left = -400;
  shadowLight.shadow.camera.right = 400;
  shadowLight.shadow.camera.top = 400;
  shadowLight.shadow.camera.bottom = -400;
  shadowLight.shadow.camera.near = 1;
  shadowLight.shadow.camera.far = 2000;
  shadowLight.shadow.mapSize.width = shadowLight.shadow.mapSize.height = 2048;

  this.scene.add(globalLight);
  this.scene.add(shadowLight);
  
}
animate = () => {
  //  this.mesh.position.x += 0.1
  //  this.mesh.rotation.y += this.props.sonicFeatures.energy/30;

   this.renderScene()
   this.frameId = window.requestAnimationFrame(this.animate)
 }
renderScene = () => {
  this.renderer.render(this.scene, this.camera)
}
render(){
    return(
    
      <div
        className = "threeDMonster"
        ref={(mount) => { this.mount = mount }}
      /> 
     
    )
  }
}
export default ThreeContainer;