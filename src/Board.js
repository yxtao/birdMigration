import { useEffect, useState , useRef } from 'react';
import './App.css';
import Animal from './Animal';
import skyImage from './sky.png';
import landImage from './land.png';

function Board() {
  const [results, setResults] = useState([]);
  const [winners, setWinners] = useState([]);
  const [failers, setFailers] = useState([]);
  const [animals, setAnimals] = useState([]);
  const [populationNumValue, setPopulationNumValue] = useState(80);
  const [populationNum, setPopulationNum] = useState(0)
  const [survivalRate, setSurvivalRate] = useState(50)
  const [targetSurvialRateValue, setTargetSurvialRateValue] = useState(60)
  const [targetSurvialRate, setTargetSurvialRate] = useState(1);
  const [targetCrossRateValue, setTargetCrossRateValue] = useState(60)
  const [targetCrossRate, setTargetCrossRate] = useState(60);
  const [targetMultationRateValue, setTargetMultationRateValue] = useState(1)
  const [targetMultationRate, setTargetMultationRate] = useState(1);
  const [nextGen, setNextGen] = useState(false)
  const [parents, setParents] = useState([]);
  const [generationCounts, setGenerationCounts] = useState(0);
  const [flag,setFlag] = useState("none");
  const [isStartDisabled, setIsStartDisabled] = useState(true)

  const handleData = (e)=>{
     setResults((pre)=>[...pre, e])
     if(e.winner === true){
       setWinners((pre)=>[...pre, e]);
       setParents((pre)=>[...pre, e]);
     }else{
       setFailers((pre)=>[...pre,e])
     }
  }
 
 function getRandomArbitrary(min, max) {
    return Math.floor(Math.random() * (max - min) + min);
  }
  const handleTargetSurvialRateValueChange = (e)=>{
    setTargetSurvialRateValue(e.target.value);
  }
  const handleTargetCrossRateValueChange = (e)=>{
    setTargetCrossRateValue(e.target.value);
  }
  const handleTargetMultationRateValueChange = (e)=>{
    setTargetMultationRateValue(e.target.value);
  }
  const handlePopulationNumValueChange = (e)=>{
    setPopulationNumValue(Number(e.target.value))
  }
 const confirmPopulationNum = ()=>{
   populationNumValue>0 && setPopulationNum(populationNumValue)
   setTargetSurvialRate(targetSurvialRateValue*0.01);
   setTargetCrossRate(targetCrossRateValue*0.01);
   setTargetMultationRate(targetMultationRateValue*0.01);
   setIsStartDisabled(false)
   setResults([]);
   setWinners([]);
   setAnimals([]);
 }
  const initializePopulation = ()=>{ 
    setIsStartDisabled(true)
    setGenerationCounts(1)
    setResults([]);
    setWinners([]);
    setFailers([]);
    setAnimals([]);
    setParents([]);
    let temp = [];
    for(let i=0; i<populationNum;i++){
        let creature = {};
        creature.x = getRandomArbitrary(1,20);
        creature.speedX = getRandomArbitrary(10,30);
        creature.waveY = getRandomArbitrary(1,50);
        temp.push(creature)
    }
    setAnimals(temp);
  }
  useEffect(()=>{ 
    if(populationNum>=80 && survivalRate<targetSurvialRate && results.length === populationNum ){
    setTimeout(()=>{
      setResults([]);
      setWinners([]);
      setFailers([]);
      setAnimals([]);
      setNextGen(true)
    }, 10)
    }
  }, [survivalRate, results, populationNum, targetSurvialRate])

  useEffect(()=>{
    
    //setFlag(`cross count ${crossCount} clone count ${cloneCount} left count ${leftCounts} total=${leftCounts+crossCount+cloneCount}`)
    if(nextGen === true && animals.length===0){

    let parentsCopy = [...parents];
    let failersCopy = [...failers];
    let startXsFail = [];
    let speedXsFail =[];
    let waveYsFail = [];
    if(failersCopy.length>0){
      failersCopy.forEach((e)=>{
        startXsFail.push(e.x);
        speedXsFail.push(e.speedX);
        waveYsFail.push(e.waveY)
    })
  }
    let startXs = [];
    let speedXs =[];
    let waveYs = [];
   
    if(parentsCopy.length>0){
        parentsCopy.forEach((e)=>{
          !startXsFail.includes(e.x)&& startXs.push(e.x);
          !speedXsFail.includes(e.speedX) && speedXs.push(e.speedX);
          !waveYsFail.includes(e.waveY) && waveYs.push(e.waveY)
      })
    }
    let crossRate = targetCrossRate;
    let crossCount = Math.floor(populationNum*crossRate);
    let temp = [];
    for (let i=0; i<crossCount; i++){
      let startXindex =  getRandomArbitrary(0, startXs.length);
      let speedXIndex = getRandomArbitrary(0, speedXs.length);
      let waveYIndex = getRandomArbitrary(0, waveYs.length);
      let obj = {};
      obj.x = startXs[startXindex];
      obj.speedX = speedXs[speedXIndex];
      obj.waveY = waveYs[waveYIndex]; 
      temp.push(obj);
    }
    let multationNum = Math.floor(targetMultationRate * populationNum)
    for(let i=0; i<multationNum;i++){
      let creature = {};
      creature.x = getRandomArbitrary(1,20);
      creature.speedX = getRandomArbitrary(10,30);
      creature.waveY = getRandomArbitrary(1,50);
       
      temp.push(creature)
      
  }
   
    let cloneCount = populationNum - crossCount - multationNum;
    let cloneNums = cloneCount;
    while(cloneNums > 0){
      let parentIndex = getRandomArbitrary(0,parentsCopy.length);
      temp.push(parentsCopy[parentIndex]);
      cloneNums--;
    }
   //setFlag(`temp ${temp.length} cross count ${crossCount} multationNum ${multationNum} clonecount ${cloneCount} 
   //total ${crossCount + multationNum+cloneCount}`)
   
    setGenerationCounts(pre=>pre+1)
    setTimeout(()=>{
      setAnimals(temp); 
      setParents([])
      setNextGen(false)
    },10) 
    }
 //   setFlag(animals.length)
  },[nextGen, populationNum, animals, parents, failers, targetCrossRate, targetMultationRate])

  useEffect(()=>{
     setSurvivalRate(winners.length/populationNum);
  },[results, populationNum, winners])


  return (
    <div style={{display : "flex" , border: "1px solid white", margin: "50px", height:"900px"}}>
      <div style={{height:"700px", width:"800px", marginLeft:"30px", marginTop:"30px",background:"white"}}>
        <div style={{height:"270px", width:"110px", marginLeft:"340px", marginTop:"370px",background:"#DCF9AD" }}></div>
        {animals.map((animal, index)=>  <Animal key ={index}
                                                index= {index} 
                                                x={animal.x}  
                                                speedX={animal.speedX}  
                                                waveY ={animal.waveY} 
                                                reportData ={handleData}/> )}
      </div>
      <div style={{width:"500px", marginTop:"50px", padding:"10px"}}>
        <div className="mb-3">
          
          population number
          <input 
            type="range"
            min="80"
            max="150"
            value={populationNumValue}
            onChange={(e)=>handlePopulationNumValueChange(e)} /> {populationNumValue}
        </div>
        <div className="mb-3">
          survival rate
          <input 
            type="range"
            min="50"
            max="100"
            value={targetSurvialRateValue}
            onChange={(e)=>handleTargetSurvialRateValueChange(e)} /> {targetSurvialRateValue}%  
        </div>
        <div className="mb-3">
          cross rate
          <input 
            type="range"
            min="10"
            max="90"
            value={targetCrossRateValue}
            onChange={(e)=>handleTargetCrossRateValueChange(e)} /> {targetCrossRateValue}%  
        </div>
        <div className="mb-3">
          multation rate
          <input 
            type="range"
            min="1"
            max="10"
            value={targetMultationRateValue}
            onChange={(e)=>handleTargetMultationRateValueChange(e)} /> {targetMultationRateValue}%  
        </div>
          <button 
              className= "btn btn-outline-light mb-3"
              onClick={confirmPopulationNum}>confirm</button>
        <div>
          <button 
              className="btn btn-outline-light mb-3"
              onClick={initializePopulation}
              disabled={isStartDisabled}> 
              start </button>
        </div> 
          {/* winners: {winners.map((winner,index)=><p key={index}>{winner.index} </p>)} */}
          <div>
            Generation counts: {generationCounts}
          </div>
          <div>
          Target survival rate: {targetSurvialRate}
          </div>
          <div>
          Gurrent survival rate : {survivalRate} {nextGen} 
          </div>
      </div>
     </div>
  );
}

export default Board;
