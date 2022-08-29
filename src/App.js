import { useEffect, useRef, useState } from 'react';
import './App.css';
import { Convector } from './components/convector/Convector';

function App() {
  const [oneCurrency, setOneCurrency] = useState('UAH');
  const [twoCurrency, setTwoCurrency] = useState('USD');
  const [fromPrice, setFromPrice] = useState(0);
  const [toPrice, setToPrice] = useState(1);


  const ratesRef = useRef({});

  useEffect(() => {
    fetch('https://cdn.cur.su/api/latest.json')
    .then((res) => res.json()
    .then((json) => {
      ratesRef.current = json.rates;
      onChangeToPrice(1);   
    }).catch (err => {
        console.warn(err);
        alert('Не вийшло отримати інформацію');
        })
        );
  },[]);


  const  onChangeFromPrice = (value) => {
    const price = value / ratesRef.current[oneCurrency];
    const result = price * ratesRef.current[twoCurrency];
    setToPrice(result.toFixed(2));
    setFromPrice(value);
    
  }
  const  onChangeToPrice = (value) => {
    const result = (ratesRef.current[oneCurrency] / ratesRef.current[twoCurrency]) * value
      setFromPrice(result.toFixed(2));
    setToPrice(value)
  };

  
  useEffect(() => {
    onChangeFromPrice(fromPrice);
  }, [oneCurrency]);

  useEffect(() => {
    onChangeToPrice(toPrice);
  }, [twoCurrency,]);

  return (
    <div className="App">
     <Convector value={fromPrice} 
                currency={oneCurrency} 
                onChangeCurrency={setOneCurrency}
                onChangeValue={onChangeFromPrice}
                />
     <Convector value={toPrice} 
                currency={twoCurrency} 
                onChangeCurrency={setTwoCurrency}
                onChangeValue={onChangeToPrice}
                />
    </div>
  );
}

export default App;
