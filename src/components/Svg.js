import React, {Suspense} from 'react';

const Svg = ({ iconName, height, width, fillColor, fillOpacity, hoveredColor, isHovered, cursor}) => {

  const SvgImage = React.lazy(() => import(`./svgs/${iconName}.js`));

  const IconStyle={
    height: height !=null? height :"50px",
    width:  width !=null? width : "50px",
    cursor: cursor !=null? height:"pointer"
  }

  return (
    <div className="d-flex justify-content-center align-items-center" style={IconStyle}>
      <Suspense>
        <SvgImage 
           fillColor = {fillColor}
           fillOpacity = {fillOpacity}
           hoveredColor = {hoveredColor}
           isHovered = {isHovered}
        />
      </Suspense>
    </div>
  )
};

export default Svg;





