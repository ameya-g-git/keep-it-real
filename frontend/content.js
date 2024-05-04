// window.resizeTo(320, 800)

(async () => {
    // see the note below on how to choose currentWindow or lastFocusedWindow
    const [tab] = await chrome.tabs.query({active: true, lastFocusedWindow: true});
    var cur_url = tab.url;
    var return_val = {}
    console.log(cur_url)
    if (cur_url) {
      fetch('http://localhost:5000/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({url: cur_url})
      })
      .then(response => response.json())
      .then(data => {
        console.log('Success:', data);

        var score = data['score']*100 + "%";

        document.getElementById('accuracy_score').innerHTML = score;
      })
    }
  })();