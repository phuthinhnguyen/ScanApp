import React from 'react'
import { CSVLink } from 'react-csv'
// import Button from 'react-bootstrap/Button';

export const ExportReactCSV = ({csvData, fileName}) => {
    return (
     
            <CSVLink data={csvData} filename={fileName} className='csvbutton'>Export.xlsx</CSVLink>
    
    )
}
export const ExportReactCSVDatalogicBoxLabel = ({csvData, fileName}) => {
    return (
     
            <CSVLink data={csvData} filename={fileName} className='csvbutton' style={{textAlign:"center"}}>Download File <i class="fa fa-download" aria-hidden="true"></i></CSVLink>
    
    )
}