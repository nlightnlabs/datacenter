import React, { useState, useEffect } from "react";
import PlanView from "./PlanView";
import RackElevationView from "./RackElevationView";
import ServersTable from "./ServersTable";
import serverData from './data_center_servers.json';
import ThreeDView from './ThreeDView'
import MultiInput from "./MultiInput";
import ServerDetails from "./ServerDetails";

// Main Application Component
const Room = (props) => {

  const [selectedRack, setSelectedRack] = useState(null)
  const [selectedServer, setSelectedServer] = useState(null)
  const [view, setView] = useState("3D")

  const [selectedRoom, setSelectedRoom] = useState("West Room Center")
  const [rooms, setRooms] = useState([])

  const getRooms = ()=>{
    let rooms = new Set()
    serverData.map(item =>{
      rooms.add(item.room_name)
    })
    rooms = Array.from(rooms)
    setRooms(rooms)
  }

  const [racks, setRacks] = useState([])
  const getRacks = ()=>{

    let rack_list = new Set()
    serverData.map(item =>{
      rack_list.add(item.rack_id)
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
        photo: serverData.filter(i=>i.rack_id ===item)[0].rack_photo
      }
      racks = [...racks,rack]
    })
    setRacks(racks)
  }

  const handleRackClick = (rackId) => {
    setSelectedRack(rackId);
  };

  useEffect(()=>{
    getRooms()
    getRacks()
  },[])

  useEffect(()=>{

    console.log(selectedServer)
    
    if(selectedServer !=null){
      const selected_rack_id = serverData.find(i=>i.id === selectedServer.id).rack_id
      const selected_rack = racks.find(i=>i.id ===selected_rack_id)
      setSelectedRack(selected_rack)
    }
  },[selectedServer])

  const handleRoomChange = (event) => {
    setSelectedRoom(event.target.value); // Update the state with the selected room
  };


  return (
    <div className="flex flex-col w-full h-100">
      
    <div className="flex text-[24px] w-1/2">
      <div className="text-gray-400">Room:</div> 
      <div className="ms-3 font-bold">
        <select className="w-[300px]" onChange={handleRoomChange} value={selectedRoom}>
          {rooms.map((item,index)=>(
            <option className="ps-3 me-3 text-[18px]" key={index} value={item}>{item}</option>
          ))}
        </select>
      </div>
    </div>
 
    <div className="w-full">

        <div className="flex w-full mb-3 h-[500px]">

          <div 
            className={`"flex flex-col ${selectedRack ? 'w-2/3': 'w-full'} w-min-1/2 border-[1px] rounded-md border-gray-200 shadow-md transition duration-500"`}
          >

            <div className="flex justify-end flex-wrap">

              <div className="flex text-[14px] text-wrap w-[100px] h-[40px] p-1 border-2 justify-center align-items-center border-gray-300 rounded text-gray-500
                        hover:bg-[rgb(0,150,220)]  hover:border-[rgb(0,150,220) hover:cursor-pointer hover:text-white transition duration-500"
                      onClick={(e)=>setView("plan")}
                    >
                      Plan View
              </div>
              <div className="flex text-[14px] text-wrap w-[100px] h-[40px] p-1 border-2 justify-center align-items-center border-gray-300 rounded text-gray-500
                        hover:bg-[rgb(0,150,220)]  hover:border-[rgb(0,150,220) hover:cursor-pointer hover:text-white overflow-hidden transition duration-500" 
                        onClick={(e)=>setView("3D")}
                    >
                      3D
              </div>
            </div>


            {view ==="plan" &&
              <div className="flex w-full h-100 overflow-hidden" style={{transition: "0.5s"}} > 
                <PlanView onRackClick={(rackId)=>handleRackClick(rackId)} />
              </div>
            }

            {view ==="3D" && 
              <div className="flex w-full h-100 overflow-hidden" style={{transition: "0.5s"}} >
                <ThreeDView
                    selectedRoom = {selectedRoom}
                    selectedServer = {selectedServer}
                    setSelectedServer = {setSelectedServer}
                />
              </div>
            }
          
          </div>

          {selectedRack &&
            <div 
              className="w-1/3 flex flex-col border-[1px] rounded-md border-gray-200 shadow-md ms-3"
              style={{transition: "0.5s"}} 
            >  
                <RackElevationView 
                  selectedRoom = {selectedRoom}
                  selectedRack={selectedRack} 
                  selectedServer = {selectedServer}
                  setSelectedServer = {setSelectedServer}
                />
            </div>
          }
        </div>
        
        <div className="flex h-[300px] w-full transition duration-500">

          <div className={`"flex flex-col ${selectedServer ? 'w-2/3': 'w-full'} w-min-[500px] border-[1px] rounded-md border-gray-200 shadow-md transition duration-500"`} >
              <ServersTable
                setSelectedServer = {setSelectedServer}
              />
          </div>

          {selectedServer &&
            <div 
              className="flex flex-col w-1/3 w-min-[300px] overflow-hidden border-[1px] rounded-md border-gray-200 shadow-md ms-3">
              <ServerDetails selectedServer={selectedServer}/>
            </div>
          }

        </div>
    </div>
  </div>
  );
};

export default Room;

