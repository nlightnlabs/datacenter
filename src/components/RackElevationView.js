import React, {useState, useEffect} from "react";
import serverData from './data_center_servers.json';
import { toProperCase } from "../functions/formatValue";

// Rack Elevation View Functional Component
const RackElevationView = (props) => {

  const [servers, setServers] = useState([]);
  const selectedRack= props.selectedRack
  const [selectedServer, setSelectedServer] = useState(props.selectedServer);

  const [showStatus, setShowStatus] = useState(true)

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
    <div className="overflow-y-scroll p-2">
      {selectedRack != null && 
        <div className="font-bold w-full mb-3 text-center">Rack Elevation</div>
      }

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
        <tr key={index} className="border-b">
          <td className="text-left h-[25px] text-gray-500 p-1">{toProperCase(k)}</td>
          <td className="text-left h-[25px] text-blue-600 p-1">{v}</td>
        </tr>
      ))}
      </tbody>
      </table>

      <div className="p-3 w-full">
        <img src={`server_photos/${selectedRack.photo}`} alt="Rack Photo" />
      </div>
    </div>
        
    </div>
  </div>
  );
};

export default RackElevationView;
