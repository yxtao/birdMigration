import { useEffect, useState } from 'react';
import catImage from './cat.png';
import birdImage from "./bird.png"
import './App.css';

function Cat(props) {
const [hidden,setHidden] = useState(false);
const [x,setX] = useState(props.x);
const [y, setY] = useState(props.y)

useEffect(() => {
  let currentX = props.x;
  let currentY = props.y;
    const intervalId = setInterval(() => {
      currentY += props.direction*props.speedY
      currentX += props.speedX;  
      if((currentX+props.speedX >=460 && currentX<= 600 && currentY+props.speedY> 300 && currentY<560) ){
        clearInterval(intervalId);
        props.reportData({index: props.index,x:props.x,y:props.y, winner:true})
        return;
      }
     
      if(currentX > 800 || currentY >800 || currentY <5 ){
        clearInterval(intervalId);
        props.reportData({index: props.index,x:props.x,y:props.y, winner:false})
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
       <img style={{height:"30px", width:"30px", opacity:hidden?"0":"1"}} src={birdImage} alt="cat"/> x:{Math.floor(x)}, y:{Math.floor(y)}} 
    </div>
    </div>
  );
}

export default Cat;