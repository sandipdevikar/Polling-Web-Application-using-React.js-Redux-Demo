import { UPDATE_VOTES, POST_ERROR,ADD_POLL,POLLS_LOADED,POLLS_ITEM_LOADED
    } from "../actions/types";
  
  const initialState = {
    polls: [],
    poll: [],
    loading: true,
    error: {}
  };
  
  export default function(state = initialState, action) {
    const { type, payload } = action;
  
    switch (type) {
      case UPDATE_VOTES:
        return {
          ...state,
          polls: state.polls.map(poll =>
            poll._id === payload.id ? { ...poll, votes: payload.votes } : poll
          ),
          loading: false
        };
        case ADD_POLL:
          return{
              ...state,
              polls:payload,
              loading:false
          };
          case POLLS_ITEM_LOADED:
            return{
              ...state,
              poll:payload,
              loading:false
            }
          case POLLS_LOADED:
            return{
              ...state,
              polls:payload,
              loading:false
            }
        case POST_ERROR:
          return{
              ...state,
              error:payload,
              loading:false

        }
       default:
        return state;
    }
  }
  