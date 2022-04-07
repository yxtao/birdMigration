import './App.css';
import Cat from './Cat';

function App() {

  return (
    <div>
      <Cat x={20} y={500} speed={50} />
      <Cat x={60} y={100} speed={150} />
    </div>
     
  );
}

export default App;
