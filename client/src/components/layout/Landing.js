import React from 'react';
import {Link,Redirect} from "react-router-dom";
import {connect} from 'react-redux';
const Landing = (isAuthenticated) =>{
if(localStorage.token){
  return <Redirect to='/polls'/>
}
  return(
    <div>
        
    <section class="landing">
      <div class="dark-overlay">
        <div class="landing-inner">
          <h1 class="x-large">Polling Checker</h1>
          <p class="lead">
            Create a profile, gives vote to the favourite and know the popularity of that favourite. 
          </p>
          <div class="buttons">
            <Link to="/register" class="btn btn-primary">Sign Up</Link>
            <Link to="/login" class="btn btn-light">Login</Link>
          </div>
        </div>
      </div>
    </section>
    </div> 
  )

}
const mapStateToProps = state =>{
  return {
    isAuthenticated:state.auth.isAuthenticated
  }
}
export default connect(mapStateToProps)(Landing)