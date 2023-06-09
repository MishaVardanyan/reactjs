import { useDispatch, useSelector } from "react-redux";
import AddPopap from "../popaps/addPopap/addPopap";
import "./books.css";
import { useState } from "react";
import EditPopap from "../popaps/editPopap/editPopap";
import { useNavigate } from "react-router-dom";

export default function UserBooks() {
  const navigate = useNavigate();
  const books = useSelector((state) => state.books);
  let [addPopap, setAddPopap] = useState(false);
  let [editPopap, setEditPopap] = useState(false);
  let [book, setBook] = useState(null);
  let [searchValue, setSearchValue] = useState("");
  const dispatch = useDispatch();

  const handleEditClick = (id) => {
    setBook(id);
    setEditPopap(true);
  };
  const removeDate = (id) => {
    dispatch({
      type: "remove",
      payload: {
        id: id,
      },
    });
  };
  function bookStore(el) {
    navigate(`/books/${el.id}`);
  }

  return (
    <div className="main">
      <div className="body">
        <div className="search">
          <input
            type="text"
            maxLength={30}
            placeholder="Search..."
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
          />
          <button>&#128269;</button>
        </div>
        <div className="addBook">
          <button onClick={() => setAddPopap(!addPopap)}>Add book</button>
        </div>
      </div>
      <div className="books">
        {books
          .filter((el) => {
            if (searchValue.length > 2) {
              return el.name.toLowerCase().includes(searchValue.toLowerCase());
            } else {
              return el;
            }
          })
          .map((el) => {
            return (
              <div key={el.id} className="book">
                <span>{el.discount ? `${el.discount}%` : null}</span>
                <div className="buttons">
                  <button onClick={() => handleEditClick(el.id)}>
                    &#128394;
                  </button>
                  <button onClick={() => removeDate(el.id)}>&#10005;</button>
                </div>
                {editPopap && book === el.id && (
                  <EditPopap
                    isOpen={editPopap}
                    onClose={() => setEditPopap(false)}
                    bookData={el}
                  />
                )}
                <img src={el.url} alt={el.name} onClick={() => bookStore(el)} />
                <div className="information">
                  <div className="name">
                    <p>{el.name}</p>
                  </div>
                  <div className="price">
                    {el.discount ? (
                      <p>
                        <del>{el.price}$</del>{" "}
                        <span>
                          {el.price - (el.price * el.discount) / 100}$
                        </span>
                      </p>
                    ) : (
                      <div>{el.price}$</div>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
      </div>
      {addPopap && (
        <AddPopap isOpen={addPopap} onClose={() => setAddPopap(false)} />
      )}
    </div>
  );
}
