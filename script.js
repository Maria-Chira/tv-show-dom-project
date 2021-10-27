//You can edit ALL of the code here
function setup() {
  const allEpisodes = getAllEpisodes();
  makePageForEpisodes(allEpisodes);
}

function makePageForEpisodes(episodeList) {
  const rootElem = document.getElementById("root");
  const numberOfEp = document.createElement("p");
  numberOfEp.innerHTML = `Got ${episodeList.length} episode(s)`;
  numberOfEp.classList.add("nrOfEp");
  rootElem.appendChild(numberOfEp);

  episodeList.map((episode) => {
    let card = document.createElement("div");
    card.classList.add("card");
    rootElem.appendChild(card);

    let imageContainer = document.createElement("div");
    imageContainer.classList.add("imageDiv");
    card.appendChild(imageContainer);

    let image = document.createElement("img");
    image.setAttribute("src", episode.image.original);
    image.classList.add("image");
    imageContainer.appendChild(image);


    let textContainer = document.createElement("div");
    textContainer.classList.add("textDiv");
    card.appendChild(textContainer);

      
    let title = document.createElement("h3");
    title.innerHTML =`~ ${episode.name} ~`;
    title.classList.add("episodeName");
    textContainer.appendChild(title);

    let info = document.createElement("div");
    info.classList.add("info");
    textContainer.appendChild(info);

    let episodeSeasonNumber = document.createElement("p");
    episodeSeasonNumber.classList.add("episodeInfo");
    episodeSeasonNumber.innerHTML = formatEpisodeAndSeason(episode.season, episode.number);
    info.appendChild(episodeSeasonNumber);

    let duration = document.createElement("p");
    duration.innerHTML = `${episode.runtime} min`;
    duration.setAttribute("id", "runtime");
    duration.classList.add("episodeInfo");
    info.appendChild(duration);

    let summary = document.createElement("div");
    summary.innerHTML = episode.summary;
    summary.classList.add("description");
    textContainer.appendChild(summary)
  });
}

///formatting the number of the season and the episode
function formatEpisodeAndSeason(season, episode){
  if (parseInt(season) < 10) {
    seasonNumber = `S0${season}`;
  } else {
    seasonNumber = `S${season}`;
  }
  if (parseInt(episode) < 10) {
    episodeNumber = `E0${episode}`;
  } else {
    episodeNumber = `E${episode}`;
  }
  return seasonNumber + episodeNumber;
}

//creating the footer 
let footer = document.createElement("footer");
document.body.appendChild(footer);
let copyRight = document.createElement("p");
footer.appendChild(copyRight);
copyRight.innerHTML =
  'The data originally comes from <a href="https://www.tvmaze.com/">TVMaze.com</a>';

window.onload = setup;
