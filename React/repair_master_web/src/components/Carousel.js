import { useState, useEffect } from 'react'
import Carouselplaceholder from '../placeholders/Carouselplaceholder'
import { Link } from 'react-router-dom'

function Carousel() {
    let [slide,setSlide]= useState([])
    let [loading,setLoading] =useState(false)
    async function fetchSlide(){
        setLoading(true)
        let response = await fetch('http://localhost:1337/api/carousels?populate=*')
        let slideResponse = await response.json()
        setSlide(slideResponse.data)
        setLoading(false)

    }
    useEffect(()=> {fetchSlide()},[])
    
    if (loading)
    return <Carouselplaceholder/>
    return (
        <div>
            <div id="myCarousel" className="carousel slide mt-3" data-bs-ride="carousel">
                <div className="carousel-indicators">
                    <button type="button" data-bs-target="#myCarousel" data-bs-slide-to="0" className="active" aria-current="true" aria-label="Slide 1"></button>
                    <button type="button" data-bs-target="#myCarousel" data-bs-slide-to="1" aria-label="Slide 2"></button>
                    <button type="button" data-bs-target="#myCarousel" data-bs-slide-to="2" aria-label="Slide 3"></button>
                </div>
                <div className="carousel-inner">

                    {
                        slide.map((slideItem, i) => {
                            
                            if (i === 0) {
                                return (
                                    <div className="carousel-item active" key={slideItem.id}>
                                        <img className="bd-placeholder-img" width="auto" height="auto" src={`http://localhost:1337${slideItem.attributes.carousel_image.data.attributes.url}`}/>
                                        <div className="container">
                                            <div className="carousel-caption text-end">
                                                <h1 className='text-primary-emphasis'>{slideItem.attributes.carousel_description}</h1>
                                                {/* <p><Link to="/signup" className="nav-link col-3"  href="#">
                                                    {slideItem.attributes.carousel_title}</Link></p> */}
                                            </div>
                                        </div>
                                    </div>)
                            }
                            else {
                                return (
                                    <div className="carousel-item" key={slideItem.id}>
                                        <img className="bd-placeholder-img" width="auto" height="auto" src={`http://localhost:1337${slideItem.attributes.carousel_image.data.attributes.url}`}/>
                                        <div className="container">
                                            <div className="carousel-caption text-end">
                                                <h1 className='text-primary-emphasis'>{slideItem.attributes.carousel_description}</h1>
                                                {/* <p><Link to="/signup" className="nav-link col-3" href="#">
                                                    {slideItem.attributes.carousel_title}</Link></p> */}
                                            </div>
                                        </div>
                                    </div>)
                            }
                        })
                    }
                </div>
                <button className="carousel-control-prev" type="button" data-bs-target="#myCarousel" data-bs-slide="prev">
                    <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                    <span className="visually-hidden">Previous</span>
                </button>
                <button className="carousel-control-next" type="button" data-bs-target="#myCarousel" data-bs-slide="next">
                    <span className="carousel-control-next-icon" aria-hidden="true"></span>
                    <span className="visually-hidden">Next</span>
                </button>
            </div>
        </div>
    )
}
export default Carousel
