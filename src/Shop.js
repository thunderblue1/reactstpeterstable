import { React, useState } from 'react';
import './Shop.css';
import './Styles.css'
import { Link } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';


const Shop = (props) => {
    const [turnedOn, setTurnedOn] = useState("");
    const [inputText, setInputText] = useState("");

    const handleChangeInput = (event) => {
      setInputText(event.target.value);
      console.log(inputText);
    };
  
    const handleFormSubmit = (event) => {
      event.preventDefault();
      props.onSubmit(inputText);
    };
    const handleClose = () => setTurnedOn('closed');
    const handleShow = (id) => {
        setTurnedOn(id);
    }

    const cards=props.basket.map((bible)=> {
        const theDate = new Date(bible.myDate).toLocaleDateString('en-US');
        return (<div key={bible.Id} className="col d-flex mb-4">
            <div className="card">
                <img src={bible.productPhoto} className="card-img-top" alt={bible.name} />
                <div className="card-body">
                <h5 className="card-title">{bible.name}</h5>
                <p className="card-text">{bible.description}</p>
                <p className="card-text">{'Price: $'+bible.price/100}</p>
                </div>
                <div className="card-footer">

                <Button className="w-50 primary btn btn-primary" onClick={() => handleShow("details"+bible.Id)}>
                    Details
                </Button>

                <button type="button" className="btn btn-success w-50" onClick={()=>{props.addToCart(bible)}}>
                    Add to Cart
                </button>
                </div>
            </div>
            
            <Modal
                show={turnedOn === "details"+bible.Id} onHide={handleClose}
            >
                <Modal.Header closeButton closeLabel="close window">
                    <h1 className="modal-title fs-5" id="exampleModalLabel">{bible.name}</h1>
                </Modal.Header>
                <Modal.Body>
                    <img src={bible.productPhoto} className="w-100" alt={bible.name}/>
                    <div><p>Product Number:<br /> {bible.Id}</p></div>
                    <div><p>Product Version:<br /> {bible.version}</p></div>
                    <div><p>Product Description:<br /> {bible.description}</p></div>
                    <div><p>Date First Carried:<br /> {theDate}</p></div>
                    <div><p>Price:<br /> {'$'+bible.price/100}</p></div>
                    <div><p></p></div>
                    
                    <div className="modal-footer">
                        <Button variant='secondary' onClick={handleClose}>Close</Button>
                    </div>
                </Modal.Body>
            </Modal>    

        </div>);
    });
 
    return (
        <div className='shop'>
            <div className="head mt-4 mb-4">
                <h1 style={{textAlign: "center"}}>Shop</h1>
            </div>

            <div className="container box-display rounded mt-3">
                <Link className="btn btn-success w-100" to="/ShoppingCart">
                    Go to Shopping Cart
                </Link>
                <form onSubmit={handleFormSubmit}>
                    <div className='form-group'>
                    <label htmlFor='search-term'>Search for</label>
                    <input
                        type='text'
                        className='form-control'
                        placeholder='Enter search term here'
                        onChange={handleChangeInput}
                    />
                    </div>
                </form>
                <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3  mt-2">
                    {cards}
                </div>
            </div>
        </div>
    );
};

export default Shop;