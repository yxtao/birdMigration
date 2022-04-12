import { useEffect, useState , useRef } from 'react';
import './App.css';
import Animal from './Animal';

function Board() {
  const [results, setResults] = useState([]);
  const [winners, setWinners] = useState([]);
  const [animals, setAnimals] = useState([]);
  const populationNumValue = useRef();
  const [timer, setTimer] = useState(0);
  const [stop,setStop] = useState("no")
  
  const handleData = (e)=>{
     setResults((pre)=>[...pre,e])
     if(e.winner === true){
       setWinners((pre)=>[...pre,e])
     }
  }

 function getRandomArbitrary(min, max) {
    return Math.floor(Math.random() * (max - min) + min);
  }
 const confirmPopulationNum = ()=>{
   setResults([]);
   setWinners([]);
   setAnimals([]);
   setTimer(0)
 }

  const initializePopulation = ()=>{ 
    let temp = [];
    for(let i=0; i<populationNumValue.current.value;i++){
        let creature = {};
        creature.x = getRandomArbitrary(10,100);
        creature.speedX = getRandomArbitrary(5,20);
        creature.waveY = getRandomArbitrary(1,10);
        temp.push(creature)
    }
    setAnimals(temp);
    let count = 0;
    const intervalId = setInterval(()=>{ 
      count++;
      if(count > 5){
         clearInterval(intervalId);
         setStop("yes")
         return;
      }else{
        setTimer(pre=> pre+1);
      }
  }, 1000)
  }
  
 
  useEffect(()=>{
      if(winners.length === 0 && stop === "yes") {
      let temp = [];
      for(let i=0; i<10;i++){
          let creature = {};
          creature.x = getRandomArbitrary(10,100);
          creature.speedX = getRandomArbitrary(5,20);
          creature.waveY = getRandomArbitrary(1,10);
          temp.push(creature)
      }
      setAnimals(temp);
     }
 },[ winners, stop])


useEffect(()=>{

}, [results])
  return (
    <div style={{display : "flex"}}>
      <div style={{height:"700px", width:"800px", border:"1px solid red", marginLeft:"30px", marginTop:"50px",background:"beige"}}>
        <div style={{border:"1px solid green", height:"350px", width:"100px", marginLeft:"400px", marginTop:"300px",background:"#DCF9AD" }}></div>
        {animals.map((animal, index)=>  <Animal key ={index}
                                                index= {index} 
                                                x={animal.x}  
                                                speedX={animal.speedX}  
                                                waveY ={animal.waveY} 
                                                reportData ={handleData}/> )}
      </div>
      <div style={{width:"500px", border:"1px solid blue", marginTop:"50px"}}>
        <div>
          <input 
            type="number"
            min="1"
            max="100"
            ref = {populationNumValue}  />
        </div>
          <button 
              className= "btn btn-outline-primary m-1"
              onClick={confirmPopulationNum}>confirm</button>
        <div>
        {timer} {stop}
          <button 
              className="btn btn-outline-success mt-5"
              onClick={initializePopulation}> 
              initialize population </button>
        </div>
         
          winners: {winners.map((winner,index)=><p key={index}>{winner.index} </p>)}
      </div>
     </div>
  );
}

export default Board;
