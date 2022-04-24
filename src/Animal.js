import { useEffect, useState } from 'react';
import birdImage from "./bird.png"

function Animal(props) {
const [x,setX] = useState(props.direction === 1 ? props.x: props.endX);
const [y, setY] = useState(props.direction === 1? props.waveY: props.endY);
const [hidden,setHidden] = useState(false);
const direction = props.direction;
const MAX_TIMER = 30;

useEffect(() => {
  setHidden(false);
  if(direction === 1){
    let timer = 0;
    let currentX = props.x;
    let currentY = props.waveY;
    const intervalId = setInterval(() => {
     timer++;
     currentX += props.speedX;
     currentY += props.waveY ;
     setX(currentX);
     setY(currentY);
      if((currentX + props.speedX >= 460 && currentX <= 500 && currentY> 540 && currentY <= 780) ){
        clearInterval(intervalId);
        props.reportData({...props,winner:true, endX: currentX, endY:currentY})
        return;
      } else if(currentX > 500 || currentY > 780 || timer > MAX_TIMER){
        clearInterval(intervalId);
        props.reportData({...props, winner:false, endX: currentX, endY:currentY})
        setHidden(true);
        return;
      }
      
    }, 100);
    
    return () => clearInterval(intervalId);
  }else{
    let currentX = props.endX;
    let currentY = props.endY;
    const intervalId = setInterval(() => {
     currentX -= props.speedX;
     currentY -= props.waveY; 
      if((currentX < 5  || currentY < 5) ){
        clearInterval(intervalId);
        props.reportNextGen(props);
        setHidden(true);
        return;
      }
      setX(currentX);
      setY(currentY);
    }, 100);
    
    return () => clearInterval(intervalId);
  }
  
  }, [direction]);

  return (
    <div>
      <div style={{position: 'absolute', left:`${x}px`,top:`${y}px`}}>
       <img style={{height:"15px", width:"15px", opacity:hidden?"0":"1"}} src={birdImage} alt="bird"/> 
    </div>
    </div>
  );
}

export default Animal;