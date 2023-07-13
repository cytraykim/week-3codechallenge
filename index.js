fetch('http://localhost:3000/films')
Document.addEventListener("DOMContentLoaded", function () {
    const filmsList = document.getElementById("films");
    const availableTicketsElement = document.getElementById("available-tickets");
    let availableTickets = 0; // Variable to store the current number of available tickets
  
    // Remove the placeholder 'div' element from the films list
    const placeholder = document.getElementById("placeholder");
    if (placeholder) {
      placeholder.remove();
    }
  
    // Function to fetch movie details and update the UI
    function fetchMovieDetails(movieId) {
      fetch("./db.json")
        .then((response) => response.json())
        .then((data) => {
          const film = data.films.find((f) => f.id === movieId);
          if (film) {
            const { poster, title, runtime, showtime, capacity, tickets_sold } =
              film;
            availableTickets = capacity - tickets_sold; // Calculate the number of available tickets
            availableTicketsElement.textContent = `Available Tickets: ${availableTickets}`;
  
            document.getElementById("poster").src = poster;
            document.getElementById("title").innerHTML = title;
            document.getElementById(
              "runtime"
            ).innerHTML = `Runtime: ${runtime} minutes`;
            document.getElementById(
              "showtime"
            ).innerHTML = `Showtime: ${showtime}`;
  
            // Check if the movie is sold out
            if (availableTickets === 0) {
              const buyTicketButton = document.getElementById("buy-ticket");
              buyTicketButton.textContent = "Sold Out";
              buyTicketButton.disabled = true;
  
              // Update the film item in the films menu to indicate it's sold out
              const filmItem = document.querySelector(
                `[data-film-id="${movieId}"]`
              );
              if (filmItem) {
                filmItem.classList.add("sold-out");
              }
            } else {
              const buyTicketButton = document.getElementById("buy-ticket");
              buyTicketButton.textContent = "Buy Ticket";
              buyTicketButton.disabled = false;
  
              // Update the film item in the films menu to remove the 'sold-out' class
              const filmItem = document.querySelector(
                `[data-film-id="${movieId}"]`
              );
              if (filmItem) {
                filmItem.classList.remove("sold-out");
              }
            }
          }
        });
    }
  
    fetch("./db.json")
      .then((response) => response.json())
      .then((data) => {
        const films = data.films;
  
        // Populate the films menu
        films.forEach((film) => {
          const { id, title } = film;
          const filmItem = document.createElement("li");
          filmItem.classList.add("film-item");
          filmItem.textContent = title;
          filmItem.dataset.filmId = id;
          filmsList.appendChild(filmItem);
        });
  
        // Handle click event on film items
        filmsList.addEventListener("click", function (event) {
          const clickedFilmId = event.target.dataset.filmId;
          if (clickedFilmId) {
            // Fetch movie details and update the UI
            fetchMovieDetails(clickedFilmId);
          }
        });
  
        // Initially select the first film in the menu
        if (films.length > 0) {
          const firstFilmId = films[0].id;
          fetchMovieDetails(firstFilmId);
        }
      });
  
    // Handle "Buy Ticket" button click
    const buyTicketButton = document.getElementById("buy-ticket");
    buyTicketButton.addEventListener("click", function () {
      if (availableTickets > 0) {
        availableTickets--; // Decrease the number of available tickets
        availableTicketsElement.textContent = `Available Tickets: ${availableTickets}`;
  
        if (availableTickets === 0) {
          buyTicketButton.textContent = "Sold Out";
          buyTicketButton.disabled = true;
  
          // Update the film item in the films menu to indicate it's sold out
          const filmId =
            document.querySelector(".film-item.active").dataset.filmId;
          const filmItem = document.querySelector(`[data-film-id="${filmId}"]`);
          if (filmItem) {
            filmItem.classList.add("sold-out");
          }
        }
        console.log("Ticket purchased!");
      } else {
        console.log("Sold out! No tickets available.");
      }
    });
  });