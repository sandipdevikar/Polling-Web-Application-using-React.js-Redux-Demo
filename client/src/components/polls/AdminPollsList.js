import React,{useState,useEffect} from 'react';
import {loadPollsList} from '../../actions/poll';
import {connect} from 'react-redux';
import {Link,Redirect} from 'react-router-dom';
import Spinner from '../layout/Spinner'; 
import PollsList from './PollsList'
import Pagination from './Pagination';
const AdminPollsList = ({loadPollsList,polls,auth:{user,loading}}) =>{

    useEffect(()=>{
        loadPollsList()
    },[]);
  
    const [currentPage,setCurrentPage] = useState(1);
    const [postsPerPage,setPostsPerPage] = useState(5);
    let flag=0;
    user&&user.UserType==="customer"?flag=1:flag=0;
    
    if(flag===1){
      return <Redirect to="/polls"/>

    }

    const indexOfLastPost = currentPage * postsPerPage;

    const indexOfFirstPost = indexOfLastPost - postsPerPage;

    const currentPosts = polls&&polls.length>0?polls.slice(indexOfFirstPost,indexOfLastPost):1;
    const paginate = pagenumber => setCurrentPage(pagenumber);
  return loading||polls==null ? (
    <Spinner />
  ) : (
    
                <>
                <div className=" container card bg-secondary">
                    <span className="h2 text-center text-light pollslistHead">Polls List</span>
                </div> 
               <div className="container">
               {
                polls != null &&
                polls.length > 0 &&<>
                <PollsList posts={currentPosts} loading={loading}></PollsList>
                <Pagination postsPerPage={postsPerPage} totalPosts={polls.length} paginate={paginate}/>
                </>
                }
                </div> 
                </>


  )

     

}

const mapStateToProps = state =>{

    return {
        polls:state.poll.polls,
        auth:state.auth
    }
}

export default connect(mapStateToProps,{loadPollsList})(AdminPollsList)



