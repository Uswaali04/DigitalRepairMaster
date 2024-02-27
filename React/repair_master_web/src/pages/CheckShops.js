import React, { useEffect } from 'react'
import { useState } from 'react';
import Placeholder from '../placeholders/Placeholder';
import GetReviews from '../components/GetReviews';
import Reviews from '../components/Reviews';
import { Link } from 'react-router-dom';
import ReviewsforCHeckShops from './ReviewsforCHeckShops';


export default function CheckShops() {

    let [editProfile, setEditProfile] = useState([])
    let [loading, setLoading] = useState(false)
    let profileId = localStorage.getItem('profile_Id')
    async function fetchProfile() {
        setLoading(true)
        let apiEnd = `http://localhost:1337/api/profiles?populate=*`
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
            <div className="mt-3 row d-flex">

                {
                    editProfile && editProfile.map(profileItem => (

                        <form className="mt-3" key={profileItem.id}>
                            <section className="form-box" style={{ maxWidth: "1200px" , flexShrink: "0"}}>
                                <div className=" form">
                                    <div className="card py-1">
                                        <div className="form-container text-start">
                                            <div className="row g-2">
                                                <div className="col-lg-4">
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

                                                <div className="col-lg-4">
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
                                                {/* <div className='col-lg-4'><ReviewsforCHeckShops /></div> */}
                                                <div className='row'><GetReviews /></div>
                                                
                                            </div>
                                        </div>

                                    </div>
                                </div>

                            </section>
                        </form>
                    )
                    )}
            </div>
        </div >
    )
}


