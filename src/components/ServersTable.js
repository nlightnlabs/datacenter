import React, {useState, useEffect} from 'react'
import servers from './data_center_servers.json'
import { toProperCase } from '../functions/formatValue';

import { AgGridReact } from 'ag-grid-react'; // React Data Grid Component
import "ag-grid-community/styles/ag-grid.css"; // Mandatory CSS required by the Data Grid
import "ag-grid-community/styles/ag-theme-quartz.css"; // Optional Theme applied to the Data Grid


const ServerDetails = (props) => {

    const servers = props.servers

    const [tableData, setTableData] = useState([]);
    const [fields, setFields] = useState([])
    const [recordId, setSelectedRecordId] = useState(0)
    const [showRecordDetails, setShowRecordDetails] = useState(false)
    const darkMode = props.darkMode || false

    
    const getTableData = ()=>{
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

        if(servers.length>0){
          let filteredList = Object.keys(servers[0]).filter(item => !fieldsToRemove.includes(item));
          let fieldList = []
          filteredList.map((field,index)=>{
            fieldList.push({headerName: toProperCase(field.replaceAll("_"," ")), field: field, filter: true})
        })
          setFields(fieldList)
        }

        setTableData(servers)

      }
      
  useEffect(()=>{
    getTableData()
  },[props])

    const onCellClicked = (e) => {
      setSelectedRecordId(e.data.id)
      setShowRecordDetails(true)
      props.setSelectedServer(e.data)
    }

    const gridOptions = {
      autoSizeStrategy: {
          type: 'fitCellContents',
          defaultMinWidth: 50
      },
  }




  
  return (
      <div 
      className={`ag-theme-quartz${darkMode? "-dark":''}`}
      style={{fontSize:"12px", height: "100%", width: "100%" }}>
        <AgGridReact 
          rowData={tableData} 
          columnDefs={fields} 
          onCellClicked={onCellClicked}
          gridOptions = {gridOptions}
        />
    </div>
  )
}

export default ServerDetails