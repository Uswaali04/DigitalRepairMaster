import React from 'react'
import { Link,useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { useState } from 'react'


export default function Login() {
    let [error, setError] = useState(null)
    const {
        register,
        handleSubmit,
        formState: { errors },
        reset
    } = useForm();
    const navigate = useNavigate();
    const onSubmit = async (data) => {
    
        try {
            const requestOptions = {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data)
            };
            let response = await fetch('http://localhost:1337/api/auth/local', requestOptions)
            let userResponse = await response.json()
            console.log(userResponse)
            if (!response.ok) {
                alert("You enterd wrong Email or password")
                setError(response.error)
                throw new Error(response.error)
            }
            localStorage.setItem('token', userResponse.jwt)
            localStorage.setItem('username', userResponse.user.username)
            localStorage.setItem('userid', userResponse.user.id)
            localStorage.setItem('user_type', userResponse.user.user_type)
            alert("Login successfull")
            reset()
            navigate("/")
        } 
        catch (error) {
            console.log(`error ${error}`)

        }
        
    };
    return (
        <div>
            <div className="p-3 mx-2 mt-3 bg-info bg-opacity-10 border border-info rounded-start rounded-end">

                <div className="form-box mt-2">
                    <form className="form" onSubmit={handleSubmit(onSubmit)}>
                        <span className="title">Log in</span>
                        <div className="form-container">
                            <div className="mb-3">
                            <label htmlFor="formGroupExampleInput" className="form-label">Email</label>
                                <input type="email"
                                    {...register("identifier", {
                                        required: {
                                            value: true,
                                            message: "Kindly enter a valid email address"
                                        },
                                        pattern: {
                                            value: "/^\S+@\S+$/i",
                                            message: "invalid format"
                                        }
                                    })}
                                    className={errors.identifier ? "is-invalid form-control" : " form-control"} placeholder="Enter your email address" />
                                <span className="text-danger">{errors.identifier && errors.identifier.message}
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
                                    className={errors.password ? "is-invalid form-control" : " form-control"} placeholder="Enter your password" />
                                <span className="text-danger">  {errors.password && errors.password.message}
                                </span>
                            </div>
                        </div>
                        <div className='d-flex justify-content-center'>
                            <button className="nav-link py-2 col-md-4">Submit</button>
                        </div>
                        
                    </form>
                    <div className="form-section">
                        <p className="text-color ms-2">Don't have an account?<Link to="/signup">Sign up</Link></p>
                    </div>
                </div>
            </div>
        </div>

    )
}
//jb login ho tb hi profile id fetch krli jaey
