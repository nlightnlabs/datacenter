import React, {useState, useEffect, useMemo, useCallback} from 'react'
import "bootstrap/dist/css/bootstrap.min.css"
import { AgGridReact } from 'ag-grid-react'; // React Grid Logic
import "ag-grid-community/styles/ag-grid.css"; // Core CSS
import "ag-grid-community/styles/ag-theme-quartz.css"; // Theme
import {toProperCase} from './functions/formatValue.js'
import { UTCToLocalTime } from './functions/time.js';
import * as nlightnApi from "./apis/nlightn.js"

const Table = (props) => {
    const data = props.data
    const columnWidths = props.columnWidths || []
    const filterableColumns = props.filterableColumns || []
    const hiddenColumns = props.hiddenColumns || []
    const sortableColumns = props.sortableColumns || []
    const sortingOrder = props.sortingOrder || []


    const [tableData, setTableData] = useState([]);
    const [fields, setFields] = useState([])
    
    const getTableData = async ()=>{

      let fieldList = []
        if(data.length>0){
            Object.keys(data[0]).map((field,index)=>{
                fieldList.push({
                  field: field, 
                  headerName: toProperCase(field.replaceAll("_"," ")), 
                  width: columnWidths.find(i=>i.columnName===field) && columnWidths.find(i=>i.columnName===field).width,
                  filter: filterableColumns.includes(field)? true : true, 
                  sortable: sortableColumns.find(i=>i.name===field)?true: true, 
                  sort: sortableColumns.find(i=>i.name===field) &&  sortableColumns.find(i=>i.name===field).order, 
                  hide: hiddenColumns.includes(field)? true : false, 
                  suppressSizeToFit: hiddenColumns.includes(field) ? true : false,
                  
                })
            })
            
            let selectField = {
                  field: "select", 
                  headerName: "", 
                  cellStyle: { textAlign: 'center' },
                  width: 20,
                  filter: false,
                  checkboxSelection: true,
                  headerCheckboxSelection: true,
                  resize: false
            }
            fieldList =[...fieldList,selectField]
            setFields(fieldList)
        }

        setTableData(data.sort((a, b) => {
          return  b.id-a.id;
        }));
    }

   
      
  useEffect(()=>{
    getTableData()
  },[props.data])


    const onCellClicked = (e) => {
      props.onCellClicked(e.data)
    }
    
    const [selectedRows, setSelectedRows] = useState([])
    useEffect(()=>{
      props.getSelectedRows(selectedRows)
    },[selectedRows])

    const gridOptions = {
      onGridReady: (params) => {
        params.api.sizeColumnsToFit();
      },
      rowClassRules: {
        'selected-row': (params) => params.node.isSelected(),
      },

      getRowStyle: (params) => {
        if (params.node && params.node.isSelected()) {
          return { background: 'gray' }; // Change the background color to highlight the row
        }
        return null; // No style change
      },

      onSelectionChanged: () => {
        // Get selected rows
        const selectedNodes = gridOptions.api.getSelectedNodes();
        // Extract row data from selected nodes
        selectedRows = selectedNodes.map(node => node.data);
        setSelectedRows(selectedRows)
        console.log('Selected Rows:', selectedRows);
      },

    };
  
  return (
    <div className="flex-container w-100">
        <div
            className="ag-theme-quartz" // applying the grid theme
            style={{ height: 600 }} // the grid will fill the size of the parent container
        >
        {tableData && <AgGridReact
            rowData={tableData}
            columnDefs={fields}
            sortingOrder={sortingOrder ? sortingOrder : null}
            onCellClicked = {(e)=>onCellClicked(e)}
            gridOptions={gridOptions} // Add gridOptions here
            rowSelection = "multiple"
            checkboxSelection = {true}
        />}
        </div>
    </div>
  )
}

export default Table