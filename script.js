// ---------------------------------Global Variables------------------------

let allEpisodes;

// root element
const rootElem = document.getElementById("root");

//creating the parent div for jumbotron
const jumbotron = document.createElement("div");

//create input & select and the parent div
let searchDiv = document.createElement("div");
searchDiv.classList.add("searchDiv");
const searchShow = document.createElement("select");
const searchByEpisode = document.createElement("select");
const search = document.createElement("input");


//create parent div for card episodes
let episodesDiv = document.createElement("div");

//create number of episodes paragraph
let numberOfEp = document.createElement("p");

rootElem.appendChild(jumbotron);
rootElem.appendChild(searchDiv);
rootElem.appendChild(numberOfEp);
rootElem.appendChild(episodesDiv);


//get data from API
function setup() {
  
  fetch(`https://api.tvmaze.com/shows/82/episodes`)
    .then((response) => {
      if (response.status == 200) {
        return response.json();
      }
      throw `${response.status} ${response.statusText}`;
    })
    .then((data) => {
      allEpisodes = data;
      makeJumbotron();
      makeShowSelector();
      makeEpisodeSelector(allEpisodes);
      makeEpisodeSearch();
      makePageForEpisodes(allEpisodes);
      makeFooter();
    })
    .catch((error) => console.log(error));
}

//creating the jumbotron
function makeJumbotron() {
  jumbotron.classList.add("jumbotron");

  const mainHeading = document.createElement("h1");
  mainHeading.innerHTML = "Unlimited Movies, TV Shows and More";
  mainHeading.classList.add("mainHeading");
  jumbotron.appendChild(mainHeading);
}


//creating the shows' select input
function makeShowSelector(){
  searchShow.classList.add("searchInput");
  searchDiv.appendChild(searchShow);
  searchShow.placeholder = "Select a show";

  const initialOptionShow = document.createElement("option");
  initialOptionShow.value = "";
  initialOptionShow.innerHTML = "Select a show";
  searchShow.appendChild(initialOptionShow);

  const allShows = getAllShows();

  allShows.forEach((show) => {
    const optionShow = document.createElement("option");
    optionShow.innerHTML = `${show.name}`;
    searchShow.appendChild(optionShow);
    optionShow.setAttribute("value", show.name);
  });

  //event handler on change for select shows - display the proper episodes for each show
  function handleChangeShowOption(e) {
    let filteredShow = allShows.filter((show) => show.name === e.target.value);
    if (e.target.value == "") {
      episodesDiv.innerHTML = "";
    } else {
      fetch(`https://api.tvmaze.com/shows/${filteredShow[0].id}/episodes`)
        .then((response) => {
          if (response.status == 200) {
            return response.json();
          }
          throw `${response.status} ${response.statusText}`;
        })
        .then((data) => {
          allEpisodes = data;
          episodesDiv.innerHTML = "";
          searchByEpisode.innerHTML = "";
          search.innerHTML = "";
          makeEpisodeSelector(allEpisodes);
          makeEpisodeSearch();
          makePageForEpisodes(data);
        })
        .catch((error) => console.log(error));
    }
  }
  searchShow.addEventListener("change", handleChangeShowOption);
}



//creating the episode selector
function makeEpisodeSelector(episodes){
  searchByEpisode.classList.add("searchInput");
  searchDiv.appendChild(searchByEpisode);

  const initialEmptyOption = document.createElement("option");
  initialEmptyOption.value = "";
  initialEmptyOption.innerHTML = "Show all episodes";
  searchByEpisode.appendChild(initialEmptyOption);

  episodes.forEach((episode) => {
    const optionEpisode = document.createElement("option");
    optionEpisode.innerHTML = `${formatEpisodeAndSeason(
      episode.season,
      episode.number
    )} - ${episode.name}`;
    optionEpisode.value = episode.name;
    searchByEpisode.appendChild(optionEpisode);
    optionEpisode.setAttribute("value", episode.name);
  });

  //event handler on change for select episodes
  function handleChangeEpisodeOption(e) {
    if (e.target.value == "") {
      episodesDiv.innerHTML = "";
      makePageForEpisodes(allEpisodes);
    } else {
      let filteredEpisode = allEpisodes.filter(
        (episode) => e.target.value == episode.name
      );
      console.log("aaa", filteredEpisode);
      episodesDiv.innerHTML = "";
      numberOfEp.innerHTML = "";
      makePageForEpisodes(filteredEpisode);
    }
  }
  searchByEpisode.addEventListener("change", handleChangeEpisodeOption);
}



//creating the search bar
function makeEpisodeSearch(){
  search.setAttribute("type", "text");
  search.setAttribute("placeholder", "Search by words");
  search.classList.add("searchInput");
  searchDiv.appendChild(search);

  //event handler on keyup - for search by words
  function handleChangeSearch(e) {
    let searchValue = e.target.value;
    let filteredEpisodes = allEpisodes.filter(
      (episode) =>
        episode.name.toLowerCase().includes(searchValue.toLowerCase()) ||
        episode.summary.toLowerCase().includes(searchValue.toLowerCase())
    );
    episodesDiv.innerHTML = "";
    numberOfEp.innerHTML = "";
    makePageForEpisodes(filteredEpisodes);
  }
  search.addEventListener("keyup", handleChangeSearch);
}



function createNumberOfEpisodes(episodeList) {
  //number of episodes paragraph
  numberOfEp.classList.add("nrOfEp");

  //parent div for card episodes
  episodesDiv.setAttribute("class", "episodes");

  //updating the number of the displayed episodes
  numberOfEp.innerHTML = `Displaying ${episodeList.length}/${allEpisodes.length} episode(s)`;
}

function createAllEpisodes(episodeList) {
  //iterating through the episodes in order to create the cards
  episodeList.map((episode) => {
    let card = document.createElement("div");
    card.classList.add("card");
    episodesDiv.appendChild(card);

    let imageContainer = document.createElement("div");
    imageContainer.classList.add("imageDiv");
    card.appendChild(imageContainer);

    let image = document.createElement("img");
    if (episode.image !=null){
      image.setAttribute("src", episode.image.original);
    }else{
      image.setAttribute("src", "https://www.publicdomainpictures.net/pictures/280000/velka/not-found-image-15383864787lu.jpg");
    };
    image.classList.add("image");
    imageContainer.appendChild(image);

    let textContainer = document.createElement("div");
    textContainer.classList.add("textDiv");
    card.appendChild(textContainer);

    let title = document.createElement("h3");
    title.innerHTML = `~ ${episode.name} ~`;
    title.classList.add("episodeName");
    textContainer.appendChild(title);

    let info = document.createElement("div");
    info.classList.add("info");
    textContainer.appendChild(info);

    let episodeSeasonNumber = document.createElement("p");
    episodeSeasonNumber.classList.add("episodeInfo");
    episodeSeasonNumber.innerHTML = formatEpisodeAndSeason(
      episode.season,
      episode.number
    );
    info.appendChild(episodeSeasonNumber);

    let duration = document.createElement("p");
    duration.innerHTML = `${episode.runtime} min`;
    duration.setAttribute("id", "runtime");
    duration.classList.add("episodeInfo");
    info.appendChild(duration);

    let summary = document.createElement("div");
    summary.innerHTML = episode.summary;
    summary.classList.add("description");
    textContainer.appendChild(summary);

    let link = document.createElement("a");
    link.setAttribute("href", episode.url);

    let button = document.createElement("button");
    button.classList.add("button");
    button.innerHTML = "Watch";

    textContainer.appendChild(link);
    link.appendChild(button);
  });
}

function makePageForEpisodes(episodeList) {
  createNumberOfEpisodes(episodeList);
  createAllEpisodes(episodeList);
}

//creating the footer
function makeFooter() {
  let footer = document.createElement("footer");
  document.body.appendChild(footer);
  let copyRight = document.createElement("p");
  footer.appendChild(copyRight);
  copyRight.innerHTML =
    "The data originally comes from <a href='https://www.tvmaze.com/'>TVMaze.com</a>";
}

///formatting the number of the season and the episode
function formatEpisodeAndSeason(season, episode) {
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

window.onload = setup();
