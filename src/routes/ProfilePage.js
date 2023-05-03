import React, { useState } from 'react';
import 'styles/ProfilePage.scss';

function ProfilePage() {
  const [openProfile, setOpenProfile] = useState(true);

  const toggleBtn = () => setOpenProfile(prev => !prev);

  return (
    <div className='pp_container'> 
      <form action='/' method='post'>
        <h1 className='pp_header'>프로필 관리</h1>
        <input type='submit' className='setting_btn' value={openProfile? "프로필 관리" : "완료"} />
      </form>
      <div className='pp_avatar'>

      </div>
    </div>
  )
}

export default ProfilePage
