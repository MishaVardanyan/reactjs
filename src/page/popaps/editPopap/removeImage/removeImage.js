import { useDispatch } from "react-redux";
import "./removeImage.css";
import { useState } from "react";

export default function RemoveImage({ image, replaceImage, bookId, onClose }) {
  const [selectedImage, setSelectedImage] = useState(image);
  const dispatch = useDispatch();
  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        const base64Image = reader.result;
        setSelectedImage(base64Image);
        replaceImage(base64Image);
      };
      reader.readAsDataURL(file);
    }
  };
  function remove() {
    dispatch({
      type: "remove",
      payload: {
        id: bookId,
      },
    });
    onClose();
  }
  return (
    <div className="replaceImage">
      <img src={selectedImage} alt=""/>
      <div>
        <span className="remove" onClick={() => remove()}>
          REMOVE
        </span>
        <input
          type="file"
          id="imageInput"
          accept="image/*"
          onChange={handleImageChange}
        />
        <label htmlFor="imageInput" className="replace">
          REPLACE
        </label>
      </div>
    </div>
  );
}
