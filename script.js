// ---------------------------------Global Variables------------------------

let allEpisodes;
const allShows = getAllShows();

// root element
const rootElem = document.getElementById("root");

//creating the parent div for jumbotron
const jumbotron = document.createElement("div");

//creating the go back button 
  const goBackBtn = document.createElement("p");
  
//create input & select and the parent div
let searchDiv = document.createElement("div");
searchDiv.classList.add("searchDiv");
const selectShow = document.createElement("select");
const selectEpisode = document.createElement("select");
const searchEpisode = document.createElement("input");
const searchShow = document.createElement("input");

//create parent div for card episodes
let episodesDiv = document.createElement("div");

//create parent div for shows cards
let showsDiv = document.createElement("div");

//create number of episodes paragraph
let numberOfEp = document.createElement("p");

rootElem.appendChild(jumbotron);
rootElem.appendChild(goBackBtn);
rootElem.appendChild(searchDiv);
rootElem.appendChild(numberOfEp);
rootElem.appendChild(episodesDiv);
rootElem.appendChild(showsDiv);


//display shows' page
function setupShowsPage() {
  makeJumbotron();
  makeShowSelector();
  makeShowSearchShow();
  createAllShows(allShows);
  makeFooter();
}

//creating the jumbotron
function makeJumbotron() {
  jumbotron.classList.add("jumbotron");

  const mainHeading = document.createElement("h1");
  mainHeading.innerHTML = "Unlimited Movies, TV Shows and More";
  mainHeading.classList.add("mainHeading");
  jumbotron.appendChild(mainHeading);
}

//creating the go back button 
function makeGoBackBtn (){
  goBackBtn.innerHTML = "☚ Go back ";
  goBackBtn.setAttribute("id", "goBackBtn");

  //add eventListener on click for goBackBtn
  function handleBackBtn() {
    window.location.reload();
  }

  goBackBtn.addEventListener("click", handleBackBtn);
}


//creating the shows' select input
function makeShowSelector() {
  selectShow.classList.add("searchInput");
  searchDiv.appendChild(selectShow);
  selectShow.placeholder = "All shows";

  const initialOptionShow = document.createElement("option");
  initialOptionShow.value = "";
  initialOptionShow.innerHTML = "Select a show";
  selectShow.appendChild(initialOptionShow);

  const sortAllShows = allShows.sort((a, b) =>
    a.name.localeCompare(b.name) // sorting the shows alphabetically 
  );

  sortAllShows.forEach((show) => {
    const optionShow = document.createElement("option");
    optionShow.innerHTML = `${show.name}`;
    selectShow.appendChild(optionShow);
    optionShow.setAttribute("value", show.name);
  });

    
}

//event handler on change for select shows -
  function handleChangeShowOption(e) {
    let showElement = document.getElementById(e.target.value)
    showElement.scrollIntoView();
  }

  selectShow.addEventListener("change", handleChangeShowOption);

//creating the episode selector
function makeEpisodeSelector(episodes) {
  selectEpisode.classList.add("searchInput");
  searchDiv.appendChild(selectEpisode);

  const initialEmptyOption = document.createElement("option");
  initialEmptyOption.value = "";
  initialEmptyOption.innerHTML = "Show all episodes";
  selectEpisode.appendChild(initialEmptyOption);

  episodes.forEach((episode) => {
    const optionEpisode = document.createElement("option");
    optionEpisode.innerHTML = `${formatEpisodeAndSeason(
      episode.season,
      episode.number
    )} - ${episode.name}`;
    optionEpisode.value = episode.name;
    selectEpisode.appendChild(optionEpisode);
    optionEpisode.setAttribute("value", episode.name);
  });
}

//event handler on change for select episodes
  function handleChangeEpisodeOption(e) {
    if (e.target.value == "") {
      episodesDiv.innerHTML = "";
      makePageForEpisodes(allEpisodes);
    } else {
      let filteredEpisode = allEpisodes.filter(
        (episode) => e.target.value == episode.name
      );
      episodesDiv.innerHTML = "";
      numberOfEp.innerHTML = "";
      makePageForEpisodes(filteredEpisode);
    }
  }
  selectEpisode.addEventListener("change", handleChangeEpisodeOption);

//creating the search bar for episodes
function makeEpisodeSearch() {
  searchEpisode.setAttribute("type", "text");
  searchEpisode.value = "";
  searchEpisode.setAttribute("placeholder", "Search by words");
  searchEpisode.classList.add("searchInput");
  searchDiv.appendChild(searchEpisode);
}

//event handler on keyup - for search by words
  function handleChangeSearch(e) {
    let searchValue = e.target.value.toLowerCase();
    let filteredEpisodes = allEpisodes.filter(
      (episode) =>
        episode.name.toLowerCase().includes(searchValue) ||
        episode.summary.toLowerCase().includes(searchValue) 
    );
    episodesDiv.innerHTML = "";
    numberOfEp.innerHTML = "";
    showsDiv.innerHTML = "";
    createNumberOfEpisodes(filteredEpisodes);
    makePageForEpisodes(filteredEpisodes);
  }
  searchEpisode.addEventListener("keyup", handleChangeSearch);


//creating the search bar for shows
function makeShowSearchShow() {
  searchShow.setAttribute("type", "text");
  searchShow.setAttribute("placeholder", "Search shows");
  searchShow.classList.add("searchInput");
  searchDiv.appendChild(searchShow);
}

//event handler on keyup - for search by words
  function handleChangeSearchShow(e) {
    let searchValue = e.target.value.toLowerCase();
    let filteredShows = allShows.filter((show) => {
      return (
        show.name.toLowerCase().includes(searchValue) ||
        show.summary.toLowerCase().includes(searchValue) ||
        show.genres.find(gen => gen.toLowerCase().includes(searchValue))
      );
    });

    showsDiv.innerHTML = "";
    createAllShows(filteredShows);
  }
  searchShow.addEventListener("keyup", handleChangeSearchShow);

function createNumberOfEpisodes(episodeList) {
  //number of episodes paragraph
  numberOfEp.classList.add("nrOfEp");

  //parent div for card episodes
  episodesDiv.setAttribute("class", "episodes");

  //updating the number of the displayed episodes
  numberOfEp.innerHTML = `Displaying ${episodeList.length}/${allEpisodes.length} episode(s)`;
}

function createAllShows(showsList) {
  //iterating through the shows in order to create the cards

  showsList.map((show) => {
    let showCard = document.createElement("div");
    showCard.classList.add("showCard");
    showsDiv.appendChild(showCard);

    let showDetails = document.createElement("div");
    showDetails.classList.add("showDetails");
    showCard.appendChild(showDetails);

    let showImage = document.createElement("img");
    showImage.classList.add("showImage");
    if (show.image != null) {
      showImage.setAttribute("src", show.image.original);
    } else {
      showImage.setAttribute(
        "src",
        "https://www.publicdomainpictures.net/pictures/280000/velka/not-found-image-15383864787lu.jpg"
      );
    }
    showDetails.appendChild(showImage);

    let showInfo = document.createElement("div");
    showInfo.classList.add("showInfo");
    showDetails.appendChild(showInfo);

    let showInfoTitle = document.createElement("h1");
    showInfoTitle.innerHTML = `${show.name}`;
    showInfoTitle.classList.add(`showInfoTitle`);
    showInfoTitle.setAttribute("id", show.name);
    showInfoTitle.addEventListener("click", headingHandler);
    showInfo.appendChild(showInfoTitle);

    let showInfoDiv = document.createElement("div");
    showInfoDiv.classList.add("showInfoDiv");
    showInfo.appendChild(showInfoDiv);

    let showRuntime = document.createElement("p");
    showRuntime.innerHTML = `<span>Runtime:</span> ${show.runtime} min`;
    showRuntime.classList.add("showInfoParagraphs");
    showInfoDiv.appendChild(showRuntime);

    let showStatus = document.createElement("p");
    showStatus.innerHTML = `<span>Status:</span> ${show.status}`;
    showStatus.classList.add("showInfoParagraphs");
    showInfoDiv.appendChild(showStatus);

    let showRating = document.createElement("p");
    showRating.innerHTML = `<span>Rating:</span> ${show.rating.average}`;
    showRating.classList.add("showInfoParagraphs");
    showInfoDiv.appendChild(showRating);

    let showGenre = document.createElement("p");
    showGenre.innerHTML = `<span>Genres:</span> ${show.genres}`;
    showGenre.classList.add("showInfoParagraphs");
    showInfoDiv.appendChild(showGenre);

    let showSummary = document.createElement("p");
    showSummary.innerHTML = show.summary;
    showSummary.classList.add("showSummary");
    showCard.appendChild(showSummary);

  });
}

//
function headingHandler(e) {
  let filteredShow = allShows.filter(
    (show) => show.name === e.target.innerHTML
  );
  if (e.target.innerHTML == "") {
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
        selectEpisode.innerHTML = "";
        searchEpisode.innerHTML = "";
        searchDiv.innerHTML = "";
        showsDiv.innerHTML = "";
        makeGoBackBtn();
        makeEpisodeSelector(allEpisodes);
        makeEpisodeSearch();
        makePageForEpisodes(data);
        window.scrollTo(0, 0);
      })
      .catch((error) => console.log(error));
  }
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
    if (episode.image != null) {
      image.setAttribute("src", episode.image.original);
    } else {
      image.setAttribute(
        "src",
        "https://www.publicdomainpictures.net/pictures/280000/velka/not-found-image-15383864787lu.jpg"
      );
    }
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

window.onload = setupShowsPage();
