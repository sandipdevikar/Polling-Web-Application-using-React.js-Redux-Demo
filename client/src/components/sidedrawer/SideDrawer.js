import React from 'react';
import './SideDrawer.css';

import {Link} from 'react-router-dom';
import {connect} from 'react-redux';
import {logout} from '../../actions/auth';
const SideDrawer = ({show,isAuthenticated,logout,auth:{user},loading}) =>{
  let drawerClasses='side-drawer';

  if(show){
    drawerClasses='side-drawer open'
  }

  
  const authLinks =
     (
     <>
      <ul>
      <li><Link to="/polls">Polls</Link></li>
    
      <li><Link to="/result">Result</Link></li>
      <li><Link to="#" onClick={logout}>Logout</Link></li>
      </ul>
      </>
    );

  const adminLinks=(

    <>
    <ul >
    <li ><Link to="/addPolls">Add Polls</Link></li>
  
    <li ><Link to="/addResult">Add Result</Link></li>
    <li ><Link to="/polls" >Polls</Link></li>
    <li ><Link to="/pollslist"> Polls List</Link></li>          
    <li ><Link to="/result" >Result</Link></li>
    <li ><Link to="#" onClick={logout}>Logout</Link></li>
   
        </ul>
    </>
 
    
  );  
  const guestLink =(
      <ul>
         <li><Link to="/polls">Polls</Link></li>   
        <li><Link to="/register">Register</Link></li>
        <li><Link to="/login">Login</Link></li>
      </ul>

  );


  return (
    
   <nav className={drawerClasses}> 
        {!loading&&(<>{isAuthenticated?(user&&user.UserType=="admin"?adminLinks:authLinks):guestLink} 
      {}</>)}
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

export default connect(mapStateToProps,{logout})(SideDrawer);