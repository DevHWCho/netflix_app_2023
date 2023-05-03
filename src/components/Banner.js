import React, { useEffect, useState } from 'react';
import axios from 'api/axios';
import requests from 'api/requests';
import "styles/Banner.css";
import styled from 'styled-components';
import { FaInfoCircle, FaPlay } from 'react-icons/fa';
import MovieModal from './MovieModal';

function Banner({fetchUrl}) {
  const [movie, setMovie] = useState([]);
  const [movies, setMovies] = useState([]);
  const [isClicked, setIsClicked] = useState(false);
  // console.log("movie........", movie)
  const [modalOpen, setModalOpen] = useState(false);
  const [movieSelected, setMovieSelected] = useState({});


  useEffect(() => {
    fetchData();
  },[]);

  const fetchData = async () => {
    //현재 상영 중인 영화 정보 가져오기 (20개 영화)
    const request = await axios.get(requests.fetchNowPlaying);
    // console.log("request->",request);

    // 현재 상영 중인 영화 하나의 ID를 랜덤하게 가져오기
    const movieId = request.data.results[
      Math.floor(Math.random()* request.data.results.length + 0)//0~19 (20개)
    ].id;

    // 특정 영화의 더 상세한 정보를 가져오기 (videos 비디오 정보도 포함)
    // https://api.themoviedb.org/3/movie/{movie_id}?api_key=<<api_key>>&language=en-US&append_to_response=videos 내용이 뒤에 붙음. api_key=<<api_key>>&language=en-US&append_to_response=videos --> params 내용임.
    // 참고 https://developers.themoviedb.org/3/getting-started/append-to-response
    const {data:movieDetail} = await axios.get(`/movie/${movieId}`,{// data의 내용을 movieDetail이라는 변수에 저장함. (이름 지정한 것임)
      params : {append_to_response: "videos"}
    });
    // console.log("movieDetail->",movieDetail)
    setMovie(movieDetail);
  }

  const truncate = (str, n) => {
    return str?.length > n ? str.substr(0, n - 1) + "..." : str;
    // optional 연산자 (기본값: str.length / Optional: str?.length) - str 값이 없어도 error(undefined)가 뜨지 않는다. (물음표 붙인 것이 optional 연산자임)
  }

  useEffect(() => {
    fetchMovieData();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[fetchUrl]);

  const fetchMovieData = async () => {
    const request = await axios.get(fetchUrl);
    setMovies(request.data.results);
  }

  const handleClick = () => {
    setModalOpen(true);
    setMovieSelected(movie);
    // console.log('movie->',movie);
  } 

  // 참고 https://image.tmdb.org/t/p/w500/kqjL17yufvn9OVLyXYpvtyrFfak.jpg
  if(!isClicked){
    return (
      <>
      <header className='banner' style={{
        backgroundImage:`url("https://image.tmdb.org/t/p/original/${movie.backdrop_path}")`, 
        backgroundPosition: 'top center', 
        backgroundSize: "cover"
        }}>
        <div className='banner__contents'>
          <h1 className='banner__title'>
            {/* null 병합연산자(||) - 속성값이 null이나 undefined 가 있으면 다른 걸 실행하도록 함 */}
            {movie.title || movie.name || movie.original_name}
          </h1>
          <div className='banner__buttons'>
            <button className='banner__button play' onClick={() => setIsClicked(true)}>
              <FaPlay />&nbsp;&nbsp;Play
            </button>
            <button className='banner__button info' onClick={() => handleClick(true)}>
              <FaInfoCircle className='more_btn' />&nbsp;&nbsp;More Information
            </button>
          </div>
          <p className='banner__description'>
            {truncate(movie.overview, 100)}
          </p>
        </div>
        <div className='banner--fadeBottom'></div>
      </header>
      <div className='banner_modal'>
      {modalOpen && (
        <MovieModal {...movieSelected} setModalOpen={setModalOpen} />
      )}
      </div>
      </>
    )
  }else{
    return (
      <Container>
        <HomeContainer>
          <Iframe
            src={`https://www.youtube.com/embed/${movie.videos.results[0]?.key}?controls=0&autoplay=1&loop=1&mute=1&playlist=${movie.videos.results[0]?.key}`}
            width='640'
            height='360'
            frameBorder='0'
            allow='autoplay; fullscreen'
          ></Iframe>
        </HomeContainer>
      </Container>
    )
  }
  
}

// [styled-components] 컴포넌트를 하나 만들고(div 처럼 작동함) 자바 스크립트 내에 CSS를 적용한다. 백틱(`) 안에 CSS 내용을 작성한다.
const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100vh;
`;

const HomeContainer = styled.div`
  width: 100%;
  height: 100%;
`;

const Iframe = styled.iframe`
  width: 100%;
  height: 100%;
  z-index: -1;
  opacity: 0.9;
  border: none;
  &::after {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
  }
`;

export default Banner
