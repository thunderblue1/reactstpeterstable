import { React, useState } from 'react';
import './Manage.css';
import './Styles.css'
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import dataSource from './dataSource';

const Manage = (props) => {
    const [name, setName] = useState('');
    const [version, setVersion] = useState('');
    const [description, setDescription] = useState('');
    const [price, setPrice] = useState('');
    const [productPhoto, setProductPhoto] = useState('');
    const [newCreation, setNewCreation] = useState(false);
    const [bibleId, setBibleId] = useState(0);

    const [inputText, setInputText] = useState("");

    const handleChangeInput = (event) => {
      setInputText(event.target.value);
      console.log(inputText);
    };
  
    const handleFormSubmit = (event) => {
      event.preventDefault();
      props.onSubmit(inputText);
    };


    const handleName = (event) => {
        setName(event.target.value);
    }
    const handleVersion = (event) => {
        setVersion(event.target.value);
    }
    const handleDescription = (event) => {
        setDescription(event.target.value);
    }
    const handlePrice = (event) => {
        setPrice(event.target.value);
    }
    const handleProductPhoto = (event) => {
        setProductPhoto(event.target.value);
    }


    const [turnedOn, setTurnedOn] = useState("");
    const handleClose = () => setTurnedOn('closed');
    const handleShow = (id) => {
        setTurnedOn(id);
    }

    const onDelete = (bibleId) => {
        setTurnedOn("closed");
        removeBible(bibleId);
    }

    const removeBible = async(bibleId) => {
        let response = await dataSource.delete('/bibles/'+bibleId);
        if (response.status===200) {
            console.log("Your delete was a success with a status of : "+response.status);
        } else {
            console.log("Your delete was a failure with a response of : "+response.status);
        }
        await props.reload();
    }

    const onFormSubmission = (event) => {
        setTurnedOn("closed");
        event.preventDefault();
        saveBible();
    }

    const saveBible = async () => {
        const bible = {        
            "Id": bibleId,
            "name": name,
            "version": version,
            "description": description,
            "price": price,
            "productPhoto": productPhoto
        }
        let response;
        if(newCreation) {
            response = await dataSource.post('/bibles',bible);
        } else {
            response = await dataSource.put('/bibles',bible);
        }
        if(response.status===200) {
            console.log(`The status of your album creation or edit is : ${response.status} (Success)`)
        } else {
            console.log(`The status of your album creation or edit is : ${response.status} (Failed)`)
        }
        await props.reload();
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

                <Button className="w-100 btn btn-primary" onClick={() => handleShow("details"+bible.Id)}>
                    Details
                </Button>

                <Button className="btn btn-success w-50" onClick={() => {
                    setBibleId(bible.Id);
                    setNewCreation(false);
                    setName(bible.name);
                    setVersion(bible.version);
                    setDescription(bible.description);
                    setPrice(bible.price);
                    setProductPhoto(bible.productPhoto)
                    handleShow("form")
                }}>
                    Update
                </Button>
   
                <button type="button" className="btn btn-warning w-50" onClick={()=>{onDelete(bible.Id)}}>
                    Delete
                </button>

                </div>
            </div>
            
            <Modal show={turnedOn === "details"+bible.Id} onHide={handleClose}>
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
        <div className='manage'>
            <div className="head mt-4 mb-4">
                <h1 style={{textAlign: "center"}}>Manage</h1>
            </div>

            <div className="container box-display rounded mt-3">
                <Button className="btn btn-success w-100" onClick={() => {
                    setNewCreation(true);
                    setName('');
                    setVersion('');
                    setDescription('');
                    setPrice('');
                    setProductPhoto('')
                    handleShow("form")
                }}>
                    Create
                </Button>
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

            <Modal show={turnedOn === "form"} onHide={handleClose}>
                <Modal.Header closeButton closeLabel="close window">
                    <h1 className="modal-title fs-5" id="exampleModalLabel">{newCreation?"Create":"Update"} Product</h1>
                </Modal.Header>
                <Modal.Body>
                    <form onSubmit={onFormSubmission}>
                        <div className="form-group">
                            <label htmlFor="name">Product Name</label>
                            <input id="name" type="text" className="form-control" aria-describedby="productname" placeholder="Product Name" value={name} onChange={handleName} name="name" />
                        </div>
                        <div className="form-group">
                            <label htmlFor="version">Product Version</label>
                            <input id="version" type="text" className="form-control" aria-describedby="version" placeholder="Version" required value={version} onChange={handleVersion} name="version" />
                        </div>
                        <div className="form-group">
                            <label htmlFor="description">Product Description</label>
                            <textarea id="description" type="text" className="form-control" aria-describedby="description" placeholder="Description" required value={description} onChange={handleDescription} name="description">
                            </textarea>
                        </div>

                        <div className="form-group">
                            <label htmlFor="price">Price (Pennies)</label>
                            <input id="price" type="number" className="form-control" aria-describedby="price" placeholder="Product Price" required value={price} onChange={handlePrice} name="price" />
                        </div>
                        <div className="form-group">
                            <label htmlFor="photo">Product Photo</label>
                            <input id="photo" type="text" className="form-control" aria-describedby="productphoto" placeholder="Product Photo" required value={productPhoto} onChange={handleProductPhoto} name="productphoto" />
                        </div>
                        <button type="submit" className="btn btn-primary mt-2 w-100" >Submit</button>
                    </form>
                </Modal.Body>
            </Modal>

        </div>
    );
};

export default Manage;