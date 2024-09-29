import React, {useState, useEffect} from "react";
import servers from './data_center_servers.json';
import '../App.css'

const PanView = (props) => {

  const room = props.room || 1

  const [serverData, setServerData] = useState(servers)
  const [horizontalGrids, setHorizontalGrids] = useState([])
  const [verticalGrids, setVerticalGrids] = useState([])

  const horizontalGridSpacing = props.horizontalGridSpacing || 75
  const verticalGridSpacing =  props.verticalGridSpacing || 75
  const [gridContainerWidth, setGridContainerWidth] = useState(null)
  const [gridContainerHeight, setGridContainerHeight] = useState(null)

  const getGrids = ()=>{
    let horizontalGrids = new Set()
    serverData.map(item =>{
      horizontalGrids.add(item.row)
    })

    let verticalGrids = new Set()
    serverData.map(item =>{
      verticalGrids.add(item.column)
    })

    horizontalGrids = Array.from(horizontalGrids)
    verticalGrids = Array.from(verticalGrids)
    setHorizontalGrids(horizontalGrids)
    setVerticalGrids(verticalGrids)
    console.log("vericalGrids",verticalGrids)
    
    setGridContainerWidth((verticalGrids.length - 1)*verticalGridSpacing)
    setGridContainerHeight((horizontalGrids.length - 1)*horizontalGridSpacing)
  }

  const [racks, setRacks] = useState([])

  const getRacks = ()=>{

    let rack_data = new Set()
    serverData.map(item =>{
      let rack = {
        rack_id: item.rack_id,
        X: item.X,
        Y: item.Y,
        rack_model: item.rack_model
      }
      rack_data.add(rack)
    })
    rack_data = Array.from(rack_data)
    setRacks(rack_data)
  }


  useEffect(()=>{
    getGrids()
    getRacks()
  },[])

  return (

    <div className="flex  h-100 w-full justify-center align-items-top overflow-scroll">
      
      <div className="mt-[120px]">
        {gridContainerWidth && gridContainerHeight &&

          <div 
            className={`relative border-2 border-green-300`}
            style = {{width: `${gridContainerWidth}px`, height: `${gridContainerHeight}px`}}
          >

            {horizontalGrids.map((item, i)=>(

              <div key={i+1} style={{position: "absolute", padding:0, top:`${(i) * horizontalGridSpacing}px`, width: "100%", textAlign: "left"}}>
                <div className="absolute w-full p-0">
                  <div className={`absolute border-t-[0.5px] border-gray-300 border-dashed w-full p-0`}></div>
                  <div className={`absolute border-t-[0.5px] border-gray-300 border-dashed w-[70px] -ml-[70px] p-0`}></div>
                  <div 
                    className={`border-[0.5px] w-[30px] h-[30px] rounded-[15px] text-center text-gray-300 border-gray-300 border-dashed} p-0`}
                    style = {{marginTop: "-15px", marginLeft: "-100px"}}
                  >{item}
                  </div>
                  
                </div>
    
              </div>
              
              ))
            }

            {verticalGrids.map((item, i)=>(

              <div key={i+1} style={{position: "absolute", left:`${(i) * verticalGridSpacing}px`, height: "100%", textAlign: "top"}}>
                <div className="absolute h-100">
                  <div className={`absolute border-l-[0.5px] border-gray-300 border-dashed h-100 p-0`}></div>
                  <div className={`absolute border-l-[0.5px] border-gray-300 border-dashed h-[70px] -mt-[70px] p-0`}></div>
                  <div 
                    className={`border-[0.5px] w-[30px] h-[30px] rounded-[15px] text-center text-gray-300 border-gray-300 border-dashed} p-0`}
                    style = {{marginLeft: "-15px", marginTop: "-100px"}}
                  >{item}
                  </div>
                </div>

              </div>
            ))
            }

            {/* plot racks */}
            {
              racks.length>0 && racks.map((item, i)=>(
                <div 
                  key={i+1} 
                  style={{position: "absolute", left:`${(horizontalGrids.indexOf(item.X))*horizontalGridSpacing - 20}px`, top:`${item.Y*verticalGridSpacing - 10}px`}}
                  className="w-[40px] h-[20px] bg-gray-100 text-[10px] text-center "
                >
                  {item.rack_id}
                </div>
              ))
            } 

          </div>
        }

      </div>

    </div>
  );
};

export default PanView;