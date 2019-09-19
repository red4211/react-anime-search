import React, {Component} from 'react';
import './App.css';
import PropTypes from 'prop-types';

class App extends Component{
  constructor(){
    super();

    this.state = {
      pageInfo:{currentPage: 1},
      mediaList: [],
      searchString: "",
      mediaType: "ANIME",
      filterBy: "POPULARITY_DESC",
      season:""
    }
  }

changeSeason = (e)=>{
  this.setState({season:e.target.value}, ()=>{
const searchTerm = this.state.searchString;
const filterMethod = this.state.filterBy;
const season = this.state.season;
const type = this.state.mediaType;

let sq = searchTerm===""? "":"$searchQuery:String,";
let sq2 = searchTerm===""? "":"search: $searchQuery,";

let seas1 = season==="" ? "" : "$season:MediaSeason,";
let seas2 = season==="" ? "" : "season: $season,";

var query = `query RunSearch(${sq+seas1} $mType: MediaType, $filterMethod:[MediaSort] ){
  Page(perPage:10, page: 1){
    pageInfo {
      total
      currentPage
      lastPage
      hasNextPage
      perPage
    }
    
    media(${sq2+seas2} type: $mType, sort:$filterMethod){
    title{
    english
  }
    format,
    description(asHtml:false),
    averageScore,
    studios(isMain:true) {
      nodes {
        name
      }
    },
    coverImage {
      large
      color
    },
    genres
  }
  }
  
}`;

var options = {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
    },
    body: JSON.stringify({
        query: query,
        variables: {
          searchQuery: searchTerm,
          mType: type,
          filterMethod:filterMethod,
          season:season
        }
    })
};

  fetch('https://graphql.anilist.co', options)
  .then(response => response.json())
  .then(response => {
    this.setState({
      pageInfo: response.data.Page.pageInfo,
      mediaList: response.data.Page.media 
    })
  })    
  })
}

changeSortBy = (e)=>{
  this.setState({filterBy: e.target.value}, ()=>{
const searchTerm = this.state.searchString;
const filterMethod = this.state.filterBy;
const season = this.state.season;
const type = this.state.mediaType;

let sq = searchTerm===""? "":"$searchQuery:String,";
let sq2 = searchTerm===""? "":"search: $searchQuery,";

let seas1 = season==="" ? "" : "$season:MediaSeason,";
let seas2 = season==="" ? "" : "season: $season,";

var query = `query RunSearch(${sq+seas1} $mType: MediaType, $filterMethod:[MediaSort] ){
  Page(perPage:10, page: 1){
    pageInfo {
      total
      currentPage
      lastPage
      hasNextPage
      perPage
    }
    
    media(${sq2+seas2} type: $mType, sort:$filterMethod){
    title{
    english
  }
    format,
    description(asHtml:false),
    averageScore,
    studios(isMain:true) {
      nodes {
        name
      }
    },
    coverImage {
      large
      color
    },
    genres
  }
  }
  
}`;

var options = {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
    },
    body: JSON.stringify({
        query: query,
        variables: {
          searchQuery: searchTerm,
          mType: type,
          filterMethod:filterMethod,
          season:season
        }
    })
};

  fetch('https://graphql.anilist.co', options)
  .then(response => response.json())
  .then(response => {
    this.setState({
      pageInfo: response.data.Page.pageInfo,
      mediaList: response.data.Page.media 
    })
  })
  });

}/*end changeSortBy*/

setType = (event)=>{
  const name = event.target.getAttribute('name');
  this.setState({mediaType: name}, ()=>{
const searchTerm = this.state.searchString;
const filterMethod = this.state.filterBy;
const season = this.state.season;
const type = this.state.mediaType;

let sq = searchTerm===""? "":"$searchQuery:String,";
let sq2 = searchTerm===""? "":"search: $searchQuery,";

let seas1 = season==="" ? "" : "$season:MediaSeason,";
let seas2 = season==="" ? "" : "season: $season,";

var query = `query RunSearch(${sq+seas1} $mType: MediaType, $filterMethod:[MediaSort] ){
  Page(perPage:10, page: 1){
    pageInfo {
      total
      currentPage
      lastPage
      hasNextPage
      perPage
    }
    
    media(${sq2+seas2} type: $mType, sort:$filterMethod){
    title{
    english
  }
    format,
    description(asHtml:false),
    averageScore,
    studios(isMain:true) {
      nodes {
        name
      }
    },
    coverImage {
      large
      color
    },
    genres
  }
  }
  
}`;

var options = {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
    },
    body: JSON.stringify({
        query: query,
        variables: {
          searchQuery: searchTerm,
          mType: type,
          filterMethod:filterMethod,
          season:season
        }
    })
};

  fetch('https://graphql.anilist.co', options)
  .then(response => response.json())
  .then(response => {
    this.setState({
      pageInfo: response.data.Page.pageInfo,
      mediaList: response.data.Page.media 
    })
  })
  });
}/* end settype*/

componentDidMount(){
const searchTerm = this.state.searchString;
const filterMethod = this.state.filterBy;
const season = this.state.season;
const type = this.state.mediaType;

let sq = searchTerm===""? "":"$searchQuery:String,";
let sq2 = searchTerm===""? "":"search: $searchQuery,";

let seas1 = season==="" ? "" : "$season:MediaSeason,";
let seas2 = season==="" ? "" : "season: $season,";

var query = `query RunSearch(${sq+seas1} $mType: MediaType, $filterMethod:[MediaSort] ){
  Page(perPage:10, page: 1){
    pageInfo {
      total
      currentPage
      lastPage
      hasNextPage
      perPage
    }
    
    media(${sq2+seas2} type: $mType, sort:$filterMethod){
    title{
    english
  }
    format,
    description(asHtml:false),
    averageScore,
    studios(isMain:true) {
      nodes {
        name
      }
    },
    coverImage {
      large
      color
    },
    genres
  }
  }
  
}`;

var options = {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
    },
    body: JSON.stringify({
        query: query,
        variables: {
          searchQuery: searchTerm,
          mType: type,
          filterMethod:filterMethod,
          season:season
        }
    })
};

fetch('https://graphql.anilist.co', options)
  .then(response => response.json())
  .then(response => {
this.setState({
      pageInfo: response.data.Page.pageInfo,
      mediaList: response.data.Page.media 
    })
  })
}

showNext = ()=>{
  if(this.state.pageInfo.hasNextPage===true){
const nextPage = this.state.pageInfo.currentPage + 1;
const searchTerm = this.state.searchString;
const filterMethod = this.state.filterBy;
const season = this.state.season;
const type = this.state.mediaType;

let sq = searchTerm===""? "":"$searchQuery:String,";
let sq2 = searchTerm===""? "":"search: $searchQuery,";

let seas1 = season==="" ? "" : "$season:MediaSeason,";
let seas2 = season==="" ? "" : "season: $season,";

var query = `query RunSearch(${sq+seas1} $mType: MediaType, $filterMethod:[MediaSort], $nextPage:Int){
  Page(perPage:10, page: $nextPage){
    pageInfo {
      total
      currentPage
      lastPage
      hasNextPage
      perPage
    }
    
    media(${sq2+seas2} type: $mType, sort:$filterMethod){
    title{
    english
  }
    format,
    description(asHtml:false),
    averageScore,
    studios(isMain:true) {
      nodes {
        name
      }
    },
    coverImage {
      large
      color
    },
    genres
  }
  }
  
}`;

var options = {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
    },
    body: JSON.stringify({
        query: query,
        variables: {
          searchQuery: searchTerm,
          mType: type,
          filterMethod:filterMethod,
          season:season,
          nextPage:nextPage
        }
    })
};

fetch('https://graphql.anilist.co', options)
  .then(response => response.json())
  .then(response => {
this.setState({
      pageInfo: response.data.Page.pageInfo,
      mediaList: response.data.Page.media 
    })
  })
  }
}

showPrev = ()=>{
  if(this.state.pageInfo.currentPage!==1){
const prevPage = this.state.pageInfo.currentPage - 1;
const searchTerm = this.state.searchString;
const filterMethod = this.state.filterBy;
const season = this.state.season;
const type = this.state.mediaType;

let sq = searchTerm===""? "":"$searchQuery:String,";
let sq2 = searchTerm===""? "":"search: $searchQuery,";

let seas1 = season==="" ? "" : "$season:MediaSeason,";
let seas2 = season==="" ? "" : "season: $season,";

var query = `query RunSearch(${sq+seas1} $mType: MediaType, $filterMethod:[MediaSort], $prevPage:Int){
  Page(perPage:10, page: $prevPage){
    pageInfo {
      total
      currentPage
      lastPage
      hasNextPage
      perPage
    }
    
    media(${sq2+seas2} type: $mType, sort:$filterMethod){
    title{
    english
  }
    format,
    description(asHtml:false),
    averageScore,
    studios(isMain:true) {
      nodes {
        name
      }
    },
    coverImage {
      large
      color
    },
    genres
  }
  }
  
}`;

var options = {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
    },
    body: JSON.stringify({
        query: query,
        variables: {
          searchQuery: searchTerm,
          mType: type,
          filterMethod:filterMethod,
          season:season,
          prevPage:prevPage
        }
    })
};

fetch('https://graphql.anilist.co', options)
  .then(response => response.json())
  .then(response => {
this.setState({
      pageInfo: response.data.Page.pageInfo,
      mediaList: response.data.Page.media 
    })
  })    
  }
}

setSearch = (e)=>{
  this.setState({searchString: e.target.value})
}

runSearch = (e)=>{
  e.preventDefault();
const searchTerm = this.state.searchString;
const filterMethod = this.state.filterBy;
const season = this.state.season;
const type = this.state.mediaType;
//search query and season are optional
let sq = searchTerm===""? "":"$searchQuery:String,";
let sq2 = searchTerm===""? "":"search: $searchQuery,";

let seas1 = season==="" ? "" : "$season:MediaSeason,";
let seas2 = season==="" ? "" : "season: $season,";

var query = `query RunSearch(${sq+seas1} $mType: MediaType, $filterMethod:[MediaSort] ){
  Page(perPage:10, page: 1){
    pageInfo {
      total
      currentPage
      lastPage
      hasNextPage
      perPage
    }
    
    media(${sq2+seas2} type: $mType, sort:$filterMethod){
    title{
    english
  }
    format,
    description(asHtml:false),
    averageScore,
    studios(isMain:true) {
      nodes {
        name
      }
    },
    coverImage {
      large
      color
    },
    genres
  }
  }
  
}`;

var options = {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
    },
    body: JSON.stringify({
        query: query,
        variables: {
          searchQuery: searchTerm,
          mType: type,
          filterMethod:filterMethod,
          season:season
        }
    })
};

fetch('https://graphql.anilist.co', options)
  .then(response => response.json())
  .then(response => {
this.setState({
      pageInfo: response.data.Page.pageInfo,
      mediaList: response.data.Page.media 
    })
  })
}/*end runsearch*/

  render(){
    return (
    <div className="App">
      <aside>
        <Search setSearch={this.setSearch} searchString={this.state.searchString} runSearch={this.runSearch} />
        <TypeFilter setType={this.setType} mediaType={this.state.mediaType}/>
        <Filters changeSortBy={this.changeSortBy} changeSeason={this.changeSeason}/>
      </aside>
      <List mediaList={this.state.mediaList} showNext={this.showNext} showPrev={this.showPrev} />
    </div>
  );
  }
}

function List(props){
  const listPanels = props.mediaList.map((elem,index)=>{
  const completedStyle = {
    backgroundImage:"url("+elem.coverImage.large+")",
    color: "#cdcdcd"
  }

  const genres = elem.genres.map((elem,index)=>{
    return <li key={index}>{elem}</li>
  })
    return (<li key={index} >
      <a href="#" className="cover-img" style={completedStyle} >
      </a>
      <div className="card-container">
        <p className="card-title" >{elem.title.english}</p>
        <div className="card-info-1" >
          <div>{elem.format}</div>
      <div>{elem.averageScore + '%'}</div>
        </div>
      <div className="desc">{elem.description}</div>
      <ul className="genres-list">{genres}</ul>
      </div>
    </li>)
  })

  return(
    <div className="main">
      <div className="btn-container">
      <button onClick={props.showPrev} className="btn-1">Back</button>
      <button onClick={props.showNext} className="btn-1">Next</button> 
      </div>
      <ul className="list">{listPanels}</ul>
    </div>
    )
}

List.propTypes = {
  mediaList: PropTypes.array,
  showNext: PropTypes.func,
  showPrev: PropTypes.func
}

function Search(props){
  return <form onSubmit={props.runSearch} ><input type="text" placeholder="search" onChange={props.setSearch} value={props.searchString} className="search-field"></input></form>
}

Search.propTypes = {
  setSearch: PropTypes.func,
  searchString: PropTypes.string,
  runSearch: PropTypes.func
}

function TypeFilter(props){
  var animeActive = props.mediaType==="ANIME"?"active":"";
  var mangaActive = props.mediaType==="MANGA"?"active":"";
  return(
      <div>
        <p className="card-title">Type</p>
      <ul className="type-filter">
        <li name="ANIME" onClick={props.setType} className={animeActive}>Anime</li>
        <li name="MANGA" onClick={props.setType} className={mangaActive}>Manga</li>
      </ul>
      </div>
    )
}

TypeFilter.propTypes = {
  setType: PropTypes.func
}

function Filters(props){
  return(
      <div>
        <p className="card-title">Filters</p>
      <select onChange={props.changeSortBy} >
      <option value="POPULARITY_DESC" >Popularity</option>
        <option value="TITLE_ENGLISH" >Title</option>
        <option value="SCORE_DESC">Score</option>
        <option value="SEARCH_MATCH">Search match</option>
      </select>

      <p className="card-title">Season</p>
      <select onChange={props.changeSeason} >
        <option value="" >All</option>
        <option value="WINTER">Winter</option>
        <option value="SPRING">Spring</option>
        <option value="SUMMER">Summer</option>
        <option value="FALL">Fall</option>
      </select>
      </div>
    )
}

Filters.propTypes = {
  changeSortBy: PropTypes.func,
  changeSeason: PropTypes.func
}

export default App;