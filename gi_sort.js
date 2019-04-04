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

// A 2d array containing the table data
var tableData = [];
// An array containg the heading titles.
var dataCategories = [];
// The index of the column being sorted.
var sortIndex = 0;
// If the sort direction is up or down.
var sortDirection = 1;

// Call the following function on load.
window.addEventListener("load", function () {
      defineDataArray();
      writeTableData();
      defineColumns();
});

/**
 * Defines the data in the tableData variable.
 */
function defineDataArray() {
      // Gets all of the table rows.
      var tableRows = document.querySelectorAll("table.sortable tbody tr");

      // Loops through the table rows.
      for (var i = 0; i < tableRows.length; i++) {
            // Get the cells in the rows.
            var rowCells = tableRows[i].children;
            // Creates rowValues based the length of the cell list.
            var rowValues = new Array(rowCells.length);
            // Loop through the cells.
            for (var o = 0; o < rowCells.length; o++) {
                  // Add the cell content to the rowValues array.
                  rowValues[o] = rowCells[o].textContent;
            }
            //Add the row value array to the tableData array.
            tableData.push(rowValues);
      }
      // Sort the tableData array using the function dataSort2D.
      tableData.sort(dataSort2D);
}

/**
 * Writes the table to the page.
 */
function writeTableData() {
      // Creates a tbody element.
      var finalTbody = document.createElement("tbody");
      // Loop through the table data
      for (var i = 0; i < tableData.length; i++) {
            // Get the current row.
            var current = tableData[i];
            // Make a new row
            var tableRow = document.createElement("tr");
            // loop through the rows
            for (var j = 0; j < current.length; j++) {
                  // Create a table data element
                  var dataCell = document.createElement("td");
                  // Set the text content to the current row text content.
                  dataCell.textContent = current[j];
                  // Append the dataCell to the tableRow.
                  tableRow.appendChild(dataCell);
            }
            // Append the tableRow to the final table body.
            finalTbody.appendChild(tableRow);
      }
      // Get the table.
      var table = document.querySelectorAll("table.sortable")[0];
      // Replace the old tbody with the new one.
      table.replaceChild(finalTbody, table.getElementsByTagName("tbody")[0]);
}

/**
 * Defines the column headings.
 */
function defineColumns() {
      // Create a style element
      var styleSheet = document.createElement("style");
      // Add that element to the head.
      document.head.appendChild(styleSheet);

      // Insert the following rule into the stylesheet:
      styleSheet.sheet.insertRule(
            "table.sortable thead tr th { \
                  cursor: pointer;\
            }", 0);

      // Insert the following rule into the stylesheet:
      styleSheet.sheet.insertRule(
            "table.sortable thead tr th::after { \
                  content: '\\00a0';\
                  font-family: monospace;\
                  margin-left: 5px;\
            }", 1);

      // Insert the following rule into the stylesheet:
      styleSheet.sheet.insertRule(
            "table.sortable thead tr th:nth-of-type(1)::after {\
                  content: '\\25b2';\
            }", 2);

      // Get all of the table headers
      var thHeadings = document.querySelectorAll("table.sortable thead th");
      // Loop through the headers
      for (var i = 0; i < thHeadings.length; i++) {
            // Add the heading text content to the dataCategories array.
            dataCategories.push(thHeadings[i].textContent);
            // Add the onclick handler to the header that calls the columnSort function.
            thHeadings[i].onclick = columnSort;
      }
}

/**
 * Sorts the columns when it is clicked.
 * @param {Event} e - Auto populated by the browser.
 */
function columnSort(e) {
      // Gets the text content from the targeted element.
      var columnText = e.target.textContent;
      // Gets the index of the column from the dataCategories array.
      var columnIndex = dataCategories.indexOf(columnText);

      // If the columnIndex is the same as the sortIndex, change the sortDirection.
      if (columnIndex === sortIndex) {
            sortDirection *= -1;
      } else {
            //else, set the sortIndex equal to the value of the column index
            sortIndex = columnIndex;
      }

      // Get the column number.
      var columnNumber = columnIndex + 1;

      // Get the style sheet for the columns.
      var columnStyles = document.styleSheets[document.styleSheets.length - 1];

      // Delete the third style rule.
      columnStyles.deleteRule(2);

      // If the sortDirection is up then add the up arrow ^
      if (sortDirection === 1) {
            columnStyles.insertRule(
                  "table.sortable thead tr th:nth-of-type(" + columnNumber + ")::after { \
                        content: '\\25b2';\
                  }", 2);
      } else {
            // Else add the down arrow v
            columnStyles.insertRule(
                  "table.sortable thead tr th:nth-of-type(" + columnNumber + ")::after { \
                        content: '\\25bc';\
                  }", 2);
      }
      // Sort the table data using the dataSort2D function.
      tableData.sort(dataSort2D);
      // Write the table data.
      writeTableData();
}






/**
 * A function that came with the file.
 * @param {*} a 
 * @param {*} b 
 */
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