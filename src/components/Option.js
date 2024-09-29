import React, {useState} from 'react'
import * as iconsApi from "../apis/icons"

const Option = (props)=>{

    const name = props.name
    const onClick = props.onClick
    const iconName = props.iconName
    const onHoverHint = props.onHoverHint
    const label = props.label
    const marginTop = props.marginTop
    const marginLeft = props.marginLeft
    const marginRight = props.marginRight
    const marginBottom = props.marginBottom
    const hoverColor = props.hoverColor
    const hoverTextColor = props.hoverTextColor

    const [hovered, setHovered] = useState(false)
    
    const ButtonStyle={
        display: "flex",
        alignItems: "center",
        height: "100px",
        width: "80%",
        backgroundColor: "white",
        borderRadius: "10px",
        shadow: "5px 5px 5px rgb(0,0,0,0.5)",
        cursor: "pointer",
        transition: "0.3s",
        marginTop: marginTop !=null ? marginTop : "5px",
        marginLeft:  marginLeft  !=null ? marginLeft : "5px",
        marginRight: marginRight  !=null ? marginRight : "5px",
        marginBottom: marginBottom  !=null ? marginRight : "5px",
       }
    
       const ButtonStyleHover = {...ButtonStyle,
        ...{["backgroundColor"]:"rgb(235,245,255)"},
        ...{["color"]:"rgb(0,100,255)"},
        ...{["boxShadow"]:"5px 5px 10px rgba(0,0,0,.25)"},
        ...{["border"]:"1px solid lightgray"},
       }
    
       const ButtonLabelStyle={
        display: "flex",
        alignItems: "center",
        height: "100%",
        width: "100%",
        cursor: "pointer",
        color: "black",
        marginLeft: "20px",
       }

       const IconStyle = {
            height: "50px",
            width: "50px"
       }

       const handleClick = (e)=>{
        console.log("clicking")
            if(typeof onClick ==="function"){
                onClick()
            }
       }

    return(
        <div 
            onClick={(e)=>handleClick(e)}
            onMouseOver={(e)=>setHovered(true)}
            onMouseLeave={(e)=>setHovered(false)}
            style={hovered? ButtonStyleHover : ButtonStyle}
          >
            {iconName !=null && <img 
              title = {onHoverHint}
              name={name}
              src={`${iconsApi.generalIcons}/${iconName}`}
            />}
            <label style={ButtonLabelStyle}>{label}</label>
          </div>
      )
   }

   export default Option