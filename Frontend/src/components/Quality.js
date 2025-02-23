import { useDispatch, useSelector } from "react-redux";
import { getDatalogicBoxLabel} from "../redux/action";
import React,{ useEffect,useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "./Header";
import { Helmet } from "react-helmet";
import Snackbar from "@mui/material/Snackbar";
import Slide from "@mui/material/Slide";
import MuiAlert from "@mui/material/Alert";
import {ExportReactCSVDatalogicBoxLabel } from './ExportReactCSV'

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

function Quality() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const state = useSelector((state) => state);
  const [alert, setAlert] = useState({ open: false, message: "" });
  const [partcode, setParcode] = useState("");

  const closealert = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setAlert({ ...alert, open: false });
  };

  useEffect(() => {
    if (state.user == null) {
      navigate("/")
    }
    else{
      dispatch(getDatalogicBoxLabel())
    }
  }, []);
  
  if (state.datalogicboxlabel!=null){
    var filterresult = state.datalogicboxlabel.filter((item) => {
      return item["partnumber"] == partcode
    });
    var exportcsv = []
    if (filterresult.length>0){
      exportcsv.push({Customer:filterresult[0].customer,PartName:filterresult[0].partname,PartNumber:filterresult[0].partnumber,REV:filterresult[0].rev,Color:filterresult[0].color,MaterialManufacturer:filterresult[0].materialmanufactuer,MaterialType:filterresult[0].materialtype,MaterialColor:filterresult[0].materialcolor,CountryofOrigin:filterresult[0].countryorigon,ULFileOfMaterial:filterresult[0].ulfile})
    }
  }
  else{
    navigate("/")
  }

  function copybuttonclick(e){
    var copyText = e.target.parentElement.previousElementSibling;
    navigator.clipboard.writeText(copyText.innerText);
  }

  return (
    <div>
      {state.user != null ? (
        <div>
          <Header />
          <div className="home-body" style={{marginTop:"0"}}>
            <div className="home-body-wrap">
              <h2>QUALITY</h2>
            </div>
            <div className="home-body-content" style={{width:"100%",padding:"40px",maxWidth:"1200px",margin:"auto"}}>
              <div className="faq-container" style={{width:"100%"}}>
                <div className="faq-content-menudropdown" style={{width:"100%"}}>
                  <div className="faq-content-menudropdown-item" data-faqitemid="faqitem1">
                    <h3>Datalogic Box Label</h3>
                    <a id="plus"><i className="fa fa-plus"></i></a>
                    <a id="minus"><i className="fa fa-minus"></i></a>
                  </div>
                  <div className="faq-content-menudropdown-item-show" id="faqitem1">
                    <div className="change-password-container">
                      <div className="old-password">
                        <p style={{marginTop:"0"}}>Input partcode here</p>
                        <input style={{width:"300px"}} value={partcode} onChange={e=>setParcode(e.target.value)}></input> 
                      </div>
                      {filterresult!=undefined && filterresult.length>0 ? 
                          <div style={{width:"100%",overflowX:"auto",marginBottom:"10px"}}>
                            <table className="table" style={{margin:"auto",marginTop:"20px",width:"600px",color:"white",border:"1px solid white"}}>
                              <tr>
                                <th colspan="3" style={{padding:"20px",textAlign:"center",fontSize:"20px"}}>CCL DESIGN VINA Co., Ltd</th>
                              </tr>
                              <tr>
                                <td style={{border:"1px solid white",padding:"5px 10px",width:"320px"}}>
                                  <a style={{border:"1px solid red",borderRadius:"50%"}}>1</a>
                                  <label>CUSTOMER</label>
                                </td>
                                <td style={{border:"1px solid white",padding:"5px 10px"}}>{filterresult[0].customer}</td>
                                <td style={{border:"1px solid white",padding:"5px 10px"}}><button className='csvbutton copybutton' onClick={e=>copybuttonclick(e)}>Copy</button></td>
                              </tr>
                              <tr>
                              <td style={{border:"1px solid white",padding:"5px 10px",width:"320px"}}>
                                  <a style={{border:"1px solid red",borderRadius:"50%"}}>2</a>
                                  <label>PART NAME</label>
                                </td>
                                <td style={{border:"1px solid white",padding:"5px 10px"}}>{filterresult[0].partname}</td>
                                <td style={{border:"1px solid white",padding:"5px 10px"}}><button className='csvbutton copybutton' onClick={e=>copybuttonclick(e)}>Copy</button></td>
                              </tr>
                              <tr>
                              <td style={{border:"1px solid white",padding:"5px 10px",width:"320px"}}>
                                  <a style={{border:"1px solid red",borderRadius:"50%"}}>3</a>
                                  <label>PART NUMBER</label>
                                </td>
                                <td style={{border:"1px solid white",padding:"5px 10px"}}>{filterresult[0].partnumber}</td>
                                <td style={{border:"1px solid white",padding:"5px 10px"}}><button className='csvbutton copybutton' onClick={e=>copybuttonclick(e)}>Copy</button></td>
                              </tr>
                              <tr>
                              <td style={{border:"1px solid white",padding:"5px 10px",width:"320px"}}>
                                  <a style={{border:"1px solid red",borderRadius:"50%"}}>4</a>
                                  <label>REV</label>
                                </td>
                                <td style={{border:"1px solid white",padding:"5px 10px"}}>{filterresult[0].rev}</td>
                                <td style={{border:"1px solid white",padding:"5px 10px"}}><button className='csvbutton copybutton' onClick={e=>copybuttonclick(e)}>Copy</button></td>
                              </tr>
                              <tr>
                              <td style={{border:"1px solid white",padding:"5px 10px",width:"320px"}}>
                                  <a style={{border:"1px solid red",borderRadius:"50%"}}>5</a>
                                  <label>COLOR</label>
                                </td>
                                <td style={{border:"1px solid white",padding:"20px 10px"}}>{filterresult[0].color}</td>
                                <td style={{border:"1px solid white",padding:"5px 10px"}}><button className='csvbutton copybutton' onClick={e=>copybuttonclick(e)}>Copy</button></td>
                              </tr>
                              <tr>
                              <td style={{border:"1px solid white",padding:"5px 10px",width:"320px"}}>
                                  <a style={{border:"1px solid red",borderRadius:"50%"}}>6</a>
                                  <label>QUANTITY</label>
                                </td>
                                <td style={{border:"1px solid white",padding:"20px 10px"}}>{filterresult[0].quantity}</td>
                              </tr>
                              <tr>
                              <td style={{border:"1px solid white",padding:"5px 10px",width:"320px"}}>
                                  <a style={{border:"1px solid red",borderRadius:"50%"}}>7</a>
                                  <label>MANUFACTURING DATE</label>
                                </td>
                                <td style={{border:"1px solid white",padding:"20px 10px"}}>{filterresult[0].manufacturingdate}</td>
                              </tr>
                              <tr>
                              <td style={{border:"1px solid white",padding:"5px 10px",width:"320px"}}>
                                  <a style={{border:"1px solid red",borderRadius:"50%"}}>8</a>
                                  <label>EXPIRED DATE</label>
                                </td>
                                <td style={{border:"1px solid white",padding:"20px 10px"}}>{filterresult[0].expireddate}</td>
                              </tr>
                              <tr>
                                <td style={{border:"1px solid white",padding:"5px 10px",width:"320px"}}>
                                  <a style={{border:"1px solid red",borderRadius:"50%"}}>9</a>
                                  <label>MATERIAL MANUFACTURER</label>
                                </td>
                                <td style={{border:"1px solid white",padding:"20px 10px"}}>{filterresult[0].materialmanufactuer}</td>
                                <td style={{border:"1px solid white",padding:"5px 10px"}}><button className='csvbutton copybutton' onClick={e=>copybuttonclick(e)}>Copy</button></td>
                              </tr>
                              <tr>
                                <td style={{border:"1px solid white",padding:"5px 10px",width:"320px"}}>
                                  <a style={{border:"1px solid red",borderRadius:"50%"}}>10</a>
                                  <label>MATERIAL TYPE</label>
                                </td>
                                <td style={{border:"1px solid white",padding:"20px 10px"}}>{filterresult[0].materialtype}</td>
                                <td style={{border:"1px solid white",padding:"5px 10px"}}><button className='csvbutton copybutton' onClick={e=>copybuttonclick(e)}>Copy</button></td>
                              </tr>
                              <tr>
                                <td style={{border:"1px solid white",padding:"5px 10px",width:"320px"}}>
                                  <a style={{border:"1px solid red",borderRadius:"50%"}}>11</a>
                                  <label>MATERIAL COLOR</label>
                                </td>
                                <td style={{border:"1px solid white",padding:"20px 10px"}}>{filterresult[0].materialcolor}</td>
                                <td style={{border:"1px solid white",padding:"5px 10px"}}><button className='csvbutton copybutton' onClick={e=>copybuttonclick(e)}>Copy</button></td>
                              </tr>
                              <tr>
                                <td style={{border:"1px solid white",padding:"5px 10px",width:"320px"}}>
                                  <a style={{border:"1px solid red",borderRadius:"50%"}}>12</a>
                                  <label>COUNTRY OF ORIGIN</label>
                                </td>
                                <td style={{border:"1px solid white",padding:"20px 10px"}}>{filterresult[0].countryorigon}</td>
                                <td style={{border:"1px solid white",padding:"5px 10px"}}><button className='csvbutton copybutton' onClick={e=>copybuttonclick(e)}>Copy</button></td>
                              </tr>
                              <tr>
                                <td style={{border:"1px solid white",padding:"5px 10px",width:"320px"}}>
                                  <a style={{border:"1px solid red",borderRadius:"50%"}}>13</a>
                                  <label>PO#</label>
                                </td>
                                <td style={{border:"1px solid white",padding:"20px 10px"}}>{filterresult[0].po}</td>
                              </tr>
                              <tr>
                                <td style={{border:"1px solid white",padding:"5px 10px",width:"320px"}}>
                                  <a style={{border:"1px solid red",borderRadius:"50%"}}>14</a>
                                  <label>CAV NO.</label>
                                </td>
                                <td style={{border:"1px solid white",padding:"20px 10px"}}>{filterresult[0].cav}</td>
                              </tr>
                              <tr>
                                <td style={{border:"1px solid white",padding:"5px 10px",width:"320px"}}>
                                  <a style={{border:"1px solid red",borderRadius:"50%"}}>15</a>
                                  <label>UL file of material</label>
                                </td>
                                <td style={{border:"1px solid white",padding:"20px 10px"}}>{filterresult[0].ulfile}</td>
                                <td style={{border:"1px solid white",padding:"5px 10px"}}><button className='csvbutton copybutton' onClick={e=>copybuttonclick(e)}>Copy</button></td>
                              </tr>
                            </table>  
                          </div>
                      :null}
                      <ExportReactCSVDatalogicBoxLabel csvData={exportcsv} fileName="ScanAppExportFile-DatalogicBoxLabel" />
                    </div>
                  </div>
                  <div className="faq-content-menudropdown-item" data-faqitemid="faqitem2">
                    <h3>Jabil Box Label</h3>
                    <a id="plus"><i className="fa fa-plus"></i></a>
                    <a id="minus"><i className="fa fa-minus"></i></a>
                  </div>
                  <div className="faq-content-menudropdown-item-show" id="faqitem2">
                    <div className="change-password-container">
                      <div className="old-password">
                        <p style={{marginTop:"0"}}>Processing</p>
                        <input style={{width:"300px"}} disabled></input>       
                      </div>
                      <button className="button-login" style={{marginTop:"20px"}}>Save</button>        
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
export default Quality;
