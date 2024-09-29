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


const AllApps = () => {

  const dispatch = useDispatch()
  const appName = useSelector(state=>state.environment.appName)
  const companyName = useSelector(state=>state.authentication.user.company_name) || "general_user"
  const folderPath = `${appName}/client_documents/${companyName}`

  const [view, setView] = useState("table")
  const [visualLayout, setVisualLayout] = useState([])
  const [tableData, setTableData] = useState([]);
  const [fields, setFields] = useState([])
  const [selectedRecords, setSelectedRecords] = useState([])
  const [hoveredItem, setHoveredItem] = useState(null)
  const [showAddForm, setShowAddForm] = useState(false)
  const [showViewForm, setShowViewForm] = useState(false)
  const [showDeleteForm, setShowDeleteForm] = useState(false)
  const [waiting, setWaiting] = useState(false)
  const [attachments, setAttachments] = useState([])
  

  const getTableData = async (tableName)=>{
    setWaiting(true)
    try{
      const response = await nlightnApi.getTable(tableName)
      setTableData(response.data)
      setWaiting(false)
    }catch(error){
      console.log("Could not fetdh data for: ",tableName)
    }
  }
      
  useEffect(()=>{
    getTableData("apps")
  },[])


    const handleDeleteRecords = ()=>{
        setShowDeleteForm(false)
    }

    
    const handleSelectedRows = (selectedRows)=>{
      setSelectedRecords(selectedRows)
    }

    const handleViewApp = (e)=>{
      console.log(selectedRecords[0])
      dispatch(setApp(selectedRecords[0]))
      dispatch(setAllAppsModule("App"))
    }


    const IconStyle = {
        height: "30px",
        width: "30px",
        cursor: "pointer",
        marginLeft: "5px",
        marginRight: "5px"
    }

  const pageStyle ={
    height:"100%", 
    width:"100%",
  }

   
  return (
    <div className="d-flex w-100 p-3 flex-column fade-in me-5 fade-in" style={pageStyle}>
        
        <div className="page-sub-title">All Apps</div>

        <div className="d-flex flex-column w-100 p-3">
        
        <div className="d-flex justify-content-between align-items-center p-1">
            <div className="d-flex justify-content-start align-items-center">
                <img src={`${iconsApi.generalIcons}/table_icon.png`} style={IconStyle} onClick={(e)=>setView("table")}></img>
                <img src={`${iconsApi.generalIcons}/visual_design_icon.png`} style={IconStyle} onClick={(e)=>setView("layout")}></img>
            </div>
            <div className="d-flex justify-content-end align-items-center">
                { selectedRecords.length == 1 && 
                  <div className="d-flex align-items-center justify-content-end">        
                    <img title={"View Data"} style={IconStyle} src={`${iconsApi.appIcons}/view_icon.png`} onClick={(e)=>handleViewApp(e)}></img>
                  </div>
                }
                { selectedRecords.length >0 && 
                  <div className="d-flex align-items-center justify-content-end">        
                    <img title={"Delete Data"} style={IconStyle} src={`${iconsApi.appIcons}/trash_icon.png`} onClick={(e)=>setShowDeleteForm(true)}></img>
                  </div>
                }
                <img title={"Add Record"} style={IconStyle} src={`${iconsApi.appIcons}/add_icon.png`} onClick={(e)=>setShowAddForm(true)}></img>
            </div>
        </div>

        <div className="d-flex border p-1 w-100 bg-light" style={{height: "100%", overflow: "auto"}}>
          {tableData.length>0  && view==="table" &&
              <Table 
                  data={tableData}
                  hiddenColumns = {["id","record_created","order", "name"]}
                  selectRows = {handleSelectedRows}
              />
          }
        </div>
        </div>


        {showDeleteForm && 
            <FloatingPanel
                width = "300px"
                height = "200px"
                displayPanel = {setShowDeleteForm}
                title="Confirm delete"
            >
                <div className="d-flex justify-content-center align-items-center w-100">
                    <div className="d-flex align-items-center justify-content-center">
                        <button className="btn btn-outline-secondary m-1" onClick={(e)=>setShowDeleteForm(false)}>Cancel</button>
                        <button className="btn btn-danger m-1" onClick={(e)=>handleDeleteRecords()}>Delete</button>
                    </div>
                </div>
         </FloatingPanel>
        }

        { showViewForm && 
            <FloatingPanel
              title={selectedRecords[0].name}
              height="50vh"
              width="50vw"
                displayPanel = {setShowViewForm}
            >
                {/* <PreviewDocument file={selectedFile}/> */}
         </FloatingPanel>
        }

      {waiting && 
            <FloatingPanel
                width = "300px"
                height = "200px"
                displayPanel = {setWaiting}
            >
            <div className="d-flex w-100 align-items-center justify-content-center">
              <h4>Please wait...</h4>
            </div>
         </FloatingPanel>
        }
    </div>
  )
}

export default AllApps