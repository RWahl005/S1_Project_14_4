"use strict";

/*
   New Perspectives on HTML5, CSS3, and JavaScript 6th Edition
   Tutorial 12
   Case Problem 4

   Author: Ryan Wahl
   Date:   4.3.19
   
   Filename: gi_sort.js
   
   Global Variables:
   tableData
      An 2-dimensional array of the data found in the body of the web table
      
   dataCategories
      An array of the column titles found the head of the web table
      
   sortIndex
      The index number of the column by which the web table should be
      sorted where 0 = 1st column, 1 = 2nd column, etc.
      
   sortDirection
      A value indicating direction of the sorting where a value of 1 sorts 
      the data in ascending order and a value of -1 sorts the data in descending order
	
   
   
   Functions List:   
   defineDataArray()
      Extracts values from the body of the web table and stores them in the
      tableData array
      
   writeTableData()
      Writes the sorted data into the table rows and cells       
      
   defineColumns()
      Extracts values form the column heads of the web table and stores 
      them in the dataCategories array; also sets up the onclick event
      handlers for the column heads so that the table can be sorted by
      clicking a table heading cell.
           
   columnSort(e)
      Event handler function that sorts the table data when a column
      heading is clicked  
   
   dataSort2D(a, b)
      Compare function used to sort numeric and alphabetical data from
      a 2-dimensional array 
    

*/

var tableData = [];
var dataCategories = [];
var sortIndex = 0;
var sortDirection = 1;

window.addEventListener("load", function () {
      defineDataArray();
      writeTableData();
      defineColumns();
});

function defineDataArray() {
      var tableRows = document.querySelectorAll("table.sortable tbody tr");

      for (var i = 0; i < tableRows.length; i++) {
            var rowCells = tableRows[i].children;
            var rowValues = new Array(rowCells.length);
            for (var o = 0; o < rowCells.length; o++) {
                  rowValues[o] = rowCells[o].textContent;
            }
            tableData.push(rowValues);
      }
      tableData.sort(dataSort2D);
}

function writeTableData() {
      var finalTbody = document.createElement("tbody");
      for (var i = 0; i < tableData.length; i++) {
            var current = tableData[i];
            var tableRow = document.createElement("tr");
            for (var j = 0; j < current.length; j++) {
                  var dataCell = document.createElement("td");
                  dataCell.textContent = current[j];
                  tableRow.appendChild(dataCell);
            }
            finalTbody.appendChild(tableRow);
      }
      var table = document.querySelectorAll("table.sortable")[0];
      table.replaceChild(finalTbody, table.getElementsByTagName("tbody")[0]);
}

function defineColumns() {

}







function dataSort2D(a, b) {
      if (isNaN(parseFloat(a[sortIndex])) === false) {
            return (a[sortIndex] - b[sortIndex]) * sortDirection;
      } else {
            var astring = a[sortIndex].toLowerCase();
            var bstring = b[sortIndex].toLowerCase();

            if (bstring > astring) return -sortDirection;
            if (bstring < astring) return sortDirection;
            return 0;
      }
}