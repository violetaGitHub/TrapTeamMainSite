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
var firebaseConfig = {
    apiKey: "AIzaSyBHB7H6L2TgZeDJKS4ENC_fkdWtS_99T_E",
    authDomain: "trapteam-cc.firebaseapp.com",
    databaseURL: "https://trapteam-cc.firebaseio.com",
    projectId: "trapteam-cc",
    storageBucket: "trapteam-cc.appspot.com",
    messagingSenderId: "150993996289",
    appId: "1:150993996289:web:9a6a477accc058af"
  };
(function(sa,fbc){function load(f,c){var a=document.createElement('script');
a.async=1;a.src=f;var s=document.getElementsByTagName('script')[0];
s.parentNode.insertBefore(a,s);}load(sa);window.onload = function() {firebase.initializeApp(fbc).performance();};
})(performance_standalone, firebaseConfig);