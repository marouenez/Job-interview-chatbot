var loadingMsgIndex,
  botui = new BotUI('api-bot');
var response;
var action;
var userResp = 'pstart';
var profValues = [];
var x;
var intent;
var profResult = [];
var resultString = "";
var yearsExperience;
var languages;
var relocateAnswer;
var distTravel;
var workHours;
var motivation;
var strength;
var weakness;



fStart();
firstTest();


//profilingTest();



function sendResp() {
  setTimeout(function() {

    loadingMsgIndex = botui.message.bot({
      delay: 500,
      loading: true
    }).then(function(index) {
      loadingMsgIndex = index;
      botui.message
        .update(loadingMsgIndex, {
          delay: 1500,
          content: response

        });
    });

  }, 1500);
  return;
}

function pStart() {

  $.ajax({
    url: 'https://api.dialogflow.com/v1/query?v=20150910&query=pstart&lang=en&sessionId=1',
    beforeSend: function(xhr) {
      xhr.setRequestHeader("Authorization", "Bearer 60d363afe030470bbe60ed2edaef60da")
    },
    success: function(data) {

      response = data.result.fulfillment.messages[0].speech;
      intent = data.result.metadata.intentName;
      console.log(response);

      //process the JSON data etc
    }
  });
  setTimeout(function() {
    //your code to be executed after 1

    botui.message.bot({
      delay: 1500,
      content: response
    });


  }, 1000);

  return;
}


function profilingTest() {

  return botui.action.text({
    delay: 1500,
    action: {
      placeholder: 'Say something...'
    }
  }).then(function(res) {



    if (!isNaN(res.value)) {

      if (res.value >= 1 && res.value <= 5) {
        $.ajax({
          url: 'https://api.dialogflow.com/v1/query?v=20150910&query=' + res.value + '&lang=en&sessionId=1',
          beforeSend: function(xhr) {
            xhr.setRequestHeader("Authorization", "Bearer 60d363afe030470bbe60ed2edaef60da")
          },
          success: function(data) {

            response = data.result.fulfillment.messages[0].speech;
            x = data.result.fulfillment.messages[0].speech;
            if (intent != data.result.metadata.intentName) {
              intent = data.result.metadata.intentName
              profValues.push(res.value);
              ////alert(profValues);
            } else {
              intent = data.result.metadata.intentName;
            }
            ////alert(profValues);

            ////alert(data.result.metadata.intentName);
          }
        });
      } else {

        response = "Please enter a number between 1 and 5.\n\n\n" + x;
      }
    } else {
      $.ajax({
        url: 'https://api.dialogflow.com/v1/query?v=20150910&query=' + res.value + '&lang=en&sessionId=1',
        beforeSend: function(xhr) {
          xhr.setRequestHeader("Authorization", "Bearer 60d363afe030470bbe60ed2edaef60da")
        },
        success: function(data) {

          // stuff visible in
          response = data.result.fulfillment.messages[0].speech;
          x = response;
          //action = data.result.action;
        }
      });
    }


    setTimeout(function() {

      loadingMsgIndex = botui.message.bot({
        delay: 500,
        loading: true
      }).then(function(index) {
        loadingMsgIndex = index;
        botui.message
          .update(loadingMsgIndex, {
            delay: 1500,
            content: response

          }).then(function() {
            //alert (y);
            if (profValues.length == 32) {
              var ie, sn, ft, jp;
              ie = 30 - profValues[2] - profValues[6] - profValues[10] + profValues[14] - profValues[18] + profValues[22] + profValues[26] - profValues[30];
              sn = 12 + profValues[3] + profValues[7] + profValues[11] + profValues[15] + profValues[19] - profValues[23] - profValues[27] + profValues[31];
              ft = 30 - profValues[1] + profValues[5] + profValues[9] - profValues[13] - profValues[17] + profValues[21] - profValues[25] - profValues[29];
              jp = 18 + profValues[0] + profValues[4] - profValues[8] + profValues[12] - profValues[16] + profValues[20] - profValues[24] + profValues[28];
              if (ie >= 24) {
                profResult.push("extroverted")
              } else {
                profResult.push("introverted");
              }
              if (sn >= 24) {
                profResult.push("intuitive")
              } else {
                profResult.push("sensing");
              }
              if (ft >= 24) {
                profResult.push("thinking")
              } else {
                profResult.push("feeling");
              }
              if (jp >= 24) {
                profResult.push("perceiving")
              } else {
                profResult.push("judging");
              }

              ////alert(profResult);
              resultString = ''.join(profResult);


            } else {
              profilingTest();
            }
          });
      });

    }, 1500);

  });

}


function fStart() {
  botui.message.bot({
    delay: 500,
    content: 'Hello, I am ZAC, together we will lead the best interview experience.\n\nPlease note that honesty in this interview is of a fundamental importance, providing incorrect information will result in disqualification later on in the process.'
  });

  $.ajax({
    url: 'https://api.dialogflow.com/v1/query?v=20150910&query=fstart&lang=en&sessionId=1',
    beforeSend: function(xhr) {
      xhr.setRequestHeader("Authorization", "Bearer 60d363afe030470bbe60ed2edaef60da")
    },
    success: function(data) {

      response = data.result.fulfillment.messages[0].speech;
      intent = data.result.metadata.intentName;
      console.log(response);

      //process the JSON data etc
    }
  });
  setTimeout(function() {
    //your code to be executed after 1

    botui.message.bot({
      delay: 800,
      content: response
    });


  }, 800);


}




function firstTest() {

  return botui.action.text({
    delay: 1500,
    action: {
      placeholder: 'Say something...'
    }
  }).then(function(res) {

    $.ajax({
      url: 'https://api.dialogflow.com/v1/query?v=20150910&query=' + res.value + '&lang=en&sessionId=1',
      beforeSend: function(xhr) {
        xhr.setRequestHeader("Authorization", "Bearer 60d363afe030470bbe60ed2edaef60da")
      },
      success: function(data) {


        console.log(response);
        //x = data.result.fulfillment.messages[0].speech;
        intent = data.result.metadata.intentName;
        var params = data.result.parameters;
        ////alert(intent);

        if (intent == "firstQ-2") {

          if (params.duration == "" && params.number == "") {



            $.ajax({
              url: 'https://api.dialogflow.com/v1/query?v=20150910&event=firstq2&lang=en&sessionId=1',
              beforeSend: function(xhr) {
                xhr.setRequestHeader("Authorization", "Bearer 60d363afe030470bbe60ed2edaef60da")
              },
              success: function(data) {
                intent = data.result.metadata.intentName;
                ////alert(intent);
              }
            });

            response = "Please enter a valid answer\n\n" + x;

          } else {
            ////alert(params.number);
            if (params.number == "") {
              yearsExperience = params.duration.amount;
            } else {
              yearsExperience = params.number;
            }
            ////alert(yearsExperience);

            response = data.result.fulfillment.messages[0].speech;
            x = data.result.fulfillment.messages[0].speech;
          }

        } else if (intent == "firstQ-3") {

          var listLang = params.language;
          ////alert(listLang);
          if (listLang.length == 0) {

            $.ajax({
              url: 'https://api.dialogflow.com/v1/query?v=20150910&event=firstq3&lang=en&sessionId=1',
              beforeSend: function(xhr) {
                xhr.setRequestHeader("Authorization", "Bearer 60d363afe030470bbe60ed2edaef60da")
              },
              success: function(data) {
                intent = data.result.metadata.intentName;
                ////alert(intent);
              }
            });

            response = "Please enter a valid answer\n\n" + x;

          } else {
            ////alert(params.number);
            languages = listLang.toString();

            ////alert(languages);
            response = data.result.fulfillment.messages[0].speech;
            x = data.result.fulfillment.messages[0].speech;
          }

        } else if (intent == "firstQ-4") {

          relocateAnswer = res.value;
          ////alert(relocateAnswer);
          response = data.result.fulfillment.messages[0].speech;
          x = data.result.fulfillment.messages[0].speech;

        } else if (intent == "firstQ-4 - yes - travel") {

          ////alert(params.number);
          if (params.number == "" && params.length == "") {

            $.ajax({
              url: 'https://api.dialogflow.com/v1/query?v=20150910&event=firstq3&lang=en&sessionId=1',
              beforeSend: function(xhr) {
                xhr.setRequestHeader("Authorization", "Bearer 60d363afe030470bbe60ed2edaef60da")
              },
              success: function(data) {
                intent = data.result.metadata.intentName;
                ////alert(intent);
              }
            });

            response = "Please enter a valid answer\n\n" + x;

          } else {
            ////alert(params.number);

            if (params.number == "") {
              distTravel = params.length.amount;
            } else {
              distTravel = params.number;
            }

            //alert(distTravel);
            response = data.result.fulfillment.messages[0].speech;
            x = data.result.fulfillment.messages[0].speech;
          }

        } else if (intent == "firstQ-5") {
          if (params.number == "" && params.duration == "") {

            $.ajax({
              url: 'https://api.dialogflow.com/v1/query?v=20150910&event=firstq3&lang=en&sessionId=1',
              beforeSend: function(xhr) {
                xhr.setRequestHeader("Authorization", "Bearer 60d363afe030470bbe60ed2edaef60da")
              },
              success: function(data) {
                intent = data.result.metadata.intentName;
                ////alert(intent);
              }
            });

            response = "Please enter a valid answer\n\n" + x;

          } else {
            ////alert(params.number);

            if (params.number == "") {
              workHours = params.duration.amount;
            } else {
              workHours = params.number;
            }

            ////alert(workHours);
            response = data.result.fulfillment.messages[0].speech;
            x = data.result.fulfillment.messages[0].speech;
          }
        } else if (intent == "firstQ-6") {
          motivation = res.value;
          response = data.result.fulfillment.messages[0].speech;
          x = data.result.fulfillment.messages[0].speech;

        } else if (intent == "firstQ-7") {
          strength = res.value;
          response = data.result.fulfillment.messages[0].speech;
          x = data.result.fulfillment.messages[0].speech;
        } else if (intent == "firstQ-8") {
          weakness = res.value;
          response = data.result.fulfillment.messages[0].speech;
          x = data.result.fulfillment.messages[0].speech;
        } else {
          response = data.result.fulfillment.messages[0].speech;
          x = data.result.fulfillment.messages[0].speech;
        }

        ////alert(profValues);

        ////alert(data.result.metadata.intentName);
      }
    });

    setTimeout(function() {

      loadingMsgIndex = botui.message.bot({
        delay: 500,
        loading: true
      }).then(function(index) {
        loadingMsgIndex = index;
        botui.message
          .update(loadingMsgIndex, {
            delay: 500,
            content: response

          }).then(function() {


            if (intent == "firstQ-8") {


              pStart();
              profilingTest();

            } else {
              firstTest();
            }
          });
      });

    }, 1500);

  });

}


function fStart() {
  botui.message.bot({
    delay: 500,
    content: 'Hello, I am ZAC, together we will lead the best interview experience.\n\nPlease note that honesty in this interview is of a fundamental importance, providing incorrect information will result in disqualification later on in the process.'
  });

  $.ajax({
    url: 'https://api.dialogflow.com/v1/query?v=20150910&query=fstart&lang=en&sessionId=1',
    beforeSend: function(xhr) {
      xhr.setRequestHeader("Authorization", "Bearer 60d363afe030470bbe60ed2edaef60da")
    },
    success: function(data) {

      response = data.result.fulfillment.messages[0].speech;
      x = data.result.fulfillment.messages[0].speech;
      intent = data.result.metadata.intentName;
      console.log(response);

      //process the JSON data etc
    }
  });
  setTimeout(function() {
    //your code to be executed after 1

    botui.message.bot({
      delay: 800,
      content: response
    });


  }, 800);



}
