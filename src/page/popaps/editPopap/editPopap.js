import "./editPopap.css";
import Modal from "react-modal";
import { useDispatch } from "react-redux";
import { useState } from "react";
import RemoveImage from "./removeImage/removeImage";

export default function EditPopap({ isOpen, onClose, bookData }) {
  const [base64Image, setBase64Image] = useState(bookData.url);
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    name: bookData.name,
    description: bookData.description,
    price: bookData.price,
    discount: bookData.discount,
    url: bookData.url,
  });

  function editDate() {
    dispatch({
      type: "editDate",
      payload: {
        id: bookData.id,
        name: formData.name,
        description: formData.description,
        price: formData.price,
        discount: formData.discount,
        url: base64Image,
      },
    });
    onClose();
  }

  return (
    <Modal isOpen={isOpen} onRequestClose={onClose}>
      <header>
        Edit Book
        <button onClick={onClose}>X</button>
      </header>
      <div className="form">
        <form
          onSubmit={(e) => {
            e.preventDefault();
          }}
        >
          <div className="description">
            <div className="text-field text-field_floating-2">
              <input
                className="text-field__input"
                type="text"
                name="name"
                value={formData.name}
                onChange={(event) => {
                  setFormData({ name: event.target.value });
                }}
                max={200}
                key="name"
              />
              <label className="text-field__label" htmlFor="text">
                Name
              </label>
            </div>
            <div className="text-field text-field_floating-2">
              <textarea
                className="text-field__input-1"
                name="description"
                value={formData.description}
                onChange={(event) => {
                  setFormData({ discription: event.target.value });
                }}
                maxLength={400}
                key="description"
              ></textarea>
              <label className="text-field__label-1" htmlFor="textarea">
                Discription
              </label>
            </div>
            <div className="price">
              <div className="text-field text-field_floating-2">
                <input
                  className="text-field__input"
                  type="number"
                  name="price"
                  value={formData.price}
                  onChange={(event) => {
                    setFormData({ price: event.target.value });
                  }}
                  min={0}
                  key="price"
                />
                <label className="text-field__label" htmlFor="price">
                  Price
                </label>
              </div>
              <div className="text-field text-field_floating-2">
                <input
                  className="text-field__input"
                  type="number"
                  name="discount"
                  value={formData.discount}
                  onChange={(event) => {
                    setFormData({ discount: event.target.value });
                  }}
                  min={0}
                  max={100}
                  key="discount"
                />
                <label className="text-field__label" htmlFor="discount">
                  Discount
                </label>
              </div>
            </div>
          </div>
          <RemoveImage
            image={formData.url}
            replaceImage={(code) => {
              setBase64Image(code);
            }}
            bookId={bookData.id}
            onClose={() => onClose()}
          />
        </form>
      </div>
      <footer>
        <button onClick={onClose}>Cancel</button>
        <button type="submit" onClick={() => editDate()}>
          Save
        </button>
      </footer>
    </Modal>
  );
}
