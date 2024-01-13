import React, { useEffect } from 'react'
import { useState } from 'react';
import Placeholder from '../placeholders/Placeholder';
import GetReviews from '../components/GetReviews';
import { Link } from 'react-router-dom';


export default function CheckShops() {

    let [editProfile, setEditProfile] = useState([])
    let [loading, setLoading] = useState(false)
    let profileId = localStorage.getItem('profileId')
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
            <div className="mt-3 mx-3 row d-flex" style={{ flexDirection: "row", width: "100%" }}>

                {
                    editProfile && editProfile.map(profileItem => (

                        <form className="col-lg-4 mt-3" key={profileItem.id}>
                            <section className="form-box" >
                                <div className=" form">
                                    <div className="card py-1">
                                        <div className='row'>
                                            <div className="card-header-menu">
                                                <i className="fa fa-bars"></i>
                                            </div>
                                        </div>

                                        <div className="col-lg-12 ps-3">
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
                                    </div>
                                </div>
                                <div className='d-flex justify-content-center my-1'>
                                    <Link to={`/check-shops-details/${profileItem.attributes.slug}`}  className="nav-link py-2 col-3 text-center">Open</Link>
                                </div>
                            </section>
                        </form>

                    

            )
                )}
        </div>
        </div >
    )
}


