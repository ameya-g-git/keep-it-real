function updateHTML(data) {
    // Function to update HTML with data

    var score = Math.round(data.score*1000)/10;
    // Check if score is within bounds
    if (score < 1) {
        score = 1;
    }
    if (score > 99.9) {
        score = 99.9;
    }
    const votes = data.vote;

    const totalVotes = votes[0] + votes[1];

    const scoreFormatted = `${score}%`;

    document.getElementById("vote-slider").value = votes[0];
    document.getElementById("score").innerText = scoreFormatted;
    document.getElementById("vote").innerText = `${Math.round((votes[0] / totalVotes) * 100)}%`;
    document.getElementById("vote-slider").max = totalVotes;

    const cardContainer = document.getElementById("cards");
    var dataList = data.perspective;
    // Check if score is less than 40, if it is, then don't show any perspectives since it's not reliable
    if (score < 40) {
        dataList = []
    }
    // Perspective Card
    cardContainer.innerHTML += dataList.map(perspective => {
        return `
            <div class="flex flex-col p-4 bg-white shadow-lg w-full rounded-2xl gap-2">
                <h2 class="font-bold text-md">-${perspective.text}</h2>
                <h3 class="text-xs italic">-${perspective.source}</h3>
            </div>
        `;
    }).join('');
}

(async () => {
    const [tab] = await chrome.tabs.query({ active: true, lastFocusedWindow: true });
    const cur_url = tab.url;

    // Fetch Data from backend
    if (cur_url) {
        try {
            await fetch('http://127.0.0.1:5000', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({url: cur_url}),
            })
            .then(response => response.json())
            .then(data => {
                console.log(data)
                updateHTML(data)
            })

        } catch (error) {
            console.error("Error during fetch:", error);
        }
    }
})();

document.onreadystatechange = function () {
    // Loading animation
    if (document.readyState === 'interactive') {
        document.getElementById('loader').style.opacity = "1";
        document.getElementById('confidence').style.opacity = "0";
        document.getElementById('cards').style.opacity = "0";
    }
    else if (document.readyState === 'complete') {
        setTimeout(function(){
            document.getElementById('loader').style.opacity = "0";
            document.getElementById('confidence').style.opacity = "1";
            document.getElementById('cards').style.opacity = "1";
        },3000);
}}
