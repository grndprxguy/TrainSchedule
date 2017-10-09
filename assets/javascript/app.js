// link firebase

  // Initialize Firebase
  var config = {
    apiKey: "AIzaSyCrLyQIEMxF0oBBEQiXLWJEDPs6-Q-2w7Q",
    authDomain: "train-time-3053a.firebaseapp.com",
    databaseURL: "https://train-time-3053a.firebaseio.com",
    projectId: "train-time-3053a",
    storageBucket: "",
    messagingSenderId: "1021546180181"
  };
  firebase.initializeApp(config);
var database = firebase.database();

$(document).on("click", "button", function() {
  event.preventDefault();

  var trainName = $("#trainName").val().trim();
  var dest = $("#dest").val().trim();
  var trainTime = $("#trainTime").val().trim();
  var freq = $("#freq").val().trim();
  var trainTimeConverted = moment(trainTime, "hh:mm").subtract(1, "years");
  var currentTime = moment();
  var diffTime = moment().diff(moment(trainTimeConverted), "minutes");
  var tRemainder = diffTime % freq;
  var tMinutesTillTrain = freq - tRemainder;
  var nextTrain = moment().add(tMinutesTillTrain, "minutes");
  console.log("nexttrain" + moment(nextTrain));

  var newTrain = {
    trainName: trainName,
    dest: dest,
    nextTrain: moment(nextTrain).format("hh:mm"),
    tMinutesTillTrain: tMinutesTillTrain,
    freq: freq
  }
  database.ref().push(newTrain);
});

database.ref().on("child_added", function(childSnapshot, prevChildKey){
  var trainName = childSnapshot.val().trainName;
  var dest = childSnapshot.val().dest;
  var nextTrain = childSnapshot.val().nextTrain;
  var tMinutesTillTrain = childSnapshot.val().tMinutesTillTrain;
  var freq = childSnapshot.val().freq;
  console.log(trainName)
  $("#train-schedule > tbody").append("<tr><td>" + trainName + "</td><td>" + dest + "</td><td>" + freq + "</td><td>" + nextTrain + "</td><td>" + tMinutesTillTrain + "</td></tr>")
});
