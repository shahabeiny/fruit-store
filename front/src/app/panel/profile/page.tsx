
import ProfileInfo from '@/components/templates/Panel/Profile/ProfileInfo/ProfileInfo'
import ProfilePass from '@/components/templates/Panel/Profile/ProfilePass/ProfilePass'
import React from 'react'

const Profile = () => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
       <ProfileInfo/>
      <ProfilePass/>
  </div>
  )
}

export default Profile
