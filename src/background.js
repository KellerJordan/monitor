function formatTime(t) {
  var time = new Date(t);
  return time.getHours() + ":" + time.getMinutes() + ":" + time.getSeconds();
}

var config = {
  apiKey: API_KEY,
  authDomain: "monitor-bebc5.firebaseapp.com",
  databaseURL: "https://monitor-bebc5.firebaseio.com",
  projectId: "monitor-bebc5",
  storageBucket: "",
  messagingSenderId: "519568914447"
};
firebase.initializeApp(config);

var activityRef = firebase.database().ref('activity');

function logSessionEvent(session, type) {
  var newEventRef = activityRef.push();
  newEventRef.set({
    type: type,
    time: type == 'START' ? session.startTime : session.endTime,
    url: session.url
  });
}

function onSessionStart(session) {
  console.log("START", formatTime(session.startTime), session.url);
  logSessionEvent(session, 'START');
  // best way to do this??? maybe use a server instead of local storage
  // chrome.storage.local.get({browsing_activity: []}, function(result) {
  //   var browsing_activity = result.browsing_activity;
  //   browsing_activity.push()
  // })
}

function onSessionEnd(session) {
  console.log("END", formatTime(session.endTime), session.url);
  logSessionEvent(session, 'END');
}

var stopTracking = startTrackingActivity(onSessionStart, onSessionEnd);
