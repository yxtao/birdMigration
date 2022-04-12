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
  let currentY = props.waveY*currentX;
    const intervalId = setInterval(() => {
     currentX += props.speedX;
     currentY = 0.5*props.waveY*currentX; 
      if((currentX+props.speedX >=460 && currentX<= 500 && currentY> 320 && currentY<700) ){
        clearInterval(intervalId);
        props.reportData({...props,winner:true})
        return;
      }
     
      if(currentX > 800 || currentY >800 || currentY <5 ){
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
       <img style={{height:"30px", width:"30px", opacity:hidden?"0":"1"}} src={birdImage} alt="cat"/>
    </div>
    </div>
  );
}

export default Cat;