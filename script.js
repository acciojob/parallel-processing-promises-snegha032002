const output = document.getElementById("output");
const errorDiv = document.getElementById("error");
const loadingDiv = document.getElementById("loading");

const images = [
  { url: "https://picsum.photos/id/237/200/300" },
  { url: "https://picsum.photos/id/238/200/300" },
  { url: "https://picsum.photos/id/239/200/300" }
];

// Function to download a single image
function downloadImage(image) {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => resolve(img); // Resolves if image is loaded successfully
    img.onerror = () => reject(`Failed to load image at ${image.url}`); // Rejects on error

    img.src = image.url; // Start loading the image
  });
}

// Function to download all images and handle the loading, error, and success states
function downloadImages() {
  // Show loading spinner and hide error
  loadingDiv.style.display = "block";
  errorDiv.style.display = "none";
  output.innerHTML = ""; // Clear previous images or error message

  // Create an array of promises for all images
  const imagePromises = images.map((image) => downloadImage(image));

  // Wait for all promises to resolve using Promise.all
  Promise.all(imagePromises)
    .then((loadedImages) => {
      // Hide loading spinner
      loadingDiv.style.display = "none";
      
      // Display the images in the output div
      loadedImages.forEach((img) => {
        output.appendChild(img);
      });
    })
    .catch((error) => {
      // Hide loading spinner and show error message
      loadingDiv.style.display = "none";
      errorDiv.textContent = `Error: ${error}`;
      errorDiv.style.display = "block";
    });
}

// Add an event listener to the download button to trigger image downloading
const btn = document.getElementById("download-images-button");
btn.addEventListener("click", downloadImages);
