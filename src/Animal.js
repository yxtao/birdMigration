import { useEffect, useState } from 'react';
import birdImage from "./bird.png";
import birdBackImage from './birdBack.png';

function Animal(props) {
const [x,setX] = useState(props.direction === 1 ? props.x: props.endX);
const [y, setY] = useState(props.direction === 1? props.waveY: props.endY);
const [hidden,setHidden] = useState(false);
const direction = props.direction;
const MAX_TIMER = 40;

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
      if((currentX + props.speedX >= 460 && currentX <= 520 && currentY> 540 && currentY <= 750) ){
        clearInterval(intervalId);
        props.reportData({...props,winner:true, endX: currentX, endY:currentY})
        return;
      } else if(currentX > 520 || currentY > 750 || timer > MAX_TIMER){
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
    let timer = 0;
    const intervalId = setInterval(() => {
     currentX -= props.speedX;
     currentY -= props.waveY; 
     timer++;
      if((timer > MAX_TIMER ) ){
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
       <img style={{height:"8px", width:"8px", opacity:hidden?"0":"1"}} src={direction===1 ?birdImage: birdBackImage} alt="bird"/>
    </div>
    </div>
  );
}

export default Animal;
