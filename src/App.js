import { useState } from 'react';
import Board from "./Board";
import Intro from "./Intro";
const App = () =>{
  const [isGame, setIsGame] = useState(false)
  const handleIntroduction = ()=>{
    setIsGame(false)
  }
  const handleGame = () =>{
    setIsGame(true)
  }
  return (
    <div className="bg-dark text-white">
      <div className="bg-dark  mt-3 d-flex justify-content-center  ">
        <button 
          className="btn btn-dark"
          onClick={handleIntroduction}> introduction </button>
        <div className="ml-5 mr-5"></div>
        <button 
          className="btn btn-dark"
          onClick={handleGame}> game</button>
      </div>
      
       {isGame? <Board/> : <Intro />}
     </div>
  );
}

export default App;
