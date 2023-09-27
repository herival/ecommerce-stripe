/*
  Author : Mudey Formation
  Website : https://mudey.fr/
  App Name : E-commerce with React.Js
  Created At : 27/09/2023 11:30:27
*/
import React, { FC, useEffect, useState } from 'react';
import './SubscribeComponent.css';
import { useFormik } from 'formik';
import { generateId, validateSubscribeForm } from '../../helpers/utils';
import { User } from '../../models/user';
import { addData } from '../../api/entity';
import { ADD_NOTIFICATION, ADD_TO_STORAGE } from '../../redux/actions/actionTypes';
import { useDispatch } from 'react-redux';


interface SubscribeComponentProps {

}


const SubscribeComponent: FC<SubscribeComponentProps> = () => {


  const validate = (values: any) => validateSubscribeForm(values)
  const [formError, setFormError] = useState<string>("");
  const dispatch = useDispatch()

  const formik = useFormik({
    initialValues: {
      fullName: '',
      email: ''
    },
    validate,
    onSubmit: async (user: User) => {
      // alert(JSON.stringify(result, null, 2));
      const result = await addData("newsletter", { newsletter: user })
      if (result.isSuccess) {
        dispatch({
          type: ADD_NOTIFICATION,
          payload: {
            _id: generateId(),
            message: "Subscription completed !",
            status: "success",
            timeout: 2000
          }
        })
        dispatch({
          type: ADD_TO_STORAGE,
          key: "isSuscribed",
          unique: true,
          payload: true
        })

        // dispatch({
        //   type: CONNECTED,
        //   payload: {
        //     token: result.token,
        //     userId: result.userId,
        //   }
        // })
      } else {
        setFormError(result.message)
      }
    },
  });

  useEffect(() => {
    // window.scrollTo(0, 0)
    const runLocalData = async () => {

    }
    runLocalData()
  })

  return (
    <div className="SubscribeComponent">
      <div className="section bg_default small_pt small_pb">
        <div className="container">
          <div className="row align-items-center">
            <div className="col-md-6">
              <div className="heading_s1 mb-md-0 heading_light">
                <h3>Subscribe Our Newsletter</h3>
              </div>
            </div>
            <div className="col-md-6">
              <div className="newsletter_form">
                <div>{formError}</div>
                <form onSubmit={formik.handleSubmit}>

                  <input
                    type="text"
                    name="fullName"
                    className="form-control rounded-0"
                    placeholder="Enter Your fullName"
                    onChange={formik.handleChange}
                    value={formik.values.fullName}
                  />
                  <input
                    type="text"
                    name="email"
                    className="form-control rounded-0"
                    placeholder="Enter Email Address"
                    onChange={formik.handleChange}
                    value={formik.values.email}
                  />
                  <button type="submit" className="btn btn-dark rounded-0" name="submit"
                    value="Submit">Subscribe
                  </button>
                </form>
                {formik.touched.email && formik.errors.email ? (
                  <div className="error-white">{formik.errors.email}</div>
                ) : null}
                {formik.touched.fullName && formik.errors.fullName ? (
                  <div className="error-white">{formik.errors.fullName}</div>
                ) : null}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SubscribeComponent;