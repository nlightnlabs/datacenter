import React, {useState, useEffect} from "react";
import { toProperCase } from "../functions/formatValue";
import FloatingPanel    from './FloatingPanel'

// Rack Elevation View Functional Component
const ServerDetails = ({selectedServer}) => {

    const [showFloatingPanel, setShowFloatingPanel] = useState(false)

    const fielsToHide =[
        "rack_model",
        "rack_location",
        "row",
        "column",
        "grid_x",
        "grid_z",
        "x",
        "y",
        "z",
        "rack_manufacturer",
        "rack_photo",
        "rack_height",
        "rack_width",
        "rack_depth",
        "rack_description",
        "rack_photo",
    ]

  return (
    <div className="flex flex-col w-full h-100 overflow-scroll">
      {selectedServer != null && 
        <div className="font-bold text-[18px] w-full h-[40px] items-center mb-3 text-center bg-gray-100">Server Details</div>
      }

    <div className="flex w-full h-[40px] p-2 justify-end">
      <button 
        className="bg-yellow-500 text-[12px] text-white h-[30px] ps-2 pe-2 rounded cursor-pointer"
        onClick = {(e)=>setShowFloatingPanel(true)}
        >
            Modify
        </button>

        <button 
            className="bg-red-600 text-[12px] text-white h-[30px] ms-3 ps-2 pe-2 rounded cursor-pointer"
            onClick = {(e)=>setShowFloatingPanel(true)}
        >
            Decommission
        </button>
    </div>

    <div className="flex flex-col w-full p-2 h-100 overflow-y-scroll">
      <table className="text-[12px]">
      <tbody>
      {Object.entries(selectedServer).map(([k,v],index)=>(
        !fielsToHide.includes(k) && 
        (<tr key={index} className="border-b">
          <td className="text-left h-[25px] text-gray-500 p-1 w-1/4">{toProperCase(k.replace("_"," "))}</td>
          <td className="text-left h-[25px] text-blue-600 p-1">{v}</td>
        </tr>)
      ))}
      </tbody>
      </table>

      {/* <div className="p-3 w-full">
        <img src={`server_photos/${selectedRack.photo}`} alt="Rack Photo" />
      </div> */}

    </div>

    {showFloatingPanel &&
        <div className="absolute left-0 top-0 h-100 w-full bg-[rgba(0,0,0,0.5)] z-50">
            <FloatingPanel displayPanel={setShowFloatingPanel} headerColor="rgb(255,255,255)" headerTextColor="rgba(0,0,0,0)">
                <div className="flex h-[150px] w-[300px] text-[24px] text-bold text-red-600 text-center justify-center items-center">This will trigger a workflow</div>
            </FloatingPanel>
        </div>
    }
    
    </div>
    
  );
};

export default ServerDetails;
