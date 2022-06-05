function sendSpamInfo(){
  //Fetch own email address from spreadsheet
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var sheet = ss.getActiveSheet();
  var emailAddress = sheet.getRange(2, 1).getValue();
  
  var query = "in:spam newer_than:16d"  //Emails from last 16 days.
  var lastWeeksSpam = GmailApp.search(query);
  var nrOfSpam = lastWeeksSpam.length;

  // Create the email message
  var emailMessage = "<H1>Spam from last 16 days</H1><br>";
  emailMessage += "There are " + nrOfSpam + " new emails marked as spam.<br><br>";

  // Loop through each spam in list
  for(var i=0; i<nrOfSpam; i++){
    var spamThread = lastWeeksSpam[i];
    var spamMessage = spamThread.getMessages()[0];
    emailMessage += i+1;
    emailMessage += ". Subject: <a href=https://mail.google.com/mail/u/0/?ui=2&shva=1#spam/";
    emailMessage += spamThread.getId();  //Permalink did not work, so I created this workaround
    emailMessage += ">";
    emailMessage += spamThread.getFirstMessageSubject();
    emailMessage += "</a><br>";
    emailMessage += "Date: ";
    emailMessage += spamMessage.getDate();
    emailMessage += ".<br> From: ";
    emailMessage += spamMessage.getFrom();
    emailMessage += "<br><br>"; 
  }  

  GmailApp.sendEmail(emailAddress, "Spam Summary", "", {
    htmlBody: emailMessage
    });
}