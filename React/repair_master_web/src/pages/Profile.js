import React from 'react'
import Header from '../components/Header'
import { useForm } from 'react-hook-form'
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Profile() {
  const [error, setError] = useState(null)
  let navigate=useNavigate()
  const {
    register,
    handleSubmit,
    formState: { errors },
    
  } = useForm();
  const onSubmit = async (data) => {
    const copyData ={
      ...data,
      users_permissions_user : localStorage.getItem('userid'),
    }
    console.log(data);
    try {
      const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ data: copyData }),
      };
      const response = await fetch('http://localhost:1337/api/profiles', requestOptions);
      const userResponse = await response.json();
      console.log(userResponse);
      if (!response.ok) {
        alert('Here we got some errors');
        setError(response.error);
        throw new Error(response.error);
      }
      localStorage.setItem("profile_Id", userResponse.data[0]?.id)
      alert('Submision successful');
      navigate('/')
    } catch (error) {
      console.log(`error ${error}`);
    }
  };

  return (
    <div>
      <Header />
      {error && JSON.stringify(error)}
      <form className="container d-flex mt-3" onSubmit={handleSubmit(onSubmit)}>
        <section className="form-box col-lg-12" style={{ maxWidth: "1000px" }}>
          <div className="row form">
            <div className="card py-1">
              <div className='row'>
                <div className="card-header-menu">
                  <i className="fa fa-bars"></i>
                </div>
              </div>
              <div className="form-container col-lg-12 text-start">
                <div className="row g-2">
                  <div className="col-lg-6 ps-3">
                    <div className="flex-column d-flex">
                      <div className="form-group my-1">
                        <label htmlFor="formGroupExampleInput" className="form-label">Shop/Lab Name:</label>
                        <input type="text"
                          {...register("shop_name", {
                            required: {
                              value: true,
                              message: "Field required. Please enter your shop/lab name"
                            },
                            minLength: {
                              value: 3,
                              message: "Shop/Lab name should have atleast 3 characters"
                            },
                          })}
                          className={errors.shop_name ? "is-invalid form-control" : " form-control"} placeholder="Enter Full Name" />
                        <span className="text-danger">{errors.shop_name && errors.shop_name.message}
                        </span>
                      </div>
                      <div className="form-group my-1">
                        <label htmlFor="shop_address">Address:</label>
                        <input type="text"
                          {...register("shop_address", {
                            required: {
                              value: true,
                              message: "Field required. Please enter your shop/lab address"
                            },
                            minLength: {
                              value: 3,
                              message: "Address should have atleast 3 characters"
                            },
                          })}
                          className={errors.shop_address ? "is-invalid form-control" : " form-control"} id="address" placeholder="Enter your shop/lab Address" />
                        <span className="text-danger">{errors.shop_address && errors.shop_address.message}
                        </span>
                      </div>
                      <div className="form-group my-1">
                        <label htmlFor="email">Email:</label>
                        <input type="email"
                          {...register("shop_email", {
                            required: {
                              value: true,
                              message: "Field required. Please enter your email"
                            },
                            pattern: {
                              value: "/^\S+@\S+$/i",
                              message: "invalid format"
                            }
                          })}

                          className={errors.shop_email ? "is-invalid form-control" : " form-control"} id="email" placeholder="Enter your shop_email" />
                        <span className="text-danger">{errors.shop_email && errors.shop_email.message}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="col-lg-6 ps-2">
                    <div className="flex-column d-flex">
                      <div className="form-group my-1">
                        <label htmlFor="shop_contactinfo" className="form-label">Phone:</label>
                        <input type="text"
                          {...register("shop_contactinfo", {
                            required: {
                              value: true,
                              message: "Field required. Please enter your shop/Lab phone no."
                            },
                            minLength: {
                              value: 11,
                              message: "CNIC should have atleast 13 digits"
                            },
                          })}
                          className={errors.shop_contactinfo ? "is-invalid form-control" : " form-control"} id="shop_contactinfo" placeholder="Enter your phone number" />
                        <span className="text-danger">{errors.shop_contactinfo && errors.shop_contactinfo.message}
                        </span>
                      </div>
                      <div className="form-group my-1">
                        <label htmlFor="shop_cnic">CNIC:</label>
                        <input type="text"
                          {...register("shop_cnic", {
                            required: {
                              value: true,
                              message: "Field required. Please enter your CNIC"
                            },
                            minLength: {
                              value: 13,
                              message: "CNIC should have atleast 13 digits"
                            },
                          })}
                          className={errors.shop_cnic ? "is-invalid form-control" : " form-control"} id="shop_contactinfo" placeholder="Enter your CNIC without dashes" />
                        <span className="text-danger">{errors.shop_cnic && errors.shop_cnic.message}
                        </span>
                      </div>
                      <div className="form-group my-1"><label>About:</label>
                        <input
                          {...register("shop_about", {
                            required: {
                              value: true,
                              message: "Field required. Please describe about your shop/lab"
                            },
                            minLength: {
                              value: 3,
                              message: "Shop/Lab About should have atleast 3 characters"
                            },
                          })}
                          className={errors.shop_about ? "is-invalid form-control" : " form-control"} type="text" rows="2" placeholder="Enter any description about you or your shop/lab" /><br />
                        <span className="text-danger">{errors.shop_about && errors.shop_about.message}
                        </span>
                      </div>
                      {/* <div className="form-group my-1"><label>Ratings:</label><br />
                      <RatingStars />
                      </div> */}
                      {/* <div className="form-group my-1"><label>Completion Rate:</label><br />
                      <CompletionRateBar />
                      </div> */}
                    </div>
                  </div>
                  <div className="form-group my-4 d-flex justify-content-center">
                    <button className="nav-link py-2 col-md-4">Submit</button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </form>
    </div>
  )
}
