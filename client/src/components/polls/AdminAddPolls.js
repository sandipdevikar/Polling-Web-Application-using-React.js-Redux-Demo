import React, {useState} from 'react';
import {addPoll} from '../../actions/poll';
import {connect} from 'react-redux';
import {Redirect} from 'react-router-dom';
import Alert from '../layout/Alert';
const AdminAddPolls = ({addPoll,auth:{user}}) =>{

  
    const [formdata,setFormData]=useState({
       
        addpoll:""
        
       
    });
    let flag=0;
    user&&user.UserType==="customer"?flag=1:flag=0;
    
    if(flag===1){
      return <Redirect to="/polls"/>

    }
    const { addpoll}=formdata;
    const onChange = e => setFormData({...formdata, [e.target.name]:e.target.value});

    const onSubmit = async e => {
    e.preventDefault();
    
    addPoll(addpoll);
        
    }
  return(
    <>
    <div className="container-fluid">
        <div className="row">
            <div className="col-md-4">
                </div>
                <div className="col-md-4 card mt-4">
                <Alert/>
        <form method='post' onSubmit={e=>onSubmit(e)}>
            <div className="form-group ">
            
        <label className="label">Add poll</label>
            <input type="text" className="form-control mx-10" name="addpoll" value={addpoll} onChange={e=>onChange(e)} />
            <input type="submit" value="Add Poll" className="btn btn-primary mt-2"/>
            </div>
        </form>  
        </div>
        </div>
      </div>    
    </>
  )

}
const mapStateToProps = state =>{

  return {
    
      auth:state.auth
  }
}
export default connect(mapStateToProps,{addPoll})(AdminAddPolls)