window.LogRocket && window.LogRocket.init("nipfpt/trap-team-cc");

LogRocket.getSessionURL((sessionURL) => {
  analytics.track("LogRocket", {
    sessionURL: sessionURL
  });
});
LogRocket.getSessionURL((sessionURL) => {
  drift.track("LogRocket", { sessionURL: sessionURL });
});
LogRocket.getSessionURL(sessionURL => {
  Sentry.configureScope(scope => {
    scope.setExtra("sessionURL", sessionURL);
  });
});