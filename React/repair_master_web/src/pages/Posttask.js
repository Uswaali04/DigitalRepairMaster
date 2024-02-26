import React from 'react';
import { useForm } from 'react-hook-form';
import { useState } from 'react';

export default function Posttask() {
  const [error, setError] = useState(null);
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();
  const generateSlug = (taskDetails) => {
    // Remove any leading or trailing spaces
    const trimmedDetails = taskDetails.trim();
    // Replace spaces and special characters with dashes
    const slug = trimmedDetails.replace(/[^a-zA-Z0-9\s]/g, '').replace(/\s+/g, '-').toLowerCase();
    return slug;
  };

  const onSubmit = async (data) => {
    const taskDetails = data.detail;
    const slug = generateSlug(taskDetails);
    const copyData = {
      ...data,
      users_permissions_user : localStorage.getItem('userid'),
      slug: slug
    };
    try {
      const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({data: copyData}),
      };
      const response = await fetch('http://localhost:1337/api/repairs', requestOptions);
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
    <>

      {error && JSON.stringify(error)}
      <form className="container d-flex mt-5" onSubmit={handleSubmit(onSubmit)}>
        <section className="form-box col-md-12" style={{ maxWidth: '960px' }}>
          <div className="row form">
            <div className="card py-md-3 px-md-3 mt-2 col-lg-12 mx-auto">
              <header className="d-flex pb-3 mb-2 border-bottom">
                <span className="fs-5 fw-bold title">Post Your Task</span>
              </header>
              <main>
                <div className="mb-2">
                  <label className="form-label text-color">Device</label>
                  <input
                    type="text"
                    {...register('device', {
                      required: {
                        value: true,
                        message: 'Field required. Enter device name',
                      },
                      minLength: {
                        value: 3,
                        message: 'Device name should be at least 3 characters',
                      },
                      maxLength: {
                        value: 150,
                        message: "Device name can't be longer than 15 characters",
                      },
                    })}
                    className={errors.device ? 'is-invalid form-control' : 'form-control'}
                    placeholder="e.g Mobile"
                  />
                  <span className="text-danger">{errors.device && errors.device.message}</span>
                </div>
                <div className="mb-2">
                  <label className="form-label text-color">Detail</label>
                  <textarea type="text"
                    {...register('detail', {
                      required: {
                        value: true,
                        message: 'Kindly enter the task details',
                      },
                      minLength: {
                        value: 3,
                        message: 'Task details should be at least 3 characters',
                      },
                      maxLength: {
                        value: 100000,
                        message: "Task details can't be longer than 100 characters",
                      },
                    })}
                    className={errors.detail ? 'is-invalid form-control' : 'form-control'}
                    id="exampleFormControlTextarea1"
                    rows="3"
                    placeholder="Explain the issue here"
                  ></textarea>
                  <span className="text-danger">{errors.detail && errors.detail.message}</span>
                </div>
                <div className="mb-2">
                  <label className="form-label text-color">Phone no.</label>
                  <input type="number"
                    {...register('phone_no', {
                      required: {
                        value: true,
                        message: 'Kindly enter your Phone no.',
                      },
                      // minLength: {
                      //   value: 11,
                      //   message: 'Phone no. should be 11 digits long.',
                      // },
                      // maxLength: {
                      //   value: 11,
                      //   message: "Phone no. can not be longer than 11 digits.",
                      // },
                    })}
                    className={errors.phone_no ? 'is-invalid form-control' : 'form-control'}
                    id="exampleFormControlTextarea1"
                    placeholder="Enter your phone number here."
                  ></input>
                  <span className="text-danger">{errors.phone_no && errors.phone_no.message}</span>
                </div>
                <div className="mb-2">
                  <label className="form-label text-color">Estimated Budget (in Rs)</label>
                  <input
                    {...register('budget', {
                      required: {
                        value: true,
                        message: 'Field required. Enter estimated budget',
                      },
                    })}
                    className={errors.budget ? 'is-invalid form-control' : 'form-control'}
                    type="number"
                    id="exampleFormControlInput1"
                    placeholder="Enter estimated budget in rupees."
                  />
                  <span className="text-danger">{errors.budget && errors.budget.message}</span>
                </div>
                <div className="mb-2">
                  <label className="form-label text-color">Address</label>
                  <input
                    {...register('address', {
                      required: {
                        value: true,
                        message: 'Field required. Enter your address for delivery service',
                      },
                    })}
                    className={errors.address ? 'is-invalid form-control' : 'form-control'}
                    type="location"
                    id="exampleFormControlInput1"
                    rows="2"
                    placeholder="Enter your address for delivery service"
                  />
                  <span className="text-danger">{errors.address && errors.address.message}</span>
                </div>
                {/* <div className="mb-2">
                  <label className="form-label text-color">Photo of the device</label>
                  <UploadImgTaskPost />
                </div> */}
                <strong>Note: Do not share your personal information here</strong>
              </main>
              <div className="d-flex justify-content-center my-3">
                <button type="submit" className="nav-link py-2 col-4">
                  Submit
                </button>
              </div>
            </div>
          </div>
        </section>
      </form>
    </>
  );
}