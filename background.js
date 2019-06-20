function isSupportedProtocol(urlString) {
  var supportedProtocols = ["https:", "http:"];
  var url = document.createElement('a');
  url.href = urlString;
  return supportedProtocols.indexOf(url.protocol) != -1;
}

function scihubify() {
  browser.tabs.query({active: true, currentWindow: true}).then(function(tabs){
    if(tabs === undefined || tabs == null || tabs.length != 1) {
      return;
    }
    if (!isSupportedProtocol(tabs[0].url)) {
      return;
    }
    if (tabs[0].url.startsWith("https://sci-hub.se/")) {
      return;
    }
    browser.tabs.update(tabs[0].id, {
      'url': 'https://sci-hub.se/'+tabs[0].url
    });
  });
}

browser.browserAction.onClicked.addListener(function(){
  scihubify();
});

browser.commands.onCommand.addListener(function(command) {
  if (command == "scihubify") {
    scihubify();
  }
});
