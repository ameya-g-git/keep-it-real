function updateHTML(data) {
    
    const score = Math.round(data.score*100);
    const votes = data.vote;

    console.log(score)
    console.log(votes)

    const totalVotes = votes[0] + votes[1];
    const scoreFormatted = `${score}%`;

    document.getElementById("score").innerText = scoreFormatted;
    document.getElementById("vote").innerText = `${Math.round((votes[0] / totalVotes) * 100)}%`;
    document.getElementById("vote-slider").max = totalVotes;
    document.getElementById("vote-slider").value = votes[0];

    const cardContainer = document.getElementById("cards");
    const dataList = data.perspectives; // Assuming perspectives in response data
    cardContainer.innerHTML = dataList.map(perspective => {
        return `
            <div class="flex flex-col p-4 bg-white shadow-lg w-full rounded-2xl gap-2">
                <h2 class="font-bold text-md">${perspective.name}</h2>
                <h3 class="text-xs italic">${perspective.summary}</h3>
                <a class="self-end mt-2 text-xs underline" href="${perspective.link}">Check out alternate perspectives!</a>
            </div>
        `;
    }).join('');
}

(async () => {
    const [tab] = await chrome.tabs.query({ active: true, lastFocusedWindow: true });
    const cur_url = tab.url;

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
        },2000);
}}
