import { useDispatch, useSelector } from "react-redux";
import { getDatalogicBoxLabel, getJabilBoxLabel} from "../redux/action";
import React,{ useEffect,useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import Header from "./Header";
import { Helmet } from "react-helmet";
import Snackbar from "@mui/material/Snackbar";
import Slide from "@mui/material/Slide";
import MuiAlert from "@mui/material/Alert";
import { useReactToPrint } from "react-to-print";
import { DatalogicLabelPrintFile } from "./DatalogicLabelPrintFile";

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
  const [inputinfo, setInputinfo] = useState({quantity:"0",po:"",cavno:""});

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
      dispatch(getDatalogicBoxLabel());
      dispatch(getJabilBoxLabel());
    }
  }, []);
 
  if (state.datalogicboxlabel!=null && state.jabilboxlabel!=null){
    var filterresult = state.datalogicboxlabel.filter((item) => {
      return item["partnumber"] == partcode
    });
    var exportcsv = []
    if (filterresult.length>0){
      exportcsv.push({Customer:filterresult[0].customer,PartName:filterresult[0].partname,PartNumber:filterresult[0].partnumber,REV:filterresult[0].rev,Color:filterresult[0].color,MaterialManufacturer:filterresult[0].materialmanufactuer,MaterialType:filterresult[0].materialtype,MaterialColor:filterresult[0].materialcolor,CountryofOrigin:filterresult[0].countryorigon,ULFileOfMaterial:filterresult[0].ulfile})
    }

    var filterresultjabilboxlabel = state.jabilboxlabel.sort((a, b) => b.recieveday- a.recieveday);
  }
  else{
    navigate("/")
  }

  const componentRef = React.useRef(null);
  function printFn(partcode,inputinfo){
    if (partcode!="" && inputinfo.quantity!="0" && inputinfo.po!="" && inputinfo.cavno!=""){
      printData();
    }
    else{
      setAlert({ open: true, message: "Please fill all the fields" });
    }
  }
  const printData = useReactToPrint({
    contentRef: componentRef,
    documentTitle: "DatalogicLabelPrintFile",
    // onAfterPrint: handleAfterPrint,
    // onBeforePrint: handleBeforePrint,
  });
  
  function copybuttonclick(e){
    var copyText = e.target.parentElement.previousElementSibling;
    navigator.clipboard.writeText(copyText.innerText);
  }

  function showlabelclick(label){
    navigate("/showjabillabel", { state: label });
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
                        <p style={{marginTop:"0"}}>PN &nbsp;</p>
                        <input style={{width:"300px"}} value={partcode} onChange={e=>{setParcode(e.target.value);setInputinfo({quantity:"0",po:"",cavno:""})}}></input>
                        <p style={{marginTop:"0"}}>Quantity</p>
                        <input style={{width:"300px"}} type="number" value={inputinfo.quantity} onChange={e=>setInputinfo({...inputinfo,quantity:e.target.value})}></input>
                        <button className="ms-1 btn btn-warning" style={{width:"100px",fontSize:"16px",fontWeight:"600"}} onClick={() => printFn(partcode,inputinfo)}>Print</button> 
                      </div>
                      <div className="old-password">
                        <p style={{marginTop:"0"}}>PO#</p>
                        <input style={{width:"300px"}} value={inputinfo.po} onChange={e=>setInputinfo({...inputinfo,po:e.target.value})}></input>
                        <p style={{marginTop:"0"}}>CAV NO.</p>
                        <input style={{width:"300px"}} value={inputinfo.cavno} onChange={e=>setInputinfo({...inputinfo,cavno:e.target.value})}></input>
                      </div>
                      {filterresult!=undefined && filterresult.length>0 ? 
                          <DatalogicLabelPrintFile ref={componentRef} quantity={inputinfo.quantity} po={inputinfo.po} cavno={inputinfo.cavno} iteminfo={filterresult[0]}/>
                      :null}
                    </div>
                  </div>
                  <div className="faq-content-menudropdown-item" data-faqitemid="faqitem2">
                    <h3>Jabil Box Label</h3>
                    <a id="plus"><i className="fa fa-plus"></i></a>
                    <a id="minus"><i className="fa fa-minus"></i></a>
                  </div>
                  <div className="faq-content-menudropdown-item-show" id="faqitem2">
                    <div className="change-password-container">
                      <h2 style={{textAlign:"center"}}>LABEL RECORD</h2>
                      <div className="old-password" style={{paddingRight:"40px",display:"block"}}>
                        <table className="table" style={{margin:"auto",marginTop:"10px",marginBottom:"20px"}}>
                          <thead style={{color:"white"}}>
                            <tr>
                                <td style={{fontWeight: "700",fontSize:"18px"}}>ID</td>
                                <td style={{fontWeight: "700",fontSize:"18px"}}>CreatedAt</td>
                                <td style={{fontWeight: "700",fontSize:"18px"}}>Vendor Code</td>
                                <td style={{fontWeight: "700",fontSize:"18px"}}>Part Number</td>
                                <td style={{fontWeight: "700",fontSize:"18px"}}>MPN</td>
                                <td style={{fontWeight: "700",fontSize:"18px"}}>PO</td>
                                <td style={{fontWeight: "700",fontSize:"18px"}}>Quantity</td>
                                <td style={{fontWeight: "700",fontSize:"18px"}}>Action</td>
                            </tr>
                          </thead>
                          <tbody style={{color:"white"}}>
                              {filterresultjabilboxlabel!=undefined && filterresultjabilboxlabel.length>0 ?
                              filterresultjabilboxlabel.map((item)=><tr key={item.id} >
                              <td>
                                {item.id}
                              </td>
                              <td>
                                {item.createdat}
                              </td>
                              <td>
                                {item.vendorcode} 
                              </td>
                              <td>
                                {item.partnumber}
                              </td>
                              <td>
                                {item.mpn}
                              </td>
                              <td>
                                {item.po}
                              </td>
                              <td>
                                {item.quantity}
                              </td>
                              <td>
                              <button 
                                  style={{padding: "3px 10px",marginLeft:"7px"}}
                                  className="ms-1 btn btn-warning"
                                  onClick={()=>showlabelclick(item)}>
                                    Details
                                </button>
                              </td>
                              </tr>):null}
                          </tbody>
                        </table>
                      </div>
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
