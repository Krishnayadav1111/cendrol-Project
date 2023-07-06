import React, { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import './Categories.css';

function Categories() {
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [joke, setJoke] = useState('');
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    fetch('https://api.chucknorris.io/jokes/categories')
      .then(response => response.json())
      .then(data => setCategories(data))
      .catch(error => console.log(error));
  }, []);

  const openModal = category => {
    setSelectedCategory(category);
    fetch(`https://api.chucknorris.io/jokes/random?category=${category}`)
      .then(response => response.json())
      .then(data => setJoke(data.value))
      .catch(error => console.log(error));
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const handleNextJoke = () => {
    fetch(`https://api.chucknorris.io/jokes/random?category=${selectedCategory}`)
      .then(response => response.json())
      .then(data => setJoke(data.value))
      .catch(error => console.log(error));
  };

  return (
    <>
    <div className="Categories">
      <h1>Chuck Norris Joke Categories</h1>
      <div className="grid-container">
        {categories.map(category => (
          <div key={category} className="grid-item" onClick={() => openModal(category)}>
            {category}
            <p style={{ fontSize: '14px', color: '#9b21b0',  }}>
  Unlimited Jokes on {category}
</p>

          </div>
        ))}
      </div>
      </div>
      <Modal className="modal-content pop-modal " show={showModal} onHide={handleCloseModal} >
        <Modal.Header className='modal-header' >
        <Modal.Title className="modal-title " style={{
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
  }}>
      <span>{selectedCategory}</span>
      <Button   className="close" variant="light" onClick={handleCloseModal}>
        <span  aria-hidden="true">&times;</span>
      </Button>
    </Modal.Title>
        </Modal.Header>
        <Modal.Body className='modal-body'>{joke}</Modal.Body>
        <Modal.Footer className='modal-footer'>
        <Button className="modal-footer " variant="primary" onClick={handleNextJoke} style={{ backgroundColor: '#1d4ed8', color: 'white' }}>
  Next Joke
</Button>

         
        </Modal.Footer>
      </Modal>
    
    </>
  );
}

export default Categories;
