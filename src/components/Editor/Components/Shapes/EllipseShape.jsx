import React, { useEffect, useRef, useState } from 'react'
import { Ellipse, Transformer } from 'react-konva'

function EllipseShape() {

  const [isSelected,setIsSelected]=useState(false);

  const shapeRef = useRef();
  const trRef = useRef();

  useEffect(() => {
    if (isSelected) {
      // we need to attach transformer manually
      trRef.current.nodes([shapeRef.current]);
      trRef.current.getLayer().batchDraw();
    }
  }, [isSelected]);
  return (<><Ellipse
        x={200}
        y={400}
        onClick={()=>{setIsSelected(true)}}
        onDblClick={()=>{setIsSelected(false)}}
        ref={shapeRef}
        radiusX={100}
        radiusY={50}
        fill={'yellow'}
        stroke={ 'black'}
        strokeWidth= {4}
        draggable/>
        {isSelected && (
          <Transformer
            ref={trRef}
            boundBoxFunc={(oldBox, newBox) => {
              // limit resize
              if (newBox.width < 5 || newBox.height < 5) {
                return oldBox;
              }
              return newBox;
            }}/>)}
        
        </>
        
    
  )
}

export default EllipseShape