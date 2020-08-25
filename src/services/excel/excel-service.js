//import { Injectable } from '@angular/core';
//import * as FileSaver from 'file-saver';
//import * as XLSX from 'xlsx';
//import { Angular5Csv } from 'angular5-csv/Angular5-csv';

//const EXCEL_TYPE = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
//const EXCEL_EXTENSION = '.xlsx';

import { Workbook } from 'exceljs';
import * as fs from 'file-saver';

//import { DatePipe } from '../../../node_modules/@angular/common';

const ExcelService = {}

ExcelService.generarExcel = function(inData,inCabecera,inCabeceraWidth,inTitle,inNameArchivo) {
        //Excel Title, Header, Data
        const title = inTitle; //'Reporte Tareas Runner';
        const header = inCabecera; 
        const headerWidth = inCabeceraWidth;
        const data = inData;
        //Create workbook and worksheet
        let workbook = new Workbook();
        let worksheet = workbook.addWorksheet('Reporte');
        //Add Row and formatting
        let titleRow = worksheet.addRow([title]);
        titleRow.font = { name: 'Comic Sans MS', family: 4, size: 12, underline: 'none', bold: false }
        //worksheet.addRow([]);
        //let subTitleRow = worksheet.addRow(['Date : ' + '2019-06-27'])
        //Add Image
        /*
        let logo = workbook.addImage({
          base64: logoFile.logoBase64,
          extension: 'png',
        });
        worksheet.addImage(logo, 'E1:F3');
        */
        //worksheet.mergeCells('A1:D2');
        worksheet.mergeCells('A1:B1');
        //Blank Row 
        worksheet.addRow([]);
        //Add Header Row
        let headerRow = worksheet.addRow(header);
        
        // Cell Style : Fill and Border
        ///*
        headerRow.eachCell((cell, number) => {
            cell.fill = {
                type: 'pattern',
                pattern: 'solid',
                fgColor: { argb: 'FF757575' },
                bgColor: { argb: 'FF757575' }
            }
            cell.border = { top: { style: 'thin' }, 
                            left: { style: 'thin' }, 
                            bottom: { style: 'thin' }, 
                            right: { style: 'thin' } }
            /*if(cell.value.toString().includes('Fecha')){
                worksheet.getColumn(number).width = 17;
            }*/
        })

        //*/
        //worksheet.addRows(data);
        // Add Data and Conditional Formatting
        ///*
        data.forEach(d => {
                let row = worksheet.addRow(d);
                let cntcell = row.cellCount;
                let color = 'FFFFFFFF';
                for (var i=1;i<=cntcell;i++){
                    let celda = row.getCell(i);
                    let vcelda = row.getCell(i).value;
                    /*if(vcelda =='NO APLICA'){
                        color = 'FFFFFFFF';
                    }
                    if(vcelda =='PENDIENTE'){
                        color = 'FFFF4765';
                    }
                    if(vcelda =='EN PROCESO'){
                        color = 'FF72EEF9';
                    }
                    if(vcelda =='TERMINADO'){
                        color = 'FFAAFCC7';
                    }*/
                    if(vcelda ==''){
                        color = 'FFFFFFFF';
                    }
                    celda.fill = {
                        type: 'pattern',
                        pattern: 'solid',
                        fgColor: { argb: color }
                    }
                    celda.border = { top: { style: 'thin' }, 
                                    left: { style: 'thin' }, 
                                    bottom: { style: 'thin' }, 
                                    right: { style: 'thin' } }

                    color = 'FFFFFFFF';
                }
            }
        );
        //*/
        for(var i=0;i<headerWidth.length;i+=1){
            worksheet.getColumn(i+1).width = headerWidth[i]/9;
        }
        /*
        worksheet.getColumn(1).width = 17;
        worksheet.getColumn(2).width = 8;
        worksheet.getColumn(3).width = 29;
        worksheet.getColumn(4).width = 7;
        worksheet.getColumn(5).width = 8;
        worksheet.getColumn(6).width = 22;
        worksheet.getColumn(7).width = 31;
        worksheet.getColumn(8).width = 22;
        worksheet.getColumn(9).width = 19;
        worksheet.getColumn(10).width = 24;
        */
        worksheet.addRow([]);
        //Footer Row
        ///*
        let footerRow = worksheet.addRow(['Esta es una hoja de Excel generada por Centrix Holding Peru SAC.']);
        footerRow.getCell(1).fill = {
          type: 'pattern',
          pattern: 'solid',
          fgColor: { argb: 'FFFFFFFF' }
        };
        footerRow.getCell(1).border = { top: { style: 'thin' }, left: { style: 'thin' }, bottom: { style: 'thin' }, right: { style: 'thin' } }
        //*/
        //Merge Cells
        //worksheet.mergeCells(`A${footerRow.number}:F${footerRow.number}`);
        //Generate Excel File with given name
        workbook.xlsx.writeBuffer().then((data) => {
          let blob = new Blob([data], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
          fs.saveAs(blob, inNameArchivo);//'Reporte_Runner.xlsx');
        })
      }



    
export default ExcelService