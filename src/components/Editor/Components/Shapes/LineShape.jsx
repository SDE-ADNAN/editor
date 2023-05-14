import React, { useEffect, useRef, useState } from 'react'
import { Line, Transformer } from 'react-konva'

function LineShape() {
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


  return (<><Line
          x={20}
          y={200}
          points={[0, 0, 100, 0, 100, 100]}
          tension={0.9}
          onClick={()=>{setIsSelected(true)}}
          onDblClick={()=>{setIsSelected(false)}}
          closed
          ref={shapeRef}
          stroke="black"
          fillLinearGradientStartPoint={{ x: -50, y: -50 }}
          fillLinearGradientEndPoint={{ x: 50, y: 50 }}
          fillLinearGradientColorStops={[0, "red", 1, "yellow"]}
          draggable
        />
         {isSelected && (
      <Transformer
        ref={trRef}
        boundBoxFunc={(oldBox, newBox) => {
          // limit resize
          if (newBox.width < 5 || newBox.height < 5) {
            return oldBox;
          }
          return newBox;
        }}
      />
    )}</>
    
  )
}

export default LineShape