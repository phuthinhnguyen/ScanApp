import { useDispatch, useSelector } from "react-redux";
import { editLeaverequest, getLeaverequest } from "../redux/action";
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { convertCreatedAt } from "./convertCreatedAt";
import Header from "./Header";
import Slide from "@mui/material/Slide";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";
import { ExportReactCSV } from './ExportReactCSV'

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

function LeaveRequest() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [alert, setAlert] = useState({ open: false, message: "" });
  const stateselector = useSelector((state) => state);

  const closealert = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setAlert({ ...alert, open: false });
  };

  if (stateselector.user == null) {
    navigate("/")
  }

  useEffect(() => {
    dispatch(getLeaverequest());
  }, []);

  function addnewleaverequest(){
    navigate("/addnewleaverequest");
  }

  function editleaverequest(item) {
    navigate("/updateleaverequest", { state: item });
  }

  function acceptleaverequest(item){
    dispatch(editLeaverequest(item.requestid,item,item.fromdate,"Approved"))
  }

  function declineleaverequest(item){
    dispatch(editLeaverequest(item.requestid,item,item.fromdate,"Declined"))
  }
 
  const sortedposts = stateselector.leaveapplication.sort((a, b) => b.createdat- a.createdat);
  const filterresult = sortedposts

  // Convert filterresult to datacsv
  var exportcsv = []
  for (let i=0;i<filterresult.length;i++){
    exportcsv.push({RequestID:"#"+filterresult[i].requestid,Fullname:filterresult[i].fullname, Dept:filterresult[i].dept,Type:filterresult[i].type,Reason:filterresult[i].reason, Fromdate:convertCreatedAt(filterresult[i].fromdate),Totaldaysleave:filterresult[i].totaldaysleave, CreatedAt:convertCreatedAt(filterresult[i].createdat), LeaderApproval:filterresult[i].leaderapproval, SupervisorApproval:filterresult[i].supervisorapproval})
  }



  return (
    <div>
      {stateselector.user != null ? (
        <div>
          <Header />
          <div className="home-body">
            <div className="home-body-wrap">
              <h2>LEAVE APPLICATION</h2>
              <button className="csvbutton" style={{marginRight:"20px",cursor:"pointer",padding:"10px 10px",border:"none"}} onClick={addnewleaverequest}>New Request
              </button>
               <ExportReactCSV csvData={exportcsv} fileName="ScanAppExportFile-Leaveapplication" />
            </div>
            <div style={{width:"100%",overflowX:"auto",marginBottom:"60px"}}>
              <table className="table" style={{margin:"auto",marginTop:"50px",marginBottom:"20px",maxWidth:"90%"}}>
                <thead style={{color:"white"}}>
                  <tr>
                      <td style={{fontWeight: "700",fontSize:"18px"}}>RequestID</td>
                      <td style={{fontWeight: "700",fontSize:"18px"}}>Fullname</td>
                      <td style={{fontWeight: "700",fontSize:"18px"}}>Dept</td>
                      <td style={{fontWeight: "700",fontSize:"18px"}}>Type</td>
                      <td style={{fontWeight: "700",fontSize:"18px"}}>Reason</td>
                      <td style={{fontWeight: "700",fontSize:"18px"}}>From date</td>
                      <td style={{fontWeight: "700",fontSize:"18px"}}>Total days leave</td>
                      <td style={{fontWeight: "700",fontSize:"18px"}}>CreatedAt</td>
                      <td style={{fontWeight: "700",fontSize:"18px"}}>Leader Approval</td>
                      <td style={{fontWeight: "700",fontSize:"18px"}}>Supervisor Approval</td>
                      <td style={{fontWeight: "700",fontSize:"18px"}}>Action</td>
                  </tr>
                </thead>
                <tbody style={{color:"white"}}>
                    {filterresult.map((item)=><tr key={item.id} >
                    <td>
                      {"#" + item.requestid}
                    </td>
                    <td>
                      {item.fullname}
                    </td>
                    <td>
                      {item.dept}
                    </td>
                    <td>
                      {item.type}
                    </td>
                    <td>
                      {item.reason}
                    </td>
                    <td>
                      {convertCreatedAt(item.fromdate)}
                    </td>
                    <td>
                      {item.totaldaysleave}
                    </td>
                    <td>
                      {convertCreatedAt(item.createdat)}
                    </td>
                    <td>
                    <div style={item.leaderapproval=="Approved"?{background:"#10e96a", padding:"2px", textAlign:"center", maxWidth:"100px", borderRadius:"10px"}:(item.leaderapproval=="Pending" ? {background:"rgb(245, 204, 25)", padding:"2px", textAlign:"center", maxWidth:"100px", borderRadius:"10px"} : {background:"#e2372b", padding:"2px", textAlign:"center", maxWidth:"100px", borderRadius:"10px"})}>{item.leaderapproval} </div>
                    </td>
                    <td>
                      <div style={item.supervisorapproval=="Approved"?{background:"#10e96a", padding:"2px", textAlign:"center", maxWidth:"100px", borderRadius:"10px"}:(item.supervisorapproval=="Pending" ? {background:"rgb(245, 204, 25)", padding:"2px", textAlign:"center", maxWidth:"100px", borderRadius:"10px"} : {background:"#e2372b", padding:"2px", textAlign:"center", maxWidth:"100px", borderRadius:"10px"})}>{item.supervisorapproval} </div>
                    </td>
                    <td>
                      {
                        stateselector.user.username == "tamtran@cclind.com" ? 
                        <div>
                          <button 
                            style={{padding: "3px 10px"}}
                            onClick={(e)=>acceptleaverequest(item)} className={item.supervisorapproval=="Pending" ? "ms-1 btn btn-info" : "ms-1 btn btn-secondary disabled"}>
                            Accept
                          </button>
                          <button 
                            style={{padding: "3px 10px"}}
                            onClick={(e)=>declineleaverequest(item)} className={item.supervisorapproval=="Pending" ? "ms-1 btn btn-danger" : "ms-1 btn btn-secondary disabled"}>
                            Decline
                          </button>
                        </div>
                      :
                        <button 
                        style={{padding: "3px 10px"}}
                        onClick={(e)=>editleaverequest(item)} className={item.supervisorapproval=="Pending" ? "ms-1 btn btn-info" : "ms-1 btn btn-secondary disabled"}>
                        Edit
                      </button>
                      }
                    {/* <button 
                      style={{padding: "3px 10px"}}
                      onClick={(e)=>editleaverequest(item)} className="ms-1 btn btn-info">
                      Edit
                    </button> */}
                    </td>
                    </tr>)}
                </tbody>
            
              </table>  
            </div>
           
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
      ) : (
        null
      )}
    </div>
  );
}
export default LeaveRequest;
