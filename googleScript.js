function doGet(e) {
    sendEmail();
    Logger.log( JSON.stringify(e) );  // view parameters
      var result = 'Ok'; // assume success
      
      if (e.parameter == 'undefined') {
        result = 'No Parameters';
      }
      else {
        var sheet_id = ''; 		// Spreadsheet ID
        var sheet = SpreadsheetApp.openById(sheet_id).getActiveSheet();		// get Active sheet
        var newRow = sheet.getLastRow() + 1;						
        var rowData = [];
        var timeZone = Session.getScriptTimeZone();
        d=new Date();
        rowData[0] = d; // Timestamp in column A
        rowData[1] = d.toLocaleTimeString(); // Timestamp in column B
        rowData[2] = timeZone;
        for (var param in e.parameter) {
          Logger.log('In for loop, param=' + param);
          var value = stripQuotes(e.parameter[param]);
          Logger.log(param + ':' + e.parameter[param]);
          switch (param) {
            case 'value': //Parameter 1, It has to be updated in Column in Sheets in the code, orderwise
              rowData[3] = value; //Value in column A
              result = 'Written on column A';
              break;
            default:
              result = "unsupported parameter";
          }
        }
        Logger.log(JSON.stringify(rowData));
        // Write new row below
        var newRange = sheet.getRange(newRow, 1, 1, rowData.length);
        newRange.setValues([rowData]);
      }
      // Return result of operation
      return ContentService.createTextOutput(result);

      
  }

  function sendEmail(){
    var email = Session.getActiveUser().getEmail();
    d=new Date();
    var time = "Da thay vat vao luc" + d.toLocaleTimeString();
    var subject = 'Sending emails from a Spreadsheet';
    MailApp.sendEmail('banhbeovodung01@gmail.com', subject, time);
  }

  function stripQuotes( value ) {
    return value.replace(/^["']|['"]$/g, "");
  }