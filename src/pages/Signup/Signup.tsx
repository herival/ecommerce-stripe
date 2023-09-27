/*
  Author : Mudey Formation
  Website : https://mudey.fr/
  App Name : E-commerce with React.Js
  Created At : 21/09/2023 12:35:43
*/
import React, { FC, useEffect, Fragment, useState } from 'react';
// import Loading from '../Loading/Loading';
import './Signup.css';
import PageBanner from '../../components/PageBanner/PageBanner';
import { useFormik } from 'formik';
import { validateRegisterForm } from '../../helpers/utils';
import { signup } from '../../api/entity';
import { Link, Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { getAuthState } from '../../redux/selectors/selectors';


interface SignupProps {

}


const Signup: FC<SignupProps> = () => {

  const isAuth = useSelector(getAuthState)
  const validate = (values: any) => validateRegisterForm(values)
  const [redirect, setRedirect] = useState<boolean>(false)
  const [formError, setFormError] = useState<string>("");
  // const [value, setValue] = useState('');

  const formik = useFormik({
    initialValues: {
      fullName: '',
      email: '',
      password: '',
      confirmPassword: '',
      acceptedTerms: false
    },
    validate,
    onSubmit: async (user) => {
      const result = await signup(user)
      // alert(JSON.stringify(result, null, 2));
      if(result.isSuccess){
        setRedirect(true)
        setFormError("")
      }else{
        setRedirect(false)
        setFormError(result.message)
      }
    },
  });

  useEffect(() => {
    window.scrollTo(0, 0)
    const runLocalData = async () => {

      // setLoading(false)
    }
    runLocalData()
  }, [])

  if(redirect){
    // redirect
    return <Navigate to="/signin" />
  }
  if(isAuth){
    return <Navigate to="/account" />
  }

  
  return (
    <Fragment>
      <PageBanner name='Register' />
      <div className="Signup">
        <div className="main_content">
          <div className="login_register_wrap section">
            <div className="container">
              <div className="row justify-content-center">
                <div className="col-xl-6 col-md-10">
                  <div className="login_wrap">
                    <div className="padding_eight_all bg-white">
                      <div className="heading_s1">
                        <h3 >Create an Account</h3>
                      </div>
                      <form onSubmit={formik.handleSubmit} className="ng-untouched ng-pristine ng-invalid">
                        <p className="error">
                          {formError}
                        </p>
                        <div className="form-group mb-3" >
                          <input
                            type="text"
                            name="fullName" placeholder="Enter Your Name"
                            className="form-control ng-untouched ng-pristine ng-invalid"
                            onChange={formik.handleChange}
                            value={formik.values.fullName}
                          />
                          {formik.touched.fullName && formik.errors.fullName ? (
                            <div className="error">{formik.errors.fullName}</div>
                          ) : null}
                        </div>
                        <div className="form-group mb-3">
                          <input
                            type="text"
                            name="email" placeholder="Enter Your Email"
                            className="form-control ng-untouched ng-pristine ng-invalid"
                            onChange={formik.handleChange}
                            value={formik.values.email}
                          />
                          {formik.touched.email && formik.errors.email ? (
                            <div className="error">{formik.errors.email}</div>
                          ) : null}
                        </div>
                        <div className="form-group mb-3">
                          <input
                            type="password"
                            name="password"
                            placeholder="Password"
                            className="form-control ng-untouched ng-pristine ng-invalid"
                            onChange={formik.handleChange}
                            value={formik.values.password}
                          />
                          {formik.touched.password && formik.errors.password ? (
                            <div className="error">{formik.errors.password}</div>
                          ) : null}
                        </div>
                        <div className="form-group mb-3">
                          <input
                            type="password"
                            name="confirmPassword"
                            placeholder="Confirm Password"
                            className="form-control"
                            onChange={formik.handleChange}
                            value={formik.values.confirmPassword}
                          />
                          {formik.touched.confirmPassword && formik.errors.confirmPassword ? (
                            <div className="error">{formik.errors.confirmPassword}</div>
                          ) : null}
                        </div>
                        <div className="login_footer form-group mb-3">
                          <div className="">
                            <div className="custome-checkbox">
                              <input
                                type="checkbox" 
                                name="acceptedTerms"
                                checked={formik.values.acceptedTerms}
                                className="form-check-input"
                                onChange={formik.handleChange}
                                />
                              <label
                                htmlFor="exampleCheckbox2"
                                className="">
                                <span >I agree to terms &amp; Policy.</span>
                              </label>
                            </div>
                          </div>
                        </div>
                        <div className="form-group mb-3"><button
                          type="submit" name="register"
                          className="btn btn-fill-out btn-block">Register</button></div>
                      </form>
                      <div className="different_login">
                        {/* <span >  or</span> */}
                        </div>
                      {/* <ul className="btn-login list_none text-center">
                        <li ><a href="#"
                          className="btn btn-facebook"><i
                            className="ion-social-facebook"></i>Facebook</a></li>
                        <li ><a href="#"
                          className="btn btn-google"><i
                            className="ion-social-googleplus"></i>Google</a></li>
                      </ul> */}
                      <div className="form-note text-center">Already have an account? 
                      <Link to="/signin">Log in</Link>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

    </Fragment>
  );
}

export default Signup;