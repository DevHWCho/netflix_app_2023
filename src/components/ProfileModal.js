import { authService } from 'fireB';
import React, { useRef } from 'react';
import { Link } from 'react-router-dom';
import "styles/ProfileModal.css";

function ProfileModal(props) {
  // console.log("llll", props)
  const ref = useRef();

  const onLogOutClick = () => {
    authService.signOut();
  }

  return (
    <div className='profileContainer'>
      <div></div>
      <div className='profileTop'>
        <ul>
          <li><Link to="profile">프로필 관리</Link></li>
          <li>계정</li>
        </ul>
      </div>
      <div className='profileBottom'>
        <ul>
          <li className='logout' onClick={onLogOutClick}>무비앱에서 로그아웃</li>
        </ul>
      </div>
    </div>
  )
}

export default ProfileModal