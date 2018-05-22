//ー箇所の行を検索
function findRow(sheet,val,col){ 
  var data = sheet.getDataRange().getValues(); //受け取ったシートのデータを二次元配列に取得
  
  for(var i=0; i<data.length; i++){
    if(data[i][col-1] === val){
      return i+1;
    }
  }
  return 0;
}

//メンバーの名前一覧を作成
function makeMembers(sheet){
  var members = ""
  var data = sheet.getDataRange().getValues();
  for(var i=0; i<data.length; i++){
    if(typeof data[i][1] === "undefined"){
      members = "none";
    } else {
      members = "<@" + data[i][1] + "> " + members;
    }
  }
  return members;
}

//POSTリクエストを受け取り
function doPost(e) {
  var jsonString = e.parameter.payload;
  var data = JSON.parse(jsonString);
  var user = data.user.name;
  var response_url = data.response_url;
  var ts = data.original_message.ts;
  var channel_id = data.channel.id;
  var id = ''; //スプレッドシートのID
  var sheet_name ''; //スプレッドシート名
  var sheet = SpreadsheetApp.openById(id).getSheetByName(sheet_name);

  var row = findRow(sheet, user, 2);
  if(row === 0){
    sheet.appendRow([new Date(), user]);
  } else {
    sheet.deleteRow(row);
  }
  
  var members = makeMembers(sheet);

  var response_payload =
      {
        "text": "Room members : " + members,
        "attachments": [
          {
            "fallback": "fallback string",
            "title": "",
            "callback_id": "callback_id value",
            "color": "#00F2FF",
            "attachment_type": "default",
            "actions": [
              {
                "name": "OnOff",
                 "text": "ON or OFF",
                 "type": "button",
                 "style":"default",
                 "value": "OnOff"
              },
            ]
          }
        ]
      };

  var output = ContentService.createTextOutput(JSON.stringify(response_payload)).setMimeType(ContentService.MimeType.JSON);
  return output;
}
