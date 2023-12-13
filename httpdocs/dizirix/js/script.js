var loadMoreButton = document.getElementById("load-more-btn");
var seriesList = document.getElementById("series-list");
var images = [
  "./assets/images/valhala.png",
  "./assets/images/valhala.png",
  "./assets/images/valhala.png",
  "./assets/images/valhala.png",
  "./assets/images/valhala.png",
  "./assets/images/valhala.png",
  "./assets/images/valhala.png",
  "./assets/images/valhala.png",
  "./assets/images/valhala.png",
  "./assets/images/valhala.png",
  // Add more image URLs here
];
var currentIndex = 30; // Start index for loading more images
var imagesPerLoad = 10; // Number of images to load per click

function loadMoreImages() {
  for (var i = currentIndex; i < currentIndex + imagesPerLoad; i++) {
    if (i >= images.length) {
      loadMoreButton.style.display = "none"; // Hide the button if all images are loaded
      break;
    }
    var image = document.createElement("img");
    image.src = images[i];
    var link = document.createElement("a");
    link.href = "#";
    link.appendChild(image);
    seriesList.appendChild(link);
  }
  currentIndex += imagesPerLoad;
}

loadMoreButton.addEventListener("click", loadMoreImages);
