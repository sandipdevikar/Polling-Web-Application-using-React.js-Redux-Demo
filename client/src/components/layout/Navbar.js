import React from 'react';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';
import {logout} from '../../actions/auth';

const Navbar = ({isAuthenticated,loading,auth:{user},logout}) =>{

  const authLinks =
     (
     <>
      <ul className="navbar-nav">
      <li className="nav-item"><Link to="/polls" className="nav-link">Polls</Link></li>
    
      <li className="nav-item"><Link to="/result" className="nav-link">Result</Link></li>
      <li className="nav-item"><Link to="#" className="nav-link" onClick={logout}>Logout</Link></li>
      </ul>
      </>
    );

  const adminLinks=(

    <>
    <ul className="navbar-nav">
    <li className="nav-item"><Link to="/addPolls"  className="nav-link">Add Polls</Link></li>
  
    <li className="nav-item"><Link to="/addResult"  className="nav-link">Add Result</Link></li>
    <li className="nav-item"><Link to="/polls" className="nav-link">Polls</Link></li>
    <li className="nav-item"><Link to="/pollslist" className="nav-link"> Polls List</Link></li>          
    <li className="nav-item"><Link to="/result" className="nav-link">Result</Link></li>
    <li className="nav-item"><Link to="#" className="nav-link" onClick={logout}>Logout</Link></li>
   
        </ul>
    </>
 
    
  );  
  const guestLink =(
      <ul className="navbar-nav">
         <li className="nav-item"><Link to="/polls" className="nav-link">Polls</Link></li>   
        <li className="nav-item"><Link to="/register" className="nav-link">Register</Link></li>
        <li className="nav-item"><Link to="/login" className="nav-link">Login</Link></li>
      </ul>

  );
  return(
    <nav class="navbar  navbar-expand-lg navbar-dark bg-dark">
    <Link to="/polls" class="navbar-brand pb-1">Polling </Link>
    <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
    </button>
    <div class="collapse navbar-collapse" id="navbarNav">
      {!loading&&(<>{isAuthenticated?(user&&user.UserType=="admin"?adminLinks:authLinks):guestLink} 
      {}</>)}
      
      </div>
    </nav>
  )

}

const mapStateToProps = state =>{
  return {
    isAuthenticated:state.auth.isAuthenticated,
   auth:state.auth,
    loading:state.auth.loading
  }
}

export default connect(mapStateToProps,{logout})(Navbar);