import React from "react";
import { convertCreatedAt } from "./convertCreatedAt";
import Barcode from 'react-barcode';

export const DatalogicLabelPrintFile = React.forwardRef((props, ref) =>{
  // const canvasEl = React.useRef(null);
  // const shadowRootHostEl = React.useRef(null);

  // React.useEffect(() => {
  //   const ctx = canvasEl.current?.getContext("2d");

  //   if (ctx) {
  //     ctx.beginPath();
  //     ctx.arc(95, 50, 40, 0, 2 * Math.PI);
  //     ctx.stroke();
  //     ctx.fillStyle = "rgb(200, 0, 0)";
  //     ctx.fillRect(85, 40, 20, 20);
  //     ctx.save();
  //   }
  // }, []);

  // React.useEffect(() => {
  //   const shadowRoot = shadowRootHostEl.current?.attachShadow({ mode: "open" });
  //   if (shadowRoot) {
  //     const div = document.createElement("div");
  //     div.innerHTML = "Shadow DOM Content";
  //     shadowRoot.appendChild(div);
  //   }
  // }, []);
  return (
    <div className="datalogiclabel-container" ref={ref}>
        <table className="datalogiclabeltable">
          <tr>
            <th colspan="2" className="datalogiclabeltable-th"><span style={{left:"5mm",position:"absolute",top:"1.5mm"}}>CCL DESIGN VINA Co., Ltd</span><img src="/img/logoccl.png" style={{width:"12mm",height:"3.5mm",position:"absolute",top:"2mm",right:"2mm"}}></img> </th>
          </tr>
          <tr className="datalogiclabeltable-tr">
            <td className="datalogiclabeltable-td-left">
              <a className="datalogiclabeltable-circle">1</a>
              <span className="datalogiclabeltable-label">CUSTOMER</span>
            </td>
            <td className="datalogiclabeltable-td-right" style={{textTransform:"capitalize"}}>{props.iteminfo.customer.toLowerCase()}</td>
          </tr>
          <tr className="datalogiclabeltable-tr">
          <td className="datalogiclabeltable-td-left">
              <a className="datalogiclabeltable-circle">2</a>
              <span className="datalogiclabeltable-label">PART NAME</span>
            </td>
            <td className="datalogiclabeltable-td-right" style={props.iteminfo.partname.length>35 ? {fontSize:"1.7mm"} : (props.iteminfo.partname.length>25 ? {fontSize:"2mm"} :{fontSize:"2.2mm"})}>{props.iteminfo.partname}</td>
          </tr>
          <tr className="datalogiclabeltable-tr">
          <td className="datalogiclabeltable-td-left">
              <a className="datalogiclabeltable-circle">3</a>
              <span className="datalogiclabeltable-label">PART NUMBER</span>
            </td>
            <td className="datalogiclabeltable-td-right"><Barcode value={props.iteminfo.partnumber} height={20} margin={0.1} fontSize={10} width={1} textMargin={0} marginRight={0}/></td>
          </tr>
          <tr className="datalogiclabeltable-tr">
          <td className="datalogiclabeltable-td-left">
              <a className="datalogiclabeltable-circle">4</a>
              <span className="datalogiclabeltable-label">REV</span>
            </td>
            <td className="datalogiclabeltable-td-right">{props.iteminfo.rev}</td>
          </tr>
          <tr className="datalogiclabeltable-tr">
          <td className="datalogiclabeltable-td-left">
              <a className="datalogiclabeltable-circle">5</a>
              <span className="datalogiclabeltable-label">COLOR</span>
            </td>
            <td className="datalogiclabeltable-td-right" style={props.iteminfo.color.length>42 ? {fontSize:"1.7mm",fontWeight:"600"} : (props.iteminfo.color.length>32 ? {fontSize:"2mm",fontWeight:"600"} :{fontSize:"2.3mm",fontWeight:"600"})}>{props.iteminfo.color}</td>
          </tr>
          <tr className="datalogiclabeltable-tr">
          <td className="datalogiclabeltable-td-left">
              <a className="datalogiclabeltable-circle">6</a>
              <span className="datalogiclabeltable-label">QUANTITY</span>
            </td>
            <td className="datalogiclabeltable-td-right"><Barcode value={props.quantity} height={14} margin={0.1} fontSize={10} width={1.4} textMargin={0}/></td>
          </tr>
          <tr className="datalogiclabeltable-tr">
          <td className="datalogiclabeltable-td-left">
              <a className="datalogiclabeltable-circle">7</a>
              <span className="datalogiclabeltable-label" style={{fontSize:"2mm"}}>MANUFACTURING DATE</span>
            </td>
            <td className="datalogiclabeltable-td-right">{convertCreatedAt(Date.now())}</td>
          </tr>
          <tr className="datalogiclabeltable-tr">
          <td className="datalogiclabeltable-td-left">
              <a className="datalogiclabeltable-circle">8</a>
              <span className="datalogiclabeltable-label">EXPIRED DATE</span>
            </td>
            <td className="datalogiclabeltable-td-right">{convertCreatedAt(Date.now()).split("/")[0] + "/" + convertCreatedAt(Date.now()).split("/")[1] + "/" + (Number(convertCreatedAt(Date.now()).split("/")[2])+1)}</td>
          </tr>
          <tr className="datalogiclabeltable-tr">
            <td className="datalogiclabeltable-td-left">
              <a className="datalogiclabeltable-circle">9</a>
              <span className="datalogiclabeltable-label" style={{fontSize:"1.9mm"}}>MATERIAL MANUFACTURER</span>
            </td>
            <td className="datalogiclabeltable-td-right">{props.iteminfo.materialmanufactuer}</td>
          </tr>
          <tr className="datalogiclabeltable-tr">
            <td className="datalogiclabeltable-td-left">
              <a className="datalogiclabeltable-circle">10</a>
              <span className="datalogiclabeltable-label">MATERIAL TYPE</span>
            </td>
            <td className="datalogiclabeltable-td-right" style={props.iteminfo.materialtype.length>50 ? {fontSize:"1.7mm"} : (props.iteminfo.materialtype.length>35 ? {fontSize:"2mm"} :{fontSize:"2.3mm"})}>{props.iteminfo.materialtype}</td>
          </tr>
          <tr className="datalogiclabeltable-tr">
            <td className="datalogiclabeltable-td-left">
              <a className="datalogiclabeltable-circle">11</a>
              <span className="datalogiclabeltable-label">MATERIAL COLOR</span>
            </td>
            <td className="datalogiclabeltable-td-right">{props.iteminfo.materialcolor}</td>
          </tr>
          <tr className="datalogiclabeltable-tr">
            <td className="datalogiclabeltable-td-left">
              <a className="datalogiclabeltable-circle">12</a>
              <span className="datalogiclabeltable-label" style={{fontSize:"2.2mm"}}>COUNTRY OF ORIGIN</span>
            </td>
            <td className="datalogiclabeltable-td-right">{props.iteminfo.countryorigon.toLowerCase().includes("vietnam") ? "VIET NAM" : "CHINA"}</td>
          </tr>
          <tr className="datalogiclabeltable-tr">
            <td className="datalogiclabeltable-td-left">
              <a className="datalogiclabeltable-circle">13</a>
              <span className="datalogiclabeltable-label">PO#</span>
            </td>
            <td className="datalogiclabeltable-td-right">{props.po}</td>
          </tr>
          <tr className="datalogiclabeltable-tr">
            <td className="datalogiclabeltable-td-left">
              <a className="datalogiclabeltable-circle">14</a>
              <span className="datalogiclabeltable-label">CAV NO.</span>
            </td>
            <td className="datalogiclabeltable-td-right">{props.cavno}</td>
          </tr>
          <tr className="datalogiclabeltable-tr">
            <td className="datalogiclabeltable-td-left">
              <a className="datalogiclabeltable-circle">15</a>
              <span className="datalogiclabeltable-label">UL file of material</span>
            </td>
            <td className="datalogiclabeltable-td-right" style={props.iteminfo.ulfile.length>70 ? {fontSize:"1.4mm",position:"relative"} : (props.iteminfo.ulfile.length>55 ? {fontSize:"1.7mm",position:"relative"} : (props.iteminfo.ulfile.length>40 ? {fontSize:"2mnm",position:"relative"} :{fontSize:"2.3mm",position:"relative"}))}>{props.iteminfo.ulfile}<img src="/img/UL.png" style={props.iteminfo.ulfile.includes("files of products")? {position:"absolute",width:"4mm",height:"3mm",bottom:"1mm"}:{display:"none"}}></img></td>
          </tr>
        </table>  
    </div>
  )
});
