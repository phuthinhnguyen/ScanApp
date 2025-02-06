import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { editLeaverequest } from "../redux/action";
import Header from "./Header";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";
import Slide from "@mui/material/Slide";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

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

function Updateleaverequest() {
  const { state } = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const stateselector = useSelector((state) => state)
  const [alert, setAlert] = useState({ open: false, message: "" });
  const [form,setForm] = useState(state);
  const [fromdate, setFromdate] = useState(new Date(Number(state.fromdate)));
  const [todate, setTodate] = useState(new Date(Number(state.todate)));

  useEffect(() => {
    if (stateselector.user == null) {
      navigate("/");
    }
    if (stateselector==null){
      navigate("/home");  
    }
  }, []);

  function submitform(e) {
    e.preventDefault();
    if (form.empcode == "") {
      setAlert({open:true, message:"Please enter Employee code"})
    }
    else if (form.fullname == "") {
      setAlert({open:true, message:"Please enter Full name"})
    }
    else if (form.reason == "") {
      setAlert({open:true, message:"Please enter Reason"})
    }
    else{
      dispatch(editLeaverequest(form.requestid,form,fromdate.getTime(),todate.getTime(),form.supervisorapproval));
      setAlert({open:true, message:"You have updated leave request successfully"})
      // setForm({empcode:"",fullname:"",dept:"Production",type:"Annualleave",reason:"",totaldaysleave:"1"})
      // setFromdate(new Date())
      // navigate("/");
    }
  }

  const closealert = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setAlert({ ...alert, open: false });
  };

  return (
    <>
      {  
        <div>
          <Header />
          <div className="addnewpost-body">
            <h2>Edit Application Request</h2>
            <form
              className="addnewpost-body-form"
              onSubmit={(e) => submitform(e)}
            >
              <div style={{display:"flex",flexDirection:"row",justifyContent:'center',alignItems:"flex-start",columnGap:"40px",width:"100%"}}>
                <div style={{width:"100%"}}>
                    <h6>RequestID</h6>
                    <input
                      disabled style={{color:"white"}}
                      value={form.requestid}
                    ></input>
                    <h6>Emp.Code</h6>
                    <input
                      onChange={(e) => setForm({ ...form, empcode: e.target.value })}
                      value={form.empcode}
                    ></input>
                    <h6>Full name</h6>
                    <input
                      onChange={(e) => setForm({ ...form, fullname: e.target.value })}
                      value={form.fullname}
                    ></input>
                  <h6>Dept</h6>
                    <select
                      className="statusselect"
                      onChange={(e) => setForm({ ...form, dept: e.target.value })}
                      value={form.dept}
                      
                    >
                      <option value="Production">Production</option>
                      <option value="NPI/PE">NPI/PE</option>
                      <option value="purchasing">Purchasing</option>
                      <option value="Quality">Quality</option>
                      <option value="Planning">Planning</option>
                      <option value="Warehouse">Warehouse</option>
                    </select>
                    <br></br>
                </div>
                <div style={{width:"100%"}}>
                    <h6>Type</h6>
                    <select
                      className="statusselect"
                      onChange={(e) => setForm({ ...form, type: e.target.value })}
                      value={form.type}
                      
                    >
                      <option value="Annualleave">Annual leave</option>
                      <option value="Sick">Sick</option>
                      <option value="Withoutsalary">Without salary</option>
                      <option value="Childsick">Child sick</option>
                      <option value="Maternityleave">Maternity leave</option>
                      <option value="Otherleave">Other leave</option>
                    </select>
                    <br></br>
                    <h6>Reason</h6>
                    <input
                      onChange={(e) => setForm({ ...form, reason: e.target.value })}
                      value={form.reason}
                    ></input>
                     <div style={{display:"flex",columnGap:"20px",alignItems:"center",justifyContent:"center",marginTop:"35px"}}>
                        <div style={{display:"flex",alignItems:"center",justifyContent:"center"}}>
                          <h6>From date</h6>
                          <DatePicker selected={fromdate} onChange={(date) => setFromdate(date)} />
                        </div>
                        <div style={{display:"flex",alignItems:"center",justifyContent:"center"}}>
                          <h6>To date</h6>
                          <DatePicker selected={todate} onChange={(date) => setTodate(date)} /> 
                        </div>
                      </div>
                    <h6>Total days leave</h6>
                    <input
                      onChange={(e) => setForm({ ...form, totaldaysleave: e.target.value })}
                      value={form.totaldaysleave}
                      type="number"
                    ></input>
                </div>
              </div>
          
              <div className="button-wrap">
                <button type="submit" className="button-login" style={{marginTop:"80px",marginBottom:"50px",minWidth:"150px"}}>
                  Save Request
                </button>
              </div>
            </form>
           
            <Link
              className="button-back"
              to="/home"
            >
              Back
            </Link>
          </div>
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
      }
    </>
  );
}
export default Updateleaverequest;
