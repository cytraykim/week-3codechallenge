document.addEventListener("DOMContentLoaded", function () {
  const filmsList = document.getElementById("films");
  const availableTicketsElement = document.getElementById("available-tickets");
  let availableTickets = 0; // Variable to store the current number of available tickets

  // Function to fetch movie details and update the UI
  function fetchMovieDetails(movieId) {
      fetch("./db.json")
          .then((response) => response.json())
          .then((data) => {
              const film = data.films.find((f) => f.id === movieId);
              if (film) {
                  const { poster, title, runtime, showtime, capacity, tickets_sold, description } =
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

                  document.getElementById("description").innerHTML = description;

                  // Check if the movie is sold out
                  const buyTicketButton = document.getElementById("buy-ticket");
                  if (availableTickets === 0) {
                      buyTicketButton.textContent = "Sold Out";
                      buyTicketButton.disabled = true;
                  } else {
                      buyTicketButton.textContent = "Buy Ticket";
                      buyTicketButton.disabled = false;
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

  buyTicketButton.onclick = () => {availableTickets -= 1 
  console.log(availableTickets);
  
  
  if (availableTickets === 0 || availableTickets < 0 )
  {
    availableTicketsElement.textContent = `Sold Out`
  }
  else
  availableTicketsElement.textContent = `Available Tickets: ${availableTickets}`;
} })