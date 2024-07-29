import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Modal, Button } from 'react-bootstrap';

const FilmList = (props) => {
    const LikeButton = props.LikeButton;
    const InfoButton = props.InfoButton;
    
    // ovi useStateovi i funkcije se koriste za modal
    const [filmModal, setFilmModal] = useState([]);
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = (film) => {
        setShow(true);
        setFilmModal(film);
    }
    return(
        <>
            {props.films.map((film, index) => <div className='container-fluid rowd'>
                <div className='image-container justify-content-start'>
                    <img src={film.Poster} alt='film image'></img>
                    <div onClick={() => props.likedOnClick(film)} className='liked align-items-center justify-content-center d-flex'>
                        <LikeButton></LikeButton>
                    </div>
                    <div onClick={() => handleShow(film)} className='info align-items-center justify-content-center d-flex'>
                        <InfoButton></InfoButton>
                    </div>
                </div>
                <span className='row'>{film.Title}</span>
            </div>)}

            <Modal show={show} onHide={handleClose}>
                <Modal.Header>
                    <Modal.Title>{filmModal.Title}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <p>This movie was realeased in {filmModal.Year}.</p>    
                    <img className='img-modal' src={filmModal.Poster} alt='film image'></img>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}

export default FilmList;