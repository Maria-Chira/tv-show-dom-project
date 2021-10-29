
let allEpisodes = getAllEpisodes();

function setup() {
  allEpisodes = getAllEpisodes();
  makePageForEpisodes(allEpisodes);
}

// root element
const rootElem = document.getElementById("root");



//creating the jumbotron 
const jumbotron = document.createElement("div");
rootElem.appendChild(jumbotron);
jumbotron.classList.add("jumbotron");

const mainHeading = document.createElement("h1");
mainHeading.innerHTML = "Unlimited Movies, TV Shows and More";
mainHeading.classList.add("mainHeading");
jumbotron.appendChild(mainHeading);





//creating the search bar by episode
const searchByEpisode = document.createElement("select");
searchByEpisode.classList.add("searchInput");
rootElem.appendChild(searchByEpisode);

const initialEmptyOption = document.createElement("option");
initialEmptyOption.value = "";
initialEmptyOption.innerHTML = "Show all episodes";
searchByEpisode.appendChild(initialEmptyOption);

allEpisodes.forEach(episode =>{
  const optionEpisode = document.createElement("option");
  optionEpisode.innerHTML = `${formatEpisodeAndSeason(episode.season, episode.number)} - ${episode.name}`;
  optionEpisode.value = episode.name;
  searchByEpisode.appendChild(optionEpisode);

  optionEpisode.setAttribute("value", episode.name);
})

//event handler on change for select 
function handleChangeOption (e) {
  if (e.target.value == ""){
    makePageForEpisodes(allEpisodes)
  }else{
    let filteredEpisode = allEpisodes.filter(episode => e.target.value == episode.name)
    episodes.innerHTML ="";
    numberOfEp.innerHTML ="";
    makePageForEpisodes(filteredEpisode);
  }
}
searchByEpisode.addEventListener("change", handleChangeOption);


//creating the search bar 
const search = document.createElement("input");
search.setAttribute("type", "text");
search.setAttribute("placeholder", "Search by words");
search.classList.add("searchInput");
rootElem.appendChild(search);

//create number of episodes text
let numberOfEp = document.createElement("p");
numberOfEp.classList.add("nrOfEp");
rootElem.appendChild(numberOfEp); 

//create parent div for card episodes
let episodes = document.createElement("div");
episodes.setAttribute("class", "episodes");
rootElem.appendChild(episodes);




//event handler on keyup - for search by words
function handleChangeSearch(e) {
  let searchValue = e.target.value;
  let filteredEpisodes = allEpisodes.filter( (episode) =>
    episode.name.toLowerCase().includes(searchValue.toLowerCase()) ||
    episode.summary.toLowerCase().includes(searchValue.toLowerCase())
  );
  episodes.innerHTML ="";
  numberOfEp.innerHTML ="";
  makePageForEpisodes(filteredEpisodes);
}

search.addEventListener("keyup", handleChangeSearch);



//displaying all the episodes' cards
function makePageForEpisodes(episodeList) {
  
  //updating the number of the displayed episodes
  numberOfEp.innerHTML = `Displaying ${episodeList.length}/${allEpisodes.length} episode(s)`;
  
  //iterating through the episodes in order to create the cards
  episodeList.map((episode) => {
    let card = document.createElement("div");
    card.classList.add("card");
    episodes.appendChild(card);

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
  "The data originally comes from <a href='https://www.tvmaze.com/'>TVMaze.com</a>";


  window.onload = setup;