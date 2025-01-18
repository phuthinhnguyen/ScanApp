import { useDispatch, useSelector } from "react-redux";
import { getSample, uploadSample } from "../redux/action";
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { convertCreatedAt } from "./convertCreatedAt";
import Header from "./Header";
import Slide from "@mui/material/Slide";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";
import { BsSearch } from "react-icons/bs";
import { ExportReactCSV } from './ExportReactCSV'
import emailjs from 'emailjs-com';

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
  // const [searchtext, setSearchtext] = useState("");
  // const [searchradio, setSearchradio] = useState("");
  // const [search,setSearch] = useState({partcode:"",recieveday:"",status:"",fileready:""})

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
    dispatch(getSample());
  }, []);

  function addnewleaverequest(){
    navigate("/addnewleaverequest");
  }

  const filterresult = [{requestid: "#ab0000",empcode:"CCL0124",fullname:"Nguyen Phu Thinh",dept:"PE",workstartdate:"1721223045",type:"annualleave",reason:"busy",fromdate:"1721223045",totaldaysleave:"1",createdat:"1721223045",leaderapproval:"Done",supervisorapproval:"Pending"}]


  // const sortedposts = stateselector.sample.sort((a, b) => b.recieveday- a.recieveday);
  // const filterresult = sortedposts.filter((item) => {
  //   return item["partcode"].toLowerCase().includes(search.partcode.toLowerCase()) && item["recieveday"].toLowerCase().includes(search.recieveday.toLowerCase()) && item["status"].toLowerCase().includes(search.status.toLowerCase()) && item["fileready"].toLowerCase().includes(search.fileready.toLowerCase())
  // });

  // Convert filterresult to datacsv
  var exportcsv = []
  for (let i=0;i<filterresult.length;i++){
    exportcsv.push({Partcode:filterresult[i].partcode,Recieveday:filterresult[i].recieveday, Status:filterresult[i].status,Fileready:filterresult[i].fileready})
  }



  return (
    <div>
      {stateselector.user != null ? (
        <div>
          <Header />
          <div className="home-body">
            <div className="home-body-wrap">
              <h2>LEAVE APPLICATION</h2>
              <button className="csvbutton" style={{position:"absolute",right:"5%",cursor:"pointer",padding:"5px 10px"}} onClick={addnewleaverequest}>New Request
              </button>
            </div>
            <table className="table" style={{margin:"auto",marginTop:"50px",marginBottom:"80px",maxWidth:"80%"}}>
            <thead style={{color:"white"}}>
              <tr>
                  <td style={{fontWeight: "700",fontSize:"18px"}}>RequestID</td>
                  <td style={{fontWeight: "700",fontSize:"18px"}}>Fullname</td>
                  <td style={{fontWeight: "700",fontSize:"18px"}}>Dept</td>
                  <td style={{fontWeight: "700",fontSize:"18px"}}>Type</td>
                  <td style={{fontWeight: "700",fontSize:"18px"}}>From date</td>
                  <td style={{fontWeight: "700",fontSize:"18px"}}>Total days leave</td>
                  <td style={{fontWeight: "700",fontSize:"18px"}}>CreatedAt</td>
                  <td style={{fontWeight: "700",fontSize:"18px"}}>Leader Approval</td>
                  <td style={{fontWeight: "700",fontSize:"18px"}}>Supervisor Approval</td>
              </tr>
            </thead>
            <tbody style={{color:"white"}}>
                {filterresult.map((item)=><tr key={item.id} >
                <td>
                  {item.requestid}
                </td>
                <td>
                  {item.fullname}
                </td>
                <td>
                  {/* <div style={item.status=="Done"?{background:"#10e96a", padding:"2px", textAlign:"center", maxWidth:"100px", borderRadius:"10px"}:{background:"#e2372b", padding:"2px", textAlign:"center", maxWidth:"100px", borderRadius:"10px"}}>{item.status} </div> */}
                  {item.dept}
                </td>
                <td>
                  {item.type}
                </td>
                <td>
                  {item.fromdate}
                </td>
                <td>
                  {item.totaldaysleave}
                </td>
                <td>
                  {convertCreatedAt(item.createdat)}
                </td>
                <td>
                   <div style={item.leaderapproval=="Done"?{background:"#10e96a", padding:"2px", textAlign:"center", maxWidth:"100px", borderRadius:"10px"}:{background:"#e2372b", padding:"2px", textAlign:"center", maxWidth:"100px", borderRadius:"10px"}}>{item.leaderapproval} </div>
                </td>
                <td>
                   <div style={item.supervisorapproval=="Done"?{background:"#10e96a", padding:"2px", textAlign:"center", maxWidth:"100px", borderRadius:"10px"}:{background:"#e2372b", padding:"2px", textAlign:"center", maxWidth:"100px", borderRadius:"10px"}}>{item.supervisorapproval} </div>
                </td>
                </tr>)}
            </tbody>
          
        </table>
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
