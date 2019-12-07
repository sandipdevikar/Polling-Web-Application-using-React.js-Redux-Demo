import React, {useEffect} from 'react';
import {connect} from 'react-redux';
import {Redirect} from 'react-router-dom';
import {loadPollsItem} from '../../actions/poll';
import Spinner from '../layout/Spinner';
const PollItem = ({loadPollsItem,poll,pollslist,auth:{user,loading},match}) =>{

    useEffect(()=>{
        loadPollsItem(match.params.id)
    },[]);
    
    let flag=0;
    user&&user.UserType==="customer"?flag=1:flag=0;
    
    if(flag===1){
      return <Redirect to="/polls"/>

    }
  return loading||pollslist==null ? (
    <Spinner />
  ) : (
    <div className="container-fluid">
      <div className="row">
          <div className="col-md-12">
              <div className="card">
                <span className="h1 text-center pt-2">
                  {poll.pollname}</span>
                 




                   <div className="card-body">
                      <table className="table table-bordered">
                        <tr className="bg-secondary text-light"><td>Contenstant Name</td><td>Votes</td></tr>
                        {
                        poll.pollslist != null&&poll.pollslist.length>0&&
                        pollslist.map(item=>(

                        
                               <tr><td>{item.contenstantName}</td> <td> {item.votes.length}</td></tr>
                          
                        ))
                        }
                        </table>
                    </div> 

               </div> 
          </div>  
      </div>  
      



    </div>
  )

}

const mapStateToProps = state =>{
  return {
    poll:state.poll.poll,
    pollslist:state.poll.poll.pollslist,
    auth:state.auth
  }
}


export default connect(mapStateToProps,{loadPollsItem})(PollItem)