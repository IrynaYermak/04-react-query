// import { useState } from "react";
import SearchBar from '../SearchBar/SearchBar';
import toast, { Toaster } from 'react-hot-toast';
import './App.css';

function App() {
  // const [count, setCount] = useState(0);

  return (
    <>
      <SearchBar />
      <Toaster />
    </>
  );
}

export default App;
