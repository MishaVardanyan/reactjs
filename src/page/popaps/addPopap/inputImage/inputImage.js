import React, { useState } from "react";
import "./inputImage.css";

function InputImage({ image }) {
  const [selectedImage, setSelectedImage] = useState(null);

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        const base64Image = reader.result;
        setSelectedImage(base64Image);
        image(base64Image);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="file">
      <div>
        <div>
          <input
            type="file"
            id="imageInput"
            accept="image/*"
            onChange={handleImageChange}
          />
          <label htmlFor="imageInput" className="custom-file-upload">
            CLICK HERE OR DRAG AND DROP TO UPLOAD THE IMAGE
          </label>
        </div>
      </div>
      {selectedImage && <img src={selectedImage} alt="" />}
    </div>
  );
}

export default InputImage;
