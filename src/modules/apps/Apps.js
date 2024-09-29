import React, {useState, useEffect} from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { setAllAppsModule} from '../../redux/slices/appsSlice.js'
import * as nlightnApi from '../../apis/nlightn.js'
import Table from '../../components/Table'

// import AllApps from './modules/AllApps.js'
// import App from './modules/App.js'

const Apps = () => {

  const [apps, setApps] = useState([])

  const getApps = async ()=>{
    const response = await nlightnApi.getTable("apps")
    setApps(response.data)
  }

  useEffect(()=>{
    getApps()
  },[])


  const pageStyle ={
    height:"100%", 
    width:"100%",
  }

   
  return (
    <div className="d-flex w-100 p-3 flex-column fade-in me-5 fade-in" style={pageStyle}>
      <Table 
        data={apps}
      />
    </div>
  )
}

export default Apps