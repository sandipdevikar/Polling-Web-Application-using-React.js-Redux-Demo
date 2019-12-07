import React, {useState} from 'react';

import {Link,Redirect} from 'react-router-dom';
import {connect} from 'react-redux';
import { setAlert } from '../../actions/alert';
import propTypes from 'prop-types';
import { register } from '../../actions/auth';
import Alert from '../layout/Alert';
const Register = ({setAlert,register,isAuthenticated}) =>{

    const [formdata,setFormData]=useState({
        name:"",
        email:"",
        password:"",
        password2:""
    });

const {name, email, password, password2}=formdata;
const onChange = e => setFormData({...formdata, [e.target.name]:e.target.value});

const onSubmit = async e => {
 e.preventDefault();
 
 if(password !==password2){
  
     setAlert("Password do not match","danger");

 }else{

   register({name,email,password});
    
  
 }
}
if(isAuthenticated){
  return <Redirect to='/polls'></Redirect>

}
if(localStorage.token){
  return <Redirect to="/polls"/>
   
}
  return(
    <section className="container">
        <div className="alertDiv">
          <Alert/>
        </div>  
      <h1 className="large text-primary">Sign Up</h1>
      <p className="lead"><i className="fas fa-user"></i> Create Your Account</p>
      <form className="form" onSubmit={e=>onSubmit(e)}>
        <div className="form-group">
          <input type="text" placeholder="Name" name="name" value={name} onChange={e=>onChange(e)}  />
        </div>
        <div className="form-group">
          <input type="email" placeholder="Email Address" name="email" value={email} onChange={e=>onChange(e) }/>
          <small className="form-text"
            >This site uses Gravatar so if you want a profile image, use a
            Gravatar email</small
          >
        </div>
        <div className="form-group">
          <input
            type="password"
            placeholder="Password"
            name="password"
            minLength="6" value={password} onChange={e=>onChange(e)}
          />
        </div>
        <div className="form-group">
          <input
            type="password"
            placeholder="Confirm Password"
            name="password2"
            minLength="6" value={password2} onChange={e=>onChange(e)}
          />
         
        </div>
        <input type="submit" className="btn btn-primary" value="Register" />
      </form>
      <p className="my-1">
        Already have an account? <Link to="login">Sign In</Link>
      </p>
    </section>
 
  );
  };
  Register.propTypes={
    setAlert:propTypes.func.isRequired,
    register:propTypes.func.isRequired,
    isAuthenticated:propTypes.bool
  };
  const mapStateToProps = state =>{
    return{
      isAuthenticated:state.auth.isAuthenticated
    }
  }
export default connect(mapStateToProps,{ setAlert, register })(Register)
