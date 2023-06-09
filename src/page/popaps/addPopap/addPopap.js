import "./addPopap.css";
import Modal from "react-modal";
import InputImage from "./inputImage/inputImage";
import { useDispatch } from "react-redux";
import { useState } from "react";

export default function AddPopap({ isOpen, onClose }) {
  const [activeButton, setActiveButton] = useState(true);
  const [base64Image, setBase64Image] = useState("");
  const [formData, setFormData] = useState([
    {
      name: "",
      description: "",
      price: 0,
      discount: 0,
    },
  ]);

  const dispatch = useDispatch();

  function handleChange(event) {
    const data = { ...formData, [event.target.name]: event.target.value };
    setFormData(data);
    if (data.name !== "" && data.description !== "" && data.price > 0) {
      setActiveButton(false);
    } else {
      setActiveButton(true);
    }
  }

  function forwardtotheserver() {
    dispatch({
      type: "add",
      payload: {
        id: Math.random(),
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
        Add Book
        <button onClick={onClose}>X</button>
      </header>
      <div className="form">
        <form>
          <div className="description">
            <div className="text-field text-field_floating-2">
              <input
                className="text-field__input"
                type="text"
                name="name"
                value={formData.name}
                onChange={(event) => handleChange(event)}
                max={200}
                required
              />
              <label className="text-field__label" htmlFor="text">
                Name*
              </label>
            </div>
            <div className="text-field text-field_floating-2">
              <textarea
                className="text-field__input-1"
                name="description"
                value={formData.description}
                onChange={(event) => handleChange(event)}
                maxLength={400}
              ></textarea>
              <label className="text-field__label-1" htmlFor="textarea">
                Description*
              </label>
            </div>
            <div className="price">
              <div className="text-field text-field_floating-2">
                <input
                  className="text-field__input"
                  type="number"
                  name="price"
                  value={formData.price}
                  onChange={(event) => handleChange(event)}
                />
                <label className="text-field__label" htmlFor="price">
                  Price*
                </label>
              </div>
              <div className="text-field text-field_floating-2">
                <input
                  className="text-field__input"
                  type="number"
                  name="discount"
                  value={formData.discount}
                  onChange={(event) => handleChange(event)}
                  min={0}
                  max={100}
                />
                <label className="text-field__label" htmlFor="discount">
                  Discount
                </label>
              </div>
            </div>
          </div>
          <InputImage image={(code) => setBase64Image(code)} />
        </form>
      </div>
      <footer>
        <button onClick={onClose}>CANCEL</button>
        <button
          type="submit"
          disabled={activeButton}
          onClick={() => forwardtotheserver()}
        >
          SAVE
        </button>
      </footer>
    </Modal>
  );
}
