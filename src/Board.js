import { useEffect, useState } from 'react';
import './App.css';
import Animal from './Animal';

function Board() {
  const [results, setResults] = useState([]);
  const [animals, setAnimals] = useState([]);
  const handleData = (e)=>{
     setResults((pre)=>[...pre,e])
 }

 function getRandomArbitrary(min, max) {
    return Math.random() * (max - min) + min;
  }
 useEffect(()=>{
    if( results.length === 0){
      let temp = [];
      for(let i=0; i<10;i++){
          let creature = {};
          creature.x = getRandomArbitrary(5,50);
          creature.y = getRandomArbitrary(10,600);
          creature.speedX = getRandomArbitrary(5,15);
          creature.speedY = getRandomArbitrary(5,25);
          creature.direction = getRandomArbitrary(0,10) >=5 ? 1 : -1;
          temp.push(creature)
      }
      setAnimals(temp);
    }
 },[results])
 
  return (
    <div style={{display : "flex"}}>
      <div style={{height:"700px", width:"800px", border:"1px solid red", marginLeft:"30px", marginTop:"50px",background:"beige"}}>
        <div style={{border:"1px solid green", height:"200px", width:"200px", marginLeft:"400px", marginTop:"300px",background:"#DCF9AD" }}></div>
        {animals.map((animal, index)=>  <Animal key ={index} index= {index} x={animal.x}   y={animal.y}  speedX={animal.speedX}  
        speedY={animal.speedY}  direction = {animal.direction} reportData ={handleData}/> )}
      </div>
      <div style={{width:"500px", border:"1px solid blue", marginTop:"50px"}}>
          winners: {results.filter((result)=>result.winner === true).map((winner,index)=> <div key={index}> {winner.index}</div>)}
          {/* failed: {results.filter((result)=>result.winner === false).map((winner,index)=> <div key={index}> {winner.index}</div>)} */}
      </div>
     </div>
  );
}

export default Board;
