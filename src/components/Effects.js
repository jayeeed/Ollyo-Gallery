import React from "react";
import AddImages from "./Upload"; // Import the AddImages component

// ImageGallery components for displaying and managing images.
const ImageGallery = ({
  currentImages,
  selectedImages,
  setFeatureImage,
  handleImageUpload,
  handleDragStart,
  handleDragOver,
  handleDragEnd,
  toggleSelect,
  draggedImage,
}) => {
  return (
    <div className="grid grid-cols-1 min-[250px]:grid-cols-2 sm:grid-cols-2 
    md:grid-cols-3 lg:grid-cols-5 gap-6 p-8 h-full w-full">
      {currentImages.map((image, index) => (
        <div
          key={image.id}
          className={`relative rounded-lg cursor-pointer ${
            index === 0 ? "col-span-2 row-span-2" : ""
          } ${image.id === draggedImage?.id ? "dragged-image" : ""}`}
          onDragOver={() => handleDragOver(index)}
        >

          {/* D-N-D */}
          <div
            draggable
            onDragStart={(e) => handleDragStart(e, image)}
            onDragEnd={handleDragEnd}
            onClick={() => setFeatureImage(image.id)}
            style={{
              width: "100%",
              height: "auto",
              transform: `scale(${image.id === draggedImage?.id ? 1.1 : 1})`,
              transition: "transform 1s ease-in-out",
            }}

            // CheckBox Actions
            onMouseEnter={(e) => e.currentTarget.querySelector
              ('input[type="checkbox"]').style.display = "block"}
            onMouseLeave={(e) => e.currentTarget.querySelector
              ('input[type="checkbox"]').style.display = "none"}
          >

            {/* Transform & Translate */}
            <img
              src={image.src}
              alt={image.alt}
              className="w-full h-auto rounded-lg border border-gray-300"
              style={{
                transform: `translateX(${image.id === draggedImage?.id ? "10px" : "0"})`,
                transition: "transform 1s ease-in-out",
              }}
            />
            <div
              className={`absolute inset-0 h-full w-full overflow-hidden bg-slate-400 
              bg-fixed opacity-${selectedImages.includes(image.id) ? 50 : 0} 
              transition duration-300 ease-in-out hover:opacity-40 hover:brightness-0`}
            ></div>

            {/* Checkbox Attrs. */}
            <input
              type="checkbox"
              checked={selectedImages.includes(image.id)}
              onChange={() => toggleSelect(image.id)}
              className="absolute rounded top-5 left-5"
              style={{ display: "none" }}
            />
          </div>
        </div>
      ))}

      {/* AddImages component */}
      <AddImages handleImageUpload={handleImageUpload} />
    </div>
  );
};

export default ImageGallery;
