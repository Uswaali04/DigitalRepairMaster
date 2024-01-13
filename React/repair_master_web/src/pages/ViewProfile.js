import React, { useEffect } from 'react'
import { useState } from 'react';
import Placeholder from '../placeholders/Placeholder';
import Reviews from '../components/Reviews';
import GetReviews from '../components/GetReviews';


export default function ViewProfile() {
    
    let [editProfile, setEditProfile] = useState([])
    let [loading, setLoading] = useState(false)
    let profileId = localStorage.getItem('profileId')
    async function fetchProfile() {
        setLoading(true)
        let apiEnd = `http://localhost:1337/api/profiles?populate=*&filters[id][$eq]=${profileId}`
        let response = await fetch(apiEnd)
        let profileResponse = await response.json()
        setEditProfile(profileResponse.data)
        setLoading(false)
    }
    useEffect(() => { fetchProfile() }, [])
    if (loading) {
       return <Placeholder />
    }

    return (
        <div>
            {
                editProfile.map(profileItem => (
                    <div key={profileItem.id}>
                        <form className="container d-flex mt-3" >
                            <section className="form-box col-lg-12" style={{ maxWidth: "1000px" }}>
                                <div className="row form">
                                    <div className="card py-1">
                                        <div className='row'>
                                            <div className="card-header-menu">
                                                <i className="fa fa-bars"></i>
                                            </div>
                                        </div>
                                        <div className="form-container col-lg-12 text-start">
                                            <div className="row g-2">
                                                <div className="col-lg-6 ps-3">
                                                    <div className="flex-column d-flex">
                                                        <div className="form-group my-1">
                                                            <label htmlFor="formGroupExampleInput" className="fw-bold subtitle">Shop/Lab Name:</label>
                                                            <p className='fw-semibold form-section' >{profileItem.attributes.shop_name}</p>
                                                        </div>
                                                        <div className="form-group my-1">
                                                            <label htmlFor="email" className="fw-bold subtitle">Email:</label>
                                                            <p className='fw-semibold form-section' >{profileItem.attributes.shop_email}</p>
                                                        </div>
                                                        <div className="form-group my-1">
                                                            <label htmlFor="shop_address" className="fw-bold subtitle">Address:</label>
                                                            <p className='fw-semibold form-section' >{profileItem.attributes.shop_address}</p>
                                                        </div>
                                                    </div>
                                                </div>

                                                <div className="col-lg-6 ps-3">
                                                    <div className="flex-column d-flex">
                                                        <div className="form-group my-1">
                                                            <label htmlFor="shop_contactinfo" className="fw-bold subtitle">Phone:</label>
                                                            <p className='fw-semibold form-section' >{profileItem.attributes.shop_contactinfo}</p>
                                                        </div>
                                                        <div className="form-group my-1">
                                                            <label htmlFor="shop_cnic" className="fw-bold subtitle">CNIC:</label>
                                                            <p className='fw-semibold form-section' >{profileItem.attributes.shop_cnic}</p>
                                                        </div>
                                                        <div className="form-group my-1">
                                                            <label htmlFor="shop_about" className="fw-bold subtitle">About:</label>
                                                            <p className='fw-semibold form-section' >{profileItem.attributes.shop_about}</p>
                                                        </div>
                                                    </div>
                                                </div>

                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </section>
                        </form>
                        <GetReviews/>
                        <Reviews/>
                    </div>
                )
                )}
            
        </div>
    )
}

