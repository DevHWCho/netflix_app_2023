import axios from 'api/axios';
import useDebounce from 'hooks/useDebounce';
import React, { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom';
import "styles/SearchPage.css";


function SearchPage() {
  const [searchResults, setSearchResults] = useState([]);
  const navigate = useNavigate();

  const useQuery = () => {
    return new URLSearchParams(useLocation().search);
  }
  // console.log("useLocation()->",useLocation());

  let query = useQuery(); // ?q=spiderman

  const searchTerm = query.get("q");
  const debounceSearchTerm = useDebounce(searchTerm, 500);
  // console.log('searchTerm->',searchTerm); // spiderman
  // console.log('debounceSearchTerm->',debounceSearchTerm);

  useEffect(() => { // 검색어 입력할 때마다 계속 내용이 뜨기 때문에 성능저하가 생길 수 있다. 따라서 Hook 함수 만들어서 성능을 올린다.
    if(debounceSearchTerm) {
      fetchSearchMovie(debounceSearchTerm);
    }
  },[debounceSearchTerm]); // 검색어가 바뀔 때마다 useEffect가 실행됨.

  const fetchSearchMovie = async (searchTerm) => {
    try {
      //https://api.themoviedb.org/3/search/movie?&query=
      const request = await axios.get(`/search/movie?include_adult=false&query=${debounceSearchTerm}`);
      // console.log('request->',request);
      setSearchResults(request.data.results); // spiderman 영화 20개가 들어감

    } catch (error) {
      // console.log("error", error);
    }
  }

  const renderSearchResults = () => {
    return searchResults.length > 0 ? (
      <section className='search-container'>
        <div className='results__text'>
          <p>
            "{searchTerm}" 에 대한 검색결과
          </p>
        </div>
        {searchResults.map(movie => {
          if(movie.backdrop_path !== null && movie.media_type !== "person"){
            const movieImageUrl = "https://image.tmdb.org/t/p/w300" + movie.backdrop_path;
              return (// key값이랑 내용 넣어야 함. Link to 대신 useNavigate를 사용해서 주소창 이름을 변경해서 한 페이지에 계속 다른 DetailPage가 나오게 할 수 있다.
                <div className='movie'>
                  <div className='movie__column-poster' onClick={() => navigate(`/${movie.id}`)}>
                    <img src={movieImageUrl} alt= {movie.title} className='movie__poster' />
                  </div>
                </div>
              )
            }
        })}
      </section>
    ) : (
      <section className='no-results'>
        <div className='no-results__text'>
          <p>
            찾고자 하는 검색어 "{searchTerm}" 에 맞는 영화가 없습니다.
          </p>
        </div>
      </section>
    );
  }
  return renderSearchResults();
}

export default SearchPage
