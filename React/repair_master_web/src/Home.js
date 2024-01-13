import React, {useEffect} from 'react'
import Carousel from './components/Carousel'
import Services from './components/Services'
import Definition from './components/Definition'


export default function Home() {
    useEffect(() => {
        const userId = localStorage.getItem('userid');
        if (userId) {
            fetchUserDetails(userId);
        }
    }, []);

    const fetchUserDetails = async (userId) => {
        try {
            const response = await fetch(`http://localhost:1337/api/users/${userId}?populate=*`);
            const userData = await response.json();
            
            // Store the user details in localStorage or do something else with the data
            localStorage.setItem('profileId', userData.profile.id);
        } catch (error) {
            console.error('Error fetching user details:', error);
        }
    };
    return (
        <div>
            <Carousel></Carousel>
            <Services></Services>
            <Definition></Definition>
        </div>
    )
}
