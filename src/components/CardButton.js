import React, {useState, useEffect} from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { setCurrentPage, setPageList } from '../redux/slices/navSlice'
import Svg from "./Svg"

const CardButton = (props) => {

const dispatch = useDispatch()

const DefaultStyle = {
  fillColor: "linear-gradient(180deg, rgb(200,225,255), rgb(0,100,225))",
  hoveredColor:"linear-gradient(180deg, rgb(245,250,255), rgb(200,225,255))",
  iconFillColor: "white",
  hoveredIconColor: "rgb(0,100,225)",
  labelColor: "white",
  hoveredLabelColor: "rgb(0,100,225)",
  height: "125px",
  width: "175px",
  iconHeigth: "50px",
  iconWidth: "50px",
  labelFontSize: "16px",
}

const item = props.item
const fillColor = props.fillColor || DefaultStyle.fillColor
const hoveredColor = props.hoveredColor || DefaultStyle.hoveredColor
const iconFillColor = props.iconFillColor || DefaultStyle.iconFillColor
const hoveredIconColor = props.hoveredIconColor || DefaultStyle.hoveredIconColor
const labelColor = props.labelColor || DefaultStyle.labelColor
const hoveredLabelColor = props.hoveredLabelColor|| DefaultStyle.hoveredLabelColor
const height = props.height || DefaultStyle.height
const width = props.width || DefaultStyle.width
const iconHeight = props.iconHeight || DefaultStyle.iconHeigth
const iconWidth = props.iconWidth || DefaultStyle.iconWidth
const labelFontSize = props.iconWidth || DefaultStyle.labelFontSize

const [hoveredItem, setHoveredItem] = useState("none");
const hover = (e,itemName)=>{
    setHoveredItem(e.type ==="mouseover" ? itemName : "none")
}

const ModuleButtonStyle = {
  display: "flex-box",
  alignItems: "center",
  justifyContent: "center",
  flexDirection: "column",
  height: height,
  width: width,
  borderRadius: "10px",
  boxShadow: "5px 5px 10px lightgray",
  fontSize: "24px",
  cursor: "pointer",
  transition: "0.5s",
  margin: "10px"
}

const ModuleButtonStyleHovered = {
  ...ModuleButtonStyle,
  ...{["backgroundImage"]:hoveredItem ===item.name? hoveredColor: fillColor},
  ...{["color"]:hoveredItem ===item.name? hoveredColor: fillColor},
  ...{["transform"]:hoveredItem ===item.name?"scale(1.1)":"scale(1.0)"}
}

const IconStyle = {
    height: iconHeight,
    width: iconWidth,
    opacity: "1",
    cursor: "pointer",
    transition: "0.5s"
}

const ModuleItemLabelStyle = {
  display: "flex-box",
  alignItems: 'center',
  textShadow: "5px 5px 5px 0.5",
  marginTop: "10px",
  transition: "0.5s",
  fontSize: labelFontSize
}

const ModuleItemLabelStyleHovered = {
  ...ModuleItemLabelStyle,
  ...{["backgroundImage"]:hoveredItem ===item.name? hoveredColor: fillColor},
  ...{["color"]:hoveredItem ===item.name? hoveredColor: fillColor},
  ...{["transform"]:hoveredItem ===item.name?"scale(1.1)":"scale(1.0)"}
}


  return (
    <div 
        id={item.name}
        name={item.name}
        className={"d-flex align-items-center justify-contents-center"}
        style={{...ModuleButtonStyle,
            ...{["backgroundImage"]:hoveredItem ===item.name? hoveredColor: fillColor},
            ...{["color"]:hoveredItem ===item.name? hoveredColor: fillColor},
            ...{["transform"]:hoveredItem ===item.name?"scale(1.1)":"scale(1.0)"}
        }}
        key={item.id}
        onClick={(e)=>dispatch(setCurrentPage(item.name))}
        onMouseOver = {(e)=>hover(e, item.name)}
        onMouseLeave = {(e)=>hover(e,item.name)}
    >
        <Svg
            id={`${item.name}_icon`}
            style = {IconStyle}
            name={item.name}
            iconName={item.icon}
            fillColor={hoveredItem === item.name ? hoveredIconColor: iconFillColor}
            fillOpacity={IconStyle.opacity}
            height = {IconStyle.height}
            width = {IconStyle.width}
            hoveredItem = {hoveredItem}
            onClick={(e, item) => dispatch(setCurrentPage(item.name))}
        />

            <div 
                id={`menu_item_${item.name}_label`}
                name={item.name}
                className="d-flex ms-2"
                style={{...ModuleItemLabelStyle,
                  ...{["color"]:hoveredItem === item.name ? hoveredLabelColor: labelColor},
                }}
                onClick={(e)=>dispatch(setCurrentPage(item.name))}
            >
                {item.label} 
            </div>
    </div>
  )
}

export default CardButton