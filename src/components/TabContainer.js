import React, {useState} from 'react'

const TabContainer = (props) => {

  const [module, setModule] = useState("Files")

  return (
    <div className="d-flex">

        <div 
            className="d-flex w-100 bg-white align-items-center" 
            style={{height: "50px"}}
        >

            {/* Navigation bar */}
            <div className="btn-group">
                <button 
                    className={module=="Files" ? "btn btn-primary" : "btn btn-outline-secondary"} 
                    onClick={(e)=>setModule("Files")}
                >
                    Files
                </button>

                <button 
                    className={module=="Apis" ? "btn btn-primary" : "btn btn-outline-secondary"}
                    onClick={(e)=>setModule("Apis")}
                >
                    Apis
                </button>

                <button 
                    className={module=="Databases" ? "btn btn-primary" : "btn btn-outline-secondary"}
                    onClick={(e)=>setModule("Integrations")}
                >
                    Databases
                </button>
            </div>
        </div>
    </div>
  )
}

export default TabContainer