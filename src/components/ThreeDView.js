import React, { useState, useEffect } from "react";
import { Canvas, useThree } from "@react-three/fiber";
import * as THREE from 'three'; // Import THREE for geometry
import { OrbitControls, OrthographicCamera, Text } from "@react-three/drei"; // Import OrthographicCamera
import Slider from "./Slider";
import { toProperCase } from "../functions/formatValue";

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

const Scene = ({servers, selectedServer, setSelectedServer, opacity, highlightStatus, maxDimensions, showLabel, showEdges }) => {

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
          color={
            highlightStatus && !selectedServer ? server.status_color
            :
            selectedServer && selectedServer.id ===server.id ? "rgb(0,150,255)"
            :
            selectedServer && selectedServer.id !==server.id ? "rgb(235,235,235)"
            :
            "gray"
          }
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

const View = (props) => {

  const selectedServer = props.selectedServer
  const selectedRoom = props.selectedRoom
  const statuses = props.statuses
  const servers = props.servers

  const [maxX, setMaxX] = useState(0)
  const [maxY, setMaxY] = useState(0)
  const [maxZ, setMaxZ] = useState(0)
  const [maxDimensions, setMaxDimensions] = useState({x: 500, y:500, z:500})

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


  // for 3D View
  const [fov, setFov] = useState(25); // Default field of view (FOV)
  const [cameraX, setCameraX] = useState(500);
  const [cameraY, setCameraY] = useState(500);
  const [cameraZ, setCameraZ] = useState(350);

  const [targetX, setTargetX] = useState(0);
  const [targetY, setTargetY] = useState(0);
  const [targetZ, setTargetZ] = useState(0);

  // For 2D views:
  const [zoom, setZoom] = useState(1)
  const [position, setPosition] = useState([maxX/2, maxY/2, maxZ/2])
  const [near, setNear] = useState(1000)
  const [far, setFar] = useState(1000)
  const [up, setUp] = useState([0, 0, -1])

  const [showLabel, setShowLabel] = useState(false)
  const [controlType, setControlType] = useState(false)

  const setView = ()=>{
  
    if(servers.length>0){
      let maxX = Math.max(...servers.map((server) => server.x))
      let maxY = Math.max(...servers.map((server) => server.y))
      let maxZ = Math.max(...servers.map((server) => server.z))

      let maxDimensions = {x: maxX, y: maxY, z: maxZ}

      setMaxX(maxX)
      setMaxX(maxY)
      setMaxX(maxZ)

      setCameraX(maxX*2.5)
      setCameraY(maxY*5)
      setCameraZ(maxZ*2.5)

      setTargetX(maxX/2)
      setTargetY(maxY/100)
      setTargetZ(maxZ/2)
    }
  }
  useEffect(()=>{
    setView()
  },[props])
 
  
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


  const clearSelection = ()=>{
    props.setSelectedServer(null)
    props.setSelectedRack(null)
  }

  return (
    <div className="flex flex-col w-full overflow-hidden">
      <div className="flex justify-end text-[12px] align-items-center w-full border-b-[1px] border-t-[1px] p-2 bg-gray-100 flex-wrap">
        {/* <button
          className="p-1 border-2 rounded w-[50px] me-2 hover:bg-[rgb(0,150,225)] hover:text-white hover:border-[rgb(0,150,225)]"
          onClick={(e)=>show3DView("3D")}
        >
          3D
        </button> */}
       
        {/* <button
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
        </button> */}

        {/* <div 
          className="flex h-[30px] w-[40px] border-2 border-gray-200 rounded items-center justify-center"
          onClick = {(e)=>setControlType("pan")}
          >
            Pan
        </div>

        <div 
          className="flex h-[30px] w-[40px] border-2 border-gray-200 rounded items-center justify-center"
          onClick = {(e)=>setControlType("rotate")}
          >
            Rot
        </div>

        <div 
          className="flex h-[30px] w-[40px] border-2 border-gray-200 rounded items-center justify-center"
          onClick = {(e)=>setControlType("zoom")}
          >
            Zm
        </div> */}

        {viewType !=="3D" && <div className="me-4">
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
        </div>}


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
            onChange={(e) => setHighlightStatus(!highlightStatus)}
          />
          <label>Show Status</label>
        </div>

        <div className="flex p-1">
          <input
            type="checkbox"
            className="me-1"
            checked={showEdges}
            onChange={(e) => setShowEdges(!showEdges)}
          />
          <label>Show Edges</label>
        </div>

        <div className="flex items-center ps-2 pe-2 justify-center h-[40px] border-2 rounded border-gray-300 ms-2
        hover:bg-blue-600 hover:text-white transition duration-500 cursor-pointer
        "
        onClick = {(e)=>clearSelection(null)}
        >
          Clear Selection
        </div>
      </div>

      

      <div className="relative flex flex-col w-full overflow-hidden h-[500px]">

        <Canvas>
          {/* Ambient light for general lighting */}
          <ambientLight intensity={0.5} />
          {/* Directional light to cast shadows */}
          <directionalLight position={[-75, 200, 300]} intensity={1} />

          {/* OrbitControls for interacting with the view */}
          <OrbitControls
            target={[targetX, targetY, targetZ]}
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
            selectedServer = {selectedServer}
            setSelectedServer={props.setSelectedServer}
            opacity={opacity}
            highlightStatus={highlightStatus}
            maxDimensions={maxDimensions}
            showLabel={showLabel}
            showEdges={showEdges}
          />}
        </Canvas>

        {highlightStatus && statuses.length>0 &&
          <div className="absolute right-0 fade-in overflow-y-scroll bg-white shadow-md p-2 text-[12px] rounded-md border-2 border-gray-200 m-2
          transition duration-500">
            <div className="flex w-full h-[25px] text-[12px] items-center">Status</div>
            <table className="text-[12px]">
              <tbody>
              {statuses.map((item,index)=>(
                <tr key={index}>
                  <td className={`text-left h-[25px] p-1 w-1/4`} style={{backgroundColor: item.color}}></td>
                  <td className="text-left h-[25px] text-gray-500 p-1">{item.status}</td>
                </tr>
              ))}
              </tbody>
          </table>
          </div>   
        } 
      
      </div>

    </div>
  );
};

export default View;
