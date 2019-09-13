import React, {Component} from 'react';
import './App.css';
import PropTypes from 'prop-types';

class App extends Component{
  constructor(){
    super();

    this.state = {
      pageInfo:{currentPage: 1},
      mediaList: [],
      searchString: ""
    }
  }

componentDidMount(){
var query = `query ShowPopular{
  Page(perPage:10, page: 1){
    pageInfo {
      total
      currentPage
      lastPage
      hasNextPage
      perPage
    }
    
    media(type:ANIME, season:SUMMER, seasonYear:2019, popularity_greater:6000){
    title{
    english
  }
    format,
    description(asHtml:true),
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
  
}
`;

    var options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
        },
        body: JSON.stringify({
            query: query
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
const nextPage = this.state.pageInfo.currentPage + 1;
var query = `query ShowPopular{
  Page(perPage:10, page: ${nextPage}){
    pageInfo {
      total
      currentPage
      lastPage
      hasNextPage
      perPage
    }
    
    media(type:ANIME, season:SUMMER, seasonYear:2019, popularity_greater:6000){
    title{
    english
  }
    format,
    description(asHtml:true),
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
  
}
`;

    var options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
        },
        body: JSON.stringify({
            query: query
        })
    };

  if(this.state.pageInfo.hasNextPage === true){
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
var query = `query ShowPopular{
  Page(perPage:10, page: ${prevPage}){
    pageInfo {
      total
      currentPage
      lastPage
      hasNextPage
      perPage
    }
    
    media(type:ANIME, season:SUMMER, seasonYear:2019, popularity_greater:6000){
    title{
    english
  }
    format,
    description(asHtml:true),
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
  
}
`;

    var options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
        },
        body: JSON.stringify({
            query: query
        })
    };/*end*/

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
const searchQuery = this.state.searchString;

var query = `query Search{
  Page(perPage:10, page: 1){
    pageInfo {
      total
      currentPage
      lastPage
      hasNextPage
      perPage
    }
    
    media(type:ANIME, search: ${searchQuery} ){
    title{
    english
  }
    format,
    description(asHtml:true),
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
  
}
`;

    var options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
        },
        body: JSON.stringify({
            query: query
        })
    };

fetch('https://graphql.anilist.co', options)
  .then(response => response.json())
  .then(response => {
    console.log(response);
  })
}/*end runsearch*/


  render(){
    return (
    <div className="App">
      <aside>
        <Search setSearch={this.setSearch} searchString={this.state.searchString} runSearch={this.runSearch} />
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
    return (<li key={index} >
      <a href="#" className="cover-img" style={completedStyle} >
      </a>
      <div className="card-container">
        <p className="card-title" >{elem.title.english}</p>
        <div className="card-info-1" >
          <div>{elem.format}</div>
      <div>{elem.averageScore}</div>
        </div>
      <div className="desc">{elem.description}</div>
      </div>
    </li>)
  })

  return(
    <div className="main">
      <button onClick={props.showPrev} className="btn-1">Prev</button>
      <button onClick={props.showNext} className="btn-1">Next</button>
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
  return <form onSubmit={props.runSearch} ><input type="text" placeholder="search" onChange={props.setSearch} value={props.searchString} ></input></form>
}

Search.propTypes = {
  setSearch: PropTypes.func,
  searchString: PropTypes.string,
  runSearch: PropTypes.func
}

export default App;

