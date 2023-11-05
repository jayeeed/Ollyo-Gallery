import Gallery from "./components/Gallery";
import * as images from "./assets/images/index";

// Extract images from the imported 'images' object, create an array, and sort it by image ID.
const imageArray = Object.entries(images)
  .map(([id, src]) => ({ id: id.match(/\d+/)[0], src, alt: `Image ${id}` }))
  .sort((a, b) => parseInt(a.id) - parseInt(b.id));

function App() {
  return (
    <div className="bg-white m-4 rounded-md" >

      {/* Render the Gallery component with the 'imageArray'. */}
      <Gallery images={imageArray} />
      
    </div>
  );
}

export default App;
