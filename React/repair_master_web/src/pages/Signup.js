import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useForm } from "react-hook-form";
import { useState } from 'react';


export default function Signup_() {
    let [error, setError] = useState(null)
    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
        reset
    } = useForm();
    const navigate = useNavigate(); 
    const onSubmit = async (data) => {
        console.log(data);
        let copyData = { ...data } //object deep copy using spread operater
        let { confirmPassword, ...rest } = copyData //destructuring getting all variables except confirmPassword in a variable called rest(reserve word)
        let user_type = rest.user_type === "as_a_client" ? "as_a_client" : "as_a_shop/lab_owner"; // Set role based on user_type
        rest.role = 1 //create a new variable role in rest object
        console.log(rest)
        try {
            const requestOptions = {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(rest)
            };
            let response = await fetch('http://localhost:1337/api/users', requestOptions)
            let userResponse = await response.json()
            console.log(userResponse)
            if (!response.ok) {
                alert("Here we got some errors")
                setError(response.error)
                throw new Error(response.error)
            }
            // localStorage.setItem('token', userResponse.jwt)
            localStorage.setItem('user_type', user_type) // Replace with the actual value of user_type
            alert("Signup successfull")
            reset()
            navigate('/login'); // Navigate to the login page
        } catch (error) {
            console.log(`error ${error}`)

        }
    };
    const password = watch("password")
    return (
        <div>
            <div className="p-3 mx-2 mt-3 bg-info bg-opacity-10 border border-info rounded-start rounded-end">

                <div className="form-box mt-4">
                    {error && JSON.stringify(error)}
                    <form className="form" onSubmit={handleSubmit(onSubmit)}>
                        <span className="title">Sign up</span>
                        <span className="subtitle">Create a free account with your email.</span>
                        <div className="form-container p-3">
                            <div className="mb-3">
                                <label htmlFor="formGroupExampleInput" className="form-label">Name</label>
                                <input type="text"
                                    {...register("username", {
                                        required: {
                                            value: true,
                                            message: "Field required. Please enter your name"
                                        },
                                        minLength: {
                                            value: 3,
                                            message: "Name should have atleast 3 characters"
                                        },
                                    })}
                                    className={errors.username ? "is-invalid form-control" : " form-control"} placeholder="Enter Full Name" />
                                <span className="text-danger">{errors.username && errors.username.message}
                                </span>
                            </div>
                            <div className="mb-3">
                                <label htmlFor="formGroupExampleInput2" >Email</label>
                                <input type="email" className={errors.email ? "is-invalid form-control" : " form-control"}
                                    {...register("email", {
                                        required: {
                                            value: true,
                                            message: "Kindly enter a valid email address"
                                        },
                                        pattern: {
                                            value: "/^\S+@\S+$/i",
                                            message: "invalid format"
                                        }
                                    })}

                                    placeholder="Enter your email address" />
                                <span className="text-danger">  {errors.email && errors.email.message}
                                </span>
                            </div>
                            <div className="mb-3">
                                <label htmlFor="formGroupExampleInput" className="form-label">Password</label>
                                <input type="password"
                                    {...register("password", {
                                        required: {
                                            value: true,
                                            message: "Field required. Please enter password"
                                        },
                                        minLength: {
                                            value: 8,
                                            message: "Passowrd should have atleast 8 characters"
                                        },
                                    })}
                                    className={errors.password ? "is-invalid form-control" : "form-control"} placeholder="Enter password" />
                                <span className="text-danger">{errors.password && errors.password.message}
                                </span>
                            </div>
                            <div className="mb-3">
                                <label htmlFor="formGroupExampleInput" className="form-label">Confirm Password</label>
                                <input type="password"
                                    {...register("confirmPassword", {
                                        required: {
                                            value: true,
                                            message: "Field required. Please re-enter password"
                                        },
                                        minLength: {
                                            value: 8,
                                            message: "Passowrd should have atleast 8 characters"
                                        },
                                        validate: (value) => value === password || "Passsword do not match"
                                    })}
                                    className={errors.confirmpassword ? "is-invalid form-control" : " form-control"} placeholder="Enter password again" />
                                <span className="text-danger">  {errors.confirmPassword && errors.confirmPassword.message}
                                </span>
                            </div>
                            <div className="mb-3">
                                <div className="mb-3">
                                    <label htmlFor="formGroupExampleInput" className="form-label">Account Type</label><br />
                                    <input
                                        type="radio"
                                        {...register("user_type", { required: true })} // Add the required validation rule
                                        name="user_type"
                                        value="as_a_client"
                                    />
                                    <label htmlFor="html" className='me-4'>As a Client</label>
                                    <input
                                        type="radio"
                                        {...register("user_type", { required: true })} // Add the required validation rule
                                        name="user_type"
                                        value="as_a_shop/lab_owner"
                                    />
                                    <label htmlFor="css">As a Shop/Lab Owner</label><br />
                                    {errors.user_type && (
                                        <span className="text-danger">Please select an account type</span>
                                    )}
                                </div>


                            </div>
                        </div>

                        <div className='d-flex justify-content-center'>
                            <button type="submit" className="nav-link py-2 col-md-4">Submit</button>

                        </div>
                    </form>
                    <div className="form-section">
                        <p className='text-color ms-2'>Have an account? <Link to="/login">Log in</Link></p>
                    </div>
                </div>
            </div>
        </div>

    )
}
