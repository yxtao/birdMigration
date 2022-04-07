import { useEffect, useState } from 'react';
import './App.css';

function Cat(props) {

const [x,setX] = useState(props.x);
const [y, setY] = useState(props.y)

useEffect(() => {
    const intervalId = setInterval(() => {
      setX(prevCount => prevCount + 1);
      setY(prevCount => prevCount + 1);
    }, props.speed);
  
    return () => clearInterval(intervalId);
  }, []);

const handleClick =()=>{
     setX((x)=> x+1);
     setY((y)=> y-1);
}

  return (
    <div>
      <div style={{position: 'absolute', left:`${x}px`,top:`${y}px` }}>
       <button onClick={handleClick}> click {x}and  {y}</button> 
    </div>
    </div>
  );
}

export default Cat;