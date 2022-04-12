import { useEffect, useState , useRef } from 'react';
import './App.css';
import Animal from './Animal';

function Board() {
  const [results, setResults] = useState([]);
  const [winners, setWinners] = useState([]);
  const [animals, setAnimals] = useState([]);
  const [populationNumValue, setPopulationNumValue] = useState(0);
  const [populationNum, setPopulationNum] = useState(0)
  const [survivalRate, setSurvivalRate] = useState(0)
  const [targetSurvialRateValue, setTargetSurvialRateValue] = useState(1)
  const [targetSurvialRate, setTargetSurvialRate] = useState(1);
  const [nextGen, setNextGen] = useState(false)
  const [parents, setParents] = useState([]);
  const [generationCounts, setGenerationCounts] = useState(0);
  const [flag,setFlag] = useState("none")

  const handleData = (e)=>{
     setResults((pre)=>[...pre, e])
     if(e.winner === true){
       setWinners((pre)=>[...pre, e]);
       setParents((pre)=>[...pre, e])
     }
  }
 
 function getRandomArbitrary(min, max) {
    return Math.floor(Math.random() * (max - min) + min);
  }
  const handleTargetSurvialRateValueChange = (e)=>{
    setTargetSurvialRateValue(e.target.value);
  }
  const handlePopulationNumValueChange = (e)=>{
    setPopulationNumValue(Number(e.target.value))
  }
 const confirmPopulationNum = ()=>{
   populationNumValue>0 && setPopulationNum(populationNumValue)
   setTargetSurvialRate(targetSurvialRateValue*0.01);
   setResults([]);
   setWinners([]);
   setAnimals([]);
 }
  const initializePopulation = ()=>{ 
    setGenerationCounts(1)
    setResults([]);
    setWinners([]);
    setAnimals([]);
    setParents([]);
    let temp = [];
    for(let i=0; i<populationNum;i++){
        let creature = {};
        creature.x = getRandomArbitrary(10,100);
        creature.speedX = getRandomArbitrary(20,30);
        creature.waveY = getRandomArbitrary(1,10);
        temp.push(creature)
    }
    setAnimals(temp);
  }
  useEffect(()=>{ 
    if(populationNum>=30 && survivalRate<targetSurvialRate && results.length === populationNum ){
    setTimeout(()=>{
      setResults([]);
      setWinners([]);
      setAnimals([]);
      setNextGen(true)
    }, 500)
    }
  }, [survivalRate, results, populationNum, targetSurvialRate])

  useEffect(()=>{
    let temp = [...parents];
    setFlag(parents.length)
    if(nextGen === true && animals.length===0){
      setGenerationCounts(pre=>pre+1)
      for(let i=0; i<populationNum-parents.length;i++){
        let creature = {};
        creature.x = getRandomArbitrary(10,100);
        creature.speedX = getRandomArbitrary(20,30);
        creature.waveY = getRandomArbitrary(1,10);
        temp.push(creature)
    }
    setTimeout(()=>{setAnimals(temp)},1000)
    setParents([])
    setNextGen(false)
    }
  },[nextGen, populationNum, animals, parents])

  useEffect(()=>{
     setSurvivalRate(winners.length/populationNum);
  },[results, populationNum, winners])


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
          <p>{flag}</p>
          population number
          <input 
            type="number"
            min="30"
            max="100"
            value={populationNumValue}
            onChange={(e)=>handlePopulationNumValueChange(e)} />
        </div>
        <div>
          survival rate
          <input 
            type="number"
            min="20"
            max="100"
            value={targetSurvialRateValue}
            onChange={(e)=>handleTargetSurvialRateValueChange(e)} /> %
        </div>
          <button 
              className= "btn btn-outline-primary m-1"
              onClick={confirmPopulationNum}>confirm</button>
        <div>
          <button 
              className="btn btn-outline-success mt-5"
              onClick={initializePopulation}> 
              initialize population </button>
        </div> 
          {/* winners: {winners.map((winner,index)=><p key={index}>{winner.index} </p>)} */}
          <div>
            generation counts {generationCounts} Target {targetSurvialRate}
          </div>
          <div>
            survival rate : {survivalRate} {nextGen} 
            <p>{results.length} {populationNum}</p>
          </div>
      </div>
     </div>
  );
}

export default Board;
