import { useDispatch, useSelector } from "react-redux";
import { getItem, getallusersforposts, deleteItem, addnewItem } from "../redux/action";
import React, { useEffect, useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { convertCreatedAt } from "./convertCreatedAt";
import Header from "./Header";
import Slide from "@mui/material/Slide";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";
import Select from 'react-select'
import { makeId } from "./makeId";


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

function Scan() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { state } = useLocation();
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
  const [sharethinking, setSharethinking] = useState("");
  const [position, setPosition] = useState({char:"A",number:"1.1"});
  const [lockitem, setLockitem] = useState({status:"OFF",reason:"NONE"});
  const [scanitem, setScanitem] = useState([])

  useEffect(() => {
    dispatch(getItem());
    dispatch(getallusersforposts());
  }, [scanitem]);


  const sharethinkingonChange = (e) => {
    setSharethinking(e.target.value)
  };
 
  const handleScan = (e) => {
    if (e.keyCode===13){
      if (sharethinking.split("/").length==6 || sharethinking.split("/").length==4 || sharethinking.split("/").length==8){
          var convertqrcode = []
          if (sharethinking.split("/").length==6){
            addnewitem(sharethinking.trim(),stateselector.user.name,position);
            setSharethinking("");
          }
          else if (sharethinking.split("/").length==4){
            var mfgdate = ""
            if (sharethinking.split("/")[0].split("-").length>2){
              mfgdate = sharethinking.split("/")[0].trim()
            }
            else{
              mfgdate = "20" + sharethinking.split("/")[0].trim().split("-")[0].slice(0,2) + "-" + sharethinking.split("/")[0].trim().split("-")[0].slice(2,4) + "-" + sharethinking.split("/")[0].trim().split("-")[0].slice(4,6)
            }
            convertqrcode.push(sharethinking.split("/")[0].trim(),mfgdate,sharethinking.split("/")[1],sharethinking.split("/")[2],sharethinking.split("/")[3].trim(), "000000")
            addnewitem(convertqrcode.join("/"),stateselector.user.name,position);
            setSharethinking("");
          }
          else if (sharethinking.split("/").length==8){
            const mfgdate = "20" + sharethinking.split("/")[2].split("-")[0].slice(0,2) + "-" + sharethinking.split("/")[2].split("-")[0].slice(2,4) + "-" + sharethinking.split("/")[2].split("-")[0].slice(4,6)
            convertqrcode.push(sharethinking.split("/")[2],mfgdate,"000*000",sharethinking.split("/")[4],sharethinking.split("/")[1], sharethinking.split("/")[0].trim())
            addnewitem(convertqrcode.join("/"),stateselector.user.name,position);
            setSharethinking("");
          }
      
        }
      else{
          setAlert({open:true, message:"QR Code incorrect format"})
        }
    }
 
  }

  const sortedposts = stateselector.posts.sort((a, b) => b.createdAt - a.createdAt);
 
  
  function deleteitem(idcode) {
    // console.log(idcode)
    dispatch(deleteItem(idcode));
    const filternotqrcode = scanitem.filter(item=>item.idcode!=idcode)
    setScanitem(filternotqrcode)
  }


  function edititem(item) {
    navigate("/updateitem", { state: item });
  }
  function addnewitem(qrcode,scanner,position) {
    // if (qrcode!=""){
    //   const filterresult = sortedposts.filter((item) => {
    //     return item["qrcode"].includes(qrcode);
    //   });
      
    //   if (filterresult.length>0){
    //     if (state=="IN"){
    //       setAlert({open:true, message:"QR code already exists in database"})
    //     }
    //     else if (state=="OUT"){
    //       if (filterresult[0].status=="IN"){
    //         if (JSON.parse(filterresult[0].lockitem).status=="OFF"){
    //           const qrcodesplit = qrcode.split("/")
    //           const itemcode = qrcodesplit[5]
    //           const idcode = itemcode + makeId(4)
    //           function firstFunction() {
    //             dispatch(addnewItem(idcode,itemcode,qrcode,scanner,state,JSON.parse(filterresult[0].position),JSON.parse(filterresult[0].lockitem)));  
    //             // console.log("Dispatch done.")
    //           }
    //           async function secondFunction() {
    //             // console.log('Before promise call.')
    //             const result = await firstFunction()
    //             setScanitem([...scanitem,{idcode:idcode,position:JSON.parse(filterresult[0].position),lockitem:JSON.parse(filterresult[0].lockitem),itemcode:itemcode,qrcode:qrcode,status:state,createat:Date.now(),scanner:scanner}])
    //             // console.log('Update state done.')
    //           }; 
    //           secondFunction()

    //           // dispatch(addnewItem(itemcode,qrcode,scanner,state,JSON.parse(filterresult[0].position),JSON.parse(filterresult[0].lockitem)));  
    //           // setScanitem([...scanitem,{position:JSON.parse(filterresult[0].position),lockitem:JSON.parse(filterresult[0].lockitem),itemcode:itemcode,qrcode:qrcode,status:state,createat:Date.now(),scanner:scanner}])
    //         }
    //         else if (JSON.parse(filterresult[0].lockitem).status=="ON"){
    //           setAlert({open:true, message:`Item has been locked by admin. Reason: ${JSON.parse(filterresult[0].lockitem).reason}`})
    //         }
    //       }
    //       else if (filterresult[0].status=="OUT"){
    //         setAlert({open:true, message:"QR code already exists in database"})
    //       }
    //     }
    //   }
    //   else{
    //     if (state=="IN"){
    //       const qrcodesplit = qrcode.split("/")
    //       const itemcode = qrcodesplit[5]
    //       const idcode = itemcode + makeId(4)
    //       // console.log(itemcode + makeId(4))
    //       function firstFunction() {
    //           dispatch(addnewItem(idcode,itemcode,qrcode,scanner,state,position,lockitem));
    //           // console.log("Dispatch done.")
    //       }
    //       async function secondFunction() {
    //         // console.log('Before promise call.')
    //         const result = await firstFunction()
    //         setScanitem([...scanitem,{idcode:idcode,position:position,itemcode:itemcode,qrcode:qrcode,status:state,createat:Date.now(),scanner:scanner,lockitem:lockitem}])
    //         // console.log('Update state done.')
    //       }; 
    //       secondFunction()

    //       // dispatch(addnewItem(itemcode,qrcode,scanner,state,position,lockitem));
    //       // setScanitem([...scanitem,{position:position,itemcode:itemcode,qrcode:qrcode,status:state,createat:Date.now(),scanner:scanner,lockitem:lockitem}])
    //     }
    //     else if (state=="OUT"){
    //       setAlert({open:true, message:"QR Code not exists in database"})
    //     }
    //   }
    // }

    if (qrcode!=""){
      const filterresult = sortedposts.filter((item) => {
            return item["qrcode"].includes(qrcode);
          });
      if (state=="IN"){
        const qrcodesplit = qrcode.split("/")
        const itemcode = qrcodesplit[5]
        const idcode = itemcode + makeId(4)
        // console.log(itemcode + makeId(4))
        function firstFunction() {
            dispatch(addnewItem(idcode,itemcode,qrcode,scanner,state,position,lockitem));
            // console.log("Dispatch done.")
        }
        async function secondFunction() {
          // console.log('Before promise call.')
          const result = await firstFunction()
          setScanitem([...scanitem,{idcode:idcode,position:position,itemcode:itemcode,qrcode:qrcode,status:state,createat:Date.now(),scanner:scanner,lockitem:lockitem}])
          // console.log('Update state done.')
        }; 
        secondFunction()

        // dispatch(addnewItem(itemcode,qrcode,scanner,state,position,lockitem));
        // setScanitem([...scanitem,{position:position,itemcode:itemcode,qrcode:qrcode,status:state,createat:Date.now(),scanner:scanner,lockitem:lockitem}])
      }
      else if (state=="OUT"){
        if (JSON.parse(filterresult[0].lockitem).status=="OFF"){
          const qrcodesplit = qrcode.split("/")
          const itemcode = qrcodesplit[5]
          const idcode = itemcode + makeId(4)
          function firstFunction() {
            dispatch(addnewItem(idcode,itemcode,qrcode,scanner,state,JSON.parse(filterresult[0].position),JSON.parse(filterresult[0].lockitem)));  
            // console.log("Dispatch done.")
          }
          async function secondFunction() {
            // console.log('Before promise call.')
            const result = await firstFunction()
            setScanitem([...scanitem,{idcode:idcode,position:JSON.parse(filterresult[0].position),lockitem:JSON.parse(filterresult[0].lockitem),itemcode:itemcode,qrcode:qrcode,status:state,createat:Date.now(),scanner:scanner}])
            // console.log('Update state done.')
          }; 
          secondFunction()

          // dispatch(addnewItem(itemcode,qrcode,scanner,state,JSON.parse(filterresult[0].position),JSON.parse(filterresult[0].lockitem)));  
          // setScanitem([...scanitem,{position:JSON.parse(filterresult[0].position),lockitem:JSON.parse(filterresult[0].lockitem),itemcode:itemcode,qrcode:qrcode,status:state,createat:Date.now(),scanner:scanner}])
        }
        else if (JSON.parse(filterresult[0].lockitem).status=="ON"){
          setAlert({open:true, message:`Item has been locked by admin. Reason: ${JSON.parse(filterresult[0].lockitem).reason}`})
        }
      }
     
    
    }
  }
  return (
    <div>
      {stateselector.user != null ? (
        <div>
          <Header />
          <div className="home-body">
            <div className="home-body-wrap">
                <div className={state=="IN" ? "statuslabelin" : "statuslabelout"}>{state}</div>
                <div className="share-thinking" > 
                  {state=="IN"?
                  <div>
                    <h4 style={{marginTop:"5px",marginRight:"12px",display:"inline-block"}}>Position:</h4>
                    <select 
                    className="statusselect positionselect"
                    onChange={(e)=>setPosition({...position,char:e.target.value})}
                    value={position.char}
                    style={{width:"60px",marginRight:"5px"}}
                    >
                      <option value="A">A</option>
                      <option value="B">B</option>
                      <option value="C">C</option>
                      <option value="D">D</option>
                      <option value="E">E</option>
                      <option value="F">F</option>
                      <option value="G">G</option>
                      <option value="H">H</option>
                      <option value="I">I</option>
                      <option value="K">K</option>
                      <option value="Pallet">Pallet</option>
                    </select> 
                    <select 
                      className="statusselect positionselect"
                      onChange={(e)=>setPosition({...position,number:e.target.value})}
                      value={position.number}
                      >
                      <option value="1.1">1.1</option>
                      <option value="1.2">1.2</option>
                      <option value="2.1">2.1</option>
                      <option value="2.2">2.2</option>
                      <option value="3.1">3.1</option>
                      <option value="3.2">3.2</option>
                      <option value="4.1">4.1</option>
                      <option value="4.2">4.2</option>
                      <option value="5.1">5.1</option>
                      <option value="5.2">5.2</option>
                      <option value="0.0">0.0</option>
                    </select>
                  </div>
                  : null}
                  <input
                    type="text"
                    className="form-control input-share"
                    style={{width:"45%"}}   
                    id="inlineFormInputGroup"
                    placeholder="Scan here..." 
                    onChange={sharethinkingonChange}
                    onKeyDown={(e)=>handleScan(e)}
                    value={sharethinking}
                
                  />
        
                  <button
                    className="button-login share-button"
                    // onClick={() => addnewitem(sharethinking.trim(),stateselector.user.name,position)}
                    onClick={(e) => handleScan(e)}
                  >
                    Add
                  </button>
                </div>
            </div>
            
            <table className="table" style={{marginTop:"50px",marginBottom:"80px"}}>
            <thead style={{color:"white"}}>
              <tr>
                <td style={{fontWeight: "700",fontSize:"18px"}}>Position</td>
                <td style={{fontWeight: "700",fontSize:"18px"}}>Item Code</td>
                <td style={{fontWeight: "700",fontSize:"18px"}}>QR Code</td>
                <td style={{fontWeight: "700",fontSize:"18px"}}>Scanner</td>
                <td style={{fontWeight: "700",fontSize:"18px"}}>Created At</td>
                <td style={{fontWeight: "700",fontSize:"18px"}}>Status</td>
                <td style={{fontWeight: "700",fontSize:"18px"}}>Action</td>
              </tr>
            </thead>
            <tbody style={{color:"white"}}>
                {scanitem.map((item)=><tr key={item.id} >
                  <td>
                    {item.position.char+item.position.number} 
                  </td>
                  <td>
                    {item.itemcode} 
                  </td>
                  <td>
                    {item.qrcode} 
                  </td>
                  <td>
                    {item.scanner} 
                  </td>
                  <td>
                    {convertCreatedAt(item.createat)} 
                  </td>
                  <td>
                    <div style={item.status=="IN"?{background:"#10e96a", padding:"2px", textAlign:"center", maxWidth:"100px", borderRadius:"10px"}:{background:"#e2372b", padding:"2px", textAlign:"center", maxWidth:"100px", borderRadius:"10px"}}>{item.status} </div> 
                  </td>
                    <td>
                        <button 
                            style={{padding: "3px 10px"}}
                            onClick={(e)=>edititem(item)} className={stateselector.user.role=="admin" ? (item.status == "IN" ? "ms-1 btn btn-info" : "ms-1 btn btn-secondary disabled") : "ms-1 btn btn-secondary disabled"}>
                            Edit
                        </button>
                        <button 
                            style={{padding: "3px 10px",marginLeft:"20px"}}
                            onClick={()=>deleteitem(item.idcode)} className="btn btn-danger">
                            Delete
                        </button>
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
export default Scan;
