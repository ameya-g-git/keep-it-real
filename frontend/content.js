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

document.onreadystatechange = function () { // loading screen to wait for data
  var state = document.readyState
  if (state == 'interactive') {
        document.getElementById('loader').style.opacity = "1"
        document.getElementById('confidence').style.opacity="0";
        document.getElementById('cards').style.opacity="0";
  } else if (state == 'complete') {
      setTimeout(function(){
          document.getElementById('loader').style.opacity = "0"
          document.getElementById('confidence').style.opacity="1";
          document.getElementById('cards').style.opacity="1";
      },1000);
  }
}

window.onload = e => { // PUT THIS INSIDE THE ASYNC, AFTER GETTING DATA
  const {score, votes} = {score: 0.5, votes: [100, 200]} // temporary data just to make it work on my system 
  const totalVotes = votes[0] + votes[1]
  const scoreFormatted = `${score * 100}%`
  document.getElementById("score").innerHTML = scoreFormatted
  document.getElementById("vote").innerHTML = `${Math.round((votes[0] / totalVotes) * 100, 3)}%`;
  document.getElementById("vote-slider").max = votes[0] + votes[1]
  document.getElementById("vote-slider").value = votes[0]


  const dataList = ['1', '2', '3'] // list of perspective Objects
  document.getElementById("cards").innerHTML += dataList.map(perspective => { // the variable `perspective` will hold the Object containing the perspective data
    `<div id="perspective-placeholder" class="flex flex-col p-4 bg-white shadow-lg w- rounded-2xl -gap-2">
        <h2 class="font-bold text-md ">${perspectiveName}</h2>
        <h3 class="text-xs italic">${summaryOfTheme}</h3>
        <a class="self-end mt-2 text-xs underline" href="${articleLink}">Check out alternate perspectives!</a>
    </div>`
  })
}