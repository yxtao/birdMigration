import { useState } from 'react';
import Board from "./Board";
import Intro from "./Intro";
const App = () =>{
  const CODE_URL = "https://github.com/yxtao/birdMigration"
  const [isGame, setIsGame] = useState(false)
  const handleIntroduction = ()=>{
    setIsGame(false)
  }
  const handleGame = () =>{
    setIsGame(true)
  }
  const handleCheckCode = ()=>{
    window.open(CODE_URL, "_blank");
  }
  return (
    <div className="bg-dark text-white">
      <div className="bg-dark  mt-3 d-flex justify-content-center  ">
        <div style={{borderColor:"orange",borderStyle:"solid",borderWidth:` ${isGame? "0px 0px 0px 0px" : "0px 0px 3px 0px"}`}}>
          <button 
            className="btn btn-dark"
            onClick={handleIntroduction}> introduction 
          </button>
        </div>
        <div className="ml-5 mr-5"></div>
        <div style={{borderColor:"orange",borderStyle:"solid",borderWidth:` ${isGame? "0px 0px 3px 0px" : "0px 0px 0px 0px"}`}}>
          <button 
            className="btn btn-dark"
            onClick={handleGame}> game
          </button>
        </div> 
        <div className="ml-5 mr-5"></div>
        <div>
          <button 
            className="btn btn-dark"
            onClick={handleCheckCode}> code 
          </button>
        </div> 
      </div>
      
       {isGame? <Board/> : <Intro />}
     </div>
  );
}

export default App;
