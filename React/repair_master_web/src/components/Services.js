import React from 'react'
import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import Serviceplaceholder from '../placeholders/Serviceplaceholder'

export default function Services() {

    const [service, setService] = useState([])
    let[loading, setLoading] = useState(false)

    async function fetchService() {
        setLoading(true)
        let response = await fetch('http://localhost:1337/api/services?populate=*')
        let serviceResponse = await response.json()
        setService(serviceResponse.data)
        setLoading(false)
    }
    useEffect(() => { fetchService() }, [])
    if (loading)
        return <Serviceplaceholder/>

    return (
        <div>
            <div className="container marketing">
                <strong><h2 className='for-center'>What Repair do you need done?</h2></strong>
                <div className="row mt-2 mb-5 flex-fill" style={{ display: "flex", flexDirection: "row", textAlign: "center", margin: "auto", maxWidth: "960px" }}>
                    {
                        service.map(serviceItem => (
                            <div className="col-sm-1 flex-fill text-align-center" key={serviceItem.id}>
                                <img width="70" height="70" src={`http://localhost:1337${serviceItem.attributes.service_image.data.attributes.url}`} alt='' />
                                {/* <p className=" fixed-size">{serviceItem.attributes.service_title}</p> */}
                            </div>
                        )
                        )
                    }
                </div>

            </div>
        </div >

    )
}
