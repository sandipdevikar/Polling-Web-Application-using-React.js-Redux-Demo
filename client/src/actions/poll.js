import axios from 'axios';
import {setAlert} from "./alert"
import {
    UPDATE_VOTES  ,POST_ERROR,ADD_POLL,POLLS_LOADED,AUTH_ERROR,POLLS_ITEM_LOADED
} from './types'
import { body } from 'express-validator';


export const addVote = id => async dispatch => {
  
    try {
      const res = await axios.put(`/api/poll/vote/5dd0f2ce37ab8310c82e146f/${id}`);
        
      dispatch({
        type: UPDATE_VOTES,
        payload: { id, votes: res.data }
      });
      dispatch(setAlert("Thanks for Voting",'success'));
    } catch (err) {
      const errors = err.response.data.errors;
      console.log(errors);
      if (errors) {
        errors.forEach(error => dispatch(setAlert(error.msg, 'danger')));
      }      dispatch({
        type: POST_ERROR,
        payload: { msg: err.response.statusText, status: err.response.status }
      });
    }
  };

  export const addPoll = pollname => async dispatch =>{
    const config = {
      headers: {
        'Content-Type': 'application/json'
      }
    };
    
    const body = JSON.stringify({ pollname });
     
   try{
     
    const res = await axios.post(`/api/poll`,body,config);
    dispatch({
      type:ADD_POLL,
      payload:res.data
    });
    dispatch(setAlert("Successfully Added Poll",'success'));
   }catch(err){
    
   }
     
    
  }
  export const loadPollsList =() => async dispatch => {
    
    try{
      const res=await axios.get('api/poll');
      dispatch({
        type:POLLS_LOADED,
        payload:res.data
      });
    }catch(err){
      dispatch({
        type:AUTH_ERROR
      });
  
    }
  }
  
  export const loadPollsItem =(id) => async dispatch => {
    
    try{
      const res=await axios.get(`api/poll/${id}`);
      console.log(res);
      dispatch({
        type:POLLS_ITEM_LOADED,
        payload:res.data
      });
    }catch(err){
      dispatch({
        type:AUTH_ERROR
      });
  
    }
  }