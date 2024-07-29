import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Modal, Button } from 'react-bootstrap';
import AddButton from './AddButton.js'

const FilmList = (props) => {
    // ovi useStateovi i funkcije se koriste za modal
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    return(
        <>
            <div onClick={handleShow} className='add-button'>
                <AddButton></AddButton>
            </div>
            <Modal show={show} onHide={handleClose}>
                <Modal.Header>
                    <Modal.Title>Add a new film..</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                <h2>Input your data</h2>
                <form onSubmit={props.handleSubmit}>
                    <input type="text" name="Title" placeholder="Title" />
                    <input type="text" name="Poster" placeholder="Poster URL" />
                    <input type="text" name="Year" placeholder="Year" />
                    <button type="submit">Add Film</button>
                </form>
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