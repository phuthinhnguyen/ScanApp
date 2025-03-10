import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import Header from "./Header";
import Barcode from 'react-barcode';

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

  return (
    <div>
      {stateselector.user != null ? (
        <div>
          <Header />
          <div className="home-body" style={{display:"block"}}>
            <h1 style={{textAlign:"center"}}>LABEL CONTENT</h1>
            <div className="label-container">
              <div className="label-show">
                <div className="label-show-container">
                  <table className="table" style={{margin:"auto",maxWidth:"500px",color:"black",border:"1px solid black",fontSize:"23px"}}>
                    <tr>
                      <td style={{border:"1px solid black",padding:"10px 10px",width:"100px",fontWeight:"500"}}>Vendor</td>
                      <td style={{border:"1px solid black",padding:"10px 10px",fontWeight:"700",textAlign:"center"}}>CCL DESIGN VINA</td>
                    </tr>
                    <tr>
                      <td style={{border:"1px solid black",padding:"0 10px",width:"100px",fontWeight:"500"}}>Vendor Code</td>
                      <td style={{border:"1px solid black",fontWeight:"500",textAlign:"center",padding:"0"}}><Barcode value={state.vendorcode} height={60} margin={1} fontSize={24}/></td>
                    </tr>
                    <tr style={{position:"relative"}}>
                      <td colSpan={2} style={{border:"1px solid black",textAlign:"center",padding:"0"}}><Barcode value={state.partnumber} height={60} margin={1} fontOptions={"bold"} fontSize={26}/></td>
                      <p style={{position:"absolute", left:"10px",bottom:"-18px",fontWeight:"500"}}>PN</p>
                    </tr>
                    <tr style={{position:"relative"}}>
                      <td colSpan={2} style={{border:"1px solid black",textAlign:"center",padding:"0"}}><Barcode value={state.mpn} height={60} margin={1} fontOptions={"bold"} fontSize={26}/></td>
                      <p style={{position:"absolute", left:"10px",bottom:"-18px",fontWeight:"500"}}>MPN</p>
                    </tr>
                    <tr>
                      <td style={{border:"1px solid black",padding:"10px 10px",width:"100px",fontWeight:"500"}}>PO</td>
                      <td style={{border:"1px solid black",fontWeight:"500",textAlign:"center",padding:"0"}}><Barcode value={state.po} height={60} margin={1} fontSize={24}/></td>
                    </tr>
                    <tr>
                    <td style={{border:"1px solid black",padding:"10px 10px",width:"100px",fontWeight:"500"}}>QTY</td>
                    <td style={{border:"1px solid black",fontWeight:"500",textAlign:"center",padding:"0"}}><Barcode value={state.quantity} height={60} margin={1} fontSize={24}/></td>
                    </tr>
                    <tr>
                      <td style={{border:"1px solid black",padding:"10px 10px",width:"100px",fontWeight:"500"}}>Date Code</td>
                      <td style={{border:"1px solid black",padding:"0 10px",fontWeight:"500"}}>
                        <div style={{display:"flex",justifyContent:"space-between",alignItems:"center"}}>
                          <Barcode value={state.datecode} height={45} margin={1} />
                          <p>ROHS</p>
                        </div>
                      </td>
                    </tr>
                    <tr>
                    <td style={{border:"1px solid black",padding:"10px 10px",width:"100px",fontWeight:"500"}}>CCL MF</td>
                    <td style={{border:"1px solid black",fontWeight:"500",textAlign:"center",padding:"0"}}><Barcode value={state.cclmf} height={60} margin={1} fontSize={24}/></td>
                    </tr>
                    <tr>
                    <td style={{border:"1px solid black",padding:"10px 10px",width:"100px",fontWeight:"500"}}></td>
                    <td style={{border:"1px solid black",fontWeight:"500",textAlign:"center",padding:"0"}}><Barcode value={state.checkcode} height={60} margin={1} fontSize={24}/></td>
                    </tr>
                  </table>  
                </div>
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
