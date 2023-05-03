import axios from 'api/axios';
import React, { useEffect, useState } from 'react'
import { FaPlay, FaTimesCircle } from 'react-icons/fa';
import { useNavigate, useParams } from 'react-router-dom';
import styled from 'styled-components';
import 'styles/DetailPage.css';

function DetailPage() {
  const [movie, setMovie] = useState({});
  const [movies, setMovies] = useState({});
  const [isClicked, setIsClicked] = useState(false);
  const navigate = useNavigate();

  let {movieId} = useParams(); // 주소창에 있는 param값을 가져오는 역할
  // App.js 에서 :movieId라 설정했기 때문에 movieId라고 사용한다.

  useEffect(() => {
    fetchData();
  },[movieId]);

  const fetchData = async () => {
    const request = await axios.get(`/movie/${movieId}`); // get방식은 주소창을 통해 정보를 주고 받음. 아이디/비번은 axios.post로 처리.
    // console.log("request->",request);
    setMovie(request.data);

    const {data:movieDetail} = await axios.get(`/movie/${movieId}`,{// data의 내용을 movieDetail이라는 변수에 저장함. (이름 지정한 것임)
      params : {append_to_response: "videos"}
    });
    console.log("movieDetail->",movieDetail)
    setMovies(movieDetail);
  }

  const detail_close = () => {
    navigate(-1)
  }

  //https://api.themoviedb.org/3/movie/{movie_id}?api_key=<<api_key>>&language=en-US
  //https://image.tmdb.org/t/p/original/~~~~~~.jpg
  if (!movie) return <div>...loading</div>;
  if(!isClicked){
    return (
      <section className='detail_container'>
        <img className='modal__poster-img'
        src={`https://image.tmdb.org/t/p/original/${movie.backdrop_path}`}
        alt={movie.title || movie.name || movie.original_name} /> 
  
        <div className='detail_title_container'>
          <h2 className='detail_h2' style={{color:"#fff"}}>{movie.title ? movie.title : movie.name}</h2>
          <h2 className='detail_h2' style={{color:"#fff"}}>{movie.original_title}</h2>
          <div className='detail_play' onClick={() => setIsClicked(true)}><FaPlay />&nbsp;&nbsp;재생</div>
        </div>
        
        <div className='detail_content'>
          <div className='detail_dt'>
            <p style={{color:"#46d369"}}>평점: {movie.vote_average}</p>&nbsp;&nbsp;
            <p style={{color:"#fff"}}>{movie.release_date}</p>&nbsp;&nbsp;
            <p style={{color:"#fff"}}>상영시간: {movie.runtime}분</p>
          </div>
          <div className='genres_container'>장르: 
            {movie.genres && movie.genres.map((genre) => (
            <p key={genre.id} className='detail_genre'>{genre.name}</p>
            ))}
          </div>
          <br />
          <p style={{color:"#fff"}}>{movie.overview}</p>
        </div>
      
        <span style={{color:"#fff"}} onClick={detail_close} >
          <FaTimesCircle className='detail_close'/>
        </span>
      </section>
    )
  }else {
    return (
      <>
      <Container>
        <HomeContainer>
          <Iframe
            src={`https://www.youtube.com/embed/${movies.videos.results[0]?.key}?controls=0&autoplay=1&loop=1&mute=1&playlist=${movies.videos.results[0]?.key}`}
            width='640'
            height='360'
            frameBorder='0'
            allow='autoplay; fullscreen'
          ></Iframe>
        </HomeContainer>
      </Container>
      <span style={{color:"#fff"}} onClick={detail_close} >
        <FaTimesCircle className='detail_close' />
      </span>
      </>
    )
  }
}

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

export default DetailPage
