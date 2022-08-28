import './App.css';
import { Convector } from './components/convector/Convector';

function App() {
  return (
    <div className="App">
     <Convector value={0} currency="UAH" onChangeCurrency={(cur) => console.log(cur)} />
     <Convector value={0} currency="USD"/>
    </div>
  );
}

export default App;
