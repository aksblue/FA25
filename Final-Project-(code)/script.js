const input_box = document.getElementById("search-input");
const searchButton = document.getElementById("search-button");

const card = document.getElementById("anime-card");
const animeImage = document.getElementById("anime-image");
const animeTitle = document.getElementById("anime-title");
const animeText = document.getElementById("anime-text");
const animeScore = document.getElementById("anime-score");
const grid = document.getElementById("recent-grid");
const recentTitle = document.getElementById("recent-title");

searchButton.addEventListener('click', async() => {
    const name = input_box.value.trim();

    if (name === "") {
        alert("Please type an anime name.");
        return;
    }
    // disable the button to prevent spamming
    searchButton.disabled = true;

    card.classList.add("hidden");

    try {
        const response = await fetch(`https://api.jikan.moe/v4/anime?q=${name}`);

        const data = await response.json();

        if (!data.data || data.data.length === 0) {
            alert("Anime not found.");
            return;
        }

        const anime = data.data[0];
        const Title = anime.title;
        const synopsis = anime.synopsis;
        const imageUrl = anime.images.jpg.image_url;
        const score = anime.score || "N/A";
        let backgroundColor = null


        //set the values
        animeImage.src = imageUrl;
        animeTitle.textContent = Title;
        animeText.textContent = synopsis;
        animeScore.textContent = `Score: ${score}`;

        if (score === "N/A") {
            backgroundColor = "#E0E0E0"; // gray
        }else if (score >= 8) {
        backgroundColor = "#E8F5E9"; // light green
        } else if (score >= 6) {
        backgroundColor = "#FFF8E1"; // light yellow
        } else if (score >= 3) {
        backgroundColor = "#FFF3E0"; // light orange
        } else {
        backgroundColor = "#FFEBEE"; // light red
        }

        //set the background color
        card.style.backgroundColor = backgroundColor;

        //create object
        const saveDate = {
            backgroundColor: backgroundColor,
            image: imageUrl,
            title: Title,
            score: score,
            synopsis: synopsis,
        };

        addRecentSearch(saveDate);

        setTimeout(() => {
            card.classList.remove("hidden");
        }, 50);

        // reenable after 500ms
        setTimeout(() => {
            searchButton.disabled = false;
        }, 500);

    } catch (error) {
        console.log(error);
        alert("There was a problem. Try again.");
    }
});


//add to recent
const recentAnimeData = {}; // key = title, value = full save object

function addRecentSearch(saveData) {

    // show the recent h3
    recentTitle.style.display = "block";
    
    const key = saveData.title.toLowerCase().trim();

    // save the full info in the dictionary
    recentAnimeData[key] = saveData;
    

    // check if this box(data) already exists in the grid
    let existingBox = grid.querySelector(`[data-key="${key}"]`);

    if (existingBox) {
        // move it to furst line
        grid.prepend(existingBox);
        return;
    }


    // make a new box
    const box = document.createElement("div");
    const img = document.createElement("img");
    const h2 = document.createElement("h2");
    const p = document.createElement("p");

    //set values
    box.className = "recent-box";
    box.style.marginBottom = "20px";
    box.dataset.key = key; // store the key once

    //img
    img.src =saveData.image;
    img.alt = saveData.title + " anime image";

    //h2
    h2.textContent = saveData.title;

    //score
    p.textContent = "Score: " + saveData.score;
    box.style.background = saveData.backgroundColor;

    //append to the box
    box.appendChild(img);
    box.appendChild(h2);
    box.appendChild(p);

    // add to first line
    grid.prepend(box);

    // keep max 12 items
    if (grid.children.length > 12) {
        const lastBox = grid.lastChild;
        const lastKey = lastBox.dataset.key; // read box key

        // remove the saved data from obj
        delete recentAnimeData[lastKey];

        // remove the box itself
        grid.removeChild(lastBox);
    }
}

//recent interaction 
grid.addEventListener("click", (e) => {
  // check if the clicked element is a recent box 
    const box = e.target.closest(".recent-box");
    if (!box) return; // clicked outside a box

  const key = box.dataset.key; // get the key
  const info = recentAnimeData[key]; // get the saved info from obj

    // show info in main card
    animeImage.src = info.image;
    animeTitle.textContent = info.title;
    animeText.textContent = info.synopsis;
    animeScore.textContent = `Score: ${info.score}`;
    card.style.backgroundColor = info.backgroundColor;

});



// just incase to many request is made
let requestsThisMinute = 0;
let requestsThisSecond = 0;

const MAX_PER_MINUTE = 60;
const MAX_PER_SECOND = 3;

// reset counters
setInterval(() => (requestsThisMinute = 0), 60000); // every minute
setInterval(() => (requestsThisSecond = 0), 1000); // every second

// returns true if safe, false otherwise
function safeToRequest() {

    if (requestsThisMinute < MAX_PER_MINUTE && requestsThisSecond < MAX_PER_SECOND) {
    requestsThisMinute++;//increase counters
    requestsThisSecond++;
    return true;
    } else {
    return false;
    }
}
