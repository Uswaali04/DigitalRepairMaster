import React from 'react';
import ReactDOM from 'react-dom/client';
import Signup from './pages/Signup';
import Login from './pages/Login';
import Header from './components/Header';
import Footer from './components/Footer';
import Posttask from './pages/Posttask';
import Profile from './pages/Profile';
import PostedTask from './pages/PostedTask';
import Home from './Home'
import PageNotFound from './pages/PageNotFound';
import EarnMoney from './pages/EarnMoney';
import AboutUs from './pages/AboutUs';
import EarnMoneyDetails from './pages/EarnMoneyDetails';
import PostedbyYouDetails from './pages/PostedbyYouDetails';
import EditProfile from './pages/EditProfile';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import ViewProfile from './pages/ViewProfile';
import YourOffers from './pages/YourOffers';
import CheckShops from './pages/CheckShops';
import CheckShopsDetails from './pages/CheckShopsDetails';


ReactDOM.createRoot(document.getElementById('root')).render(
    <React.StrictMode>
        <BrowserRouter>
            <Header />
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/login" element={<Login />} />
                <Route path="/signup" element={<Signup />} />
                <Route path="/post-task" element={<Posttask />} />
                <Route path="/profile" element={<Profile />} />
                <Route path="/earn-money" element={<EarnMoney />} />
                <Route path='/edit-profile' element={<EditProfile/>}/>
                <Route path='/view-profile' element={<ViewProfile/>} />
                <Route path="/details/:slug" element={<EarnMoneyDetails />} />
                <Route path='/check-shops' element={<CheckShops/>}/>
                <Route path="/check-shops-details/:slug" element={<CheckShopsDetails/>}/>
                <Route path='/your-offers' element={<YourOffers/>}/>
                <Route path="/about-us" element={<AboutUs />} />
                <Route path="/posted-by-you" element={<PostedTask />} />
                <Route path="/posted-by-you-details/:slug" element={<PostedbyYouDetails />} />
                <Route path="/*" element={<PageNotFound />} />
            </Routes>
            <Footer />
        </BrowserRouter>,
    </React.StrictMode>
);








