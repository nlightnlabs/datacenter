import React, {useState, useEffect} from 'react'
import servers from './data_center_servers.json'
import { toProperCase } from '../functions/formatValue';

import { AgGridReact } from 'ag-grid-react'; // React Data Grid Component
import "ag-grid-community/styles/ag-grid.css"; // Mandatory CSS required by the Data Grid
import "ag-grid-community/styles/ag-theme-quartz.css"; // Optional Theme applied to the Data Grid


const ServerDetails = (props) => {

    const [tableData, setTableData] = useState([]);
    const [fields, setFields] = useState([])
    const [recordId, setSelectedRecordId] = useState(0)
    const [showRecordDetails, setShowRecordDetails] = useState(false)

    
    const getTableData = ()=>{

      let fieldList = []
        if(servers.length>0){
          Object.keys(servers[0]).map((field,index)=>{
            fieldList.push({headerName: toProperCase(field.replaceAll("_"," ")), field: field, filter: true})
        })
          setFields(fieldList)
        }

        setTableData(servers.sort((a, b) => {
          return  b.id-a.id;
        }));

      }
      
  useEffect(()=>{
    getTableData()
  },[])


    const onCellClicked = (e) => {
      setSelectedRecordId(e.data.id)
      setShowRecordDetails(true)
      props.setSelectedServer(e.data)
    }
  
  return (
      <div className="ag-theme-quartz animate__animated animate__fadeIn animate__duration-0.5s" style={{fontSize:"12px", height: "100%", width: "100%" }}>
        <AgGridReact 
          rowData={tableData} 
          columnDefs={fields} 
          onCellClicked={onCellClicked}
        />
    </div>
  )
}

export default ServerDetails