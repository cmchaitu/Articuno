import React, { useEffect, useState } from 'react';
import logo from './logo.svg';
import './App.css';

//const products =
//[
// { name: 'product1', price: 100 },
// { name: 'product2', price: 200 },

//]

function App() {

    const [dogImage, setDogImage] = useState(null)
    const [products, setproducts] = useState
        ([
        { name: 'product1', price: 100 },
        { name: 'product2', price: 200 },
        ])
    function addproducts1() {
        setproducts(array => [{ name: 'product199', price: 1030 }])


       
    }
    function addproducts()
    {
        setproducts
         (prevstate => 
            [...prevstate,
             { name: 'product' + (prevstate.length + 1) , price: (prevstate.length+1) * 100 }
            
            ]
         );
    }

    //useEffect(() =>
    //{
    //    async () =>
    //    {
    //        const response = await fetch("https://localhost:7073/Products");
    //        const data = await response.json();
    //        // 4. Setting *dogImage* to the image url that we received from the response above
    //        setproducts(data);
    //    };
    //});


    //useEffect(() => {
    //    async () => {
    //        const response = await fetch("https://dog.ceo/api/breeds/image/randoms");
    //        const data = await response.json();
    //        // 4. Setting *dogImage* to the image url that we received from the response above
    //        setDogImage(data);
    //    };
    //});

    // 3. Create out useEffect function
    useEffect(() => {
        fetch("https://dog.ceo/api/breeds/image/random")
            .then(response => response.json())
            // 4. Setting *dogImage* to the image url that we received from the response above
            .then(data => setDogImage(data.message))
    }, [])

    useEffect(() => {
        fetch("https://localhost:7073/Products")
            .then(response => response.json())
            // 4. Setting *dogImage* to the image url that we received from the response above
            .then(data => setproducts(data.message))
    }, [])
  return (
    <div className="App">
      <header className="App-header">
              <img src={logo} className="App-logo" alt="logo" />
              {dogImage && <img src={dogImage}></img>}

        <p>
          Edit <code>src/App.tsx</code> and save to reload.
              </p>
              <ol>
                  {products.map((product) =>
                  (
                      <li key={product.name}>
                          {product.name} - {product.price}
                      </li>
                  )
                  )
                  }
              </ol>
              <button onClick={addproducts}>Click to ADD</button>

        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
          </header>
    </div>
  );
}

export default App;
