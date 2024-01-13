import React from 'react'
import { Link } from 'react-router-dom'
import { useState, useEffect } from 'react'
import Placeholder from '../placeholders/Placeholder'

async function handleDelete(repairId){
    try {
        const requestOptions = {
          method: 'DELETE',
          headers: { 'Content-Type': 'application/json' }
        };
        const response = await fetch(`http://localhost:1337/api/repairs/${repairId}`, requestOptions);
        if (response.ok) {
          // Task deleted successfully
          // Perform any necessary state updates or UI changes
          alert('Delete successful');
          window.location.reload()
        } else {
          // Handle error if deletion was unsuccessful
          alert('Some error occurred while deleting');
        }
      } catch (error) {
        console.error('Error deleting task:', error);
        // Handle error and display an error message if needed
      }
}

export default function PostedTask() {
    const [earn, setEarn] = useState([])
    let [loading, setLoading] = useState(false)

    async function fetchRepair() {
        const username = localStorage.getItem('userid')
        setLoading(true)
        let apiEnd = 'http://localhost:1337/api/repairs?populate=*'
        if (username) {
            apiEnd = `http://localhost:1337/api/repairs?populate=*&filters[users_permissions_user][id][$eq]=${username}`
        }
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
            <div className="row d-flex py-1 mt-2 color" style={{ flexDirection: "row", width: "100%" }}>
                {
                    earn && earn.map(earnItem => (
                        <div className='col-lg-4 col-md-6' key={earnItem.id}>
                            <div className="card mt-2 ms-2" >
                                <div className="card-body">
                                    <div className='row'>
                                        <div className='col-sm-3'><label className='fw-bold subtitle' >Posted By</label></div>
                                        <div className='col-sm-8'><p className='fw-semibold form-section'>{earnItem.attributes.users_permissions_user.data.attributes.username}</p></div>
                                    </div>
                                    <div className='row'>
                                        <div className='col-sm-3'><label className='fw-bold subtitle' >Device</label></div>
                                        <div className='col-sm-8'><p className='fw-semibold form-section'>{earnItem.attributes.device}</p></div>
                                    </div>
                                    <div className='row'>
                                        <div className='col-sm-3'><label className='fw-bold subtitle mb-1' >Description</label></div>
                                        <div className='col-sm-8'><p className='fw-semibold form-section mb-1'>{earnItem.attributes.detail}</p></div>
                                    </div>
                                    <div className='row'>
                                        <div className='col-sm-3'><label className='fw-bold subtitle' >Location</label></div>
                                        <div className='col-sm-8'><p className='fw-semibold form-section'>
                                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-geo-alt" viewBox="0 0 16 16">
                                                <path d="M12.166 8.94c-.524 1.062-1.234 2.12-1.96 3.07A31.493 31.493 0 0 1 8 14.58a31.481 31.481 0 0 1-2.206-2.57c-.726-.95-1.436-2.008-1.96-3.07C3.304 7.867 3 6.862 3 6a5 5 0 0 1 10 0c0 .862-.305 1.867-.834 2.94zM8 16s6-5.686 6-10A6 6 0 0 0 2 6c0 4.314 6 10 6 10z"></path>
                                                <path d="M8 8a2 2 0 1 1 0-4 2 2 0 0 1 0 4zm0 1a3 3 0 1 0 0-6 3 3 0 0 0 0 6z"></path>
                                            </svg>{earnItem.attributes.address}
                                        </p></div>
                                    </div>
                                    <div className='row'>
                                        <div className='col-sm-3'><label className='fw-bold subtitle' >Estimated Budget</label></div>
                                        <div className='col-sm-8'><p className='fw-semibold form-section'>Rs. {earnItem.attributes.budget}</p></div>
                                    </div>

                                </div>
                                <div className='d-flex justify-content-center my-1'>
                                    <Link to={`/posted-by-you-details/${earnItem.attributes.slug}`} className="nav-link py-2 col-3 text-center">Open</Link>
                                    <button className="nav-link py-2 col-3 text-center" onClick={() => handleDelete(earnItem.id)}>Delete</button>

                                </div>
                            </div>
                        </div>

                    ))
                }

            </div>
        </div >
    )
}
