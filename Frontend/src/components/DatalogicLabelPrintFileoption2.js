import React, { useEffect, useState } from "react";
import { convertCreatedAt } from "./convertCreatedAt";
import Barcode from 'react-barcode';

export const DatalogicLabelPrintFileoption2 = React.forwardRef((props, ref) =>{
  const canvasEl = React.useRef(null);
  const shadowRootHostEl = React.useRef(null);

  React.useEffect(() => {
    const ctx = canvasEl.current?.getContext("2d");

    if (ctx) {
      ctx.beginPath();
      ctx.arc(95, 50, 40, 0, 2 * Math.PI);
      ctx.stroke();
      ctx.fillStyle = "rgb(200, 0, 0)";
      ctx.fillRect(85, 40, 20, 20);
      ctx.save();
    }
  }, []);

  React.useEffect(() => {
    const shadowRoot = shadowRootHostEl.current?.attachShadow({ mode: "open" });
    if (shadowRoot) {
      const div = document.createElement("div");
      div.innerHTML = "Shadow DOM Content";
      shadowRoot.appendChild(div);
    }
  }, []);
  return (
    <div className="datalogiclabeloption2-container" ref={ref}>
        <table className="datalogiclabeltableoption2">
          <tr>
            <td className="datalogiclabeltableoption2-td-above">
              <a className="datalogiclabeltableoption2-circle">15</a>
              <label className="datalogiclabeltableoption2-label">UL file of material</label>
            </td>
            <td className="datalogiclabeltableoption2-td-above">
              <a className="datalogiclabeltableoption2-circle">14</a>
              <label className="datalogiclabeltableoption2-label">CAV NO.</label>
            </td>
            <td className="datalogiclabeltableoption2-td-above">
              <a className="datalogiclabeltableoption2-circle">13</a>
              <label className="datalogiclabeltableoption2-label">PO#</label>
            </td>
            <td className="datalogiclabeltableoption2-td-above">
              <a className="datalogiclabeltableoption2-circle">12</a>
              <label className="datalogiclabeltableoption2-label" style={{fontSize:"2.2mm"}}>COUNTRY OF ORIGIN</label>
            </td>
            <td className="datalogiclabeltableoption2-td-above">
              <a className="datalogiclabeltableoption2-circle">11</a>
              <label className="datalogiclabeltableoption2-label">MATERIAL COLOR</label>
            </td>
            <td className="datalogiclabeltableoption2-td-above">
              <a className="datalogiclabeltableoption2-circle">10</a>
              <label className="datalogiclabeltableoption2-label">MATERIAL TYPE</label>
            </td>
            <td className="datalogiclabeltableoption2-td-above">
              <a className="datalogiclabeltableoption2-circle">9</a>
              <label className="datalogiclabeltableoption2-label" style={{fontSize:"1.8mm"}}>MATERIAL MANUFACTURER</label>
            </td>
            <td className="datalogiclabeltableoption2-td-above">
              <a className="datalogiclabeltableoption2-circle">8</a>
              <label className="datalogiclabeltableoption2-label">EXPIRED DATE</label>
            </td>
            <td className="datalogiclabeltableoption2-td-above">
              <a className="datalogiclabeltableoption2-circle">7</a>
              <label className="datalogiclabeltableoption2-label" style={{fontSize:"2mm"}}>MANUFACTURING DATE</label>
            </td>
            <td className="datalogiclabeltableoption2-td-above">
              <a className="datalogiclabeltableoption2-circle">6</a>
              <label className="datalogiclabeltableoption2-label">QUANTITY</label>
            </td>
            <td className="datalogiclabeltableoption2-td-above">
              <a className="datalogiclabeltableoption2-circle">5</a>
              <label className="datalogiclabeltableoption2-label">COLOR</label>
            </td>
            <td className="datalogiclabeltableoption2-td-above">
              <a className="datalogiclabeltableoption2-circle">4</a>
              <label className="datalogiclabeltableoption2-label">REV</label>
            </td>
            <td className="datalogiclabeltableoption2-td-above">
              <a className="datalogiclabeltableoption2-circle">3</a>
              <label className="datalogiclabeltableoption2-label">PART NUMBER</label>
            </td>
            <td className="datalogiclabeltableoption2-td-above">
              <a className="datalogiclabeltableoption2-circle">2</a>
              <label className="datalogiclabeltableoption2-label">PART NAME</label>
            </td>
            <td className="datalogiclabeltableoption2-td-above">
              <a className="datalogiclabeltableoption2-circle">1</a>
              <label className="datalogiclabeltableoption2-label">CUSTOMER</label>
            </td>
            <th rowSpan={2} className="datalogiclabeltableoption2-th"><span style={{margin:"auto",marginTop:"-10mm"}}>CCL DESIGN VINA Co., Ltd</span><img src="/img/logoccl.png" style={{width:"9mm",height:"3mm",position:"absolute",bottom:"12mm",left:"-2mm",transform:"rotate(90deg)"}}></img> </th>
          </tr>
          <tr>
            <td className="datalogiclabeltableoption2-td-below" style={props.iteminfo.ulfile.length>70 ? {fontSize:"1.4mm"} : (props.iteminfo.ulfile.length>55 ? {fontSize:"1.7mm"} : (props.iteminfo.ulfile.length>40 ? {fontSize:"2mnm"} :{fontSize:"2.3mm"}))}>{props.iteminfo.ulfile}</td>
            <td className="datalogiclabeltableoption2-td-below">{props.cavno}</td>
            <td className="datalogiclabeltableoption2-td-below">{props.po}</td>
            <td className="datalogiclabeltableoption2-td-below">{props.iteminfo.countryorigon.toLowerCase().includes("vietnam") ? "VIET NAM" : "CHINA"}</td>
            <td className="datalogiclabeltableoption2-td-below">{props.iteminfo.materialcolor}</td>
            <td className="datalogiclabeltableoption2-td-below" style={props.iteminfo.materialtype.length>50 ? {fontSize:"1.7mm"} : (props.iteminfo.materialtype.length>35 ? {fontSize:"2mm"} :{fontSize:"2.3mm"})}>{props.iteminfo.materialtype}</td>
            <td className="datalogiclabeltableoption2-td-below">{props.iteminfo.materialmanufactuer}</td>
            <td className="datalogiclabeltableoption2-td-below">{convertCreatedAt(Date.now()).split("/")[0] + "/" + convertCreatedAt(Date.now()).split("/")[1] + "/" + (Number(convertCreatedAt(Date.now()).split("/")[2])+1)}</td>
            <td className="datalogiclabeltableoption2-td-below">{convertCreatedAt(Date.now())}</td>
            <td className="datalogiclabeltableoption2-td-below" style={{transform:"rotate(90deg)",writingMode:"horizontal-tb"}}><Barcode value={props.quantity} height={12} margin={0.1} fontSize={8} width={0.6} textMargin={0}/></td>
            <td className="datalogiclabeltableoption2-td-below" style={props.iteminfo.color.length>42 ? {fontSize:"1.7mm",fontWeight:"600"} : (props.iteminfo.color.length>32 ? {fontSize:"2mm",fontWeight:"600"} :{fontSize:"2.3mm",fontWeight:"600"})}>{props.iteminfo.color}</td>
            <td className="datalogiclabeltableoption2-td-below">{props.iteminfo.rev}</td>
            <td className="datalogiclabeltableoption2-td-below" style={{transform:"rotate(90deg)",writingMode:"horizontal-tb"}}><Barcode value={props.iteminfo.partnumber} height={12} margin={0.1} fontSize={8} width={0.5} textMargin={0} marginRight={0}/></td>
            <td className="datalogiclabeltableoption2-td-below" style={props.iteminfo.partname.length>35 ? {fontSize:"1.7mm"} : (props.iteminfo.partname.length>25 ? {fontSize:"2mm"} :{fontSize:"2.2mm"})}>{props.iteminfo.partname}</td>
            <td className="datalogiclabeltableoption2-td-below" style={{textTransform:"capitalize"}}>{props.iteminfo.customer.toLowerCase()}</td>
          </tr>
        </table>  
        
    </div>
  )
});
