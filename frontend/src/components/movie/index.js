import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  MDBContainer,
  MDBTable, 
  MDBTableHead, 
  MDBTableBody,
  MDBBtn,
  MDBModal,
  MDBModalDialog,
  MDBModalContent,
  MDBModalHeader,
  MDBModalTitle,
  MDBModalBody,
  MDBInput,
  MDBModalFooter,
}
from 'mdb-react-ui-kit';
import {deleteMovie, getAllMovies, addMovie, updateMovie} from '../../api/movie'
import {toast} from 'react-toastify'
import { BsXSquareFill, BsFillPencilFill } from 'react-icons/bs';

function Movie() {
  const token = localStorage.getItem("token")
  const user = JSON.parse(localStorage.getItem("user"))
  let navigate = useNavigate();

  const [movies, setMovies] = useState([])
  const [movieBasicModal, setMovieBasicModal] = useState(false);
  const [movieUpdateBasicModal, setMovieUpdateBasicModal] = useState(false);

  const [movieName, setMovieName] = useState("")
  const [rating, setRating] = useState(0)
  const [cast, setCast] = useState("")
  const [genre, setGenre] = useState("")
  const [releaseDate, setReleaseDate] = useState("")
  const [movieId, setMovieId] = useState(0)

  const toggleMovieModal = () => {
    setMovieName("")
    setRating(0)
    setCast("")
    setGenre("")
    setReleaseDate("")
    setMovieBasicModal(!movieBasicModal)
  };

  const toggleUpdateMovieModal = () => {
    setMovieName("")
    setRating(0)
    setCast("")
    setGenre("")
    setReleaseDate("")
    setMovieId(0)
    setMovieUpdateBasicModal(!movieUpdateBasicModal)
  };

  useEffect(()=>{
    handleGetAllMovies()
  },[])

  const handleGetAllMovies = ()=>{
    getAllMovies()
    .then((res)=>{
      if(res.data.success){
        toast.success("Movies fetched")
        setMovies(res.data.data.rows)
      }else{
        toast.error(res.data.message || "Something went wrong")
        console.log(res.data.message)
      }
    }).catch((err)=>{
      toast.error(err.response.data.message || "Something went wrong")
      console.log(err.response.data.message)
      console.log(err.response.data.data)
    })
  }

  const handleDeleteMovie = (movie_id)=>{
    deleteMovie(movie_id)
    .then((res)=>{
      if(res.data.success){
        toast.success("Movie deleted")
        handleGetAllMovies()
      }else{
        toast.error(res.data.message || "Something went wrong")
        console.log(res.data.message)
      }
    }).catch((err)=>{
      toast.error(err.response.data.message || "Something went wrong")
      console.log(err.response.data.message)
      console.log(err.response.data.data)
    })
  }

  const handleUpdateMovie = (movie_id)=>{
    if(movieName === "" || cast === "" || genre === "" || releaseDate === ""){
      toast.error("All fields are required")
    }else{
      var cast_split = cast.split(",")
      updateMovie({
        movie_id,
        movie_name: movieName,
        cast: cast_split,
        genre,
        release_date: releaseDate,
        rating,
      })
      .then((res)=>{
        if(res.data.success){
          toast.success("Movie updated")
          toggleUpdateMovieModal()
          handleGetAllMovies()
        }else{
          toast.error(res.data.message || "Something went wrong")
          console.log(res.data.message)
        }
      }).catch((err)=>{
        toast.error(err.response.data.message || "Something went wrong")
        console.log(err.response.data.message)
        console.log(err.response.data.data)
      })
    }
  }

  const handleAddNewMovie = ()=>{
    if(movieName === "" || cast === "" || genre === "" || releaseDate === ""){
      toast.error("All fields are required")
    }else{
      var cast_split = cast.split(",")
      addMovie({ 
        movie_name: movieName,
        cast: cast_split,
        genre,
        release_date: releaseDate,
        rating,
      })
      .then((res)=>{
        if(res.data.success){
          toast.success("Movie added")
          toggleMovieModal()
          handleGetAllMovies()
        }else{
          toast.error(res.data.message || "Something went wrong")
          console.log(res.data.message)
        }
      }).catch((err)=>{
        toast.error(err.response.data.message || "Something went wrong")
        console.log(err.response.data.message)
        console.log(err.response.data.data)
      })
    }
  }

  const renderTable = ()=>{
    return (
      <MDBTable hover>
        <MDBTableHead>
          <tr>
            <th scope='col'>#</th>
            <th scope='col'>Movie Name</th>
            <th scope='col'>Rating</th>
            <th scope='col'>Cast</th>
            <th scope='col'>Genre</th>
            <th scope='col'>Release Date</th>
            <th scope='col'>Actions</th>
          </tr>
        </MDBTableHead>
        <MDBTableBody>
          {movies.map((mov,i)=>(
            <tr key={i}>
              <th scope='row'>{i + 1}</th>
              <td>{mov.movie_name}</td>
              <td>{mov.rating}</td>
              <td>{mov.cast.length > 0 ? mov.cast.join(", ") : ""}</td>
              <td>{mov.genre}</td>
              <td>{new Date(mov.release_date).toLocaleDateString()} {new Date(mov.release_date).toLocaleTimeString()}</td>
              <td>
                <MDBBtn onClick={(e)=>{
                  setMovieId(mov.id)
                  setMovieName(mov.movie_name)
                  setRating(mov.rating)
                  setCast(mov.cast.length > 0 ? mov.cast.join(", ") : "")
                  setGenre(mov.genre)
                  setReleaseDate(mov.release_date)
                  setMovieUpdateBasicModal(true)
                }}>
                  <BsFillPencilFill/>
                </MDBBtn>
                &nbsp;
                <MDBBtn color='danger' onClick={(e)=> handleDeleteMovie(mov.id)}>
                  <BsXSquareFill/>
                </MDBBtn>
              </td>
            </tr>
          ))}
        </MDBTableBody>
      </MDBTable>
    );
  }

  const modalBody = ()=>{
    return (
      <MDBModalBody>
        <MDBInput 
          wrapperClass='mb-4' 
          label='Movie Name' 
          id='form1'
          required
          value={movieName}
          onChange={(e)=> {
            setMovieName(e.target.value)
          }}
        />

        <MDBInput 
          wrapperClass='mb-4' 
          label='Rating' 
          id='form2' 
          type='number'
          required
          value = {rating}
          onChange={(e)=> {
            setRating(e.target.value)
          }}
        />

        <MDBInput 
          wrapperClass='mb-4' 
          label='Genre' 
          id='form2' 
          required
          value = {genre}
          onChange={(e)=> {
            setGenre(e.target.value)
          }}
        />

        <MDBInput 
          wrapperClass='mb-4' 
          label='Cast (mention with "," eg: Tom, Sam, Ram)' 
          id='form2' 
          required
          value = {cast}
          onChange={(e)=> {
            setCast(e.target.value)
          }}
        />

        <MDBInput 
          wrapperClass='mb-4' 
          label='Release Date' 
          id='form2' 
          required
          value = {releaseDate}
          type="datetime-local"
          onChange={(e)=> {
            setReleaseDate(e.target.value)
          }}
        />
      </MDBModalBody>
    )
  }

  const movieModal = () =>{
    return(
      <MDBModal show={movieBasicModal} setShow={setMovieBasicModal} tabIndex='-1'>
        <MDBModalDialog>
          <MDBModalContent>
            <MDBModalHeader>
              <MDBModalTitle>Movie</MDBModalTitle>
              <MDBBtn className='btn-close' color='none' onClick={toggleMovieModal}></MDBBtn>
            </MDBModalHeader>
            {modalBody()}      
            <MDBModalFooter>
              <MDBBtn color='secondary' onClick={toggleMovieModal}>
                Close
              </MDBBtn>
              <MDBBtn onClick={handleAddNewMovie}>Save changes</MDBBtn>
            </MDBModalFooter>
          </MDBModalContent>
        </MDBModalDialog>
      </MDBModal>
    )
  }

  const movieUpdateModal = () =>{
    return(
      <MDBModal show={movieUpdateBasicModal} setShow={setMovieUpdateBasicModal} tabIndex='-1'>
        <MDBModalDialog>
          <MDBModalContent>
            <MDBModalHeader>
              <MDBModalTitle>Movie - {movieName}</MDBModalTitle>
              <MDBBtn className='btn-close' color='none' onClick={toggleUpdateMovieModal}></MDBBtn>
            </MDBModalHeader>
            {modalBody()}    
            <MDBModalFooter>
              <MDBBtn color='secondary' onClick={toggleUpdateMovieModal}>
                Close
              </MDBBtn>
              <MDBBtn onClick={(e)=>handleUpdateMovie(movieId)}>Save changes</MDBBtn>
            </MDBModalFooter>
          </MDBModalContent>
        </MDBModalDialog>
      </MDBModal>
    )
  }

  return (
    <MDBContainer className="p-3 my-5 d-flex flex-column w-100">
      <h1 className='text-center'>Hi {user.email} &nbsp; </h1>
      <h5 className='text-center' style={{cursor: "pointer"}} onClick={(e)=> {
        localStorage.removeItem("token")
        localStorage.removeItem("user")
        navigate("/login")
      }}>
        Logout
      </h5>
      
      <hr/>
      
      <MDBBtn onClick={(e)=>{
        setMovieName("")
        setRating(0)
        setCast("")
        setGenre("")
        setReleaseDate("")
        setMovieBasicModal(true)
      }}>
        Add New Movie
      </MDBBtn>
      
      <br/>
      
      {movies.length > 0 ? (
        renderTable()
      ) : ""}
      {movieModal()}
      {movieUpdateModal()}
    </MDBContainer>
  );
}

export default Movie;