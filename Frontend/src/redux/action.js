import axios from "axios";
import { type } from "jquery";
export const FETCH_ITEM_SUCCESS = "FETCH_ITEM_SUCCESS";
export const FETCH_USER_SUCCESS = "FETCH_USER_SUCCESS";
export const LOGIN_SUCCESS = "LOGIN_SUCCESS";
export const LOGOUT_SUCCESS = "LOGOUT_SUCCESS";
export const GET_USERPROFILE_SUCCESS = "GET_USERPROFILE_SUCCESS";
export const BAN_USER_SUCCESS = "BAN_USER_SUCCESS";
export const TO_ADMIN_SUCCESS = "TO_ADMIN_SUCCESS";
export const SIGNUP_SUCCESS = "SIGNUP_SUCCESS"
export const UPLOAD_AVATAR_SUCCESS = "UPLOAD_AVATAR_SUCCESS"
export const DELETE_ITEM_SUCCESS = "DELETE_ITEM_SUCCESS";
export const UPDATE_ITEM_SUCCESS = "UPDATE_ITEM_SUCCESS";
export const ADD_NEW_ITEM_SUCCESS = "ADD_NEW_ITEM_SUCCESS";
export const UPLOADPHOTOS_SUCCESS = "UPLOADPHOTOS_SUCCESS";
export const GETPHOTOS_SUCCESS = "GETPHOTOS_SUCCESS";
export const CHANGE_USER_NAME_SUCCESS = "CHANGE_USER_NAME_SUCCESS";
export const CHANGE_USER_PASSWORD_SUCCESS = "CHANGE_USER_PASSWORD_SUCCESS";
export const FETCH_SAMPLE_SUCCESS = "FETCH_SAMPLE_SUCCESS";
export const UPLOADSAMPLE_SUCCESS = "UPLOADSAMPLE_SUCCESS";
export const FETCH_LEAVEREQUEST_SUCCESS = "FETCH_LEAVEREQUEST_SUCCESS";
export const ADD_NEW_LEAVEREQUEST_SUCCESS = "ADD_NEW_LEAVEREQUEST_SUCCESS";
export const UPDATE_LEAVEREQUEST_SUCCESS = "UPDATE_LEAVEREQUEST_SUCCESS";
export const FETCH_EMPCODE_SUCCESS = "FETCH_EMPCODE_SUCCESS";
export const UPLOADDATALOGICBOXLABEL_SUCCESS = "UPLOADDATALOGICBOXLABEL_SUCCESS";
export const FETCH_DATALOGICBOXLABEL_SUCCESS = "FETCH_DATALOGICBOXLABEL_SUCCESS";

// user 2 api, first one includes information about users (id,username,password,avatar,coverphoto...)
// last one includes information about posts (id,title,body,author...) 
// const apiurlusers = "https://649117572f2c7ee6c2c7b99a.mockapi.io/users";
// const apiurlusers = "https://api.scanx.io.vn/users";
const apiurlusers = "http://localhost:4200/users";
// const apiurlitems = "https://67221aae2108960b9cc2ea5b.mockapi.io/scanXdata";
// const apiurlitems = "https://api.scanx.io.vn/products";
const apiurlitems = "http://localhost:4200/products";
const apiuploadaphotos = "http://localhost:4200/upload";
// const apiuploadaphotos = "https://api.scanx.io.vn/upload";
const apiuploadsampletracking = "http://localhost:4200/uploadexcelfilesampletracking";
// const apiuploadsampletracking= "https://api.scanx.io.vn/uploadexcelfilesampletracking";
const apileaverequest= "http://localhost:4200/leaverequest";
// const apileaverequest= "https://api.scanx.io.vn/leaverequest";
const apiempcode= "http://localhost:4200/empcode";
// const apiempcode= "https://api.scanx.io.vn/empcode";
const apiuploaddatalogicboxlabel = "http://localhost:4200/uploaddatalogicboxlabel";
// const apiuploaddatalogicboxlabel= "https://api.scanx.io.vn/uploaddatalogicboxlabel";
const apidatalogicboxlabel = "http://localhost:4200/datalogicboxlabel";
// const apidatalogicboxlabel= "https://api.scanx.io.vn/datalogicboxlabel";


// get Datalogic box label data
export const getDatalogicBoxLabel= () => {
  return async (dispatch) => {
    const response = await axios.get(apidatalogicboxlabel);
    dispatch({
      type: FETCH_DATALOGICBOXLABEL_SUCCESS,
      payload: response.data.data
    });
  };
};

// upload file excel Datalogic box label to host
export const uploadDatalogicBoxLabel = (data) => {
  return async (dispatch) => {
    const response = await axios.post(`${apiuploaddatalogicboxlabel}`, data);
    dispatch({
      type: UPLOADDATALOGICBOXLABEL_SUCCESS,
      payload: response.data.data
    });
  };
};

// get all empcodes
export const getEmpcode= () => {
  return async (dispatch) => {
    const response = await axios.get(apiempcode);
    dispatch({
      type: FETCH_EMPCODE_SUCCESS,
      payload: response.data.data
    });
  };
};

// get all leave requests to load in leaveapplication page
export const getLeaverequest= () => {
  return async (dispatch) => {
    const response = await axios.get(apileaverequest);
    dispatch({
      type: FETCH_LEAVEREQUEST_SUCCESS,
      payload: response.data.data
    });
  };
};

// update leave request
export const editLeaverequest = (requestid,form,fromdate,todate,status) => {
  return async (dispatch) => {
    const response = await axios.put(`${apileaverequest}/${requestid}`, {
      createdAt: form.createdat,
      empcode: form.empcode,
      fullname: form.fullname,
      dept: form.dept, 
      type: form.type,
      reason: form.reason,
      totaldaysleave: form.totaldaysleave,
      fromdate: fromdate,
      todate: todate,
      leaderapproval: "Approved",
      supervisorapproval: status
    });
    dispatch({
      type: UPDATE_LEAVEREQUEST_SUCCESS,
      payload: response.data
    });
  };
};

// add new leave request
export const addnewLeaverequest = (requestid,form,fromdate,todate) => {
  return async (dispatch) => {
    const response = await axios.post(`${apileaverequest}`, {
      requestid: requestid,
      createdAt: Date.now(),
      empcode: form.empcode,
      fullname: form.fullname,
      dept: form.dept, 
      type: form.type,
      reason: form.reason,
      totaldaysleave: form.totaldaysleave,
      fromdate: fromdate,
      todate: todate,
      leaderapproval: "Approved",
      supervisorapproval: "Pending"
    });
    dispatch({
      type: ADD_NEW_LEAVEREQUEST_SUCCESS,
      payload: response.data
    });
  };
};

// get all samples tracking to load in Sampletracking page
export const getSample= () => {
  return async (dispatch) => {
    const response = await axios.get(apiuploadsampletracking);
    dispatch({
      type: FETCH_SAMPLE_SUCCESS,
      payload: response.data.data
    });
  };
};

// upload file excel samples tracking  to host
export const uploadSample = (data) => {
  return async (dispatch) => {
    const response = await axios.post(`${apiuploadsampletracking}`, data);
    dispatch({
      type: UPLOADSAMPLE_SUCCESS,
      payload: response.data.data
    });
  };
};


// get all photos name from database
export const getPhotos = () => {
  return async (dispatch) => {
    const response = await axios.get(apiuploadaphotos);
    const photos = [];
    response.data.data.forEach((photo) => photos.push(photo.name))
    dispatch({
      type: GETPHOTOS_SUCCESS,
      payload: photos
    });
  };
};

// upload photos to host
export const uploadPhotos = (data) => {
  return async (dispatch) => {
    const response = await axios.post(`${apiuploadaphotos}`, data);
    dispatch({
      type: UPLOADPHOTOS_SUCCESS,
      payload: response.data.allphotosname
    });
  };
};


// get all posts to load in home page
export const getItem = () => {
  return async (dispatch) => {
    const response = await axios.get(apiurlitems);
    dispatch({
      type: FETCH_ITEM_SUCCESS,
      payload: response.data.data
    });
  };
};

// call api when user click to login
export const login = (form) => {
  return async (dispatch) => {
    let checkloginresult = "";
    const response = await axios.get(apiurlusers);
    const data = response.data.data
    // when user click login button, check whether username is existed on database
    const getusername = data.filter(
      (item) => item.username == form.username
    );

    // clone all users database with delete username and password when change them to store
    const allusersprofile = structuredClone(response.data.data);
    // for (let item of allusersprofile) {
    //   delete item.username;
    //   delete item.password
    // }

    // if no username exists, store error to variable and do dispatch
    if (getusername.length == 0) {
      checkloginresult = "Username is not exists"
      dispatch({
        type: LOGIN_SUCCESS,
        payload: [{ userblogs: [], checktype: "login", result: checkloginresult }, null]
      });
    }
    // if username exists but password not matched, store error to variable and do dispatch
    else if (getusername[0].password != form.password) {
      checkloginresult = "Username and password are not matched"
      dispatch({
        type: LOGIN_SUCCESS,
        payload: [{ userblogs: [], checktype: "login", result: checkloginresult }, null]
      });
    }
    // if username exists and password matched
    else if (getusername[0].password == form.password) {
      checkloginresult = "Login successfully"
      dispatch({
        type: LOGIN_SUCCESS,
        // checktype : login is used for distinguishing between login or signup information 
        payload: [{ ...allusersprofile.filter(item => item.id == getusername[0].id)[0], userblogs: [], checktype: "login", result: checkloginresult }, allusersprofile]
      });
    }
  };
};

// get information of loginning user to load on profile page
export const getUserprofile = (posts, user) => {
  return async (dispatch) => {
    const userblogs = posts.filter((item) => item.userId == user.id);
    dispatch({
      type: GET_USERPROFILE_SUCCESS,
      payload: userblogs
    });
  };
};

// call api when user click to signup
export const signup = (form) => {
  return async (dispatch) => {
    let checksignupresult = "";
    const responsegetuser = await axios.get(apiurlusers)

    // check whether username and email is existed on database
    const checkusername = responsegetuser.data.data.filter(item => item.username == form.username)
    const checkemail = responsegetuser.data.data.filter(item => item.email == form.email)

    // if exist, store error to variable checksignupresult
    if (checkusername.length != 0) {
      checksignupresult = "Username already exists"
    }
    else if (checkemail.length != 0) {
      checksignupresult = "Email already exists"
    }
    // if not exist, process to call api and dispatch
    else {
      const response = await axios.post(apiurlusers, {
        name: form.name,
        email: form.email,
        username: form.username,
        password: form.password,
        role: form.role,
        // new user have default avatar and coverphoto as link below
        avatar: "https://res.cloudinary.com/dhva3lwfk/image/upload/v1688131036/gkwlvz6hllbauf7octgk.png",
        coverphoto: "https://res.cloudinary.com/dhva3lwfk/image/upload/v1731070128/cover2_kezyyd.png"
      })

      checksignupresult = "Sign up successfully"
    }
    dispatch({
      type: SIGNUP_SUCCESS,
      payload: { checktype: "signup", result: checksignupresult }
    });
  }
}

// get all users information (includes username,password,email,name...) for showing in admin page (only role admin can see it)
export const getallusers = () => {
  return async dispatch => {
    const response = await axios.get(apiurlusers);
    dispatch({
      type: FETCH_USER_SUCCESS,
      payload: response.data.data
    })
  }
}

// get all users information for loading posts (includes avatar,name,title,body,author,time...) in home page
export const getallusersforposts = () => {
  return async dispatch => {
    const response = await axios.get(apiurlusers)
    // to hide users's username and password when storing them
    for (let item of response.data.data) {
      delete item.username;
      delete item.password;
    }
    dispatch({
      type: FETCH_USER_SUCCESS,
      payload: response.data
    })
  }
}

// delete specific user (only root admin and admin can do this)
export const banuser = (id) => {
  return async dispatch => {
    const response = await axios.delete(`${apiurlusers}/${id}`);
    dispatch({
      type: BAN_USER_SUCCESS,
      payload: id
    })
  }
}

// change role from user to admin
export const toadmin = (id) => {
  return async dispatch => {
    const response = await axios.put(`${apiurlusers}/${id}`, {
      role: "admin"
    })
    dispatch({
      type: TO_ADMIN_SUCCESS,
      payload: response.data
    })
    
  }
}

// change name of user
export const changenameofuser = (user,name) => {
  return async dispatch => {
    const response = await axios.put(`${apiurlusers}/${user.id}`, {
      username: user.username,
      password: user.password,
      name: name,
      avatar: user.avatar,
      coverphoto: user.coverphoto,
      email: user.email,
      role: user.role
    });
    dispatch({
      type: CHANGE_USER_NAME_SUCCESS,
      payload: response.data.name
    })
    
  }
}

// change password of user
export const changepasswordofuser = (user,password) => {
  return async dispatch => {
    const response = await axios.put(`${apiurlusers}/${user.id}`, {
      username: user.username,
      password: password,
      name: user.name,
      avatar: user.avatar,
      coverphoto: user.coverphoto,
      email: user.email,
      role: user.role
    });
    dispatch({
      type: CHANGE_USER_PASSWORD_SUCCESS,
      payload: response.data.password
    })
    
  }
}

// use cloudinary api to host uploaded image and retrieve url of image
export const uploadavatar = (image, id, type) => {
  return async dispatch => {
    fetch("https://api.cloudinary.com/v1_1/dhva3lwfk/image/upload", {
      method: "post",
      body: image
    })
      .then((resp) => resp.json())
      .then((data) => {
        axios.put(`${apiurlusers}/${id}`, {
          [type]: data.url
        })
        dispatch({
          type: UPLOAD_AVATAR_SUCCESS,
          payload: [data.url, type]
        });
      })
      .catch((err) => console.log(err));
  }
}

export const deleteItem= (idcode) => {
  return async (dispatch) => {
    const response = await axios.delete(`${apiurlitems}/${idcode}`);
    dispatch({
      type: DELETE_ITEM_SUCCESS,
      // payload: id
      payload: response.data
    });
  };
};

export const editItem = (form) => {
  const qrcodesplit = form.qrcode.split("/")
  return async (dispatch) => {
    const response = await axios.put(`${apiurlitems}/${form.idcode}`, {
      scanner: form.scanner,
      itemcode: qrcodesplit[5],
      qrcode: form.qrcode,
      status: form.status,
      createdAt: Date.now(),
      idcode:form.idcode,
      position:form.position,
      lockitem:form.lockitem
    });
    dispatch({
      type: UPDATE_ITEM_SUCCESS,
      payload: response.data
    });
  };
};

export const addnewItem = (idcode,itemcode,qrcode,scanner,status,position,lockitem) => {
  return async (dispatch) => {
    const response = await axios.post(`${apiurlitems}`, {
      createdAt: Date.now(),
      itemcode:itemcode,
      qrcode: qrcode,
      scanner: scanner, 
      status:status,
      position:position,
      lockitem:lockitem,
      idcode:idcode
    });
 
    dispatch({
      type: ADD_NEW_ITEM_SUCCESS,
      payload: response.data
    });
  };
};

export const lockItem = (item,lockitem) => {
  const qrcodesplit = item.qrcode.split("/")
  return async (dispatch) => {
    const response = await axios.put(`${apiurlitems}/${item.idcode}`, {
      scanner: item.scanner,
      itemcode: qrcodesplit[5],
      qrcode: item.qrcode,
      status: item.status,
      createdAt: item.createdAt,
      position:(typeof(item.position)==="string" ? JSON.parse(item.position) : item.position),
      lockitem: (typeof(lockitem)==="string" ? JSON.parse(lockitem) : lockitem),
      idcode:item.idcode
    });
    dispatch({
      type: UPDATE_ITEM_SUCCESS,
      payload: response.data
    });
  };
};

