/*
  Author : Mudey Formation
  Website : https://mudey.fr/
  App Name : E-commerce with React.Js
  Created At : 27/09/2023 12:17:59
*/
import React, { FC, useEffect,useState } from 'react';
import './AddressForm.css';
import { useFormik } from 'formik';
import { generateId, validateAddressForm } from '../../helpers/utils';
import { Address } from '../../models/address';
import { addData, updateData } from '../../api/entity';
import { useDispatch } from 'react-redux';
import { ADD_NOTIFICATION } from '../../redux/actions/actionTypes';
import { getUserId } from '../../redux/selectors/selectors';
import { useSelector } from 'react-redux';
import { countries } from '../../helpers/countries';


interface AddressFormProps {
  address?: Address
  cancel: () => void
}


const AddressForm: FC<AddressFormProps> = ({ address, cancel }) => {


  const validate = (values: any) => validateAddressForm(values)
  const [formError, setFormError] = useState<string>("");
  const userId = useSelector(getUserId)
  const dispatch = useDispatch()

  const handleCancel = (event: any) => {
    event?.preventDefault()
    cancel()
  }

  const formik = useFormik({
    initialValues: address ? address : {
      name: '',
      street: '',
      phone: '',
      city: '',
      address_type: 'SHIPPING',
      code_postal: '',
      state: '',
      user: userId
    },
    validate,
    onSubmit: async (values: Address) => {
      // alert(JSON.stringify(result, null, 2));
      let result
      if(address){
        // update
        const id = address._id
        if(id)
          result = await updateData("address",id, {address: values})

      }else{
        //create
        result = await addData("address", {address: values})
      }
      if (result.isSuccess) {
        dispatch({
          type: ADD_NOTIFICATION,
          payload: {
            _id: generateId(),
            message: address ? "Address updated !" :"Address added !",
            status: "success",
            timeout: 2000
          }
        })
        handleCancel(null)

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
    <div className="AddressForm">
      <form method="post" name="enq" onSubmit={formik.handleSubmit}>
        <div className="error">{formError}</div>
        <div className="row">
          <div className="form-group col-md-12 mb-3">
            <label>Type <span className="required">*</span></label>
            <select className="form-control" name="addressType"
              onChange={formik.handleChange}
              value={formik.values.address_type}
            >
              <option>BILLING</option>
              <option>SHIPPING</option>
            </select>
            {formik.touched.address_type && formik.errors.address_type ? 
              <div className="error">{formik.errors.address_type}</div>
            : null}
          </div>
          <div className="form-group col-md-12 mb-3">
            <label>First Name <span className="required">*</span></label>
            <input className="form-control" name="name" type="text"
              onChange={formik.handleChange}
              value={formik.values.name}
            />
             {formik.touched.name && formik.errors.name ? 
              <div className="error">{formik.errors.name}</div>
            : null}
          </div>
          <div className="form-group col-md-6 mb-3">
            <label>Street <span className="required">*</span></label>
            <input className="form-control" name="street" type="text"
              onChange={formik.handleChange}
              value={formik.values.street}
            />
             {formik.touched.street && formik.errors.street ? 
              <div className="error">{formik.errors.street}</div>
            : null}
          </div>
          <div className="form-group col-md-6 mb-3">
            <label>Code Zip <span className="required">*</span></label>
            <input className="form-control" name="code_postal" type="text"
              onChange={formik.handleChange}
              value={formik.values.code_postal}
            />
             {formik.touched.code_postal && formik.errors.code_postal ? 
              <div className="error">{formik.errors.code_postal}</div>
            : null}
          </div>
          <div className="form-group col-md-6 mb-3">
            <label>City <span className="required">*</span></label>
            <input className="form-control" name="city" type="text" 
            onChange={formik.handleChange}
            value={formik.values.city}
            />
            {formik.touched.city && formik.errors.city ? 
              <div className="error">{formik.errors.city}</div>
            : null}
          </div>
          <div className="form-group col-md-6 mb-3">
            <label>State <span className="required">*</span></label>
            {/* <input className="form-control" name="state" type="text"
              onChange={formik.handleChange}
              value={formik.values.state}
            /> */}
            <select name="state" className="form-control"
            onChange={formik.handleChange}
            value={formik.values.state}
            >
              <option value="">Select country ...</option>
              {
                countries.map((country: any)=>{
                  return <option value={country.name}>
                    {country.name}
                    </option>
                })
              }
            </select>
             {formik.touched.state && formik.errors.state ? 
              <div className="error">{formik.errors.state}</div>
            : null}
          </div>
          <div className="form-group col-md-12 mb-3">
            <label>Phone <span className="required">*</span></label>
            <input className="form-control" name="phone" type="text"
              onChange={formik.handleChange}
              value={formik.values.phone}
            />
             {formik.touched.phone && formik.errors.phone ? 
              <div className="error">{formik.errors.phone}</div>
            : null}
          </div>


          <div className="col-md-12">
            <button className="btn btn-fill-out" onClick={handleCancel}>
              Cancel
            </button>
            {
              address ?
            <button type="submit" className="btn btn-fill-out" name="submit"
              value="Submit">Update
            </button>
              :
            <button type="submit" className="btn btn-fill-out" name="submit"
              value="Submit">Save
            </button>

            }
          </div>
        </div>
      </form>
    </div>
  );
}

export default AddressForm;