import React from 'react'
import { useState, useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom';


export default function MakeAnOffer() {
    const [error, setError] = useState(null);
    let navigate=useNavigate()
    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
    } = useForm();

    const onSubmit = async (data) => {
        const copyData = {
            ...data,
            repair : localStorage.getItem('repair_id'),
            profile : localStorage.getItem('profileId'),
          };
        try {
            const requestOptions = {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ data: copyData }),
            };
            const response = await fetch('http://localhost:1337/api/offers', requestOptions);
            const userResponse = await response.json();
            console.log(userResponse);
            if (!response.ok) {
                alert('Here we got some errors');
                setError(response.error);
                throw new Error(response.error);
            }
            
            alert('Submision successful');
            navigate('/details/:slug')
            reset();
        } catch (error) {
            console.log(`error ${error}`);
        }
    };


    return (
        <div>
            <div className="card form-box">
                <div className="card-body form">
                    <form onSubmit={handleSubmit(onSubmit)}>
                    <label className='fw-bold text-color title mb-2'>Make an Offer</label><br />
                    <label htmlFor="offeredbudget" className='fw-bold subtitle'>Offered Budget (in Rs.) :</label>
                    <input className='form-control' {...register("offered_budget", { required: true })} 
                    type="text" id="offerbudget" name="offered_budget" />
                    <label className='fw-bold subtitle mb-1'>Estimated time required to do the task</label>
                    <input className='form-control' {...register("required_time", { required: true })}
                    type="text" id="required_time" name="required_time" />
                    <label className='fw-bold subtitle mb-1'>Delivery Charges (in Rs.)</label>
                    <input className='form-control' {...register("delivery_charges", { required: true })}
                    type="number" id="delivery_charges" name="delivery_charges" />
                    <label htmlFor="response" className='fw-bold subtitle'>Response:</label><br />
                    <textarea className='form-control' {...register("response", { required: true })}
                    type="text" id="response" name="response" />
                    <div className="d-flex justify-content-center my-3">
                        <button type="submit" className="nav-link py-2 col-4">
                            Submit
                        </button>
                    </div> 
                    </form>
                </div>
            </div>
        </div>
    )
}
