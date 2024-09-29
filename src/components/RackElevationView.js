import React, {useState, useEffect} from "react";
import serverData from './data_center_servers.json';
import { toProperCase } from "../functions/formatValue";
import FloatingPanel from "./FloatingPanel";

// Rack Elevation View Functional Component
const RackElevationView = (props) => {

  const [servers, setServers] = useState([]);
  const selectedRack= props.selectedRack
  const [selectedServer, setSelectedServer] = useState(props.selectedServer);

  const [showStatus, setShowStatus] = useState(true)
  const [showFloatingPanel, setShowFloatingPanel] = useState(false)


  const getServers = (selectedRack, selectedServer) => {
    if (selectedRack != null && serverData.length > 0 && selectedServer != null) {
      const servers = serverData.filter(i => i.rack_id === selectedRack.id);
      setServers(servers);
    }
  };

  useEffect(()=>{
    // console.log(setSelectedServer)
    // props.setSelectedServer(selectedServer)
  },[setSelectedServer])

  useEffect(() => {
    getServers(selectedRack, selectedServer);
  }, [props]);



  return (
    <div className="overflow-y-scroll">
      {selectedRack != null && 
        <div className="flex h-[40px] justify-center items-center font-bold text-[18px] w-full mb-2 text-center bg-gray-100">Rack Details</div>
      }

    <div className="flex w-full h-[30px] pe-2 justify-end">
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


    <div className="flex justify-between">
    
    <div className="w-1/2 p-3">

      <div className="flex p-1 text-[12px]">
          <input
            type="checkbox"
            className="m-1"
            checked={showStatus}
            onChange={(e) => setShowStatus(!showStatus)}
          />
          <label>Show Status</label>
      </div>

      <div 
        className="flex flex-col justify-center items-center mx-auto border-[10px] border-gray-800"
        style={{width: selectedRack.rack_width, height: selectedRack.rack_height}}
      >
        {servers.map((server, index) => (
          <div 
            key={index+1}
            className="bg-gray-500 border-1 border-white flex justify-center items-center w-full text-[10px] text-white" // Added `w-full` to center and `mb-2` for spacing
            style={{backgroundColor: showStatus ? server.status_color : "rgb(100,100,100)"}}
            cursor="pointer"
            onClick={() => setSelectedServer(server)}
          >
            {server.id} | {server.model} | {server.operating_system}
          </div>
        ))}
      </div>
    </div>

    <div className="flex flex-col w-1/2 p-2 h-100 overflow-y-scroll">
      <table className="text-[12px]">
      <tbody>
      {Object.entries(selectedRack).map(([k,v],index)=>(
        !["column", "row"].includes(k) && 
        (<tr key={index} className="border-b">
          <td className="text-left h-[25px] text-gray-500 p-1">{toProperCase(k)}</td>
          <td className="text-left h-[25px] text-blue-600 p-1">{v}</td>
        </tr>)
      ))}
      </tbody>
      </table>

      <div className="p-3 w-full">
        <img src={`server_photos/${selectedRack.photo}`} alt="Rack Photo" />
      </div>
    </div>
        
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

export default RackElevationView;
