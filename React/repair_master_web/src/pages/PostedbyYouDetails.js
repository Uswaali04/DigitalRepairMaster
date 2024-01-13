import React from 'react'
import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { ReactMarkdown } from 'react-markdown/lib/react-markdown'
import Placeholder from '../placeholders/Placeholder'
import AcceptOffer from '../components/AcceptOffer'

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

export default function PostedbyYouDetails() {
    const { slug } = useParams()
    const [earn, setEarn] = useState([])
    let [loading, setLoading] = useState(false)
    const [isDone, setIsDone] = useState(false)
    async function fetchRepair() {
        setLoading(true)
        let request = `http://localhost:1337/api/repairs?populate=*&filters[slug][$eq]=${slug}`
        let response = await fetch(request)
        let earnResponse = await response.json()
        setEarn(earnResponse.data)
        setLoading(false)
        localStorage.setItem('repair_id', earnResponse.data[0]?.id)
    }
    useEffect(() => { fetchRepair() }, [])
    if (loading)
        return <Placeholder />


    return (
        <div>
            <div className={`container mt-5 ${isDone ? 'disabled' : ''}`}>
                {
                    earn && earn.map(earnItem => (
                        <section className="form-box col-md-12" style={{ maxWidth: '1100px' }} key={earnItem.id}>

                            <div className="card form-container mx-2" style={{ maxWidth: "98.5%" }} >
                                <div className="card-body">
                                    <div className='row'>
                                        <div className='row-sm-12'><label className='fw-bold title mb-2'>Task Details</label></div>
                                    </div>
                                    <div className='row'>
                                        <div className='col-md-8'>
                                            <div className='row mb-3'>
                                                <div className='col-sm-4'>
                                                    <div className='row-sm-3'><label className='fw-bold subtitle mb-1' >Posted By</label></div>
                                                    <div className='row-sm-4'><p className='fw-semibold form-section my-1'>{earnItem?.attributes?.users_permissions_user?.data?.attributes?.username}</p></div>
                                                </div>
                                                <div className='col-sm-4'>
                                                    <div className='row-sm-3'><label className='fw-bold subtitle mb-1' >Device</label></div>
                                                    <div className='row-sm-3'><p className='fw-semibold form-section my-1'>{earnItem.attributes.device}</p></div>
                                                </div>
                                                <div className='col-sm-4'>
                                                    <div className='row-sm-4'><label className='fw-bold subtitle mb-1' >Estimated Budget</label></div>
                                                    <div className='row-sm-4'><p className='fw-semibold form-section my-1'>Rs. {earnItem.attributes.budget}</p></div>
                                                </div>

                                            </div>

                                            <div className='row'>
                                                <div className='col-sm-3'><label className='fw-bold subtitle mb-1' >Description</label></div>
                                                <div className='row-sm-12'><ReactMarkdown className='fw-semibold form-section mb-1'>{earnItem.attributes.detail}</ReactMarkdown></div>
                                            </div>
                                            <div className='row'>
                                                <div className='col-sm-6'>
                                                    <div className='row-sm-3'><label className='fw-bold subtitle mb-1' >Address</label></div>
                                                    <div className='row-sm-3'><p className='fw-semibold form-section mb-1'>
                                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-geo-alt" viewBox="0 0 16 16">
                                                            <path d="M12.166 8.94c-.524 1.062-1.234 2.12-1.96 3.07A31.493 31.493 0 0 1 8 14.58a31.481 31.481 0 0 1-2.206-2.57c-.726-.95-1.436-2.008-1.96-3.07C3.304 7.867 3 6.862 3 6a5 5 0 0 1 10 0c0 .862-.305 1.867-.834 2.94zM8 16s6-5.686 6-10A6 6 0 0 0 2 6c0 4.314 6 10 6 10z"></path>
                                                            <path d="M8 8a2 2 0 1 1 0-4 2 2 0 0 1 0 4zm0 1a3 3 0 1 0 0-6 3 3 0 0 0 0 6z"></path>
                                                        </svg>{earnItem.attributes.address}
                                                    </p>
                                                    </div>
                                                </div>
                                                <div className='col-sm-6'>
                                                    <div className='row-sm-3'><label className='fw-bold subtitle mb-1'>Posted Date</label></div>
                                                    <div className='row-sm-3'><p className='fw-semibold form-section mb-1'>{earnItem.attributes.createdAt.slice(0, 10).split('-').reverse().join('/')}</p></div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className='col-lg-4'>
                                            <button className="nav-link py-2 col-3 text-center" onClick={() => handleDelete(earnItem.id)} >
                                                Mark as Done</button>
                                            <strong className='mt-2'>Note: Please mark your task as completed once it has been executed.Also note that doing so will render it inaccessible to you as well.</strong>
                                        </div>
                                    </div>
                                    <div className='row'>
                                        <AcceptOffer />
                                    </div>

                                </div>
                            </div>
                        </section>
                    ))
                }
            </div>
        </div >

    )
}
