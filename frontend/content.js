// window.resizeTo(320, 800)

(async () => {
    // see the note below on how to choose currentWindow or lastFocusedWindow
    const [tab] = await chrome.tabs.query({active: true, lastFocusedWindow: true});
    var cur_url = tab.url;
    console.log(cur_url)
    var return_val = {}
    console.log(cur_url)
    if (cur_url) {
      fetch('http://127.0.0.1:5000', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({url: cur_url})
      })
      .then(response => response.json())
      .then(data => {
        console.log('Success:', data);
      })
    }

    // var score = data['score']*100 + "%";
  })();

window.onload = e => { // PUT THIS INSIDE THE ASYNC, AFTER GETTING DATA
  const {score, votes} = {score: 0.5, votes: [100, 200]} // temporary data just to make it work on my system 
  const scoreFormatted = `${score * 100}%`
  document.getElementById("accuracy-score").innerHTML = `<span>${scoreFormatted}</span>`;
  document.getElementById("vote-slider").max = votes[0] + votes[1]
  document.getElementById("vote-slider").value = votes[0]
}