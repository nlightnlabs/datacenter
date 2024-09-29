import React, {useState, useEffect, useRef} from 'react'
import FloatingObject from '../../../components/FloatingObject.js';
import DatabaseIcon from '../../../components/svgs/DatabaseIcon.js';

const VisualData = (props) => {

const {objectsData, visualLayout, setVisualLayout, appData} = props
const [hovered, setHovered] = useState("")
const [selected, setSelected] = useState("")

const containerRef = useRef()

useEffect(()=>{
    if(visualLayout.length>0){
        setVisualLayout(props.visualLayout)
    }else{
        layoutElements()
    }
},[])



const updateLayout = (element)=>{
    let layout = visualLayout
    if(layout.length>0){
        layout.find(i=>i.id === element.id).x = element.x
        layout.find(i=>i.id === element.id).y = element.y
    }else{
        layout.push(element)
    }
    console.log(layout)
    setVisualLayout(layout)
}

  const layoutElements = (containerWidth)=>{
    console.log(containerWidth)

    if(containerRef.current){
        let containerWidth = containerRef.current.getBoundingClientRect().width
        console.log(containerWidth)
        if (containerWidth > 0){
            let initialPositions = []
        let xPosition=100
        let yPosition=100

        objectsData.map((item,index)=>{

        if(xPosition > containerWidth - 100){
            xPosition = 100
            yPosition += 150
        }

        initialPositions.push(
            {
                id: item.id, 
                name: item.name,
                label:item.label, 
                left: xPosition,
                top: yPosition
            })
        xPosition += 100
    })
    console.log("initialPositions",initialPositions)
    setVisualLayout(initialPositions)       


        }
    }
}

  useEffect(()=>{
    if(visualLayout.length>0){
        setVisualLayout(props.visualLayout)
    }else{
        layoutElements()
    }
},[])

const ObjectStyle={
    transition: "0.3s",
    height: "100px",
    maxWidth: "100px",
    wordWrap: "break-word"
}

const IconStyle = {
    height: "60px",
    width: "60px",
    cursor: "pointer",
    transition: "0.3s"
}

const LabelStyle={
    transition: "0.3s",
    fontSize: "12px"
}



  return (
        <div ref = {containerRef} className="d-flex w-75 bg-light w-100 border-1" style={{position: "relative", height:"100%"}}>
            {visualLayout.length>0 && 
                visualLayout.map(item=>(
                    <FloatingObject key={item.id} top={item.top} left={item.left} updateParent={updateLayout} objectData={item} >
                        <div className="d-flex flex-column justify-content-center" style={ObjectStyle}>
                            <div 
                                className="d-flex justify-content-center" 
                                onMouseOver={(e)=>{setHovered(item.name)}} 
                                onMouseLeave={(e)=>setHovered("")}
                                style={{...IconStyle,...{["transform"]: hovered ===item.name? "scale(1.2)":"scale(1.0)"}}}
                            >
                            <DatabaseIcon fillColor={hovered===item.name ? "rgb(0,100,200)": "rgb(150,200,245)"}/>
                        </div>
                        <label className="text-center" style={{...LabelStyle,...{["color"]: hovered===item.name ? "rgb(0,100,200)":"gray"}}}>{item.label}</label>
                     </div>
                    </FloatingObject>
            ))}
        </div>
  )
}

export default VisualData