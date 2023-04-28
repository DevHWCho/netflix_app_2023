import { authService } from 'fireB';
import React, { useRef } from 'react';
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
          <li>프로필 관리</li>
          <li>계정</li>
        </ul>
      </div>
      <div className='profileBottom'>
        <ul>
          <li className='logout' onClick={onLogOutClick}>넷플릭스에서 로그아웃</li>
        </ul>
      </div>
    </div>
  )
}

export default ProfileModal