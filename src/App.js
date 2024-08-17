import logo from './img/check-logo.png';
import apple from './img/avatars/apple.png';
import pizza from './img/avatars/pizza.png'; 
import burger from './img/avatars/burger.png'; 
import hotdog from './img/avatars/hotdog.png'; 
import sushi from './img/avatars/sushi.png'; 
import taco from './img/avatars/taco.png'; 
import frenchFries from './img/avatars/french-fries.png'; 
import iceCream from './img/avatars/ice-cream.png'; 
import banana from './img/avatars/banana.png'; 
import donut from './img/avatars/donut.png'; 
import pancakes from './img/avatars/pancakes.png'; 
import coffee from './img/avatars/coffee.png'; 
import './App.css';
import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';


function App() {
  const location = useLocation();
  const { value } = location.state || { value: 0 }; 
  const [showModal, setShowModal] = useState(false);

  const avatars = [
    pizza,
    burger,
    hotdog,
    sushi,
    taco,
    frenchFries,
    apple,
    banana,
    donut,
    pancakes,
    coffee,
    iceCream
  ]

  function roundTo(num, precision) {
    const factor = Math.pow(10, precision)
    return Math.round(num * factor) / factor
  }

  const items = Array.from({ length: value }, (_, index) => (
    
    <li key={index} className='person-info'>
      <img src={avatars[index]} alt='P' className='person-img' />
      <div className='person'>
        <span className={`cost-${index} cost-per-person`}>0</span>
      </div>
    </li>
  ));

  const addCost = (event) => {
    let idx = event.target.alt;
    let cost = document.querySelector(`.cost-${idx}`);
    let currSum = document.querySelector('.curr-sum');
    
    if (currSum.value !== '') {    
      cost.textContent = (parseInt(cost.textContent) + parseInt(currSum.value)).toString();
    }
    currSum.value = '';
    setShowModal(false);
  };

  const splitCost = () => {
    let currSum = document.querySelector('.curr-sum');
    
    if (currSum.value !== '') {  
      for (let idx = 0; idx < value; idx++) {
        document.querySelector(`.cost-${idx}`).textContent = roundTo(parseInt(document.querySelector(`.cost-${idx}`).textContent) + (parseInt(currSum.value) / value), 2).toString();
      }
    }
    currSum.value = '';

  };

  const choosing = Array.from({ length: Math.min(value, 12) }, (_, index) => (
    <div key={index} className="avatar">
      <img src={avatars[index]} alt={index} onClick={addCost} />
    </div>
  ));

  const handleChooseClick = () => {
    setShowModal(true);
  };

  const handleCloseClick = () => {
    setShowModal(false);
  };


  return (
    <div className="App">
      <Link to='/check-please/' className='back-btn'>Reset</Link>
      <header>
      <img src={logo} alt='logo' className='logo-img-app' />
      <span><span className='text'>check, please!</span></span>
      </header>
      <div className='all-pay-sum'>
        <input type='tel' placeholder='0' className='curr-sum' inputMode='decimal' pattern="^-?\d*\.?\d*$" />
        <input type="button" className='choose' onClick={handleChooseClick} value='choose' />
        <input type="button" className='for-all' onClick={splitCost} value="split" />
      </div>
      <div className='main-container'>
          <ul>
            {items}
          </ul>
      </div>
      {showModal && (
        <div className="modal">
          <div className="modal-content">
            <button className="close-button" onClick={handleCloseClick}>
              &times;
            </button>
            <div className="avatar-grid">
              {choosing}
            </div>
          </div>
        </div>
      )}

    </div>
  );
}

export default App;
