import './App.css';
import NavBar from './NavBar';
import About from './About';
import Shop from './Shop';
import Login from './Login';
import Register from './Register';
import Manage from './Manage';
import {Link, BrowserRouter, Routes, Route} from 'react-router-dom';
import dataSource from './dataSource'
import { useEffect, useState } from 'react';
import ShoppingCart from './ShoppingCart';

const App = (props) => {
  const [searchPhrase, setSearchPhrase] = useState('');
  const [bibles, setBibles] = useState([]);
  const [myCart, setMyCart] = useState([]);
  const [managerLoggedIn, setManagerLoggedIn] = useState(false);

  const loadProducts = async () => {
    const gotten = await dataSource.get('/bibles');
    setBibles(gotten.data);
    console.log("Load Products Called.");
  }

  const addToMyCart = (bible) => {
    setMyCart(
      [...myCart,bible]
    );
  }

  const removeFromMyCart = (bible) => {
    console.log("My Cart before:"+myCart);
    let temp = myCart;
    let index = temp.indexOf(bible);
    temp.splice(index,1);
    setMyCart(
      temp
    );
    console.log("My Cart after:"+myCart);
  }

  const updateSearchResults = (phrase) => {
    console.log('phrase is '+phrase);
    setSearchPhrase(phrase);
  };

  const updateManagerLoggedIn = (isManager) => {
    setManagerLoggedIn(isManager);
  }

  const renderedList = bibles.filter((bible) => {
    if(
      bible.description.toLowerCase().includes(searchPhrase.toLowerCase())||searchPhrase ===''
      ||bible.name.toLowerCase().includes(searchPhrase.toLowerCase())
      ||bible.version.toLowerCase().includes(searchPhrase.toLowerCase())
      ||(bible.price/100).toString().toLowerCase().includes(searchPhrase.toLowerCase())
    ) {
      return true;
    }
    return false;
  });

  const renderedCart = myCart.filter((bible) => {
    if(
      bible.description.toLowerCase().includes(searchPhrase.toLowerCase())||searchPhrase ===''
      ||bible.name.toLowerCase().includes(searchPhrase.toLowerCase())
      ||bible.version.toLowerCase().includes(searchPhrase.toLowerCase())
      ||(bible.price/100).toString().toLowerCase().includes(searchPhrase.toLowerCase())
    ) {
      return true;
    }
    return false;
  });

  let refresh = false;
  useEffect(() => {
      loadProducts();
    },[refresh]
  );

  return (
    <BrowserRouter>
      <NavBar manageLoggedIn={managerLoggedIn}></NavBar>
      <Routes>
        <Route exact path="/" element={<About />} />
        <Route exact path="/about" element={<About />} />
        <Route exact path="/shop" element={<Shop onSubmit={updateSearchResults} addToCart={addToMyCart} basket={renderedList} />} />
        <Route exact path="/shop/:searchTerm" element={<Shop onSubmit={updateSearchResults} addToCart={addToMyCart} basket={renderedList}/>} />
        <Route exact path="/ShoppingCart" element={<ShoppingCart onSubmit={updateSearchResults} removeFromCart={removeFromMyCart} basket={myCart}/>} />
        <Route exact path="/login" element={<Login updateManage={updateManagerLoggedIn}/>} />
        <Route exact path="/register" element={<Register />} />
        <Route exact path="/manage" element={<Manage onSubmit={updateSearchResults} basket={renderedList} reload={loadProducts}/>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

