import React from 'react';
import {Link} from 'react-router-dom';
const PollsList = ({loading , posts}) =>{

    if(loading){
        return <h2>loading...</h2>
    }else{
  return(
    <div>
            <ul className="list-group  mb-4">
                {
                    posts.map((poll)=>(
                   <Link  to={`/${poll._id}`}> <li key={poll._id} className="list-group-item">{poll.pollname}</li></Link>
                    ))
                }

            </ul>
    </div>
  )

}
}
export default PollsList