import { useDispatch, useSelector } from "react-redux";
import { getItem, getallusersforposts} from "../redux/action";
import React,{ useEffect,useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "./Header";
import { Helmet } from "react-helmet";
import Avatar from "@mui/material/Avatar";
import { uploadavatar, changenameofuser, changepasswordofuser } from "../redux/action";
import Snackbar from "@mui/material/Snackbar";
import Slide from "@mui/material/Slide";
import MuiAlert from "@mui/material/Alert";

// used for show snackbar and alert
function SlideTransition(props) {
  return <Slide {...props} direction="up" />;
}
const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const alrertstylesuccess = {
  width: "100%",
  marginBottom: 4,
  marginRight: 2,
  backgroundColor: "var(--backgroundbody)"
};

function Settings() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const state = useSelector((state) => state);
  const [alert, setAlert] = useState({ open: false, message: "" });
  const [image, setImage] = useState({ file: "", type: "" });
  const [name, setName] = useState(state.user.name);
  const [oldpassword, setOldpassword] = useState("");
  const [newpassword, setNewpassword] = useState("");
  const [confirmpassword, setConfirmpassword] = useState("");
  if (state.user == null) {
    navigate("/")
  }

  const closealert = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setAlert({ ...alert, open: false });
  };

  useEffect(() => {
    if (image.file != "") {
      const data = new FormData();
      data.append("file", image.file);
      data.append("upload_preset", "phuthinhnguyen1101");
      data.append("cloud_name", "dhva3lwfk");
      dispatch(uploadavatar(data, state.user.id, image.type));
      }
  }, [image.file]);
  
  function changenameofuserbutton(user,name){
    dispatch(changenameofuser(user,name));
    setAlert({open:true, message:"You have changed your name successfully"})
  }

  function changepasswordofuserbutton(user,password){
    if (oldpassword==state.user.password){
      if (newpassword==confirmpassword){
        dispatch(changepasswordofuser(user, password))
        setAlert({open:true, message:"You have changed your password successfully"})
      }
      else setAlert({open:true, message:"New password and Confirm password are not matched"})
    }
    else setAlert({open:true, message:"Old password is not correct"})
  }

  return (
    <div>
      {state.user != null ? (
        <div>
          <Header />
          <div className="home-body" style={{marginTop:"0"}}>
            <div className="home-body-wrap">
              <h2>SETTINGS</h2>
            </div>
            <div className="home-body-content">
              <div className="faq-container">
                <div className="faq-content-menudropdown">
                  <div className="faq-content-menudropdown-item" data-faqitemid="faqitem1">
                    <h3>Change Avatar</h3>
                    <a id="plus"><i className="fa fa-plus"></i></a>
                    <a id="minus"><i className="fa fa-minus"></i></a>
                  </div>
                  <div className="faq-content-menudropdown-item-show" id="faqitem1" style={{position:"relative"}}>
                    <div className="home-body-avatar" style={{position:"relative",top:"0",left:"calc(50% - 75px)",width:"150px",height:"150px"}}>
                      <div className="parent">
                        <div>
                          <Avatar
                            alt={state.user.name}
                            src={state.user.avatar}
                          />
                        </div>
                        <div className="file-upload">
                          <input
                            type="file"
                            onChange={(e) =>
                              setImage({ file: e.target.files[0], type: "avatar" })
                            }
                          ></input>
                        </div>
                      </div>
                    </div>
                    <p>Click on your photo above to change.</p>
                  </div>
                  <div className="faq-content-menudropdown-item" data-faqitemid="faqitem2">
                    <h3>Change Name</h3>
                    <a id="plus"><i className="fa fa-plus"></i></a>
                    <a id="minus"><i className="fa fa-minus"></i></a>
                  </div>
                  <div className="faq-content-menudropdown-item-show" id="faqitem2">
                    <div className="change-password-container">
                      <div className="old-password">
                        <p style={{marginTop:"0"}}>Change your name here</p>
                        <input style={{width:"300px"}} value={name} onChange={e=>setName(e.target.value)}></input>       
                      </div>
                      <button className="button-login" style={{marginTop:"20px"}} onClick={(e)=>changenameofuserbutton(state.user,name)}>Save</button>        
                    </div>
                  </div>
                  <div className="faq-content-menudropdown-item" data-faqitemid="faqitem3">
                    <h3>Change Password</h3>
                    <a id="plus"><i className="fa fa-plus"></i></a>
                    <a id="minus"><i className="fa fa-minus"></i></a>
                  </div>
                  <div className="faq-content-menudropdown-item-show" id="faqitem3">
                    <div className="change-password-container">
                      <div className="old-password">
                        <p style={{marginTop:"0"}}>Old password</p>
                        <input style={{width:"300px",marginLeft:"30px"}} value={oldpassword} onChange={e=>setOldpassword(e.target.value)} type="password"></input>
                      </div>
                      <div className="new-password">
                        <p style={{marginTop:"0"}}>New password</p>
                        <input style={{width:"300px",marginLeft:"25px"}} value={newpassword} onChange={e=>setNewpassword(e.target.value)} type="password"></input>
                      </div>
                      <div className="confirm-password">
                        <p style={{marginTop:"0"}}>Confirm password</p>
                        <input style={{width:"300px"}} value={confirmpassword} onChange={e=>setConfirmpassword(e.target.value)} type="password"></input>
                      </div>
                      <button className="button-login" style={{marginTop:"20px"}} onClick={(e)=>changepasswordofuserbutton(state.user,newpassword)}>Save</button>        
                    </div>
                  </div>
                </div>
              </div> 
            </div>
          </div>
        
          <Helmet>
            <script src="../js/dropdownmenu.js"></script>
          </Helmet>
           <Snackbar
              open={alert.open}
              autoHideDuration={2000}
              onClose={closealert}
              anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
              TransitionComponent={SlideTransition}
            >
              <Alert
                onClose={closealert}
                severity={
                  alert.message.includes("successfully") ? "success" : "error"
                }
                sx={
                  alert.message.includes("successfully")
                    ? { ...alrertstylesuccess, color: "var(--success)" }
                    : { ...alrertstylesuccess, color: "var(--error)" }
                }
              >
                {alert.message}
              </Alert>
            </Snackbar>            
        </div>
      ) : (
        null
      )}
    </div>
  );
}
export default Settings;
