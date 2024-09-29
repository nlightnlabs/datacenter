import React, {useState} from 'react'
import Applet from '../objects/Applet.js'
import MultiInput from '../../../components/MultiInput'

const AddApp = () => {
    
   const {formData, setFormData} = useState({})
  
   const handleChange = (e)=>{
    const {name, value} = e.target
    setFormData({...formData,...{[name]:value}})
  }
  
  const handleCreateApp = (e)=>{
    const newApp = new Applet(formData)
  }

  return (
    <div className="d-flex w-100 flex-column p-5">
        <div className="page-title">Add a New App</div>
        <div>
            <button onClick={(e)=>handleCreateApp(e)}>Create</button>
        </div>
        <div>
            <MultiInput
                id="name"
                name="name"
                label="App sName"
                placeholder = "App Name"
                value = {formData.name}
                onChange = {(e)=>handleChange(e)}
            />
        </div>
    </div>
  )
}

export default AddApp