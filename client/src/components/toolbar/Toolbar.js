import React from 'react';
import './toolbar.css';
import DrawerTogglerButton from '../sidedrawer/DrawerTogglerButton';

import {Link} from 'react-router-dom';
import {connect} from 'react-redux';
import {logout} from '../../actions/auth';
const Toolbar = ({isAuthenticated, DrawerClickHandler,logout,auth:{user},loading}) =>{
  
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

  return(
  <header className="toolbar">
      <nav className="toolbar-navigation">
        <div><DrawerTogglerButton click={DrawerClickHandler}/></div>
        <div className="toolbar-logo">POLLING</div>
        <div className="spacer"></div>
        <div className="toolbar-navigation-items">
        {!loading&&(<>{isAuthenticated?(user&&user.UserType=="admin"?adminLinks:authLinks):guestLink} 
      {}</>)}
        
        </div>

      </nav>
   </header> 
  );
}

const mapStateToProps = state =>{
  return {
    isAuthenticated:state.auth.isAuthenticated,
   auth:state.auth,
    loading:state.auth.loading
  }
}

export default connect(mapStateToProps,{logout})(Toolbar);