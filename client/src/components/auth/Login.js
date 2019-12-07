import React, {useState} from 'react';
import {login} from '../../actions/auth'
import {Link,Redirect} from 'react-router-dom';
import {connect} from 'react-redux';
import Alert from '../layout/Alert'
const Login = ({login,isAuthenticated}) =>{

    const [formdata,setFormData]=useState({
       
        email:"",
        password:""
       
    });

const { email, password}=formdata;
const onChange = e => setFormData({...formdata, [e.target.name]:e.target.value});

const onSubmit = async e => {
 e.preventDefault();
 
    login({email,password});
}
if(isAuthenticated){
  return <Redirect to="/polls"></Redirect>

}
  return(
    
    <section className="container">
     <div className="alertDiv">
          <Alert/>
        </div> 
      <h1 className="large text-primary">Log in</h1>
      <p className="lead"><i className="fas fa-user"></i></p>
      <form className="form" onSubmit={e=>onSubmit(e)}>
       
        <div className="form-group">
          <input type="email" placeholder="Email Address" name="email" value={email} onChange={e=>onChange(e) }/>
          <small className="form-text"></small >
        </div>
        <div className="form-group">
          <input
            type="password"
            placeholder="Password"
            name="password"
            minLength="6" value={password} onChange={e=>onChange(e)}
          />
        </div>
        
        <input type="submit" className="btn btn-primary" value="Log in" />
      </form>
      <p className="my-1">
        Dont have an account? <Link to="/register">Sign Up</Link>
      </p>
    </section>
 
  )
  

}
const mapStateToProps = state =>{
  return{
    isAuthenticated:state.auth.isAuthenticated
  }
}
export default connect(mapStateToProps,{login})(Login)
