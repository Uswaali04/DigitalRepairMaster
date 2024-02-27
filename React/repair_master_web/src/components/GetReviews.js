import React from 'react'
import Placeholder from '../placeholders/Placeholder'
import { useState, useEffect } from 'react'
export default function GetReviews() {
    const [earn, setEarn] = useState([])
    let [loading, setLoading] = useState(false)
    let profileId = localStorage.getItem("profileId")
    async function fetchRepair() {
        setLoading(true)
        let apiEnd = `http://localhost:1337/api/reviews?populate=*&filters[profile][id]=${profileId}`
        let response = await fetch(apiEnd)
        let earnResponse = await response.json()
        setEarn(earnResponse.data)
        setLoading(false)
    }
    useEffect(() => { fetchRepair() }, [])
    if (loading)
        return <Placeholder />
    return (
        <div>
            <div className="row d-flex py-1 mt-2 color" style={{ flexDirection: "row", width: "100%",height:"auto", background: "pink", flexGrow: "auto"}}>
                <label className='fw-bold title mb-2'>Reviews</label>

                {
                    earn.map(earnItem => (
                        <div className='col-lg-12 col-md-8' key={earnItem.id}>
                            <div className="card form-box mt-2 ms-2">
                                <div className="card-body form-container">
                                    <div className='row'>
                                        <div className='col'><p className='fw-semibold form-section'>From: {earnItem.attributes?.users_permissions_user?.data?.attributes?.username}</p></div>
                                    </div>
                                    <div className='row'>
                                        <div className='col'><p className='fw-semibold form-section'>{earnItem.attributes.reviews_text}</p></div>
                                    </div>
                                </div>
                            </div>
                        </div>

                    ))
                }

            </div>
        </div >
    )
}
