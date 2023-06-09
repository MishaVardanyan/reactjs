import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import "./bookDate.css";

export function BookDate() {
  const { id } = useParams();
  const books = useSelector((state) => state.books);
  return (
    <div className="main">
      {books.map((el) => {
        if (el.id === Number(id)) {
          return (
            <div className="bookData">
              <div className="image">
                <img src={el.url} alt={el.name} />
              </div>
              <div className="info">
                <h2>{el.name}</h2>
                <div className="priceData">
                  {el.discount ? (
                    <p>
                      <del>{el.price}$</del>{" "}
                      <span>{el.price - (el.price * el.discount) / 100}$</span>
                    </p>
                  ) : (
                    <p>{el.price}$</p>
                  )}
                </div>
                <div className="Description">
                  <h3>Description</h3>
                  <div>{el.description}</div>
                </div>
              </div>
            </div>
          );
        }
      })}
    </div>
  );
}
