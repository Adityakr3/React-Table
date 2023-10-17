import React from 'react'
import {Table} from './Components/Table/Table'
import './App.css';

// async function apiData(){
//   const response = await fetch('https://dummyjson.com/products/category/smartphones')
//   const data = await response.json();
//   console.log(data);
// }
// apiData()

// function apidata(){
//   fetch('https://dummyjson.com/products/category/smartphones')
//   .then((res)=>res.json())
//   .then((data)=> console.log(data))
//   .catch((err)=> console.log(err))
// }
// apidata()


const App = () => {
  return (
<>
  {/* <Text/> */}
   <Table />
</>
)}

export default App



