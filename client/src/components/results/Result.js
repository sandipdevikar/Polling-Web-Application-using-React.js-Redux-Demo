import React from 'react';
import {Redirect} from 'react-router-dom';
import {connect} from 'react-redux';
const Result = ({isAuthenticated}) =>{
if(!isAuthenticated){
    return <Redirect to="/polls"/>
}
  return(
    <div className="container">
        Result will be display on  Saturday 12:00 pm  
    </div>
  )

}

const mapStateToProps = state =>{
    return{
        isAuthenticated:state.auth.isAuthenticated
    }
}

export default connect(mapStateToProps,{})(Result)