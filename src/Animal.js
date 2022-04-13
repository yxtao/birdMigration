import { useEffect, useState } from 'react';
import catImage from './cat.png';
import birdImage from "./bird.png"
import './App.css';

function Cat(props) {
const [hidden,setHidden] = useState(false);
const [x,setX] = useState(props.x);
const [y, setY] = useState(props.waveY*props.x)

useEffect(() => {
  let currentX = props.x;
  let currentY = props.waveY;
    const intervalId = setInterval(() => {
     currentX += props.speedX;
     currentY += props.waveY 
      if((currentX+props.speedX >=460 && currentX<= 500 && currentY> 540 && currentY<=780) ){
        clearInterval(intervalId);
        props.reportData({...props,winner:true})
        return;
      }
     
      if(currentX > 500 || currentY >780 ){
        clearInterval(intervalId);
        props.reportData({...props, winner:false})
        setHidden(true);
        return;
      }
      setX(currentX);
      setY(currentY);
    }, 100);
    
    return () => clearInterval(intervalId);
  }, []);

  return (
    <div>
      <div style={{position: 'absolute', left:`${x}px`,top:`${y}px`}}>
       <img style={{height:"30px", width:"30px", opacity:hidden?"0":"1"}} src={birdImage} alt="bird"/> 
    </div>
    </div>
  );
}

export default Cat;