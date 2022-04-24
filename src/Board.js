import { useEffect, useState } from 'react';
import './Board.css';
import Animal from './Animal';

function Board() {
  const MIN_POPULATION = 80;
  const MAXGEN = 50;
  const [results, setResults] = useState([]);
  const [winners, setWinners] = useState([]);
  const [failers, setFailers] = useState([]);
  const [animals, setAnimals] = useState([]);
  const [populationNumValue, setPopulationNumValue] = useState(MIN_POPULATION);
  const [populationNum, setPopulationNum] = useState(0)
  const [survivalRate, setSurvivalRate] = useState(50)
  const [targetSurvialRateValue, setTargetSurvialRateValue] = useState(60)
  const [targetSurvialRate, setTargetSurvialRate] = useState(1);
  const [targetCrossRateValue, setTargetCrossRateValue] = useState(60)
  const [targetCrossRate, setTargetCrossRate] = useState(60);
  const [targetMutationRateValue, setTargetMutationRateValue] = useState(1)
  const [targetMutationRate, setTargetMutationRate] = useState(1);
  const [nextGen, setNextGen] = useState(false)
  const [parents, setParents] = useState([]);
  const [generationCounts, setGenerationCounts] = useState(0);
  const [flag,setFlag] = useState("none");
  const [isStartDisabled, setIsStartDisabled] = useState(true);
  const [backAnimals, setBackAnimals] = useState([]);
  const [direction, setDirection] = useState(1);
  const [survivals,setSurvivals] = useState([]);
  
 function getRandomArbitrary(min, max) {
    return Math.floor(Math.random() * (max - min) + min);
  }
  const handleTargetSurvialRateValueChange = (e) => {
    setTargetSurvialRateValue(e.target.value);
  }
  const handleTargetCrossRateValueChange = (e) => {
    setTargetCrossRateValue(e.target.value);
  }
  const handleTargetMutationRateValueChange = (e) => {
    setTargetMutationRateValue(e.target.value);
  }
  const handlePopulationNumValueChange = (e) => {
    setPopulationNumValue(Number(e.target.value))
  }

 const confirmPopulationNum = () => {
   populationNumValue > 0 && setPopulationNum(populationNumValue)
   setTargetSurvialRate((targetSurvialRateValue*0.01).toFixed(2));
   setTargetCrossRate(targetCrossRateValue*0.01);
   setTargetMutationRate(targetMutationRateValue*0.01);
   setIsStartDisabled(false)
   setResults([]);
   setWinners([]);
   setAnimals([]);
 }

  const initializePopulation = () => { 
    setIsStartDisabled(true)
    setGenerationCounts(1)
    setResults([]);
    setWinners([]);
    setFailers([]);
    setAnimals([]);
    setParents([]);
    let temp = [];
    for(let i = 0; i < populationNum;i++){
        let creature = {};
        creature.direction = 1;
        creature.x = getRandomArbitrary(5,20);
        creature.speedX = getRandomArbitrary(10,30);
        creature.waveY = getRandomArbitrary(10,50);
        temp.push(creature)
    }
    setAnimals(temp);
  }

  const handleData = (e) => {
    setResults((pre) => [...pre, e])
    if(e.winner === true){
      setWinners((pre) => [...pre, e]);
      setParents((pre) => [...pre, e]);
    }else{
      setFailers((pre) => [...pre,e])
    }
 }
  
  useEffect(() => {
    setSurvivalRate(winners.length/populationNum);
  },[results, populationNum, winners])

  useEffect(() => { 
    if(populationNum >= MIN_POPULATION
      && survivalRate < targetSurvialRate 
      && generationCounts < MAXGEN 
      && results.length === populationNum ){
    setTimeout(() => {  
      let temp = [];
      winners.forEach((obj) => {
         temp.push(obj);
      })
      setSurvivals(temp);
      setDirection(-1);
      setResults([]);
    }, 1000)
    }
  }, [survivalRate, 
      results, 
      populationNum, 
      targetSurvialRate, 
      generationCounts, 
      winners, 
      direction])

  useEffect(() => {
    let temp = [];
     if(direction === -1){ 
       survivals.forEach((obj) => {
         temp.push(obj)
       })    
      setAnimals(temp);
     }
  }, [direction, survivals])

  const handleReportNextGen = (e) => {
    setBackAnimals((pre) => [...pre,e]);
 }

  useEffect(() => {
    if(backAnimals.length === survivals.length 
      && direction === -1
      && survivalRate < targetSurvialRate  
      && generationCounts< MAXGEN ){
      setNextGen(true);
      setGenerationCounts(pre => pre+1)
      let temp = [];
      backAnimals.forEach((obj) => {
        temp.push(obj);
      })
      setParents(temp);
      setDirection(1);
     }
 },[backAnimals, 
    animals, 
    direction, 
    survivals.length, 
    survivalRate, 
    targetSurvialRate, 
    generationCounts])

  useEffect(()=>{  
    if(nextGen === true && direction === 1 ){
    let parentsCopy = [...parents];
    let failersCopy = [...failers];
    let startXsFail = [];
    let speedXsFail = [];
    let waveYsFail = [];
    if(failersCopy.length > 0){
      failersCopy.forEach((e) => {
        startXsFail.push(e.x);
        speedXsFail.push(e.speedX);
        waveYsFail.push(e.waveY)
    })
  }
    let startXs = [];
    let speedXs =[];
    let waveYs = []; 
    if(parentsCopy.length > 0){
        parentsCopy.forEach((e) => {
          !startXsFail.includes(e.x) && startXs.push(e.x);
          !speedXsFail.includes(e.speedX) && speedXs.push(e.speedX);
          !waveYsFail.includes(e.waveY) && waveYs.push(e.waveY)
      })
    }

    let crossRate = targetCrossRate;
    let crossCount = Math.floor(populationNum*crossRate);
    let temp = [];
    for (let i = 0; i<crossCount; i++){
      let startXindex =  getRandomArbitrary(0, startXs.length);
      let speedXIndex = getRandomArbitrary(0, speedXs.length);
      let waveYIndex = getRandomArbitrary(0, waveYs.length);
      let obj = {};
      obj.x = startXs[startXindex];
      obj.speedX = speedXs[speedXIndex];
      obj.waveY = waveYs[waveYIndex]; 
      temp.push(obj);
    }

    let mutationNum = Math.floor(targetMutationRate * populationNum)
    for (let i = 0; i < mutationNum; i++){
      let startXindex =  getRandomArbitrary(0, startXs.length);
      let speedXIndex = getRandomArbitrary(0, speedXs.length);
      let waveYIndex = getRandomArbitrary(0, waveYs.length);
      let obj = {};
      obj.x = startXs[startXindex];
      obj.speedX = speedXs[speedXIndex];
      obj.waveY = waveYs[waveYIndex]; 
      let mutationIndex = getRandomArbitrary(0,3);
      if(mutationIndex === 0){
        obj.x = getRandomArbitrary(5,20);
      }else if(mutationIndex === 1){
        obj.speedX = getRandomArbitrary(10,30);
      }else{
        obj.waveY = getRandomArbitrary(10,50);
      }
      temp.push(obj);
    }
   
    let cloneCount = populationNum - crossCount - mutationNum;
    let cloneNums = cloneCount;
    while(cloneNums > 0){
      let parentIndex = getRandomArbitrary(0,parentsCopy.length);
      temp.push(parentsCopy[parentIndex]);
      cloneNums--;
    }

    setTimeout(() => {
      setAnimals(temp); 
      setWinners([]);
      setFailers([]);
      setResults([]);
      setSurvivals([]);
      setBackAnimals([]);
      setNextGen(false)
    },100) 
  }
  },[nextGen,
    populationNum, 
    animals, 
    parents, 
    failers, 
    targetCrossRate, 
    targetMutationRate, 
    direction])

  return (
    <div style={{display : "flex" , border: "1px solid white", margin: "50px", height:"900px"}}>
      <div style={{height:"700px", width:"800px", marginLeft:"30px", marginTop:"30px",background:"white"}}>
        <div style={{height:"270px", width:"110px", marginLeft:"320px", marginTop:"370px",background:"#DCF9AD" }}>
          <div className="text-danger p-3"> Destination Island </div>
        </div>
        { animals.length>0 && animals.map((animal, index)=> <Animal key ={index}
                                                index= {index} 
                                                x={animal.x}  
                                                endX = {"endX" in animal? animal.endX : 400}
                                                speedX={animal.speedX}  
                                                waveY ={animal.waveY} 
                                                endY = {"endY" in animal? animal.endY: 680}  
                                                reportData ={handleData}
                                                reportNextGen = {handleReportNextGen}
                                                direction = {direction}/> )}
      </div>
      <div id="info" className="info_div">
        <div className="mb-3">
          population number
          <input 
            type="range"
            min={MIN_POPULATION}
            max="150"
            value={populationNumValue}
            onChange={(e)=>handlePopulationNumValueChange(e)} /> {populationNumValue}
        </div>
        <div className="mb-3">
          survival rate 
          <input 
            type="range"
            min="60"
            max="95"
            value={targetSurvialRateValue}
            onChange={(e)=>handleTargetSurvialRateValueChange(e)} /> {targetSurvialRateValue}%  
        </div>
        <div className="mb-3">
          cross rate
          <input 
            type="range"
            min="50"
            max="80"
            value={targetCrossRateValue}
            onChange={(e)=>handleTargetCrossRateValueChange(e)} /> {targetCrossRateValue}%  
        </div>
        <div className="mb-3">
          mutation rate
          <input 
            type="range"
            min="1"
            max="5"
            value={targetMutationRateValue}
            onChange={(e)=>handleTargetMutationRateValueChange(e)} /> {targetMutationRateValue}%  
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
          <div>
            Generation counts: {generationCounts}
          </div>
          <div>
          Target survival rate: {targetSurvialRate}
          </div>
          <div>
          Current survival rate : {survivalRate} {nextGen} 
          </div>
          <div>
            {generationCounts >= MAXGEN && "The program is terminated, because it exceeded the max generation counts"}
            {survivalRate>=targetSurvialRate 
            && <ul> The birds have reached the target survival rate, here are their gene data
               {winners.map((animal, index)=><li key={index}> ({animal.x} , {animal.waveY}, {animal.speedX})</li> )}
              </ul>}
          </div>
      </div>
     </div>
  );
}

export default Board;
