import React from 'react';
import {connect} from 'react-redux';
import {Redirect} from 'react-router-dom';
//import { loadUser } from '../../actions/auth';
const Dashboard = ({auth:{token}}) =>{
if(localStorage.token){
   return <Redirect to="/polls"/>
    
}
  return(
    <div>
        Dashboard
    </div>
  )

}
const mapStateToProps = state =>{
    return {
        auth:state.auth
    }
}

export default connect(mapStateToProps,{})(Dashboard)