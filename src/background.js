// Initialize Firebase
var config = {
  apiKey: API_KEY,
  authDomain: "monitor-bebc5.firebaseapp.com",
  databaseURL: "https://monitor-bebc5.firebaseio.com",
  projectId: "monitor-bebc5",
  storageBucket: "monitor-bebc5.appspot.com",
  messagingSenderId: "519568914447"
};

firebase.initializeApp(config);
db = firebase.database().ref('activity');

function logSessionEvent(session) {
  var newEntry = activityRef.push();
  newEntry.set({
    url: session.url,
    startTime: session.startTime,
    endTime: session.endTime
  });
}

function formatTime(t) {
  var time = new Date(t);
  return time.getHours() + ":" + time.getMinutes() + ":" + time.getSeconds();
}

function onSessionStart(session) {
  console.log("OPEN", formatTime(session.startTime), session.url);
}

function onSessionEnd(session) {
  console.log("CLOSE", formatTime(session.endTime), session.url);
  logSessionEvent(session);
}

var stopTracking = startTrackingActivity(onSessionStart, onSessionEnd);
