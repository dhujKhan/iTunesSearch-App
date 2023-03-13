import React, { useEffect, useState } from "react";
import axios from "axios";
import "./searchApp.css";


type SearchResult  = {
  trackId: number;
  artworkUrl100: string;
  trackName: string;
  artistName: string;
  previewUrl: string;
  collectionViewUrl:string;
}

type ResponseData = {
  resultCount: number;
  results: SearchResult[];
}

export type ResultItemProps = {
  result: SearchResult;
  musicPath: string;
}
function SearchView() {
  const [searchValue, setSearchValue] = useState("");
  const [searchResults, setSearchResults] = useState<SearchResult[]>([]);
  const [pageNumber, setPageNumber] = useState(1);
  const [displayResultsCount, setDisplayResultsCount] = useState(10)
  const [displayResults, setDisplayResults] = useState<SearchResult[]>([]);
  const offset = 0;
  const displatLimit =10;
  useEffect(()=>{
    window.addEventListener("scroll",()=>{
      if((window.innerHeight + window.scrollY) >= document.body.offsetHeight){
        setPageNumber(pageNumber + 1);
        setDisplayResultsCount(displayResultsCount + displatLimit)
        setDisplayResults(searchResults.slice(0,displayResultsCount))
      }
      
     });
  })
   
  
  const searchItems = () => {

    axios
      .get<ResponseData>(`https://itunes.apple.com/search?term=${searchValue}`)
      .then((response) => {
        
        setSearchResults(response.data.results);
        setDisplayResults(response.data.results.slice(offset,displatLimit))

        console.log(displayResults);
      })
      .catch((error) => {
        // alert("server not responding at the moment. Please try again.");
        
      });
  };

  const renderedResult =  <div className="main-container">
  <header>Heyahh!!!! Get to know more about your favourite artist...</header>
  <div className="search-container">
    <input
      type="text"
      placeholder="Search here..."
      value={searchValue}
      onChange={(e) => setSearchValue(e.target.value)}
    />
    <button onClick={()=>{
      searchItems();

    }}>
      Search
    </button>
  </div>
  <div className="result-container">
    {displayResults.map((result) => (
      <ResultItem
        key={result.trackId}
        result={result}
        musicPath={result.previewUrl}
       
      />
    ))}
  </div>
  <footer></footer>
</div>
 
  return (
    renderedResult
  );
}

function ResultItem(props: ResultItemProps) {
  const[isPlaying, setPlaying] = useState(false);
  
  const { result } = props;

  function handlePlayPause() {
    const audioPlayer = document.getElementById('play-btn') as HTMLAudioElement;
    if (isPlaying) {
      audioPlayer.pause();
      setPlaying(false);
    } else {
      audioPlayer.play();
      setPlaying(true);
    }
  }

  function handleAudioEnded() {
    const audioPlayer = document.getElementById('play-btn') as HTMLAudioElement;
    audioPlayer.currentTime = 0;
    setPlaying(false);
  }

  return (
    <div className="result-items" key={result.trackId}>
      <div>
      <img className="result-image" src={result.artworkUrl100} alt={result.trackName} />
   
   <div className="result-trackname">{result.trackName}</div>
   <div className="result-artistname">{result.artistName}</div>
      </div>
    
        <div className="button-container">
        <audio id="play-btn" src={result.previewUrl} onEnded={handleAudioEnded}/>
      <button onClick={handlePlayPause}>{isPlaying ? 'Pause Preview' : 'Play Preview'}</button>
      <button>
        <a target="_target" href={result.collectionViewUrl}>
        View Entire Collection
        </a>
        </button>
        </div>
      
    </div>
  );
}

export default SearchView;
