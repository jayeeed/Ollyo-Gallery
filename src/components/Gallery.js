import React, { useState } from "react";
import ImageGallery from "./Effects";

// Gallery component that displays a collection of images
const Gallery = ({ images }) => {

  // State management
  const [selectedImages, setSelectedImages] = useState([]);
  const [currentImages, setCurrentImages] = useState(images);
  const [featureImage, setFeatureImage] = useState(images[0].id);
  const [draggedImage, setDraggedImage] = useState(null);

  // Function to toggle selection of an image
  const toggleSelect = (imageId) => {
    if (selectedImages.includes(imageId)) {
      setSelectedImages(selectedImages.filter((id) => id !== imageId));
    } else {
      setSelectedImages([...selectedImages, imageId]);
    }
  };

  // Function to delete selected images
  const deleteSelectedImages = () => {
    const updatedImages = currentImages.filter(
      (image) => !selectedImages.includes(image?.id)
    );
    setCurrentImages(updatedImages);
    setSelectedImages([]);
  };

  // Function to handle the drag start event
  const handleDragStart = (event, image) => {
    setDraggedImage(image);
    event.dataTransfer.effectAllowed = "move";
    event.dataTransfer.setData("text/html", event.target.parentNode);
    event.target.classList.add("dragged-image");
  };

  // Function to handle the drag over event
  const handleDragOver = (index) => {
    const draggedOverImage = currentImages[index];
    if (draggedImage === draggedOverImage) return;
    const newImagesData = currentImages.filter((img) => img !== draggedImage);
    newImagesData.splice(index, 0, draggedImage);
    setCurrentImages(newImagesData);
  };

  // Function to handle the drag end event
  const handleDragEnd = () => {
    if (draggedImage) {
      draggedImage.classList?.remove("dragged-image");
    }
    setDraggedImage(null);
  };

  // Function to handle image uploads
  const handleImageUpload = (event) => {
    const files = event.target.files;
    if (files) {
      const newImages = Array.from(files).map((file) => ({
        id: Math.random().toString(36).substr(2, 9),
        src: URL.createObjectURL(file),
        alt: file.name,
      }));

      // Add the new images to the currentImages state
      setCurrentImages([...currentImages, ...newImages]);
    }
  };

  return (
    // Main content area including image gallery and controls
    <div>
      
      {/* Gallery header and controls */}
      <div className="flex flex-col sm:flex-row justify-between 
      items-center p-2 mb-2 border-b border-gray-300">

        {/* Check all checkbox if any image is selected */}
        <div className="flex items-baseline sm:px-6">
          {selectedImages.length > 0 && (
            <input
              type="checkbox"
              checked={selectedImages.length > 0}
              onChange={() => setSelectedImages([])}
              className="rounded"
            />
          )}
          <span className="font-semibold text-x px-3 py-2">
            {selectedImages.length === 0
              ? "Gallery"
              : selectedImages.length === 1
              ? "1 File Selected"
              : `${selectedImages.length} Files Selected`}
          </span>
        </div>

        {/* Button to delete selected images */}
        {selectedImages.length > 0 && (
          <div className="mt-2 sm:mt-0">
            <button
              onClick={deleteSelectedImages}
              className="bg-red-600 text-white px-3 py-2 font-semibold cursor-pointer 
              rounded transition duration-300 ease-in-out hover:bg-red-800"
            >
              Delete Files
            </button>
          </div>
        )}
      </div>

      {/* Image gallery component */}
      <ImageGallery
        images={images}
        currentImages={currentImages}
        selectedImages={selectedImages}
        setSelectedImages={setSelectedImages}
        featureImage={featureImage}
        setFeatureImage={setFeatureImage}
        deleteSelectedImages={deleteSelectedImages}
        handleDragStart={handleDragStart}
        handleDragOver={handleDragOver}
        handleDragEnd={handleDragEnd}
        toggleSelect={toggleSelect}
        handleImageUpload={handleImageUpload}
        draggedImage={draggedImage}
      />
    </div>
  );
};

export default Gallery;
