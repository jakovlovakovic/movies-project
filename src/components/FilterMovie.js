import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Modal, Button } from 'react-bootstrap';
import FilterButton from './FilterButton.js'

const FilmList = (props) => {
    // ovi useStateovi i funkcije se koriste za modal
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    return(
        <>
            <div onClick={handleShow} className='add-button'>
                <FilterButton></FilterButton>
            </div>
            <Modal show={show} onHide={handleClose}>
                <Modal.Header>
                    <Modal.Title>Input your data</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                <h2>Filter by year:</h2>
                <form onSubmit={props.handleSubmit}>
                    <input type="text" name="Year" placeholder="Year" /><br></br>
                    <input type="radio" id="before" name="Option" value="before" />
                    <label for="before">before</label><br></br>
                    <input type="radio" id="after" name="Option" value="after" />
                    <label for="after">after</label><br></br>
                    <button type="submit">Filter</button>
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