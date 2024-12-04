import { useMemo, useState } from "react";
import Input from "./components/forms/Input";
import Checkbox from "./components/forms/Checkbox";

import "./assets/main.css";
import ProductCategoryRow from "./products/ProductCategoryRow";
import ProductRow from "./products/ProductRow";
import { createPortal } from "react-dom";

const PRODUCTS = [  
  {category: "Fruits", price: "$1", stocked: true, name: "Apple"},  
  {category: "Fruits", price: "$1", stocked: true, name: "Dragonfruit"},  
  {category: "Fruits", price: "$2", stocked: false, name: "Passionfruit"},  
  {category: "Vegetables", price: "$2", stocked: true, name: "Spinach"},  
  {category: "Vegetables", price: "$4", stocked: false, name: "Pumpkin"},  
  {category: "Vegetables", price: "$1", stocked: true, name: "Peas"}  
];

function App() {
  return <>
    <div style={{width: 150, overflowY: 'scroll', background: '#EEE', padding: 20, position: 'relative', maxHeight: '100vh', boxSizing: 'border-box'}}>
      <p>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Aliquam voluptatem, voluptas non ut illo, molestias, quaerat obcaecati officiis necessitatibus ad enim placeat! Repellat atque, quaerat maiores blanditiis laudantium fugiat doloribus.
      </p>
      <p>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Nulla voluptas similique quo officiis ducimus! Molestiae natus id rem deserunt sapiente mollitia qui blanditiis laudantium laborum excepturi, neque dolor voluptate ducimus!
      </p>
      <p>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Rerum accusantium ducimus expedita molestiae eligendi laborum, in id odit tenetur facilis eius aperiam dolorum ut, debitis placeat minima. Modi, nemo odio!
      </p>
      <Modal/>
    </div>
  </>;
}

function Modal () {
  return createPortal(
    <div style={{position: 'absolute', top: 0, right: 0,padding: 10, border: 'solid 1px grey', background: '#FFF'}}>
    Modal window.
  </div>, document.body);
  //the Modal element is a child of the div, but because of createPortal() it is now a child of the body.f
}

function UseMemoExample({processHeavyFunction}) {
  const [firstname, setFirstname]= useState("john");
  const [pass, setPass]= useState("01234");
  const security= useMemo(()=> {
    return processHeavyFunction(pass);//gets executed only when pass is changed. Usefull if the function is slow.
  },[pass]); 
  // const security= passwordSecurity(pass);

  return <>
    <div className="container vstack my-3 gap-2">
      <Input label="User name" value={firstname} onChange={setFirstname}/>
      <Input label="Pass" value={pass} onChange={setPass} type="password"/>
      Security: {security};
    </div>
  </>
}

function passwordSecurity(someString) {
  return someString.length;
}

function ListOfFruits({products}){
  const [showStockedOnly, setShowStockedOnly]= useState(false);
  const [searchedValue, setSearchedValue]= useState("");

  const visibleProducts= products.filter(product=> {
    if(showStockedOnly && !product.stocked){
      return false;
    }
    if(searchedValue && !product.name.includes(searchedValue)){
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
          <th>Stock</th>
        </tr>
      </thead>
      <tbody>
        {rows}
      </tbody>
    </table>
  </div>;
}

export default App;
