import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import "styles/Nav.css";
import ProfileModal from './ProfileModal';

function Nav(props) {
  // console.log("ppppppppp",props)
  const [show, setShow] = useState(false);
  const [searchValue, setSearchValue] = useState("");
  const navigate = useNavigate();
  const [modalOpen, setModalOpen] = useState(false);

  useEffect(() => {
    window.addEventListener('scroll',() => {
      if(window.scrollY > 50) {
        setShow(true);
      }else {
        setShow(false);
      }
    });
    return () => { //컴포넌트를 사용하지 않을 때 
      window.removeEventListener('scroll', () => {});
    };
  },[]);
  
  const onChange = (e) => {
    setSearchValue(e.target.value);
    navigate(`/search?q=${e.target.value}`);
  }

  const profileClick = () => {
    setModalOpen((prev) => !prev);
  }

  return (
    <nav className={`nav ${show && 'nav__black'}`}>
      <img src={require('../styles/images/logo.png')} alt='movie app logo' className='nav__logo' onClick={() => {window.location.href = "/mv_app"}} />
      <input type='search' placeholder='영화를 검색해주세요' className='nav__input' onChange={onChange} value={searchValue}/>
      <div className='profile_btn' onClick={() => profileClick()}>
        <img src='https://occ-0-4796-988.1.nflxso.net/dnm/api/v6/K6hjPJd6cR6FpVELC5Pd6ovHRSk/AAAABbme8JMz4rEKFJhtzpOKWFJ_6qX-0y5wwWyYvBhWS0VKFLa289dZ5zvRBggmFVWVPL2AAYE8xevD4jjLZjWumNo.png?r=a41' alt='User logged' className='nav__avatar' />
      </div>
      {modalOpen && (
          <ProfileModal setModalOpen={setModalOpen} props={props} />
      )}
    </nav>
  )
}

export default Nav
