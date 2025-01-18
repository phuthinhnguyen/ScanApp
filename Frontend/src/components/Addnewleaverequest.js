import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { deleteItem, editItem, getItem } from "../redux/action";
import Header from "./Header";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";
import Slide from "@mui/material/Slide";
import { color } from "framer-motion";
import { makeId } from "./makeId";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

function SlideTransition(props) {
  return <Slide {...props} direction="up" />;
}
const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

function Addnewleaverequest() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const stateselector = useSelector((state) => state)
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [form,setForm] = useState({empcode:"",fullname:"",dept:"",type:"",reason:"",totaldaysleave:""});
  const [workstartdate, setWorkstartdate] = useState(new Date());
  const [fromdate, setFromdate] = useState(new Date());

  const requestid = "#" + makeId(6)
  useEffect(() => {
    if (stateselector.user == null) {
      navigate("/");
    }
    if (stateselector==null){
      navigate("/home");  
    }
  }, []);
  // const sortedposts = stateselector.posts.sort((a, b) => b.createdAt - a.createdAt);
  function submitform(e) {
    e.preventDefault();
    dispatch(AddnewLeaverequest(form,workstartdate,fromdate));
    setMessage("You have added new leave request successfully");
    setOpen(true);
    navigate("/");
  }

  const closealert = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpen(false);
  };

  return (
    <>
      {  
        <div>
          <Header />
          <div className="addnewpost-body">
            <h2>New Application Request</h2>
            <form
              className="addnewpost-body-form"
              onSubmit={(e) => submitform(e)}
              style={{display:"flex",flexDirection:"row",justifyContent:'center',alignItems:"flex-start",columnGap:"40px"}}
            >
              <div style={{width:"100%"}}>
                  <h6>RequestID</h6>
                  <input
                    disabled style={{color:"white"}}
                    value={requestid}
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
                    <option value="production">Production</option>
                    <option value="npipe">NPI/PE</option>
                    <option value="purchasing">Purchasing</option>
                    <option value="quality">Quality</option>
                    <option value="planning">Planning</option>
                    <option value="warehouse">Warehouse</option>
                  </select>
                  <br></br>
                  <h6>Work start date</h6>
                  {/* <input
                    onChange={(e) => setForm({ ...form, workstartdate: e.target.value })}
                    value={form.workstartdate}
                  ></input> */}
                    <DatePicker selected={workstartdate} onChange={(date) => setWorkstartdate(date)} />
              </div>
              <div style={{width:"100%"}}>
                  <h6>Type</h6>
                  <select
                    className="statusselect"
                    onChange={(e) => setForm({ ...form, type: e.target.value })}
                    value={form.type}
                    
                  >
                    <option value="annualleave">Annual leave</option>
                    <option value="sick">Sick</option>
                    <option value="withoutsalary">Without salary</option>
                    <option value="childsick">Child sick</option>
                    <option value="maternityleave">Maternity leave</option>
                    <option value="otherleave">Other leave</option>
                  </select>
                  <br></br>
                  <h6>Reason</h6>
                  <input
                    onChange={(e) => setForm({ ...form, reason: e.target.value })}
                    value={form.reason}
                  ></input>
                  <h6>From date</h6>
                  <DatePicker selected={fromdate} onChange={(date) => setFromdate(date)} />
                  <h6>Total days leave</h6>
                  <input
                    onChange={(e) => setForm({ ...form, totaldaysleave: e.target.value })}
                    value={form.totaldaysleave}
                    type="number"
                  ></input>
              </div>
             
              
            </form>
            <div className="button-wrap">
                <button type="submit" className="button-login" style={{marginTop:"30px",marginBottom:"50px"}}>
                  Save Item
                </button>
                
              </div>
            <Link
              className="button-back"
              to="/home"
            >
              Back
            </Link>
          </div>
          <Snackbar
            open={open}
            autoHideDuration={4000}
            onClose={closealert}
            anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
            TransitionComponent={SlideTransition}
          >
            <Alert
              onClose={closealert}
              severity="success"
              sx={{
                width: "100%",
                marginBottom: 4,
                marginRight: 2,
                backgroundColor: "var(--backgroundbody)",
                color: "var(--success)"
              }}
            >
              {message}
            </Alert>
          </Snackbar>
        </div>
      }
    </>
  );
}
export default Addnewleaverequest;
