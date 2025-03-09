import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import Header from "./Header";


function Showdetailjabillabel() {
  const navigate = useNavigate();
  const { state } = useLocation();
  const stateselector = useSelector((state) => state);

  if (stateselector.user == null) {
    navigate("/")
  }

  useEffect(() => {
 
  }, []);
 
  const scanrows = state.scancode.split(",")
  console.log(scanrows)
  return (
    <div>
      {stateselector.user != null ? (
        <div>
          <Header />
          <div className="home-body" style={{display:"block"}}>
            <h1 style={{textAlign:"center"}}>LABEL CONTENT</h1>
            <div className="label-container">
              <div className="label-show">
                <table className="table" style={{margin:"auto",marginTop:"20px",maxWidth:"500px",color:"white",border:"1px solid white",fontSize:"25px"}}>
                  <tr>
                    <td style={{border:"1px solid white",padding:"15px 15px",width:"100px"}}>Vendor</td>
                    <td style={{border:"1px solid white",padding:"15px 15px"}}>CCL DESIGN VINA</td>
                  </tr>
                  <tr>
                    <td style={{border:"1px solid white",padding:"15px 15px",width:"100px"}}>Vendor Code</td>
                    <td style={{border:"1px solid white",padding:"15px 15px"}}>{state.vendorcode}</td>
                  </tr>
                  <tr>
                    <td style={{border:"1px solid white",padding:"15px 15px",width:"100px"}}>PN</td>
                    <td style={{border:"1px solid white",padding:"15px 15px"}}>{state.partnumber}</td>
                  </tr>
                  <tr>
                    <td style={{border:"1px solid white",padding:"15px 15px",width:"100px"}}>MPN</td>
                    <td style={{border:"1px solid white",padding:"15px 15px"}}>{state.mpn}</td>
                  </tr>
                  <tr>
                    <td style={{border:"1px solid white",padding:"15px 15px",width:"100px"}}>PO</td>
                    <td style={{border:"1px solid white",padding:"15px 15px"}}>{state.po}</td>
                  </tr>
                  <tr>
                    <td style={{border:"1px solid white",padding:"15px 15px",width:"100px"}}>QTY</td>
                    <td style={{border:"1px solid white",padding:"15px 15px"}}>{state.quantity}</td>
                  </tr>
                  <tr>
                    <td style={{border:"1px solid white",padding:"15px 15px",width:"100px"}}>Date Code</td>
                    <td style={{border:"1px solid white",padding:"15px 15px"}}>{state.datecode}</td>
                  </tr>
                  <tr>
                    <td style={{border:"1px solid white",padding:"15px 15px",width:"100px"}}>CCL MF</td>
                    <td style={{border:"1px solid white",padding:"15px 15px"}}>{state.cclmf}</td>
                  </tr>
                  <tr>
                    <td style={{border:"1px solid white",padding:"15px 15px",width:"100px"}}></td>
                    <td style={{border:"1px solid white",padding:"15px 15px"}}>{state.checkcode}</td>
                  </tr>
                </table>  
              </div>
              <div className="label-content">
                <table className="table" style={{margin:"auto",marginTop:"10px",marginBottom:"20px",maxHeight:"500px",scrollBehavior:"auto"}}>
                  <thead style={{color:"white"}}>
                    <tr>
                        <td style={{fontWeight: "700",fontSize:"18px"}}>ID</td>
                        <td style={{fontWeight: "700",fontSize:"18px"}}>CreatedAt</td>
                        <td style={{fontWeight: "700",fontSize:"18px"}}>Vendor Code</td>
                        <td style={{fontWeight: "700",fontSize:"18px"}}>Part Number</td>
                        <td style={{fontWeight: "700",fontSize:"18px"}}>MPN</td>
                        <td style={{fontWeight: "700",fontSize:"18px"}}>PO</td>
                        <td style={{fontWeight: "700",fontSize:"18px"}}>Quantity</td>
                    </tr>
                  </thead>
                  <tbody style={{color:"white"}}>
                      <td>
                        {state.id}
                      </td>
                      <td>
                        {state.createdat}
                      </td>
                      <td>
                        {state.vendorcode} 
                      </td>
                      <td>
                        {state.partnumber}
                      </td>
                      <td>
                        {state.mpn}
                      </td>
                      <td>
                        {state.po}
                      </td>
                      <td>
                        {state.quantity}
                      </td>
                  </tbody>
                </table>
                <h3 style={{marginTop:"50px"}}>Scan code</h3>
                <tbody style={{color:"white"}}>
                {scanrows.map((item)=><tr>
                    <td style={{padding:"10px"}}>
                      {item}
                    </td>
                    </tr>)}
                </tbody>
              </div>
		        </div>
          </div>
        </div>
      ) : (
        null
      )}
    </div>
  );
}
export default Showdetailjabillabel;
