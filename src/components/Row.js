import axios from 'api/axios';
import React, { useEffect, useState } from 'react';
import "styles/Row.css";
import MovieModal from './MovieModal';

import { Navigation, Pagination, Scrollbar, A11y } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';

function Row({isLargeRow, title, id, fetchUrl}) {
  const [movies, setMovies] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [movieSelected, setMovieSelected] = useState({});
  const [genresArray, setGenreArray] = useState([]);

  useEffect(() => {
    fetchMovieData();
  },[fetchUrl]);

  const fetchMovieData = async () => {
    const request = await axios.get(fetchUrl);
    setMovies(request.data.results);
    console.log('request->', request)
  }

  const handleClick = (movie) => {
    setModalOpen(true);
    setMovieSelected(movie);
    // console.log('movie->',movie);
  } 

  useEffect(() => {
    fetchGenreData();
  },[]);

  const fetchGenreData = async () => {
    const getGenres = await axios.get(`/genre/movie/list?`);
    // console.log("getGenres->",getGenres.data.genres)
    setGenreArray(getGenres.data.genres);
  }

  return (
    <section className='row' key={id}>
      <h2>{title}</h2>
      <Swiper
        modules={[Navigation, Pagination, Scrollbar, A11y]}
        navigation // arrow 버튼 사용 유무
        pagination={{ clickable: true }} // 페이지 버튼 보이게 할지
        loop={true}
        breakpoints={{
          1378:{
            slidesPerView: 6, //한번에 보이는 슬라이드 개수
            slidesPerGroup: 6,
          },
          998:{
            slidesPerView: 5,
            slidesPerGroup: 5,
          },
          625: {
            slidesPerView: 4,
            slidesPerGroup: 4,
          },
          0: {
            slidesPerView: 3,
            slidesPerGroup: 3
          }
        }}
      >
        <div id={id} className='row__posters'>
         {movies.map((movie) => (
          <SwiperSlide>
            <img
              key={movie.id}
              onClick={() => handleClick(movie)}
              className={`row__poster ${isLargeRow && "row__posterLarge"}`}
              src={`https://image.tmdb.org/t/p/original/${isLargeRow ? movie.poster_path : movie.backdrop_path}`}
              loading='lazy'
              alt={movie.title || movie.name || movie.original_name}
            />
            <div className='row_text_container'>
              <div className='row_text_content'>
                <h2 className='row_title'>{movie.title || movie.name || movie.original_name}</h2>
                <div className='row_genres'>
                {movie.genre_ids && movie.genre_ids.map((id) => (
                  genresArray.find((g) => g.id === id)?.name && (
                    <p key={id} className='row_genre'>
                      {genresArray.find((g) => g.id === id)?.name}
                    </p>
                  )
                ))}
                </div>
              </div>
            </div>
          </SwiperSlide>
         ))}
        </div>
      </Swiper>  
        {/* <div className='slider__arrow right'>
          <span className='arrow' onClick={() => {document.getElementById(id).scrollLeft += (window.innerWidth - 80);}}>
            {">"}
          </span>
        </div>
      </div> */}

      {modalOpen && (
        <MovieModal {...movieSelected} setModalOpen={setModalOpen} />
      )}
    </section>
  )
}

export default Row
