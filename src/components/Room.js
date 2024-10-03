import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from 'react-redux';
import PlanView from "./PlanView";
import RackElevationView from "./RackElevationView";
import ServersTable from "./ServersTable";
import serverData from './data_center_servers.json';
import ThreeDView from './ThreeDView'
import MultiInput from "./MultiInput";
import ServerDetails from "./ServerDetails";


// Main Application Component
const Room = (props) => {

  const darkMode = useSelector(state => state.environment.darkMode);

  const [servers, setServers] = useState([])
  const [racks, setRacks] = useState([])
  const [rooms, setRooms] = useState([])

  const [selectedRack, setSelectedRack] = useState(null)
  const [selectedServer, setSelectedServer] = useState(null)
  const [selectedRoom, setSelectedRoom] = useState("West Room Center")

  const [view, setView] = useState("3D")


  // Get Rooms
  const getRooms = ()=>{

    let rooms = new Set()
    serverData.map(item =>{
      rooms.add(item.room_name)
    })
    rooms = Array.from(rooms)
    setRooms(rooms)
  }

  const getServers = ()=>{

    if(selectedRoom){
      let servers = serverData.filter(i=>i.room_name === selectedRoom)
      setServers(servers)
    
      let rack_list = new Set()
    servers.map(item =>{
      if(item.room_name === selectedRoom){
        rack_list.add(item.rack_id)
      }
    })
    rack_list = Array.from(rack_list)

    let racks = []
    rack_list.map((item)=>{
      let rack = {
        id: item,
        location: serverData.filter(i=>i.rack_id ===item)[0].rack_location,
        column: serverData.filter(i=>i.rack_id ===item)[0].column,
        row: serverData.filter(i=>i.rack_id ===item)[0].row,
        manufacturer: serverData.filter(i=>i.rack_id ===item)[0].rack_manufacturer,
        model: serverData.filter(i=>i.rack_id ===item)[0].rack_model,
        height: serverData.filter(i=>i.rack_id ===item)[0].rack_height,
        width: serverData.filter(i=>i.rack_id ===item)[0].rack_width,
        depth: serverData.filter(i=>i.rack_id ===item)[0].rack_depth,
        description: serverData.filter(i=>i.rack_id ===item)[0].rack_description,
        photo: serverData.filter(i=>i.rack_id ===item)[0].rack_photo,
        x: serverData.filter(i=>i.rack_id ===item)[0].grid_x,
        z: serverData.filter(i=>i.rack_id ===item)[0].grid_z
      }
      racks = [...racks,rack]
    })
    setRacks(racks)
    }
  }



  // Get Statuses
  const [statuses, setStatuses] = useState([])
  const getStatuses = ()=>{

    let status_list = new Set()
    serverData.map(item =>{
      status_list.add(item.status)
    })
    status_list = Array.from(status_list)


    let statuses = []
    status_list.map((item)=>{
      let status = {
        status: serverData.filter(i=>i.status ===item)[0].status,
        color: serverData.filter(i=>i.status ===item)[0].status_color,
      }
      statuses = [...statuses,status]
    })
    setStatuses(statuses)
  }

  useEffect(()=>{
    getRooms()
    getStatuses()
    getServers()

  },[selectedRoom])

  useEffect(()=>{
    
    if(selectedServer != null){
      const selected_rack_id = servers.find(i=>i.id === selectedServer.id).rack_id
      const selected_rack = racks.find(i=>i.id ===selected_rack_id)
      setSelectedRack(selected_rack)
    }
  },[selectedServer])

  useEffect(()=>{
    console.log(selectedRack)
  },[selectedRack])

  const handleRoomChange = (event) => {
    setSelectedRoom(event.target.value); // Update the state with the selected room
  };


  return (
    <div className="flex flex-col w-full h-100 overflow-scroll pb-[300px] transition duration-500">
      
    <div className="ms-3 flex text-[24px] w-1/2 mb-2 transition duration-500">
      <div className={`${darkMode? "darkMode-text":"black"} ms-[10%]`}>Room:</div> 
      <div className="font-bold">
        <select className={`w-[300px] bg-[rgba(0,0,0,0)] ${darkMode?"darkMode-text" : "lightMode-text"}`} 
        onChange={handleRoomChange} value={selectedRoom}>
          {rooms.map((item,index)=>(
            <option className="ps-3 me-3 text-[18px]" key={index} value={item}>{item}</option>
          ))}
        </select>
      </div>
    </div>
 
    <div className="flex flex-col w-full transition duration-500">

        <div className="flex w-full mb-3 justify-center transition duration-500 flex-wrap">

          <div 
            className={`flex flex-col w-[90%] ${selectedRack && 'md:w-[60%]'} min-w-[500px] h-[500px] ${darkMode? "darkMode-border": "lightMode-border"} {} rounded-md shadow-md transition duration-500 mb-3`}
          >

            <div className="flex justify-end flex-wrap">

              <div className={`${darkMode? "darkMode-button" : "lightMode-button"} w-[100px]`}
                      onClick={(e)=>setView("plan")}
                    >
                      Plan View
              </div>
              <div className={`${darkMode? "darkMode-button" : "lightMode-button"} w-[100px]`}
                        onClick={(e)=>setView("3D")}
                    >
                      3D
              </div>
            </div>


            {view ==="plan" &&
              <div className="flex w-full h-100 overflow-hidden transition duration-500" style={{transition: "0.5s"}} > 
                <PlanView 
                  servers = {servers}
                  racks = {racks}
                  statuses = {statuses}
                  selectedRack={selectedRack} 
                  selectedServer = {selectedServer}
                  setSelectedServer = {setSelectedServer}
                  setSelectedRack = {setSelectedRack}
                  darkMode = {darkMode}
                />
              </div>
            }

            {view ==="3D" && 
              <div className="flex w-full h-100 overflow-hidden transition duration-500" style={{transition: "0.5s"}} >
                <ThreeDView
                    selectedRoom = {selectedRoom}
                    servers = {servers}
                    selectedServer = {selectedServer}
                    setSelectedServer = {setSelectedServer}
                    setSelectedRack = {setSelectedRack}
                    statuses = {statuses}
                />
              </div>
            }
          
          </div>

          {selectedRack &&
            <div 
              className={`flex flex-col w-[30%] h-[500px] md:w-[30%] min-w-[300px] shadow-md md:ms-5 mb-3 transition duration-500 ${darkMode ? "darkMode-bg" : "lightMode-bg"} rounded-md`}
              style={{transition: "0.5s"}} 
            >  
                <RackElevationView 
                  servers = {servers}
                  selectedRoom = {selectedRoom}
                  selectedRack={selectedRack} 
                  setSelectedRack={setSelectedRack}
                  selectedServer = {selectedServer}
                  setSelectedServer = {setSelectedServer}
                  darkMode = {darkMode}
                />
            </div>
          }
        </div>
        
        <div className="flex w-full justify-center flex-wrap">

          <div 
            className={`flex flex-col w-[90%] ${selectedServer && 'md:w-[60%]'} min-w-[500px] h-[500px] rounded-md shadow-md transition duration-500 mb-5 ${darkMode ? "darkMode-bg" : "lightMode-bg"}`}
          >
              <ServersTable
                servers = {servers}
                selectedServer = {selectedServer}
                setSelectedServer = {setSelectedServer}
                selectedRack={selectedRack} 
                setSelectedRack={setSelectedRack}
                darkMode = {darkMode}
              />
          </div>

          {selectedServer &&
            <div 
              className={`flex flex-col w-full md:w-[30%] min-w-[300px] h-[500px] overflow-hidden rounded-md shadow-md md:ms-5 transition duration-500 ${darkMode ? "darkMode-bg" : "lightMode-bg"}`}>
              <ServerDetails 
              selectedServer = {selectedServer}
              setSelectedServer = {setSelectedServer}
              selectedRack={selectedRack} 
              setSelectedRack={setSelectedRack}
              darkMode = {darkMode}
              />
            </div>
          }
        </div>
    </div>
  </div>
  );
};

export default Room;

