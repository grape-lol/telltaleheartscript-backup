const apiUrl = "https://zonal-helsa-nebula420-8cf52411.koyeb.app";
const movieContainer = document.getElementById("movie-container");
const searchBar = document.getElementById("search-bar");
const loadingMessage = document.getElementById("loading-message");
const errorMessage = document.getElementById("error-message");
let currentPage = 1;

async function fetchTrendingMovies(page = 1) {
  try {
    loadingMessage.style.display = "block";
    const response = await fetch(`${apiUrl}/trending?page=${page}`);
    const movies = await response.json();
    loadingMessage.style.display = "none";
    displayMovies(movies);
    // Show the "Show More" button if there are more movies to load
    if (movies.length > 0) {
      document.getElementById("show-more").style.display = "block";
    } else {
      document.getElementById("show-more").style.display = "none";
    }
  } catch (error) {
    handleError(error);
  }
}

function displayMovies(movies) {
  movies.forEach((movie) => {
    const movieCard = document.createElement("div");
    movieCard.className = "movie-card";
    movieCard.innerHTML = `
          <img src="${
            movie.poster ||
            "https://www.themoviedb.org/assets/2/v4/glyphicons/basic/glyphicons-basic-38-picture-grey-c2ebdbb057f2a7614185931650f8cee23fa137b93812ccb132b9df511df1cfac.svg"
          }" alt="${movie.title} Poster">
          <h2>${movie.title} (${movie.year})</h2>
          <p>${movie.description}</p>
          <a href="${apiUrl}${movie.link}" class="watch-now">Watch Now</a>
      `;
    movieContainer.appendChild(movieCard);
  });
}

function handleError(error) {
  console.error("Error:", error);
  errorMessage.style.display = "block";
  loadingMessage.style.display = "none";
}

async function searchMovies(query) {
  try {
    loadingMessage.style.display = "block";
    const response = await fetch(`${apiUrl}/search/${query}`);
    const results = await response.json();
    loadingMessage.style.display = "none";
    displayMovies(results);
  } catch (error) {
    handleError(error);
  }
}

searchBar.addEventListener("keyup", (event) => {
  const query = event.target.value;
  if (query) {
    searchMovies(query);
    currentPage = 1; // Reset current page for search
    document.getElementById("show-more").style.display = "none"; // Hide "Show More" button on search
  } else {
    fetchTrendingMovies();
  }
});

// Show More button click event
document.getElementById("show-more").addEventListener("click", () => {
  currentPage++;
  fetchTrendingMovies(currentPage); // Fetch the next page of movies
});

// Preventing context menu to avoid pop-up ads
document.addEventListener("contextmenu", (event) => event.preventDefault());

// Fetch trending movies on page load
fetchTrendingMovies();
