import React, {useState,useRef,useEffect} from 'react';
import { CloseButton } from 'react-bootstrap';
import { Group, Image, Transformer } from 'react-konva';

function AddedImage (props){
 const [image,setImage]=useState(null);
 const [isSelected,setIsSelected]=useState(true);

 const deleteRef =useRef();
 const imageNodeRef = useRef();
 const transformerRef = useRef();



 useEffect(() => {
  loadImage()
 }, []);


 const checkNode=()=> {
    // transormerı ayarlar
    const selectedNode = imageNodeRef.current;
    const deleteNode = deleteRef.current;
    transformerRef.current.add(deleteNode)
    if (isSelected) {
        transformerRef.current.nodes([selectedNode]);
      deleteNode.position(transformerRef.current.findOne('.top-right').position());
    }
    else {
        transformerRef.current.detach();
    }
    transformerRef.current.getLayer().batchDraw();
  }

  useEffect((oldProps) => {
    if (oldProps.src !==props.src) {
        loadImage();
      }
   
  
    return () => {
        this.image.removeEventListener('load', handleLoad);
    };
  }, [props.src]);
  
  const handleSelected = () => {
      setIsSelected(!isSelected)
    
  }

  const handleSelect = () => {

    handleSelected()

    if (isSelected === true) {
      checkNode()
      props.selectedImage(props.index);
    }
    else {
      props.selectedImage(null);
    }
  }

  const loadImage=()=> {
    // save to "this" to remove "load" handler on unmount
    image = new window.Image();
    image.crossOrigin = "anonymous";
    image.src = props.src;
    image.width = 300;
    image.width = 300;

    image.addEventListener('load', handleLoad);
  }

  const handleLoad =()=>{
      setImage(image);
      checkNode();
  }
 


  return (
      <>
        <Group draggable
          onClick={handleSelect}
          onTouchStart={handleSelect}
          ref={imageNodeRef}
        >

          <Image
            image={image}
            {...props.properties}
          />
        </Group>
        {isSelected &&
          <Group>

            <Transformer
              ref={transformerRef}
              onTransformEnd={handleSelected}
              onTransform={(e) => { deleteRef.current.position(e.currentTarget.findOne('.top-right').position()) }}
            />
            <CloseButton deleteRef={deleteRef} delete={props.deleteImage} />
          </Group>
}

  </>);
}

export default AddedImage;

