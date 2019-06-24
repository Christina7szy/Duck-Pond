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
    //ADD RENDERER
    this.renderer = new THREE.WebGLRenderer({ antialias: true })
    this.renderer.setClearColor('#fe439b')
    this.renderer.setSize(width, height)
    this.mount.appendChild(this.renderer.domElement)
    //ADD CUBE
    this.createCube();
    this.createTestGeometry();
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

// Cube = function(){
//     this.mesh = new THREE.Group();

//     const size = 0.5;
//     // const size = this.props.sonicFeatures.energy;
//     const geomotry = new THREE.BoxGeometry(size,size,size);
//     const material = new THREE.MeshPhongMaterial({ color: '#7abf8e', shininess:0,shading:THREE.FlatShading})
//     this.cube = new THREE.Mesh(geomotry, material);
//     this.mesh.add(this.cube);
//   }
 


createCube(){
    
    const size = this.props.sonicFeatures.energy;
    const number = Math.floor(this.props.sonicFeatures.energy * 100)
    const geomotry = new THREE.BoxGeometry(size,size,size);
    const red = Math.floor(Math.floor(Math.abs(255 - Math.floor(this.props.sonicFeatures.acousticness*1000)))/2);
    const green =Math.floor(this.props.sonicFeatures.danceability*100);
    const blue = Math.floor(this.props.sonicFeatures.danceability*350);
    console.log(red,green,blue);
    const material = new THREE.MeshPhongMaterial({ color: 'rgb('+ red +','+ green + ',' +blue+')', shininess:0,shading:THREE.FlatShading})
    this.mesh = new THREE.Group();
    // this.cube =  new THREE.Mesh(geomotry, material)
    for (var i =0; i < number; i++){
      var cube2 = new THREE.Mesh(geomotry, material);
      cube2.position.x = Math.random() *i *Math.pow(-1,i) ;
			cube2.position.y = Math.random() *i ;
			cube2.position.z = Math.random() *i *Math.pow(-1,i) ;
			cube2.rotation.x = Math.random() * 2 * Math.PI;
      cube2.rotation.y = Math.random() * 2 * Math.PI;
      this.mesh.add(cube2);
    }

    // this.mesh.add(this.cube);
  
    this.scene.add(this.mesh);
  }
    

createTestGeometry(){
  const material = new THREE.MeshPhongMaterial({ color: 'rgb(0,40,200)', shininess:0,shading:THREE.FlatShading})
  const geometry = new THREE.Geometry();
  const planeSize = 5;

 for (var i = 0; i < 20; i ++) 
{ 
  var vertex = new THREE.Vector3();
  vertex.x = Math.random()*planeSize-(planeSize*.5);
  vertex.y = Math.random()*100000;
  vertex.z = Math.random()*planeSize-(planeSize*.5);
  geometry.vertices.push( vertex );
}
 var test = new THREE.Mesh(geometry,material);
 this.scene.add(test);
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
   this.mesh.rotation.y += this.props.sonicFeatures.energy/30;

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