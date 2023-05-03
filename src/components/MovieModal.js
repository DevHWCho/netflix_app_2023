import axios from 'api/axios';
import useOnClickOutside from 'hooks/useOnClickOutside';
import React, { useEffect, useRef, useState } from 'react';
import { FaTimesCircle } from 'react-icons/fa';
import "styles/MovieModal.css";

function MovieModal({setModalOpen,backdrop_path,overview, release_date,first_air_date,title,name,vote_average,genres,genre_ids,tagline}) {
  const ref = useRef(); //ref는 id 역할을 해서 기준이 된다. 여기서 ref는 div.modal이 됨.
  const [genresArray, setGenreArray] = useState([]);
  // console.log("genresArray->",genresArray)

  useOnClickOutside(ref, () => {setModalOpen(false)}); 
  useEffect(() => {
    fetchGenreData();
  },[]);

  const fetchGenreData = async () => {
    const getGenres = await axios.get(`/genre/movie/list?`);
    // console.log("getGenres->",getGenres.data.genres)
    setGenreArray(getGenres.data.genres);
  }
  

  return (
    <div className='presentation'>
      <div className='wrapper-modal'>
        <div className='modal' ref={ref}>
          <span className='modal-close' onClick={() => setModalOpen(false)}><FaTimesCircle style={{fontSize:'24px'}} /></span>
          <img className='modal__poster-img' alt={title? title : name} 
          src={`https://image.tmdb.org/t/p/original/${backdrop_path}`} />
          <span className='modal__tagline'>{tagline && (`"${tagline}"`)}</span>
          <div className='modal__content'>
            <p className='modal__details'>
              <span className='modal__user_perc'>100% for you</span> {"   "}
              {release_date ?  release_date : first_air_date}
            </p>
            <h2 className='modal__title'>{title ?  title : name}</h2>
            <p className='modal__details'>평점: {vote_average}</p>
            <div className='modal__genres'>장르:
              {genres && genres.map((genre) => (
                <p key={genre.id} className='modal__genre'>{genre.name}</p>
              ))}
              {genre_ids && genre_ids.map((id) => (
                genresArray.find((g) => g.id === id)?.name && (
                  <p key={id} className='modal__genre'>
                    {genresArray.find((g) => g.id === id)?.name}
                  </p>
                )
              ))}
            </div>
            <p className='modal__overview'>{overview}</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default MovieModal
