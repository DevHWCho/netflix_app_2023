import axios from 'api/axios';
import React, { useEffect, useState } from 'react'
import { FaPlay } from 'react-icons/fa';
import { useParams } from 'react-router-dom';
import 'styles/DetailPage.css';

function DetailPage() {
  const [movie, setMovie] = useState({});
  let {movieId} = useParams(); // 주소창에 있는 param값을 가져오는 역할
  // App.js 에서 :movieId라 설정했기 때문에 movieId라고 사용한다.

  // console.log("movieId->", movieId);

  // useEffect(() => { 아래 내용과 비교하기
  //   if(movieId) {
  //     fetchData(movieId);
  //   }
  // })

  // //https://api.themoviedb.org/3/movie/{movie_id}?api_key=<<api_key>>&language=en-US
  // const fetchData = async () => {
  // const detail = await axios.get(`/movie/${movieId}?${instance.params}`)
  //     console.log("detail->", detail)
  // setMovie(detail.data.backdrop_path);
  // };

  // return (
  //   <section>
  //     <img src={"https://image.tmdb.org/t/p/original"+ movie} alt=''/>
  //   </section>
  // )

  useEffect(() => {
    fetchData();
  },[movieId]);

  const fetchData = async () => {
    const request = await axios.get(`/movie/${movieId}`); // get방식은 주소창을 통해 정보를 주고 받음. 아이디/비번은 axios.post로 처리.
    console.log("request->",request);
    setMovie(request.data);
  }

  //https://api.themoviedb.org/3/movie/{movie_id}?api_key=<<api_key>>&language=en-US
  //https://image.tmdb.org/t/p/original/~~~~~~.jpg
  if (!movie) return <div>...loading</div>;
  return (
    <section className='detail_container'>
      <img className='modal__poster-img'
      src={`https://image.tmdb.org/t/p/original/${movie.backdrop_path}`}
      alt={movie.title || movie.name || movie.original_name} /> 

      <div className='detail_title_container'>
        <h2 className='detail_h2' style={{color:"#fff"}}>{movie.title ? movie.title : movie.name}</h2>
        <h2 className='detail_h2' style={{color:"#fff"}}>{movie.original_title}</h2>
        <div className='detail_play'><FaPlay />&nbsp;&nbsp;재생</div>
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
    
      <span className='detail_close'>X</span>
    </section>
  )
}

export default DetailPage
