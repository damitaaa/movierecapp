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
</script>
