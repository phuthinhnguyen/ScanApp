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
import { convertTexttoTimestamp } from "./convertTexttoTimestamp";
import { convertTimestamptoText } from "./convertTimestamptoText";

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

function SampleTracking() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [alert, setAlert] = useState({ open: false, message: "" });
  const stateselector = useSelector((state) => state);
  const [searchtext, setSearchtext] = useState("");
  const [searchradio, setSearchradio] = useState("");
  const [search,setSearch] = useState({partcode:"",recieveday:"",status:"",fileready:""})

  const closealert = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setAlert({ ...alert, open: false });
  };

  useEffect(() => {
    if (stateselector.user == null) {
      navigate("/")
    }
    else{
      dispatch(getSample());
    }
  }, []);

  const handleChangetextsearch = (e) => {
    setSearchtext(e.target.value);
    setSearch({...search,[searchradio]:e.target .value})
  };
   
  const onChangeradio = (e) => {
    setSearchtext("")
    if (e.target.checked == true){
      setSearchradio(e.target.value); 
    }
    else{
      setSearch({...search,[e.target.value]:""})
    }
  };
  const templateParams = {
    to_name: "anh Tâm",

};
  function remindlick() {
    emailjs.send('service_evfic4p','template_hk99zgp', templateParams, 'E9BRT8QwbTmXh6yYe')
	.then((response) => {
	   console.log('SUCCESS!', response.status, response.text);
	}, (err) => {
	   console.log('FAILED...', err);
	});
  }

  const uploadfilesampletracking = (e) => {
    const data = new FormData();
    data.append('file', e.target.files[0]);
    dispatch(uploadSample(data))
    setAlert({open:true, message:"You have uploaded file successfully"})
  }

  if (stateselector.user != null){
    const sortedposts = stateselector.sample.sort((a, b) => b.recieveday- a.recieveday);
    var filterresult = sortedposts.filter((item) => {
      return item["partcode"].toLowerCase().includes(search.partcode.toLowerCase()) && item["recieveday"].toLowerCase().includes(search.recieveday.toLowerCase()) && item["status"].toLowerCase().includes(search.status.toLowerCase()) && item["fileready"].toLowerCase().includes(search.fileready.toLowerCase())
    });
  
    // Convert filterresult to datacsv
    var exportcsv = []
    for (let i=0;i<filterresult.length;i++){
      exportcsv.push({Partcode:filterresult[i].partcode,Recieveday:filterresult[i].recieveday, Status:filterresult[i].status,Fileready:filterresult[i].fileready})
    }
  }
 
  return (
    <div>
      {stateselector.user != null ? (
        <div>
          <Header />
          <div className="home-body">
            <div className="home-body-wrap">
              <h2>SAMPLE TRACKING</h2>
              {/* {stateselector.user.email == "phuthinhnguyen1101@gmail.com" ?  <label className="csvbutton" style={{cursor:"pointer",padding:"2px 10px",marginRight:'20px'}}>Import.xlsx
                <input type="file" name="file"onChange={(e)=>uploadfilesampletracking(e)} style={{display:"none"}}></input>
              </label> : null }
              <ExportReactCSV csvData={exportcsv} fileName="ScanAppExportFileSampleTracking" /> */}
            </div>
            <div className="input-search-wrap" style={{maxWidth:"70%"}}>
                        <div className="input-group mb-2">
                          <div className="input-group-prepend">
                            <div className="input-group-text icon-search">
                              <BsSearch />
                            </div>
                          </div>
                          <input
                            type="text"
                            className="form-control"
                            id="inlineFormInputGroup"
                            placeholder="Input text search"
                            onChange={handleChangetextsearch}
                            value={searchtext}
                          />
                        </div>
                        <div className="filter-checkbox-wrap">
                          <div className="form-check">
                            <input
                              className="form-check-input"
                              type="checkbox"
                              name="flexRadioDefault"
                              id="flexRadioDefault1"
                              onChange={onChangeradio}
                              value="partcode"
                              // checked
                            />
                            <label className="form-check-label">Partcode</label>
                            <div style={{position:"absolute",marginTop:"50px",width:"100px",overflowWrap:"break-word"}}>{search.partcode==""?search.partcode:`"${search.partcode}"`}</div>
                          </div>
                          <div className="form-check">
                            <input
                              className="form-check-input"
                              type="checkbox"
                              name="flexRadioDefault"
                              id="flexRadioDefault3"
                              onChange={onChangeradio}
                              value="recieveday"
                            />
                            <label className="form-check-label">Recieved day</label>
                            <div style={{position:"absolute",marginTop:"50px",width:"100px",overflowWrap:"break-word"}}>{search.recieveday==""?search.recieveday:`"${search.recieveday}"`}</div>
                          </div>
                          <div className="form-check">
                            <input
                              className="form-check-input"
                              type="checkbox"
                              name="flexRadioDefault"
                              id="flexRadioDefault2"
                              onChange={onChangeradio}
                              value="status"
                            />
                            <label className="form-check-label">Status</label>
                            <div style={{position:"absolute",marginTop:"50px",width:"100px",overflowWrap:"break-word"}}>{search.status==""?search.status:`"${search.status}"`}</div>
                          </div>
                          <div className="form-check">
                            <input
                              className="form-check-input"
                              type="checkbox"
                              name="flexRadioDefault"
                              id="flexRadioDefault2"
                              onChange={onChangeradio}
                              value="fileready"
                            />
                            <label className="form-check-label">Fileready</label>
                            <div style={{position:"absolute",marginTop:"50px",width:"100px",overflowWrap:"break-word"}}>{search.fileready==""?search.fileready:`"${search.fileready}"`}</div>
                          </div>
                          <div className="form-check">
                            <label className="form-check-label">Total: {filterresult.length} rows</label>
                          </div>
                          {stateselector.user.email == "phuthinhnguyen1101@gmail.com" ?  <label className="csvbutton" style={{cursor:"pointer",padding:"2px 10px",marginRight:'20px'}}>Import.xlsx
                            <input type="file" name="file"onChange={(e)=>uploadfilesampletracking(e)} style={{display:"none"}}></input>
                          </label> : null }
                          <ExportReactCSV csvData={exportcsv} fileName="ScanAppExportFileSampleTracking" />
                        </div>
                      </div>
                      <div style={{width:"100%",overflowX:"auto",marginBottom:"60px"}}>
                        <table className="table" style={{margin:"auto",marginTop:"50px",marginBottom:"20px",maxWidth:"90%"}}>
                          <thead style={{color:"white"}}>
                            <tr>
                                <td style={{fontWeight: "700",fontSize:"18px"}}>Partcode</td>
                                <td style={{fontWeight: "700",fontSize:"18px"}}>Recieveday</td>
                                <td style={{fontWeight: "700",fontSize:"18px"}}>Fileready</td>
                                <td style={{fontWeight: "700",fontSize:"18px"}}>Status</td>
                                <td style={{fontWeight: "700",fontSize:"18px"}}>Leadtime</td>
                                <td style={{fontWeight: "700",fontSize:"18px"}}>Overdue days</td>
                                <td style={{fontWeight: "700",fontSize:"18px"}}>Action</td>
                            </tr>
                          </thead>
                          <tbody style={{color:"white"}}>
                              {filterresult.map((item)=><tr key={item.id} >
                              <td>
                                {item.partcode}
                              </td>
                              <td>
                                {item.recieveday} 
                              </td>
                              <td>
                              <div style={item.fileready=="Done"?{background:"#10e96a", padding:"2px", textAlign:"center", maxWidth:"100px", borderRadius:"10px"}:{background:"#e2372b", padding:"2px", textAlign:"center", maxWidth:"100px", borderRadius:"10px"}}>{item.fileready} </div>
                              </td>
                              <td>
                                <div style={item.status=="Done"?{background:"#10e96a", padding:"2px", textAlign:"center", maxWidth:"100px", borderRadius:"10px"}:{background:"#e2372b", padding:"2px", textAlign:"center", maxWidth:"100px", borderRadius:"10px"}}>{item.status} </div>
                              </td>
                              <td>
                                {convertTimestamptoText(convertTexttoTimestamp(item.recieveday)+172800000)} 
                              </td>
                              <td>
                              <div style={item.status=="Done"?{background:"#10e96a", padding:"2px", textAlign:"center", maxWidth:"100px", borderRadius:"10px"}:{background:"#e2372b", padding:"2px", textAlign:"center", maxWidth:"100px", borderRadius:"10px"}}> {item.status=="Done" ? item.status : ((Date.now()- convertTexttoTimestamp(item.recieveday)-172800000)/86400000 < 0 ? 0 : (Date.now()- convertTexttoTimestamp(item.recieveday)-172800000)/86400000)} </div>
                              </td>
                              <td>
                              <button 
                                  style={{padding: "3px 10px",marginLeft:"7px"}}
                                  className="ms-1 btn btn-warning"
                                  onClick={remindlick}>
                                    Remind
                                </button>
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
export default SampleTracking;
