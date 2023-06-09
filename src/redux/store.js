import { applyMiddleware, createStore } from "redux";
import thunk from "redux-thunk";

const initialState = {
  books: [],
};

const getBooks = () => {
  return async (dispatch) => {
    try {
      const response = await fetch("http://localhost:3000/books");
      const data = await response.json();
      dispatch({ type: "SET_BOOKS", payload: data });
    } catch (error) {
      console.error("Error fetching books:", error);
    }
  };
};

const reducer = (state = initialState, action) => {
  if (action.type === "SET_BOOKS") {
    return { ...state, books: action.payload };
  } else if (action.type === "add") {
    fetch("http://localhost:3000/books", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(action.payload),
    })
      .then((response) => store.dispatch(getBooks()))
  } else if (action.type === "editDate") {
    fetch(`http://localhost:3000/books/${action.payload.id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(action.payload),
    })
      .then(() => store.dispatch(getBooks()))
  } else if (action.type === "remove") {
    fetch(`http://localhost:3000/books/${action.payload.id}`, {
      method: "DELETE",
    }).then(store.dispatch(getBooks()));
  }
  return state;
};

const store = createStore(reducer, applyMiddleware(thunk));

store.dispatch(getBooks());

export default store;
