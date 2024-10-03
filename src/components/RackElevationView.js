import React, {useState, useEffect} from "react";
import serverData from './data_center_servers.json';
import { toProperCase } from "../functions/formatValue";
import FloatingPanel from "./FloatingPanel";
import Svg from "./Svg"

// Rack Elevation View Functional Component
const RackElevationView = (props) => {

  const [servers, setServers] = useState(props.servers);
  const [rackServers, setRackServers] = useState([])
  const selectedRack = props.selectedRack
  const setSelectedRack = props.setSelectedRack
  const [selectedServer, setSelectedServer] = useState(props.selectedServer);

  const [showStatus, setShowStatus] = useState(true)
  const [showFloatingPanel, setShowFloatingPanel] = useState(false)

  const darkMode = props.darkMode || false


  const getServers = () => {
    if (selectedRack != null && servers.length > 0) {
      let rackServers = servers.filter(i => i.rack_id === selectedRack.id);
      rackServers.sort((a, b) => b.U_position - a.U_position);
      setRackServers(rackServers);
    }
  };

  useEffect(()=>{
    props.setSelectedServer(selectedServer)
  },[selectedServer])

  useEffect(() => {
    getServers();
  }, [props]);

  const clearSelection = ()=>{
    props.setSelectedServer(null)
    props.setSelectedRack(null)
  }


  return (
    <div className="flex flex-col w-full h-100 overflow-hidden transition duration-500">

      <div className={`flex items-center justify-between mb-2 ${darkMode ? "bg-[rgb(100,100,100)]" : "bg-[rgb(235,235,235)]"} ${darkMode ? "darkMode-text" : "text-black"}`}>
       
       <div className={`flex font-bold text-[18px] w-full h-[40px] items-center justify-center text-center`} 
          >Rack Details
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


    <div className="flex justify-between overflow-y-scroll">
    
    <div className="w-1/2 p-3 ">

      <div className={`flex p-1 ${darkMode? "darkMode-text" : "lightMode-text"}`}>
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
        {rackServers.map((server, index) => (
          <div 
            key={index+1}
            className="bg-gray-500 border-1 border-white flex justify-center items-center w-full text-[12px] text-white cursor-pointer 
              transition duration-500 hover:scale-110 hover:cursor-pointer hover:shadow-md" // Added `w-full` to center and `mb-2` for spacing
            style={{backgroundColor: showStatus ? server.status_color : "rgb(100,100,100)"}}
            onClick={()=>setSelectedServer(server)}
          >
           U{server.U_position}: {server.id} | {server.model} | {server.operating_system}
          </div>
        ))}
      </div>
    </div>

    <div className="flex flex-col w-1/2 p-2 h-100">
      <table className="text-[12px]">
      <tbody>
      {Object.entries(selectedRack).map(([k,v],index)=>(
        !["column", "row", "x","z"].includes(k) && 
        (<tr key={index} className="border-b">
          <td className={`text-left h-[25px] ${darkMode ? "darkMode-text" : "lightMode-text"} p-1`}>{toProperCase(k)}</td>
          <td className={`text-left h-[25px] ${darkMode ? "text-[rgb(255,255,255)]" : "text-[black]"} font-bold p-1`}>{v}</td>
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
        <div className="absolute left-0 top-0 h-100 w-full bg-[rgba(0,0,0,0.75)] z-50">
            <FloatingPanel displayPanel={setShowFloatingPanel} headerColor="rgb(255,255,255)" headerTextColor="rgba(0,0,0,0)">
                <div className="flex h-[150px] w-[300px] text-[24px] text-bold text-red-600 text-center justify-center items-center">This will trigger a workflow</div>
            </FloatingPanel>
        </div>
    }

  </div>
  );
};

export default RackElevationView;
