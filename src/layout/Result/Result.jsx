import React, {useEffect, useState} from 'react'
import './Result.scss'
import { useLocation, useNavigate } from 'react-router-dom';
import QuickReport from './QuickReport';
import DetailReport from './DetailReport';

const Result = () => {
    const [toggleMode, setToggleMode]= useState(false)
    const location = useLocation();
    const navigate = useNavigate()
    let state = location?.state;
    console.log("user_quiz_data", state);
  
    const eraseCookie = (name) => {   
        document.cookie = name +'=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;';
    }

    useEffect(() => {
        eraseCookie('quiz_start_timing');
        if(state===null || state===undefined){
          navigate('/');
        }
    }, [])
    
  return (
      <div className='result__container'>
          <div className='result__mode'>
              <button className={`${!toggleMode ? 'active' : ''}`} onClick={() => setToggleMode(false)}>Overall Analysis</button>
              <button className={`${toggleMode ? 'active' : ''}`} onClick={() => setToggleMode(true)}>Quiz Solution Report </button>
          </div>
          {state && (toggleMode ? <DetailReport state={state} />:<QuickReport state={state} />)}
          
    </div>
  )
}

export default Result