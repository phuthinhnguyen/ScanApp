import { useDispatch, useSelector } from "react-redux";
import {banuser, getallusers, toadmin, deleteItem, getItem, lockItem} from "../redux/action";
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Header from "./Header";
import { convertCreatedAt } from "./convertCreatedAt";
import { BsSearch } from "react-icons/bs";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";
import Slide from "@mui/material/Slide";
import { Helmet } from 'react-helmet';
import $ from 'jquery'
import { Pie, Bar } from 'react-chartjs-2'
import { Chart, registerables } from 'chart.js'
Chart.register(...registerables)
import { ExportReactCSV } from './ExportReactCSV'


function SlideTransition(props) {
  return <Slide {...props} direction="up" />;
}
const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

function Adminworkspace() {
  const [searchradio, setSearchradio] = useState("");
  const [searchtext, setSearchtext] = useState("");
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [search,setSearch] = useState({qrcode:"",scanner:"",partnumber:"",status:"",position:""})
  const [lockitem,setLockitem] = useState({status:"OFF",reason:""})
 
  const onChangeradio = (e) => {
    setSearchtext("")
    if (e.target.checked == true){
      setSearchradio(e.target.value); 
    }
    else{
      setSearch({...search,[e.target.value]:""})
    }
  };

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const state = useSelector((state) => state);
  const sortedposts = state.posts.sort((a, b) => b.createdAt - a.createdAt); 
  const filtertoday = sortedposts.filter((item) => {
    return item.createdAt > Date.now() - 172800000
  })
  const filterresult = filtertoday.filter((item) => {
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
 
  useEffect(() => {
    if(state.user==null){
      navigate("/")
    }
    // dispatch(getallusers());
    // dispatch(getItem());
  }, []);
  const allusers = state.allusersprofile;

  function banuserclick(id) {
    dispatch(banuser(id));
    setMessage("You have banned user successfully");
    setOpen(true);
  }

  function toadminclick(id) {
    dispatch(toadmin(id));
    setMessage("You have made user to admin successfully");
    setOpen(true);
  }

  const handleChangetextsearch = (e) => {
    setSearchtext(e.target.value);
    setSearch({...search,[searchradio]:e.target .value})
  };

  const closealert = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpen(false);
  };

  function deleteitem(idcode) {
    dispatch(deleteItem(idcode));
    // setMessage("You have deleted item successfully");
    // setOpen(true);
  }
  function edititem(item) {
    navigate("/updateitem", { state: item });
  }
  function lockitembutton(item,e) {
    dispatch(lockItem(item,{...lockitem,status:"ON"}));
    e.target.parentElement.style.display="none";
    setLockitem({...lockitem,reason:""});
  }
  function unlockitembutton(item,e) {
    dispatch(lockItem(item,{...lockitem,status:"OFF"}));
    e.target.parentElement.style.display="none";
  }
  const filterviewchartin = sortedposts.filter(item=>{
    return item.status == "IN"
  })
  const filterviewchartout = sortedposts.filter(item=>{
    return item.status == "OUT"
  })
  const pie = {
    labels: [
      'IN',
      'OUT',
    ],
    datasets: [
      {
        label: 'IN/OUT IN MONTH',
        backgroundColor: [
          'Green',
          'Red',
        ],
        data: [filterviewchartin.length, filterviewchartout.length],
      },
    ],
  }
  const bar = {
    labels: [
      'IN',
      'OUT',
      'REMAIN',
    ],
    datasets: [
      {
        label: 'PRODUCTS',
        backgroundColor: 'Yellow',
        borderColor: 'Yellow',
        borderWidth: 2,
        data: [filterviewchartin.length, filterviewchartout.length, filterviewchartin.length-filterviewchartout.length],
      },
    ],
  }
  
  return (
    <div>
      {state.user != null && state.user.role=="admin" ? (
        <div>
          <Header />
          <div className="adminworkspace-wrap">
            <div className="filters-container" id="menu">
              <ul className="filters-wrap filters col-lg-12 no-padding">
                <li className="active" data-filter=".itemlist">PRODUCTS</li>
                <li data-filter=".userlist" className="">USERS</li>
                <li data-filter=".chartview" className="">CHART VIEW</li>
              </ul>
              <div className="filters-content">
                <div className="row grid">
                  <div className="col-md-6 all itemlist" style={{position:"absolute",left:"0%", top:"0px"}}>
                    <div className="adminworkspace-posts">
                      <h2>PRODUCTS</h2>
                      <div className="input-search-wrap" style={{maxWidth:"80%"}}>
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
                      <div style={{width:"100%",overflowX:"auto",marginBottom:"60px"}}>
                        <table className="table" style={{marginTop:"50px",marginBottom:"20px"}} id="datatable">
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
                              <td style={{fontWeight: "700",fontSize:"18px"}}>Action</td>
                            </tr>
                          </thead>
                          <tbody style={{color:"white"}}>
                              {filterresult.map((item, index)=><tr key={index} >
                                <td>
                                  {typeof(item.position)==="string" ? (JSON.parse(item.position).char + JSON.parse(item.position).number) : (item.position.char + item.position.number)} 
                                  {/* {item.position.char + item.position.number}  */}
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
                                          style={{padding: "3px 10px"}}
                                          onClick={(e)=>edititem(item)} className={(item.status == "IN" && sortedposts.filter(items=>{return items["qrcode"].toLowerCase().includes(item.qrcode.toLowerCase())}).length<2) ? "ms-1 btn btn-info" : "ms-1 btn btn-secondary disabled"}>
                                          Edit
                                      </button>
                                      <button 
                                          style={{padding: "3px 10px",marginLeft:"7px"}}
                                          onClick={(e)=>deleteitem(item.idcode)} className={(item.status == "IN" && sortedposts.filter(items=>{return items["qrcode"].toLowerCase().includes(item.qrcode.toLowerCase())}).length<2) ? "ms-1 btn btn-danger" : "ms-1 btn btn-secondary disabled"}>
                                          Delete
                                      </button>
                                      <button 
                                          style={{padding: "3px 10px",marginLeft:"7px"}}
                                          onClick={(e)=>{(typeof(item.lockitem)==="string" ? (JSON.parse(item.lockitem).status == "OFF") : (item.lockitem.status == "OFF")) ? (e.target.nextElementSibling.style.display="block"):(e.target.nextElementSibling.nextElementSibling.style.display="block")}} className={(item.status == "IN" && sortedposts.filter(items=>{return items["qrcode"].toLowerCase().includes(item.qrcode.toLowerCase())}).length<2) ? ((typeof(item.lockitem)==="string" ? (JSON.parse(item.lockitem).status == "OFF") : (item.lockitem.status == "OFF")) ? "ms-1 btn btn-warning" : "ms-1 btn btn-secondary") : "ms-1 btn disabled"}>
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
                                      <div style={{display:"none"}}>
                                          <textarea className="form-control" style={{display:"block",marginTop:"8px",marginBottom:"8px"}} value={(typeof(item.lockitem)==="string" ? (JSON.parse(item.lockitem).reason) : (item.lockitem.reason))} readOnly></textarea>
                                          <button 
                                            className="ms-1 btn btn-warning"
                                            style={{padding: "3px 10px"}}
                                            onClick={(e)=>(unlockitembutton(item,e))}>
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
                      </div>
            
            </div>
                  </div>
                  <div className="col-md-6 all userlist" style={{position:"absolute",left:"0%", top:"0px"}}>
                    <div className="adminworkspace-analytics-users">
                      <h2>USERS</h2>
                      <div className="adminworkspace-analytics-users-table-wrap">
                        <table className="table" style={{marginTop:"20px"}}>
                          <thead style={{color:"white"}}>
                            <tr>
                              <th style={{fontWeight: "700",fontSize:"18px"}}>UserId</th>
                              <th style={{fontWeight: "700",fontSize:"18px"}}>Username</th>
                              <th style={{fontWeight: "700",fontSize:"18px"}}>Password</th>
                              <th style={{fontWeight: "700",fontSize:"18px"}}>Name</th>
                              <th style={{fontWeight: "700",fontSize:"18px"}}>Email</th>
                              <th style={{fontWeight: "700",fontSize:"18px"}}>Role</th>
                              <th style={{fontWeight: "700",fontSize:"18px"}}>Action</th>
                            </tr>
                          </thead>
                          <tbody style={{color:"white"}}>
                            {allusers &&
                              allusers.map((item, index) => (
                                <tr key={index}>
                                  <td>{item.id}</td>
                                  <td>{item.username}</td>
                                  <td>********</td>
                                  <td>{item.name}</td>  
                                  <td>{item.email}</td>
                                  <td>{item.role}</td>
                                  <td>
                                    {item.id != state.user.id ? (
                                      item.role != "admin" ||
                                      item.email !=
                                        "phuthinhnguyen1101@gmail.com" ? (
                                        <button
                                          className="ms-1 btn btn-danger"
                                          onClick={() => banuserclick(item.id)}
                                        >
                                          Ban user
                                        </button>
                                      ) : (
                                        <button className="button-disabled ms-1 btn btn-secondary disabled">
                                          Ban user
                                        </button>
                                      )
                                    ) : (
                                      <button className="button-disabled ms-1 btn btn-secondary disabled">
                                        Me
                                      </button>
                                    )}

                                    {item.id != state.user.id ? (
                                      item.role != "admin" &&
                                      item.email !=
                                        "phuthinhnguyen1101@gmail.com" ? (
                                        <button
                                          className="ms-1 btn btn-info"
                                          onClick={() => toadminclick(item.id)}
                                        >
                                          To Admin
                                        </button>
                                      ) : (
                                        <button
                                          className="button-disabled ms-1 btn btn-secondary disabled"
                                        >
                                          To Admin
                                        </button>
                                      )
                                    ) : (
                                      <button
                                        className="button-disabled ms-1 btn btn-secondary disabled"
                                      >
                                        Me
                                      </button>
                                    )}
                                  </td>
                                </tr>
                              ))}
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </div>
                  <div className="col-md-6 all chartview" style={{position:"absolute",left:"0%", top:"0px"}}>
                    <div className="adminworkspace-analytics-users">
                      <h2>CHART VIEW</h2>
                      <div className="adminworkspace-chartview">
                            {/* <h4>No Result</h4> */}
                            <div className="adminworkspace-chartview-item">
                              <Pie
                                width={"100%"}
                                data={pie}
                                options={{
                                  title: {
                                    display: true,
                                    text: 'Class Strength',
                                    fontSize: 50,
                                  },
                                  legend: {
                                    display: true,
                                    position: 'right',
                                  },
                                  maintainAspectRatio: false
                                }}
                              />
                              <h4>QUANTITY OF IN/OUT PRODUCTS IN MONTH</h4>
                            </div>
                            <div className="adminworkspace-chartview-item">
                            <Bar
                              width={"100%"}
                              data={bar}
                              options={{
                                title: {
                                  display: true,
                                  text: 'Class Strength',
                                  fontSize: 20,
                                },
                                legend: {
                                  display: true,
                                  position: 'right',
                                },
                                maintainAspectRatio: false
                              }}
                            />
                              <h4>REMAINING PRODUCTS STORED IN WAREHOUSE</h4>
                            </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
             
            </div>
            <Helmet>
              <script src="../js/isotope.pkgd.min.js"></script>
              <script src="../js/filter.js"></script>
            </Helmet>
         
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
      ) : (
        navigate("/")
      )}
    </div>
  );
}
export default Adminworkspace;
