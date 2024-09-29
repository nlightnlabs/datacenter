import React, {useState, useEffect} from 'react'
import "bootstrap/dist/css/bootstrap.min.css"
import { useSelector, useDispatch } from 'react-redux'
import { 
  setAllAppsModule,
  setApp,
  setSingleAppModule
} from '../../../redux/slices/appsSlice.js'

import * as nlightnApi from "../../../apis/nlightn.js"
import * as iconsApi from "../../../apis/icons.js"

import Table from "../../../components/Table.js"
import FloatingPanel from '../../../components/FloatingPanel.js';

import AppSettings from './AppSettings.js'
import AppFields from './AppFields.js'
import AppAutomations from './AppAutomations.js'

const App = () => {

  const app = useSelector(state=>state.apps.app)
  const dispatch = useDispatch()

  useEffect(()=>{
    console.log(app)
  },[])



  const module = useSelector(state=>state.data_management.module)
   const modules = [
    {id: "1", name:"AppSettings", label: "App Settings", icon: "settings_icon.png", component: <AppSettings/>},
    {id: "2", name:"AppFields", label: "AppFields", icon: "fields_icon.png", component: <AppFields/>},
    {id: "3", name:"AppAutomations", label: "App Automations", icon: "automation_icon.png", component: <AppAutomations/>},
  ]
    useEffect(()=>{
      console.log(module)
      dispatch(setSingleAppModule("AppSettings"))
    },[])

    const [ hoveredItem, setHoveredItem] = useState("Home")

    const tabStyle={
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      fontWeight: "normal",
      backgroundColor: "white",
      border: "1px solid lightgray",
      borderRadius: "10px 10px 0px 0px",
      padding: "10px",
      cursor: "pointer",
      height: "50px",
      width: "100px",
      transition: "0.3s",
      fontSize: "14px",
      textAlign: "center"
    }

  return (
    <div className="d-flex w-100 me-5 flex-column p-3 fade-in">

      <div>
        <div className="d-flex justify-content-between">
          <div className="page-sub-title">{app.label} App</div>
          <button className="btn btn-primary" onClick={(e)=>dispatch(setAllAppsModule("AllApps"))}>Back to All Apps</button>
        </div>  
      </div>


      {/* nav bar */}
        <div className="d-flex">
          {modules.length>0 && modules.map(item=>(
            <div 
              key={item.id} 
              onClick = {(e)=>dispatch(setSingleAppModule(item.name))}
              onMouseOver = {(e)=>setHoveredItem(item.name)}
              onMouseLeave = {(e)=>setHoveredItem(null)} 
              style={{...tabStyle,
                ...{["backgroundColor"]:hoveredItem===item.name || module===item.name? "rgb(0,100,225)" :tabStyle.backgroundColor},
                ...{["color"]:hoveredItem===item.name|| module===item.name?  "white" :tabStyle.color},
                ...{["borderBottom"]:hoveredItem===item.name? "0px solid rgba(255,255,255,0)" :tabStyle.border},
              }}
              >
              <div>{item.label}</div>
            </div>
          ))
          }
        </div>

        {/* Module */}
          <div className="d-flex border bg-light">
          {
            // modules.length>0 && modules.find(i=>i.name ===module).component
          }
        </div>
    </div>
  )
}


export default App