import React, { useState, useEffect } from "react";
import { Canvas, useThree } from "@react-three/fiber";
import * as THREE from 'three'; // Import THREE for geometry
import { OrbitControls, OrthographicCamera, Text } from "@react-three/drei"; // Import OrthographicCamera
import serverData from './data_center_servers.json';
import Slider from "./Slider";

const Server = ({ width, height, depth, x, y, z, color, label,showLabel, onClick, opacity, highlightStatus, showEdges }) => {

  return (
    <>
      <mesh position={[x, y, z]} onClick={onClick}>
        <boxGeometry args={[width, height, depth]} />
        <meshStandardMaterial color={color}  transparent={true} opacity={opacity} />
      </mesh>

      {showEdges &&
        <lineSegments position={[x, y, z]}>
        <edgesGeometry args={[new THREE.BoxGeometry(width, height, depth)]} />
        <lineBasicMaterial color="lightgray" linewidth={1} /> {/* Light gray border */}
        </lineSegments>
      }
      

      {showLabel && <Text
        position={[x, y, z]} // Position label above the block
        fontSize={4} // Adjust font size
        color="white" // Label color
        anchorX="center" // Horizontal alignment
        anchorY="middle" // Vertical alignment
      >
        {label}
      </Text>
      }
    </>
  );
};

const Floor = ({ width, height, depth, x, y, z, color, label, onClick, opacity }) => {
  return (
    <>
      <mesh position={[x, y, z]} onClick={onClick}>
        <boxGeometry args={[width, height, depth]} />
        <meshStandardMaterial color={color}  transparent={true} opacity={opacity} />
      </mesh>
    </>
  );
};



const Scene = ({servers, setSelectedServer, opacity, highlightStatus, maxDimensions, showLabel, showEdges }) => {
  console.log(servers)
  return (
    <>
      {servers.map((server, index) => (
        <Server
          id={server.id}
          key={index}
          width={server.width}
          height={server.height}
          depth={server.depth}
          x={server.x}
          y={server.y}
          z={server.z}
          color={highlightStatus? server.status_color : "gray"}
          label={server.model}
          showLabel={showLabel}
          onClick={() => setSelectedServer(server)}
          opacity = {opacity}
          showEdges = {showEdges}
        />
      ))}
    </>
  );
};

const CameraController = ({ cameraX, cameraY, cameraZ, fov}) => {
  
  const { camera, gl } = useThree();

  useEffect(() => {
      // Perspective camera properties for regular 3D view
      camera.position.set(cameraX, cameraY, cameraZ);
      camera.fov = fov;
      camera.updateProjectionMatrix();
  }, [cameraX, cameraY, cameraZ, fov, camera]);

  return null; // No need to render anything
};

const View = ({ setSelectedServer, selectedRoom }) => {

  const [servers, setServers] = useState([])

  const [maxX, setMaxX] = useState(0)
  const [maxY, setMaxY] = useState(0)
  const [maxZ, setMaxZ] = useState(0)

  const getServers = ()=>{
    console.log(selectedRoom)
    if(selectedRoom !=null && selectedRoom !=""){
      let servers = serverData.filter(i=>i.room_name === selectedRoom)
      let maxX = Math.max(...servers.map((server) => server.x))
      let maxY = Math.max(...servers.map((server) => server.y))
      let maxZ = Math.max(...servers.map((server) => server.z))

      setViewType("3D")
      setEnableRotate(true)
      setCameraX(maxX * 2);
      setCameraY(maxY * 3.5);
      setCameraZ(maxZ * 2.75);
      setFov(25); // Reset FOV

      setServers(servers)
      setMaxX(maxX)
      setMaxY(maxY)
      setMaxZ(maxY)
    }
  }

  useEffect(()=>{
    getServers()
  },[selectedRoom])



  const maxDimensions = {x: maxX, y: maxY, z: maxZ}

  const [fov, setFov] = useState(25); // Default field of view (FOV)
  const [cameraX, setCameraX] = useState(maxX * 2);
  const [cameraY, setCameraY] = useState(maxY * 3);
  const [cameraZ, setCameraZ] = useState(maxZ * 2.5);
  const [viewType, setViewType] = useState("3D")
  const [highlightStatus, setHighlightStatus] = useState(true); 
  const [opacity, setOpacity] = useState(0.6)
  const [showEdges, setShowEdges] = useState(true)

  const [enableZoom, setEnableZoom] = useState(0.5)
  const [zoomSpeed, setZoomSpeed] = useState(true)
  const [enableRotate, setEnableRotate] = useState(0.5)
  const [rotateSpeed, enableRotateSpeed] = useState(0.5)
  const [enablePan, setEnablePan] = useState(true)
  const [panSpeed, setPanSpeed] = useState(0.5)

  const [zoom, setZoom] = useState(1)
  const [position, setPosition] = useState([maxX/2, maxY*2, 0])
  const [near, setNear] = useState(0.1)
  const [far, setFar] = useState(10000)
  const [up, setUp] = useState([0, 0, -1])

  const [showLabel, setShowLabel] = useState(false)

  const updateView = (value) => {
    setViewType(value);
    setEnableRotate(false); // Disable rotation for orthographic views
    
    if (value === "top") {
      setZoom(1);  // Set a zoom level that shows the full plan view
      setPosition([maxX / 2, maxY*2, 0]);  // Top view from above
      setUp([0, 1, 0]);  // Align the camera to look down from the top (Y-axis is up)
    } else if (value === "front") {
      setZoom(1);  // Adjust zoom for front view
      setPosition([0, maxY / 2, maxZ * 2]);  // Front view looking along the Z-axis
      setUp([0, 1, 0]);  // Y-axis as the "up" direction
    } else if (value === "left") {
      setZoom(1);  // Adjust zoom for left view
      setPosition([-maxX * 2, maxY / 2, 0]);  // Left view looking along the X-axis
      setUp([0, 1, 0]);  // Y-axis as the "up" direction
    } else if (value === "right") {
      setZoom(1);  // Adjust zoom for right view
      setPosition([maxX * 2, maxY / 2, 0]);  // Right view looking along the X-axis
      setUp([0, 1, 0]);  // Y-axis as the "up" direction
    } else if (value === "back") {
      setZoom(1);  // Adjust zoom for back view
      setPosition([0, maxY / 2, -maxZ * 2]);  // Back view looking along the negative Z-axis
      setUp([0, 1, 0]);  // Y-axis as the "up" direction
    }
  };
  

  const show3DView = () => {
    setViewType("3D")
    setEnableRotate(true)
    setCameraX(maxX * 2);
    setCameraY(maxY * 3.5);
    setCameraZ(maxZ * 2.75);
    setFov(25); // Reset FOV
  };

  return (
    <div className="flex flex-col w-full overflow-hidden">
      <div className="flex justify-end text-[12px] align-items-center w-full border-b-[1px] border-t-[1px] p-2 bg-gray-100 flex-wrap">
        <button
          className="p-1 border-2 rounded w-[50px] me-2 hover:bg-[rgb(0,150,225)] hover:text-white hover:border-[rgb(0,150,225)]"
          onClick={(e)=>show3DView("3D")}
        >
          3D
        </button>
       
        <button
          className="p-1 border-2 rounded w-[50px] me-2 hover:bg-[rgb(0,150,225)] hover:text-white hover:border-[rgb(0,150,225)]"
          onClick={(e)=>updateView("top")}
        >
          Top
        </button>

        <button
          className="p-1 border-2 rounded w-[50px] me-2 hover:bg-[rgb(0,150,225)] hover:text-white hover:border-[rgb(0,150,225)]"
          onClick={(e)=>updateView("front")}
        >
          Front
        </button>

        <button
          className="p-1 border-2 rounded w-[50px] me-2 hover:bg-[rgb(0,150,225)] hover:text-white hover:border-[rgb(0,150,225)]"
          onClick={(e)=>updateView("left")}
        >
          Left
        </button>

        <button
          className="p-1 border-2 rounded w-[50px] me-2 hover:bg-[rgb(0,150,225)] hover:text-white hover:border-[rgb(0,150,225)]"
          onClick={(e)=>updateView("right")}
        >
          Right
        </button>

        <button
          className="p-1 border-2 rounded w-[50px] me-2 hover:bg-[rgb(0,150,225)] hover:text-white hover:border-[rgb(0,150,225)]"
          onClick={(e)=>updateView("back")}
        >
          Back
        </button>

        <div className="me-4">
          <Slider 
            label="Zoom"
            units = ""
            min = {0}
            max = {20}
            value={zoom}
            updateParent={setZoom}
            width = "100px"
            disabled={viewType ==="3D"? true: false}
          />
        </div>


        <div className="me-4">
          <Slider 
            label="Perspective"
            units = ""
            min = {0}
            max = {100}
            value={fov}
            updateParent={setFov}
            width = {"100px"}
            disabled={viewType==="3D"? false: true}
          />
        </div>

        <div className="me-4">
          <Slider 
            label="Opacity"
            units = ""
            min = {0}
            max = {100}
            value={opacity*100}
            updateParent={(val)=>setOpacity(val/100)}
            width = "100px"
          />
        </div>

        <div className="flex p-1">
          <input
            type="checkbox"
            className="me-1"
            checked={highlightStatus}
            onClick={(e) => setHighlightStatus(!highlightStatus)}
          />
          <label>Show Status</label>
        </div>

        <div className="flex p-1">
          <input
            type="checkbox"
            className="me-1"
            checked={showEdges}
            onClick={(e) => setShowEdges(!showEdges)}
          />
          <label>Show Edges</label>
        </div>
      </div>

      

      <div className="flex flex-col w-full overflow-hidden h-[500px]">
        <Canvas>
          {/* Ambient light for general lighting */}
          <ambientLight intensity={0.5} />
          {/* Directional light to cast shadows */}
          <directionalLight position={[-75, 200, 300]} intensity={1} />

          {/* OrbitControls for interacting with the view */}
          <OrbitControls
            target={[maxX / 2, maxY / 2, maxZ / 2]}
            enableZoom={enableZoom}
            zoomSpeed={zoomSpeed}
            enableRotate={viewType === "3D"}  // Enable rotation only for 3D view
            rotateSpeed={rotateSpeed}
            enablePan={enablePan}
            panSpeed={panSpeed}
          />

          {/* Camera logic */}
          {viewType !== "3D" ? (
            <OrthographicCamera
              makeDefault
              zoom={zoom} // Adjust the zoom level for plan/elevation views
              position={position} // Position based on selected view
              near={near}
              far={far}
              up={up} // Set up vector for correct orientation
            />
          ) : (
            <CameraController 
              cameraX={cameraX} 
              cameraY={cameraY} 
              cameraZ={cameraZ} 
              fov={fov} 
            />
          )}

          {/* Scene with servers */}
          {servers.length>0 && 
          <Scene 
            servers = {servers}
            setSelectedServer={setSelectedServer}
            opacity={opacity}
            highlightStatus={highlightStatus}
            maxDimensions={maxDimensions}
            showLabel={showLabel}
            showEdges={showEdges}
          />}
        </Canvas>   
      </div>

    </div>
  );
};

export default View;
