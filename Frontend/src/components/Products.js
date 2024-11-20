import { useDispatch, useSelector } from "react-redux";
import { getItem, getallusersforposts } from "../redux/action";
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { convertCreatedAt } from "./convertCreatedAt";
import Header from "./Header";
import Slide from "@mui/material/Slide";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";
import { BsSearch } from "react-icons/bs";


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
                  <td style={{fontWeight: "700",fontSize:"18px"}}>Size</td>
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
