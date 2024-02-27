import React from 'react'
import { useState, useEffect } from 'react'



export default function ReviewsforCHeckShops() {

    let [editProfile, setEditProfile] = useState([])
    async function fetchProfile() {
        
        let apiEnd = `http://localhost:1337/api/profiles?populate=*`
        let response = await fetch(apiEnd)
        let profileResponse = await response.json()
        setEditProfile(profileResponse.data)
        
    }
    useEffect(() => { fetchProfile() }, [])
    return (
        <div>
            <label className='fw-bold title mb-2'>Reviews</label>
            {
                editProfile && editProfile.map(profileItem => (
                    <div className="row d-flex py-1 mt-2 color col-lg-12" key={profileItem.id}>

                        <div className='col-lg-12 col-md-8'>
                            <div className="card form-box mt-2" >
                                <div className="card-body form-container">
                                    <div className='row'>
                                        <div className='col'><p className='fw-semibold form-section'>From: {profileItem.attributes?.users_permissions_user?.data?.attributes?.username}</p></div>
                                    </div>
                                    <div className='row'>
                                        <div className='col'><p className='fw-semibold form-section'>{profileItem.attributes?.reviews?.data?.attributes?.reviews_text}</p></div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
        </div>
    )
}
