import { LOGIN_SUCCESS, BAN_USER_SUCCESS, FETCH_USER_SUCCESS, GET_USERPROFILE_SUCCESS, LOGOUT_SUCCESS, SIGNUP_SUCCESS, TO_ADMIN_SUCCESS, UPLOAD_AVATAR_SUCCESS } from "./action";
import { FETCH_ITEM_SUCCESS, DELETE_ITEM_SUCCESS, ADD_NEW_ITEM_SUCCESS, UPDATE_ITEM_SUCCESS, UPLOADPHOTOS_SUCCESS, GETPHOTOS_SUCCESS, CHANGE_USER_NAME_SUCCESS, CHANGE_USER_PASSWORD_SUCCESS, FETCH_SAMPLE_SUCCESS, UPLOADSAMPLE_SUCCESS } from "./action";
import { FETCH_LEAVEREQUEST_SUCCESS, ADD_NEW_LEAVEREQUEST_SUCCESS, UPDATE_LEAVEREQUEST_SUCCESS, FETCH_EMPCODE_SUCCESS } from "./action";
const initialState = {
  // used for loading all posts on home page
  posts: [],
  // used for loading user info on profile page
  user: null,
  // used for loading name and avatar of every post on home page and when user click to see another user'profile
  allusersprofile: null,
  allusers:null,
  // used for loading photos
  photos:null,
  // used for sample tracking
  sample:null,
  // used for leaveapplication
  leaveapplication:null,
  empcodelist:null
};

const rootReducer = (state = initialState, action) => {
  switch (action.type) {

    case FETCH_ITEM_SUCCESS:
      return { ...state, posts: action.payload };

    case FETCH_USER_SUCCESS:
      return {
        ...state,
        allusers: action.payload.data
      };

    case LOGIN_SUCCESS:
      return { ...state, user: action.payload[0], allusersprofile: action.payload[1] };

    case SIGNUP_SUCCESS:
      return { ...state, user: { ...state.user, checktype: action.payload.checktype, result: action.payload.result } }

    case LOGOUT_SUCCESS:
      return {
        posts: [],
        user: null,
        allusersprofile: null
      };

    case GET_USERPROFILE_SUCCESS:
      return { ...state, user: { ...state.user, userblogs: action.payload } };

    case BAN_USER_SUCCESS:
      return { ...state, allusersprofile: [...state.allusersprofile.filter(item => item.id != action.payload)] };

    case TO_ADMIN_SUCCESS:
      const userfilter = state.allusersprofile.filter(item => item.id == action.payload.id)
      userfilter[0].role = action.payload.role;
      // return { ...state, allusers: [...state.allusers.filter(item => item.id != action.payload.id), {...userfilter}[0]] }
      return { ...state, allusersprofile: [...state.allusersprofile.filter(item => item.id != action.payload.id), {...userfilter}[0]] }

    case UPLOAD_AVATAR_SUCCESS:
      return { ...state, user: { ...state.user, [action.payload[1]]: action.payload[0] } }
    
    case DELETE_ITEM_SUCCESS:
      return {
        ...state,
        posts: [...state.posts.filter((item) => item.idcode != action.payload.idcode)],
        // user: {
        //   ...state.user,
        //   userblogs: [
        //     ...state.user.userblogs.filter((item) => item.id != action.payload)
        //   ]
        // }
      };

    case UPDATE_ITEM_SUCCESS:
      return {
        ...state,
        posts: [
          ...state.posts.filter((item) => item.idcode != action.payload.idcode),
          action.payload
        ],
        // user: {
        //   ...state.user,
        //   userblogs: [
        //     ...state.user.userblogs.filter(
        //       (item) => item.id != action.payload.id
        //     ),
        //     action.payload
        //   ]
        // }
      };

    case ADD_NEW_ITEM_SUCCESS:
      return {
        ...state,
        posts: [...state.posts, action.payload],
        // user: {
        //   ...state.user,
        //   userblogs: [...state.user.userblogs, action.payload]
        // }
      };

    case UPLOADPHOTOS_SUCCESS:
      return {
        ...state,
        photos: state.photos.concat(action.payload),
      };

    case GETPHOTOS_SUCCESS:
      return {
        ...state,
        photos: action.payload,
      };

    case CHANGE_USER_NAME_SUCCESS:
      return { ...state, user: { ...state.user, name: action.payload } };

    case CHANGE_USER_PASSWORD_SUCCESS:
      return { ...state, user: { ...state.user, password: action.payload } };

    case FETCH_SAMPLE_SUCCESS:
      return { ...state, sample: action.payload };  

    case UPLOADSAMPLE_SUCCESS:
      return {
        ...state,
        sample: action.payload,
      };

    case FETCH_LEAVEREQUEST_SUCCESS:
      return { ...state, leaveapplication: action.payload };  

    case ADD_NEW_LEAVEREQUEST_SUCCESS:
      return {
        ...state,
        leaveapplication: [...state.leaveapplication, action.payload],
      };  
    
    case UPDATE_LEAVEREQUEST_SUCCESS:
      return {
        ...state,
        leaveapplication: [
          ...state.leaveapplication.filter((item) => item.requestid != action.payload.requestid),
          action.payload
        ],
      };  

    case FETCH_EMPCODE_SUCCESS:
    return {
      ...state,
      empcodelist: action.payload
    };  

    default:
      return state;
  }
};

export default rootReducer;
