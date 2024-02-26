import React from 'react'
import { useState, useEffect } from 'react'
import Placeholder from '../placeholders/Placeholder'

async function handleDelete(repairId) {
    try {
        const requestOptions = {
            method: 'DELETE',
            headers: { 'Content-Type': 'application/json' }
        };
        const response = await fetch(`http://localhost:1337/api/offers/${repairId}`, requestOptions);
        if (response.ok) {
            alert('Delete successful');
            window.location.reload()
        } else {
            alert('Some error occurred while deleting');
        }
    } catch (error) {
        console.error('Error deleting task:', error);
    }
}

export default function YourOffers() {
    const [offer, setOffer] = useState([])
    let [loading, setLoading] = useState(false)
    let profileId = localStorage.getItem('profile_Id')
    async function fetchOffer() {
        setLoading(true)
        let apiEnd = `http://localhost:1337/api/offers?populate=*&filters[profile][id][$eq]=${profileId}`
        let response = await fetch(apiEnd)
        let offerResponse = await response.json()
        setOffer(offerResponse.data)
        setLoading(false)
        localStorage.setItem("profile_Id", offerResponse.data[0].attributes.profile.id)
    }
    useEffect(() => { fetchOffer() }, [])
    if (loading)
        return <Placeholder />


    return (
        <div>
            <div>
                <div className='row-sm-12 container mt-5'><label className='fw-bold title'>Your Offers</label></div>
                {
                    offer.map(offerItem => (
                        <div className='card p-3 mx-5 container' key={offerItem.id}>
                            <div className='row mb-3' >
                                <div className='col-sm-2'><label className='fw-bold subtitle mb-1' >Offered By</label>
                                    <p className='fw-semibold form-section my-1'>{offerItem.attributes?.profile?.data?.attributes?.shop_name}</p></div>
                                <div className='col-sm-2'><label className='fw-bold subtitle mb-1' >Offered Budget</label>
                                    <p className='fw-semibold form-section my-1'>Rs. {offerItem.attributes.offered_budget}</p></div>
                                <div className='col-sm-4'><label className='fw-bold subtitle mb-1' >Estimated time required to do the task</label>
                                    <p className='fw-semibold form-section my-1'>{offerItem.attributes.required_time}</p></div>
                                <div className='col-sm-2'><label className='fw-bold subtitle mb-1' >Delivery Charges</label>
                                    <p className='fw-semibold form-section my-1'>Rs. {offerItem.attributes.delivery_charges}</p></div>
                                <div className='col-sm-2'><label className='fw-bold subtitle mb-1' >Response Date</label>
                                    <p className='fw-semibold form-section my-1'>{offerItem.attributes.createdAt.slice(0, 10).split('-').reverse().join('/')}</p></div>
                            </div>
                            <label htmlFor="response" className='fw-bold subtitle'>Response:</label>
                            <p type="text" id="response" name="response" className='fw-semibold form-section my-1'>{offerItem.attributes.response}</p>
                            <div className='d-flex justify-content-center my-1'>
                                <button className="nav-link py-2 col-3 text-center" onClick={() => handleDelete(offerItem.id)}>Delete</button>

                            </div>
                        </div>
                    )
                    )}
            </div>
        </div>
    )
}

