
window.LogRocket && window.LogRocket.init("nipfpt/trap-team-cc");

window.bugsnag.beforeNotify = function(data) {
  data.metaData.sessionURL = LogRocket.sessionURL;
  return data;
};
LogRocket.getSessionURL(function(sessionURL) {
  analytics.track("LogRocket", {
    sessionURL: sessionURL
  });
});
LogRocket.getSessionURL(function(sessionURL) {
  drift.track("LogRocket", { sessionURL: sessionURL });
});
LogRocket.getSessionURL(sessionURL => {
  Sentry.configureScope(scope => {
    scope.setExtra("sessionURL", sessionURL);
  });
});