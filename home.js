<script>
const TMDB_API_KEY = "YOUR_API_KEY_HERE";

document.getElementById("searchForm").addEventListener("submit", async function (e) {
    e.preventDefault();

    const query = document.getElementById("searchInput").value.trim();

    if (!query) return alert("Enter a movie name!");

    const url = `https://api.themoviedb.org/3/search/movie?api_key=${TMDB_API_KEY}&query=${encodeURIComponent(query)}`;

    try {
        const response = await fetch(url);
        const data = await response.json();

        console.log("Search results:", data.results);

        // Display the results (basic example)
        displaySearchResults(data.results);

    } catch (error) {
        console.error("TMDb search error:", error);
    }
});

function displaySearchResults(results) {
    let container = document.getElementById("results");

    if (!container) {
        container = document.createElement("div");
        container.id = "results";
        container.className = "container mt-4";
        document.body.appendChild(container);
    }

    container.innerHTML = "<h3>Search Results</h3>";

    if (results.length === 0) {
        container.innerHTML += "<p>No movies found.</p>";
        return;
    }

    results.forEach(movie => {
        const poster = movie.poster_path 
            ? `https://image.tmdb.org/t/p/w200${movie.poster_path}`
            : "https://via.placeholder.com/200x300?text=No+Image";

        container.innerHTML += `
            <div class="card mb-3" style="max-width: 500px;">
              <div class="row g-0">
                <div class="col-md-4">
                  <img src="${poster}" class="img-fluid rounded-startiv class="col-md-8">
                  <div class="card-body">
                    <h5 class="card-title">${movie.title}</h5>
                    <p class="card-text">${movie.overview || "No description available."}</p>
                    <p class="card-text"><small class="text-muted">Release: ${movie.release_date || "N/A"}</small></p>
                  </div>
                </div>
              </div>
            </div>
        `;
    });
}

const TMDB_API_KEY = "YOUR_API_KEY_HERE";
const today = new Date().toISOString().split("T")[0]; // yyyy-mm-dd

async function loadUpcomingMovies() {
    const url = `https://api.themoviedb.org/3/movie/upcoming?api_key=${TMDB_API_KEY}&language=en-US&page=1`;

    try {
        const response = await fetch(url);
        const data = await response.json();

        // Filter movies releasing after today's date 
        const upcoming = data.results
            .filter(movie => movie.release_date >= today)
            .slice(0, 3); // take only 3

        updateCarousel(upcoming);

    } catch (error) {
        console.error("Error fetching upcoming movies:", error);
    }
}

function updateCarousel(movies) {
    const carouselInner = document.querySelector("#movieCarousel .carousel-inner");
    const indicators = document.querySelector(".carousel-indicators");

    carouselInner.innerHTML = "";
    indicators.innerHTML = "";

    movies.forEach((movie, index) => {
        const activeClass = index === 0 ? "active" : "";

        const poster = movie.poster_path
            ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
            : "https://via.placeholder.com/1000x500?text=No+Image";

        // Add indicator button
        indicators.innerHTML += `
            <button type="button" 
                    data-bs-target="#movieCarousel" 
                    data-bs-slide-to="${index}"
                    ${activeClass && "class='active'"}></button>
        `;

        // Add carousel slide
        carouselInner.innerHTML += `
            <div class="carousel-item ${activeClass}">
                <img src="${poster}" class="d-block w-100" alt="${movie.title}">
                
                <div class="carousel-caption d-none d-md-block">
                    <h5>${movie.title}</h5>
                    <p>Release Date: ${movie.release_date}</p>
                </div>
            </div>
        `;
    });
}

// ✅ Load movies when homepage loads
document.addEventListener("DOMContentLoaded", loadUpcomingMovies);
``
</script>
