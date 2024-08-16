import logo from './img/check-logo.png';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Home.css';



function Home() {
    const [count, setCount] = useState(0);
    const navigate = useNavigate();

    const morePeople = () => {
        if (count < 12) {
            setCount(count + 1);
        } else {
            setCount(12);
        }
    };
    const lessPeople = () => {
        if (count > 0) {
            setCount(count - 1);
        } else {
            setCount(0);
        }
    };

    const handleChange = (event) => {
        let val = event.target.value;
        if (!isNaN(val) && val !== '') {
            
            if (parseInt(val) > 12) {
                setCount(12);
            } else if (parseInt(val) < 0) {
                setCount(0);
            } else {
                setCount(Number(val));
            }
        } else {
            setCount(0); // Или можно игнорировать ввод, не изменяя count
        }
    };

    const handleSubmit = () => {
        navigate('/check-please/app', { state: { value: count } });
    };
    
    return (
        <div className="Home">
            <img src={logo} alt='logo' className='logo-img' />
            <div className='main-content'>
                <div className='enter-menu'>
                    <input type='button' className='less' value='-' onTouchEnd={lessPeople} />
                    <input className='count' value={count} onChange={handleChange} />
                    <input type='button' className='more' value='+' onTouchEnd={morePeople} /> 
                </div>
                <button className='success-btn-enter' 
                    onTouchEnd={handleSubmit}
                    >ENTER</button>
            </div>
        </div>
    );
}

export default Home;