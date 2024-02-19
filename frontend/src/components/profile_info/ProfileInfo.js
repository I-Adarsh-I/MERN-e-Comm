import React from 'react'

function ProfileInfo() {
  return (
    <div>
      <div className="profile-info d-flex align-items-center justify-content-between">
          <div className="d-flex gap-3 align-items-center ">
            <div className="profile-avatar">
              <img
                src="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_640.png"
                alt="profile"
                className="profile-img"
              />
            </div>
            <h3>Hello, User</h3>
          </div>
          <>
            <div className="btn btn-primary btn-sm">+Add new product</div>
          </>
        </div>
    </div>
  )
}

export default ProfileInfo
