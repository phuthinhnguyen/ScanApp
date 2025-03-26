import React, { useEffect, useState } from "react";
import { convertCreatedAt } from "./convertCreatedAt";
import Barcode from 'react-barcode';

export const DatalogicLabelPrintFile = React.forwardRef((props, ref) =>{
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
    <div className="datalogiclabel-container" ref={ref}>
        <table className="datalogiclabeltable">
          <tr>
            <th colspan="3" className="datalogiclabeltable-th"><span style={{marginLeft:"-60px"}}>CCL DESIGN VINA Co., Ltd</span><img src="/img/logoccl.png" style={{width:"85px",height:"28px",position:"absolute",top:"0",marginLeft:"8px"}}></img> </th>
          </tr>
          <tr>
            <td className="datalogiclabeltable-td-left">
              <a className="datalogiclabeltable-circle">1</a>
              <label className="datalogiclabeltable-label">CUSTOMER</label>
            </td>
            <td className="datalogiclabeltable-td-right" style={{textTransform:"capitalize"}}>{props.iteminfo.customer.toLowerCase()}</td>
          </tr>
          <tr>
          <td className="datalogiclabeltable-td-left">
              <a className="datalogiclabeltable-circle">2</a>
              <label className="datalogiclabeltable-label">PART NAME</label>
            </td>
            <td className="datalogiclabeltable-td-right" style={props.iteminfo.partname.length>35 ? {fontSize:"14px"} : (props.iteminfo.partname.length>25 ? {fontSize:"16px"} :{fontSize:"18px"})}>{props.iteminfo.partname}</td>
          </tr>
          <tr>
          <td className="datalogiclabeltable-td-left">
              <a className="datalogiclabeltable-circle">3</a>
              <label className="datalogiclabeltable-label">PART NUMBER</label>
            </td>
            <td className="datalogiclabeltable-td-right"><Barcode value={props.iteminfo.partnumber} height={35} margin={1} fontSize={20}/></td>
          </tr>
          <tr>
          <td className="datalogiclabeltable-td-left">
              <a className="datalogiclabeltable-circle">4</a>
              <label className="datalogiclabeltable-label">REV</label>
            </td>
            <td className="datalogiclabeltable-td-right">{props.iteminfo.rev}</td>
          </tr>
          <tr>
          <td className="datalogiclabeltable-td-left">
              <a className="datalogiclabeltable-circle">5</a>
              <label className="datalogiclabeltable-label">COLOR</label>
            </td>
            <td className="datalogiclabeltable-td-right" style={props.iteminfo.color.length>20 ? {fontSize:"13px",fontWeight:"700"} : {fontSize:"18px",fontWeight:"700"}}>{props.iteminfo.color}</td>
          </tr>
          <tr>
          <td className="datalogiclabeltable-td-left">
              <a className="datalogiclabeltable-circle">6</a>
              <label className="datalogiclabeltable-label">QUANTITY</label>
            </td>
            <td className="datalogiclabeltable-td-right"><Barcode value={props.quantity} height={28} margin={1} fontSize={20}/></td>
          </tr>
          <tr>
          <td className="datalogiclabeltable-td-left">
              <a className="datalogiclabeltable-circle">7</a>
              <label className="datalogiclabeltable-label" style={{fontSize:"17px"}}>MANUFACTURING DATE</label>
            </td>
            <td className="datalogiclabeltable-td-right">{convertCreatedAt(Date.now())}</td>
          </tr>
          <tr>
          <td className="datalogiclabeltable-td-left">
              <a className="datalogiclabeltable-circle">8</a>
              <label className="datalogiclabeltable-label">EXPIRED DATE</label>
            </td>
            <td className="datalogiclabeltable-td-right">{convertCreatedAt(Date.now()).split("/")[0] + "/" + convertCreatedAt(Date.now()).split("/")[1] + "/" + (Number(convertCreatedAt(Date.now()).split("/")[2])+1)}</td>
          </tr>
          <tr>
            <td className="datalogiclabeltable-td-left">
              <a className="datalogiclabeltable-circle">9</a>
              <label className="datalogiclabeltable-label" style={{fontSize:"15px"}}>MATERIAL MANUFACTURER</label>
            </td>
            <td className="datalogiclabeltable-td-right">{props.iteminfo.materialmanufactuer}</td>
          </tr>
          <tr>
            <td className="datalogiclabeltable-td-left">
              <a className="datalogiclabeltable-circle">10</a>
              <label className="datalogiclabeltable-label">MATERIAL TYPE</label>
            </td>
            <td className="datalogiclabeltable-td-right" style={props.iteminfo.materialtype.length>35 ? {fontSize:"14px"} : (props.iteminfo.materialtype.length>25 ? {fontSize:"16px"} :{fontSize:"18px"})}>{props.iteminfo.materialtype}</td>
          </tr>
          <tr>
            <td className="datalogiclabeltable-td-left">
              <a className="datalogiclabeltable-circle">11</a>
              <label className="datalogiclabeltable-label">MATERIAL COLOR</label>
            </td>
            <td className="datalogiclabeltable-td-right">{props.iteminfo.materialcolor}</td>
          </tr>
          <tr>
            <td className="datalogiclabeltable-td-left">
              <a className="datalogiclabeltable-circle">12</a>
              <label className="datalogiclabeltable-label">COUNTRY OF ORIGIN</label>
            </td>
            <td className="datalogiclabeltable-td-right">{props.iteminfo.countryorigon.toLowerCase().includes("vietnam") ? "VIET NAM" : "CHINA"}</td>
          </tr>
          <tr>
            <td className="datalogiclabeltable-td-left">
              <a className="datalogiclabeltable-circle">13</a>
              <label className="datalogiclabeltable-label">PO#</label>
            </td>
            <td className="datalogiclabeltable-td-right">{props.po}</td>
          </tr>
          <tr>
            <td className="datalogiclabeltable-td-left">
              <a className="datalogiclabeltable-circle">14</a>
              <label className="datalogiclabeltable-label">CAV NO.</label>
            </td>
            <td className="datalogiclabeltable-td-right">{props.cavno}</td>
          </tr>
          <tr>
            <td className="datalogiclabeltable-td-left">
              <a className="datalogiclabeltable-circle">15</a>
              <label className="datalogiclabeltable-label">UL file of material</label>
            </td>
            <td className="datalogiclabeltable-td-right" style={props.iteminfo.ulfile.length>70 ? {fontSize:"13px"} : (props.iteminfo.ulfile.length>35 ? {fontSize:"15px"} : (props.iteminfo.ulfile.length>25 ? {fontSize:"16px"} :{fontSize:"18px"}))}>{props.iteminfo.ulfile}</td>
          </tr>
        </table>  
    </div>
  )
});
