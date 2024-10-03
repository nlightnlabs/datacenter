import React, {useState, useEffect} from "react";
import { toProperCase } from "../functions/formatValue";
import FloatingPanel    from './FloatingPanel'
import Svg from "./Svg"

// Rack Elevation View Functional Component
const ServerDetails = (props) => {

    const [showFloatingPanel, setShowFloatingPanel] = useState(false)

    const selectedServer = props.selectedServer || null
    const darkMode = props.darkMode || false

    let fieldsToRemove = [
      "height",
      "width",
      "depth",
      "description",
      "status_color",
      "rack_model",
      "row",
      "column",
      "rack_manufacturer",
      "rack_height",
      "rack_width",
      "rack_depth",
      "rack_description",
      "rack_photo",
      "grid_x",
      "grid_z",
      "x",
      "y",
      "z",
    ]

    const clearSelection = ()=>{
      props.setSelectedServer(null)
      props.setSelectedRack(null)
    }

  return (
    <div className="flex flex-col w-full h-100 overflow-scroll">
      
      <div className={`flex items-center justify-between mb-2 ${darkMode ? "bg-[rgb(100,100,100)]" : "bg-[rgb(235,235,235)]"} ${darkMode ? "darkMode-text" : "text-black"}`}>
       
       <div className={`flex font-bold text-[18px] w-full h-[40px] items-center justify-center text-center`} 
          >Server Details
        </div>
        <div
          onClick = {()=>clearSelection()}
        >
        <Svg 
          iconName = "CloseIcon"
          height = "30px"
          width = "30px"
          fillColor = {`${darkMode? "rgb(200,200,200)" : "rgb(100,100,100)"}`}
          />
          </div>
      </div>

      <div className="flex w-full h-[40px] pe-2 justify-end border-b pb-2">
        <button 
          className="text-yellow-500 border-2 border-yellow-500 text-[12px] h-[30px] ms-3 ps-2 pe-2 rounded cursor-pointer
          hover:bg-yellow-500 hover:text-white transition duration-500
          "
          onClick = {(e)=>setShowFloatingPanel(true)}
          >
            Modify
        </button>

        <button 
            className="text-red-600 border-2 border-red-600 text-[12px] h-[30px] ms-3 ps-2 pe-2 rounded cursor-pointer
            hover:bg-red-600 hover:text-white transition duration-500
            "
            onClick = {(e)=>setShowFloatingPanel(true)}
        >
            Decommission
        </button>

        <button 
            className="text-blue-600 border-2 border-blue-600 text-[12px] h-[30px] ms-3 ps-2 pe-2 rounded cursor-pointer
            hover:bg-blue-600 hover:text-white transition duration-500
            "
            onClick = {(e)=>setShowFloatingPanel(true)}
        >
            Request New
        </button>

      </div>

    <div className="flex flex-col w-full p-2 h-100 overflow-y-scroll">
      <table className="text-[12px]">
      <tbody>
      {Object.entries(selectedServer).map(([k,v],index)=>(
        !fieldsToRemove.includes(k) && 
        (<tr key={index} className="border-b">
          <td className={`text-left h-[25px] ${darkMode ? "darkMode-text" : "lightMode-text"} p-1`}>{toProperCase(k)}</td>
          <td className={`text-left h-[25px] ${darkMode ? "text-[rgb(255,255,255)]" : "text-[black]"} font-bold p-1`}>{v}</td>
        </tr>)
      ))}
      </tbody>
      </table>
    </div>

    {showFloatingPanel &&
        <div className="absolute left-0 top-0 h-100 w-full bg-[rgba(0,0,0,0.75)] z-50">
            <FloatingPanel displayPanel={setShowFloatingPanel} headerColor="rgb(255,255,255)" headerTextColor="rgba(0,0,0,0)">
                <div className="flex h-[150px] w-[300px] text-[24px] text-bold text-red-600 text-center justify-center items-center">This will trigger a workflow</div>
            </FloatingPanel>
        </div>
    }
    
    </div>
    
  );
};

export default ServerDetails;
