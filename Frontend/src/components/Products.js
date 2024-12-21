import { useDispatch, useSelector } from "react-redux";
import { getItem, getallusersforposts, lockItem } from "../redux/action";
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { convertCreatedAt } from "./convertCreatedAt";
import Header from "./Header";
import Slide from "@mui/material/Slide";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";
import { BsSearch } from "react-icons/bs";
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

function Products() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [alert, setAlert] = useState({ open: false, message: "" });
  const stateselector = useSelector((state) => state);
  const [searchtext, setSearchtext] = useState("");
  const [searchradio, setSearchradio] = useState("");
  const [search,setSearch] = useState({qrcode:"",scanner:"",partnumber:"",status:"",position:""})
  const [lockitem,setLockitem] = useState({status:"OFF",reason:""})
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
    dispatch(getItem());
    dispatch(getallusersforposts());
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

  function lockitembutton(item,e) {
    dispatch(lockItem(item,{...lockitem,status:"ON"}));
    e.target.parentElement.style.display="none";
    setLockitem({...lockitem,reason:""});
  }

  const sortedposts = stateselector.posts.sort((a, b) => b.createdAt - a.createdAt);
  const filterresult = sortedposts.filter((item) => {
    const itemsqrcodesplit = item["qrcode"].split("/")
    if (typeof(item.position)==="string"){
      var parseitemposition = JSON.parse(item.position)
    }
    else{
      var parseitemposition = item.position
    }
    // const itemposition = item["position"]["char"]+item["position"]["number"]
    const itemposition = parseitemposition.char + parseitemposition.number
    return item["qrcode"].toLowerCase().includes(search.qrcode.toLowerCase()) && item["scanner"].toLowerCase().includes(search.scanner.toLowerCase()) && itemsqrcodesplit[4].toLowerCase().includes(search.partnumber.toLowerCase()) && item["status"].toLowerCase().includes(search.status.toLowerCase()) && itemposition.toLowerCase().includes(search.position.toLowerCase())
  });

  // Convert filterresult to datacsv
  var exportcsv = []
  for (let i=0;i<filterresult.length;i++){
    const qrcode = filterresult[i].qrcode
    const splitqrcode = qrcode.split("/")

    if (typeof(filterresult[i].position)==="string"){
      var parseitemposition = JSON.parse(filterresult[i].position)
    }
    else{
      var parseitemposition = filterresult[i].position
    }
    if (typeof(filterresult[i].lockitem)==="string"){
      var parseitemlockitem = JSON.parse(filterresult[i].lockitem)
    }
    else{
      var parseitemlockitem = filterresult[i].lockitem
    }

    // const parseitemposition = JSON.parse(filterresult[i].position)
    // const parseitemlockitem = JSON.parse(filterresult[i].lockitem)
    exportcsv.push({Position:parseitemposition.char.concat(parseitemposition.number),Itemcode:splitqrcode[5],Qrcode:filterresult[i].qrcode,PO:splitqrcode[0],MFGDate:splitqrcode[1],Size_Version:splitqrcode[2],Quantity:splitqrcode[3],Partnumber:splitqrcode[4],Scanner:filterresult[i].scanner,CreateAt:convertCreatedAt(filterresult[i].createdAt),Status:filterresult[i].status,Lockstatus:parseitemlockitem.status,Lockreason:parseitemlockitem.reason})
  }
   
  return (
    <div>
      {stateselector.user != null ? (
        <div>
          <Header />
          <div className="home-body">
            <div className="home-body-wrap">
              <h2>PRODUCTS</h2>
            </div>
            <div className="input-search-wrap">
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
                              value="qrcode"
                              // checked
                            />
                            <label className="form-check-label">QR Code</label>
                            <div style={{position:"absolute",marginTop:"50px",width:"100px",overflowWrap:"break-word"}}>{search.qrcode==""?search.qrcode:`"${search.qrcode}"`}</div>
                          </div>
                          <div className="form-check">
                            <input
                              className="form-check-input"
                              type="checkbox"
                              name="flexRadioDefault"
                              id="flexRadioDefault3"
                              onChange={onChangeradio}
                              value="partnumber"
                            />
                            <label className="form-check-label">Part Number</label>
                            <div style={{position:"absolute",marginTop:"50px",width:"100px",overflowWrap:"break-word"}}>{search.partnumber==""?search.partnumber:`"${search.partnumber}"`}</div>
                          </div>
                          <div className="form-check">
                            <input
                              className="form-check-input"
                              type="checkbox"
                              name="flexRadioDefault"
                              id="flexRadioDefault3"
                              onChange={onChangeradio}
                              value="scanner"
                            />
                            <label className="form-check-label">Scanner</label>
                            <div style={{position:"absolute",marginTop:"50px",width:"100px",overflowWrap:"break-word"}}>{search.scanner==""?search.scanner:`"${search.scanner}"`}</div>
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
                              value="position"
                            />
                            <label className="form-check-label">Position</label>
                            <div style={{position:"absolute",marginTop:"50px",width:"100px",overflowWrap:"break-word"}}>{search.position==""?search.position:`"${search.position}"`}</div>
                          </div>
                          <div className="form-check">
                            <label className="form-check-label">Total: {filterresult.length} rows</label>
                          </div>
                          <ExportReactCSV csvData={exportcsv} fileName="ScanAppExportFile" />
                        </div>
                      </div>
            <table className="table" style={{marginTop:"50px",marginBottom:"80px"}}>
            <thead style={{color:"white"}}>
              <tr>
                  <td style={{fontWeight: "700",fontSize:"18px"}}>Position</td>
                  <td style={{fontWeight: "700",fontSize:"18px"}}>Item Code</td>
                  <td style={{fontWeight: "700",fontSize:"18px"}}>QR Code</td>
                  <td style={{fontWeight: "700",fontSize:"18px"}}>PO</td>
                  <td style={{fontWeight: "700",fontSize:"18px"}}>MFG Date</td>
                  <td style={{fontWeight: "700",fontSize:"18px"}}>Size/Version</td>
                  <td style={{fontWeight: "700",fontSize:"18px"}}>Quantity</td>
                  <td style={{fontWeight: "700",fontSize:"18px"}}>Part Number</td>
                  <td style={{fontWeight: "700",fontSize:"18px"}}>Scanner</td>
                  <td style={{fontWeight: "700",fontSize:"18px"}}>Created At</td>
                  <td style={{fontWeight: "700",fontSize:"18px"}}>Status</td>
              </tr>
            </thead>
            <tbody style={{color:"white"}}>
                {filterresult.map((item)=><tr key={item.id} >
                <td>
                  {/* {item.position.char+item.position.number}  */}
                  {typeof(item.position)==="string" ? (JSON.parse(item.position).char + JSON.parse(item.position).number) : (item.position.char + item.position.number)}
                </td>
                <td>
                  {item.itemcode} 
                </td>
                <td>
                  {item.qrcode} 
                </td>
                <td>
                  {item.qrcode.split("/")[0]} 
                </td>
                <td>
                  {item.qrcode.split("/")[1]} 
                </td>
                <td>
                  {item.qrcode.split("/")[2]} 
                </td>
                <td>
                  {item.qrcode.split("/")[3]} 
                </td>
                <td>
                  {item.qrcode.split("/")[4]} 
                </td>
                <td>
                  {item.scanner} 
                </td>
                <td>
                  {convertCreatedAt(item.createdAt)} 
                </td>
                <td>
                  <div style={item.status=="IN"?{background:"#10e96a", padding:"2px", textAlign:"center", maxWidth:"100px", borderRadius:"10px"}:{background:"#e2372b", padding:"2px", textAlign:"center", maxWidth:"100px", borderRadius:"10px"}}>{item.status} </div>
                </td>
                <td>
                  <button 
                    style={{padding: "3px 10px",marginLeft:"7px"}}
                    onClick={(e)=>{e.target.nextElementSibling.style.display="block"}} className={(item.status == "IN" && sortedposts.filter(items=>{return items["qrcode"].toLowerCase().includes(item.qrcode.toLowerCase())}).length<2) ? ((typeof(item.lockitem)==="string" ? (JSON.parse(item.lockitem).status == "OFF") : (item.lockitem.status == "OFF")) ? "ms-1 btn btn-warning" : "ms-1 btn disabled") : "ms-1 btn disabled"}>
                    {(typeof(item.lockitem)==="string" ? (JSON.parse(item.lockitem).status == "OFF") : (item.lockitem.status == "OFF")) ? "Lock" : "Unlock"}
                    {/* {item.lockitem.status == "OFF" ? "Lock" : "Unlock"} */}
                  </button>
                  <div style={{display:"none"}}>
                      <textarea className="form-control" placeholder="Input Reason here..." style={{display:"block",marginTop:"8px",marginBottom:"8px"}} value={lockitem.reason} onChange={(e)=>setLockitem({...lockitem,reason:e.target.value})}></textarea>
                      <button 
                        className="ms-1 btn btn-warning"
                        style={{padding: "3px 10px"}}
                        onClick={(e)=>(lockitembutton(item,e))}>
                          {(typeof(item.lockitem)==="string" ? (JSON.parse(item.lockitem).status == "OFF") : (item.lockitem.status == "OFF")) ? "Lock" : "Unlock"}
                          {/* {item.lockitem.status == "OFF" ? "Lock" : "Unlock"} */}
                    </button>
                    <button 
                        className="ms-1 btn btn-warning"
                        style={{padding: "3px 10px"}}
                        onClick={(e)=>e.target.parentElement.style.display="none"}>
                        Close
                    </button>
                  </div>
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
export default Products;
