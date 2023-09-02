import React, {useEffect} from 'react'
import { useLocation, useNavigate } from 'react-router-dom';
import { Question, Header } from '../../components';
import './Home.scss';
const Home = () => {

  const { state } = useLocation();
  const navigate = useNavigate()
  console.log("user_email_id", state);

  useEffect(()=>{
      if(state===null || state===undefined){
        navigate('/');
      }
  }, [])

  return (
    <div className='home__container'>
          <Header />
          <Question user_id={state} />
    </div>
  )
}

export default Home