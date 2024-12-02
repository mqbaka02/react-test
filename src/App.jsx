import { useState } from "react";
import Input from "./components/forms/Input";
import Checkbox from "./components/forms/Checkbox";

import "./assets/main.css";
import ProductCategoryRow from "./products/ProductCategoryRow";
import ProductRow from "./products/ProductRow";

const PRODUCTS = [  
  {category: "Fruits", price: "$1", stocked: true, name: "Apple"},  
  {category: "Fruits", price: "$1", stocked: true, name: "Dragonfruit"},  
  {category: "Fruits", price: "$2", stocked: false, name: "Passionfruit"},  
  {category: "Vegetables", price: "$2", stocked: true, name: "Spinach"},  
  {category: "Vegetables", price: "$4", stocked: false, name: "Pumpkin"},  
  {category: "Vegetables", price: "$1", stocked: true, name: "Peas"}  
];

function App() {
  const [showStockedOnly, setShowStockedOnly]= useState(false);
  const [searchedValue, setSearchedValue]= useState("");

  const visibleProducts= PRODUCTS.filter(product=> {
    if(showStockedOnly && !product.stocked){
      return false;
    }
    return true;
  });

  return <div className="container my-3">
    <Searchbar showStockedOnly={showStockedOnly} onStockedOnlyChanged={setShowStockedOnly} searchedValue={searchedValue} searchHandler={setSearchedValue}/>
    <ProductTable products={visibleProducts}/>

  </div>;
}

function Searchbar({showStockedOnly, onStockedOnlyChanged, searchedValue, searchHandler}) {
  return <div>
    <div className="mb-3">
      <Input value={searchedValue} onChange={searchHandler} placeholder="Search..."></Input>
      <Checkbox checked={showStockedOnly} onChange={onStockedOnlyChanged} label="Don't show out of stock products" name="only-stock"/>
    </div>
  </div>;
}

function ProductTable({products}) {
  const rows= [];
  let lastCategory= null;

  for(let product of products){
    if(product.category !== lastCategory){
      rows.push(<ProductCategoryRow name={product.category} key={product.category}/>);
    }
    lastCategory= product.category;
    rows.push(<ProductRow product={product} key={product.name} />);
  }

  return <div className="container">
    <table className="table">
      <thead>
        <tr>
          <th>Name</th>
          <th>Price</th>
        </tr>
      </thead>
      <tbody>
        {rows}
      </tbody>
    </table>
  </div>;
}

export default App;
