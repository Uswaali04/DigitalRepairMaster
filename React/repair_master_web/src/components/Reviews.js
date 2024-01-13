import React from "react"
import { useForm } from "react-hook-form"
import { useState } from "react"

export default function Reviews() {
    const [setError] = useState(null)
    const {
        register, handleSubmit, formState: { errors }, reset, } = useForm();

    const onSubmit = async (data) => {
        let copyData = {
            ...data,
            profile : localStorage.getItem('profileId'),
            users_permissions_user: localStorage.getItem('userid')
        }
        try {
            const requestOptions = {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({data: copyData}),
            };
            const response = await fetch('http://localhost:1337/api/reviews', requestOptions);
            const userResponse = await response.json();
            console.log(userResponse);
            if (!response.ok) {
                alert('Here we got some errors');
                setError(response.error);
                throw new Error(response.error);
            }

            alert('Submision successful');
            reset();
        } catch (error) {
            console.log(`error ${error}`);
        }
    };
    return (
        <form onSubmit={handleSubmit(onSubmit)} >

            <section className="form-box col-md-12 my-4" style={{ maxWidth: "960px" }}>

                <div className="form" >
                    <div className=" mb-3" >
                        <label htmlFor="exampleFormControlTextarea1" className="form-label fw-bold subtitle text-color" >Please give us your Feedback</label>
                        <textarea className="form-control" placeholder="let us know your experience with this Repair Master."
                            {...register("reviews_text", {
                                required: true
                            })} id="exampleFormControlTextarea1" rows="4"
                        />
                        {errors.reviews_text && <span>This field is required</span>}
                        <div className="col-auto d-flex justify-content-center mt-2">
                            <button type="submit" className="nav-link">Submit</button>
                        </div>
                    </div>
                </div>
            </section>
        </form >
    )
}