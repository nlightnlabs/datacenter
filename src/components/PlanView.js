import React, { useState, useEffect } from "react";
import Slider from "./Slider";
import "../App.css";

const PanView = (props) => {
  const darkMode = props.darkMode || false;

  const servers = props.servers
  const racks = props.racks
  const [rackServers, setRackServers] = useState([]);
  const [selectedRack, setSelectedRack] = useState(props.selectedRack);

  const [maxX, setMaxX] = useState(1000);
  const [maxZ, setMaxZ] = useState(500);

  const [horizontalGrids, setHorizontalGrids] = useState([]);
  const [verticalGrids, setVerticalGrids] = useState([]);
  const [gridContainerWidth, setGridContainerWidth] = useState(null);
  const [gridContainerHeight, setGridContainerHeight] = useState(null);

  const [scaleFactor, setScaleFactor] = useState(1);
  const [translateX, setTranslateX] = useState(0);
  const [translateY, setTranslateY] = useState(0);
  const [dragging, setDragging] = useState(false);
  const [initialMouseX, setInitialMouseX] = useState(0);
  const [initialMouseY, setInitialMouseY] = useState(0);

  const getGrids = () => {
    let horizontalGrids = new Set();
    servers.forEach((item) => {
      const gridData = {
        label: item.row,
        z: item.grid_z,
      };
      horizontalGrids.add(gridData);
    });

    let verticalGrids = new Set();
    servers.forEach((item) => {
      const gridData = {
        label: item.column,
        x: item.grid_x,
      };
      verticalGrids.add(gridData);
    });

    setHorizontalGrids(Array.from(horizontalGrids));
    setVerticalGrids(Array.from(verticalGrids));

    const maxX = Math.max(...Array.from(verticalGrids).map((grid) => grid.x));
    const maxZ = Math.max(...Array.from(horizontalGrids).map((grid) => grid.z));

    setMaxX(maxX);
    setMaxZ(maxZ);
    setGridContainerWidth(maxX);
    setGridContainerHeight(maxZ);
  };

  useEffect(() => {
    console.log("racks", racks)
    console.log("servers", servers)
    getGrids();
  }, [props]);

  useEffect(() => {
    // Calculate initial translation to center the grid
    const initialTranslateX = (window.innerWidth - gridContainerWidth)/2;
    const initialTranslateY = (gridContainerHeight/2);
    setTranslateX(initialTranslateX);
    setTranslateY(initialTranslateY);
  }, [gridContainerWidth, gridContainerHeight]);

  const handleMouseDown = (e) => {
    setDragging(true);
    setInitialMouseX(e.clientX);
    setInitialMouseY(e.clientY);
  };

  const handleMouseUp = () => {
    setDragging(false);
  };

  const handleMouseMove = (e) => {
    if (dragging) {
      const dx = e.clientX - initialMouseX;
      const dy = e.clientY - initialMouseY;
      setTranslateX((prev) => prev + dx);
      setTranslateY((prev) => prev + dy);
      setInitialMouseX(e.clientX);
      setInitialMouseY(e.clientY);
    }
  };

  const handleZoom = (value) => {
    setScaleFactor(value / 10); // Zoom slider can control scale from 0.01 to 2
  };

  const clearSelection = ()=>{
    props.setSelectedServer(null)
    props.setSelectedRack(null)
    setSelectedRack(null)
  }

  const handleClick = (rack)=>{
    setSelectedRack(rack)
    props.setSelectedRack(rack)
  } 

  return (
    <div className="fade-in flex flex-col h-full w-full justify-center items-top overflow-hidden transition duration-500">
      <div
        className={`flex justify-end text-[12px] align-items-center w-full p-2 flex-wrap ${
          darkMode ? "darkMode-bg" : "bg-[rgb(235,235,235)]"
        }`}
      >
        <div className="me-4">
          <Slider
            label="Zoom"
            units=""
            min={1}
            max={200}
            value={scaleFactor * 100}
            updateParent={(value) => handleZoom(value)}
            width={"100px"}
            fontColor={darkMode ? "darkMode-text" : "lightMode-text"}
          />
        </div>

        <div className={`${darkMode? "darkMode-button" : "lightMode-button"} w-[100px]`}
        onClick = {(e)=>clearSelection()}
        >
          Clear
        </div>

      </div>

      <div
        className="relative overflow-hidden"
        style={{
          cursor: dragging ? "grabbing" : "grab",
          width: "100%",
          height: "80vh",
        }}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
      >
        <div
          style={{
            width: `${gridContainerWidth + 100}px`,
            height: `${gridContainerHeight + 100}px`,
            transform: `translate(${translateX}px, ${translateY}px) scale(${scaleFactor})`,
            transformOrigin: "0 0",
          }}
        >
          {/* Horizontal Grid Lines */}
          {horizontalGrids.map((grid, index) => (
            <div
              key={`horizontal-grid-${index}`}
              style={{
                position: "absolute",
                top: `${grid.z}px`,
                left: `${-75}px`,
                width: `${gridContainerWidth+100}px`,
              }}
            >
            <div 
            className="absolute flex items-center justify-center text-center"
            style={{top: "-10px", height: "20px", width: "20px", borderRadius: "10px",
            border: darkMode
                  ? "1px solid rgb(100,100,100)"
                  : "1px solid rgb(200,200,200)",
            color: darkMode
              ? "rgb(100,100,100)"
              : "rgb(200,200,200)",
            }}>{grid.label}</div>

            <div 
            className="ms-[20px]"
            style={{left: "20px", borderTop: darkMode
                  ? "1px dashed rgb(100,100,100)"
                  : "1px dashed rgb(200,200,200)"}}></div>
            </div>
          ))}


          {/* Vertical Grid Lines */}
          {verticalGrids.map((grid, index) => (
            <div
              key={`vertical-grid-${index}`}
              style={{
                position: "absolute",
                left: `${grid.x}px`,
                top: "-75px",
                height: "100%",
              }}
            >
               <div 
                className="flex items-center justify-center text-center text-[12px]"
                style={{marginLeft: "-10px", height: "20px", width: "20px", borderRadius: "10px",
                border: darkMode
                      ? "1px solid rgb(100,100,100)"
                      : "1px solid rgb(200,200,200)",
                color: darkMode
                  ? "rgb(100,100,100)"
                  : "rgb(200,200,200)",
                }}>{grid.label}</div>

                <div 
                className="h-100"
                style={{
                      borderLeft: darkMode
                      ? "1px dashed rgb(100,100,100)"
                      : "1px dashed rgb(200,200,200)"}}>
                </div>
            </div>
          ))}

          {/* Racks */}
          {racks.length > 0 &&
            racks.map((rack, i) => (
              <div
                key={i + 1}
                style={{
                  position: "absolute",
                  left: `${rack.x  -24/2}px`,
                  top: `${rack.z - 42/2}px`,
                  width: "24px",
                  height: "42px",
                  cursor: "pointer"
                }}
                className={
                  `w-[40px] h-[20px] text-[10px] text-center border-[1px]
                  ${selectedRack && selectedRack.id ===rack.id ? "bg-[rgb(0,150,255)]" : "bg-[rgb(200,200,220)]"}
                  ${selectedRack && selectedRack.id ===rack.id ? "border-[rgb(0,100,200)]" : "border-[rgb(150,150,150)]"}
                `}
                onClick={(e) => handleClick(rack)}
              ></div>
            ))}
        </div>
      </div>
    </div>
  );
};

export default PanView;

