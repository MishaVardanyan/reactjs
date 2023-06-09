import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import UserBooks from "./page/books/books";
import { BookDate } from "./page/bookDate/bookDate";

function App() {
  return (
    <Router>
      <div className="App">
        <header className="header">
          <h1>BOOK STORE</h1>
        </header>
        <Routes>
          <Route path="/" element={<UserBooks />}/>
          <Route path="/books/:id" element={<BookDate />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;

