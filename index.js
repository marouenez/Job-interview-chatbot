
var loadingMsgIndex,
    botui = new BotUI('api-bot');
var response;
var action;
var userResp='pstart';
var profValues = [];

botui.message.bot({
  delay:1000,
  content: 'Hello, Im ZAC, together we will lead the best interview experience.'
});

    $.ajax({
        url: 'https://api.dialogflow.com/v1/query?v=20150910&query=pstart&lang=en&sessionId=1',
        beforeSend: function(xhr) {
             xhr.setRequestHeader("Authorization", "Bearer 60d363afe030470bbe60ed2edaef60da")
        }, success: function(data){

          response =  data.result.fulfillment.messages[0].speech;
          console.log(response);

            //process the JSON data etc
        }
    });
setTimeout(function() {
  //your code to be executed after 1

    botui.message.bot({
      delay:1500,
      content: response
    });


}, 1500);



function profilingTest() {

    return botui.action.text({
      delay: 1000,
      action: {
        placeholder: 'Say something...'
      }
  }).then(function (res) {

    if (!isNaN(res.value)){
    if (res.value>=1 && res.value<=5){
      $.ajax({
          url: 'https://api.dialogflow.com/v1/query?v=20150910&query='+res.value+'&lang=en&sessionId=1',
          beforeSend: function(xhr) {
               xhr.setRequestHeader("Authorization", "Bearer 60d363afe030470bbe60ed2edaef60da")
          }, success: function(data){

            response =  data.result.fulfillment.messages[0].speech;
            profValues.push(res.value);
            //alert(profValues);
          }
      });
    }
    else {
      response = "Please enter a number between 1 and 5.\n\n\n"+response;
    }
  }

    else {
      $.ajax({
          url: 'https://api.dialogflow.com/v1/query?v=20150910&query='+res.value+'&lang=en&sessionId=1',
          beforeSend: function(xhr) {
               xhr.setRequestHeader("Authorization", "Bearer 60d363afe030470bbe60ed2edaef60da")
          }, success: function(data){

            response =  data.result.fulfillment.messages[0].speech;
            action = data.result.action;
          }
      });
    }


    setTimeout(function() {


      loadingMsgIndex = botui.message.bot({
      delay: 200,
      loading: true
      }).then(function (index) {
        loadingMsgIndex = index;
        botui.message
              .update(loadingMsgIndex,{
                delay:1500,
                content: response

              }).then(profilingTest);
        });



      }, 2300);


  });
}


profilingTest();
