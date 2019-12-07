import React, { useEffect } from 'react';
import asim from '../../img/asim.jpg';
import sid from '../../img/sid.jpg';
import devo from '../../img/devo.jpg';
import {Redirect } from 'react-router-dom';
//import paras from '../../img/paras.jpeg';
import {addVote} from "../../actions/poll";
import {connect} from "react-redux";
import Alert from '../layout/Alert';
import uuid from 'uuid';
import {setAlert} from '../../actions/alert';
const Poll = ({addVote,setAlert1,isAuthenticated,alerts}) =>{
useEffect(()=>{
        alerts&&
        alerts.length > 0 &&
        alerts.map(alert => (
         
            window.alert(alert.msg)
        
        ))  
},[alerts]);
        
        const addVoteIn =(id) =>{
                 console.log("clicked");
                 
                 console.log("clicked"); 

                if(isAuthenticated){
                        try {
                                addVote(id);
                        } catch (error) {
                                
                        }

                }else{
                        
                 console.log("esle in"); 
                 setAlert1("Not yet login", 'danger');
                      return  <Redirect to='/login'></Redirect>
                }

        }
  return(
    <div>
         <div class="container-fluid vote-body">
                        <div class="row">
                                <div class="col-md-12">
                                
                                        <div class="row">
                                        
                                                <div class="col-md-2">

                                                </div>
                                                <div class="col-md-8">
                                                        <div class="card topic-heading-card col-margin">
                                                         <label class="topic-heading">Bigg Boss 13 Nomination List</label>
                                                      
                                                         <Alert></Alert>

                                                        
                                                        
                                                        
                                                        
                                                </div>
                                                </div>
                                                <div class="col-md-2">
                                                        
                                                </div>

                                        </div>        
                                 </div>
                                 <div class="col-md-12">
                                         <div class="row">
                                                
                                                      
                                                       <div class="col-md-6 col-12 ">
                                                               <div class="card col-margin">
                                                                        <div class="row">
                                                                                        <div class="col-md-3 col-4 pr-0 ">
                                                                                                        <div class="card applicant-img-card">
                                                                                                               
                                                                                                                        <img src={asim} class="applicant-img" alt="asim image" ></img>
                                                                                                                   
                                                                                                        </div>
                                                                                        </div> 
                                                                                        <div class="col-md-6 col-5 pl-0 pr-0">
                                                                                                        <div class="card">
                                                                                                             <label class="contestant-name">Asim Riaz</label>
                                                                                                             <label class="contestant-location">J & K</label>
                                                                                                        </div>         
                                                                                        </div> 
                                                                                        <div class="col-md-3 col-3 pl-0">
                                                                                                        <div class="card">
                                                                                                                <button class="vote-button" onClick={(e)=>addVoteIn("5dd0fad5c087981c804d020e")}>Vote</button>              
                                                                                                         </div>
                                                                                         </div>  

                                                                        </div>
                                                               </div>        
                                                       </div>
                                                       <div class="col-md-6 col-12 ">
                                                                <div class="card col-margin">
                                                                         <div class="row">
                                                                                         <div class="col-md-3 col-4 pr-0">
                                                                                                         <div class="card applicant-img-card">
                                                                                                                
                                                                                                                         <img src={sid} class="applicant-img" alt="sid image" ></img>
                                                                                                                    
                                                                                                         </div>
                                                                                         </div> 
                                                                                         <div class="col-md-6 col-5 pl-0 pr-0">
                                                                                                         <div class="card">
                                                                                                                        <label class="contestant-name">Siddharth Shukla</label>
                                                                                                                        <label class="contestant-location">Mumbai</label>
                                                                                                         </div>         
                                                                                        </div>
                                                                                        <div class="col-md-3 col-3 pl-0">
                                                                                                        <div class="card">
                                                                                                                <button class="vote-button" onClick={(e)=>addVoteIn("5dd0fa36c087981c804d020c")}>Vote</button>              
                                                                                                         </div>
                                                                                         </div>  
                                                                        </div>  
                                                                 </div>
                                                        </div>
                                                        <div class="col-md-6 col-12 ">
                                                                        <div class="card col-margin">
                                                                                 <div class="row">
                                                                                                 <div class="col-md-3 col-4 pr-0">
                                                                                                                 <div class="card applicant-img-card">
                                                                                                                        
                                                                                                                                 <img src={devo} class="applicant-img" alt="devo image" ></img>
                                                                                                                            
                                                                                                                 </div>
                                                                                                 </div> 
                                                                                                 <div class="col-md-6 col-5 pl-0 pr-0">
                                                                                                                 <div class="card">
                                                                                                                                <label class="contestant-name">Devolina Bhattacharya</label>
                                                                                                                                <label class="contestant-location">Mumbai</label>
                                                                                                                 </div>         
                                                                                                </div>
                                                                                                <div class="col-md-3 col-3 pl-0">
                                                                                                                <div class="card">
                                                                                                                        <button class="vote-button" onClick={(e)=>addVoteIn("5dd11e8ef532ed1c8423b4b7")}>Vote</button>              
                                                                                                                 </div>
                                                                                                 </div>  


                                                                                </div>  
                                                                         </div>
                                                        </div>        
                                                       
                                         </div>
                                 </div>      

                                         
        
                        </div>
                 </div>

    </div>
  )

}
const mapStateToProps = state =>{
        return {
                alerts:state.alerts,
                isAuthenticated:state.auth.isAuthenticated
        }
}
const mapDispatchToProps = dispatch =>{
        const id= uuid.v4();
return {
        
        addVote:(id)=>dispatch(addVote(id)),
        setAlert1:(msg,alertType)=>dispatch((setAlert(msg,alertType)))
}
}
export default connect(mapStateToProps,mapDispatchToProps)(Poll)