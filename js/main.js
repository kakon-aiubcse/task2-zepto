import { createBookCard } from "../components/bookcard.js";

let allBooks = [];

async function fetchBooks() {
  try {
    const response = await fetch("https://gutendex.com/books/?languages=en");
    const data = await response.json();
    allBooks = data.results;

    populateGenres(allBooks);
    renderBooks(allBooks);
  } catch (error) {
    console.error("Error fetching books:", error);
  }
}

function renderBooks(books) {
  const bookListContainer = document.getElementById("book-list");
  bookListContainer.innerHTML = "";
  books.forEach((book) => {
    const card = createBookCard(book);
    bookListContainer.appendChild(card);
  });
}

function populateGenres(books) {
  const genreSet = new Set();

  books.forEach((book) => {
    if (book.subjects && book.subjects.length > 0) {
      genreSet.add(book.subjects[0]);
    }
  });

  const genreFilter = document.getElementById("genre-filter");
  genreSet.forEach((genre) => {
    const option = document.createElement("option");
    option.value = genre;
    option.textContent = genre;
    genreFilter.appendChild(option);
  });
}

function filterBooks() {
  const titleQuery = document.getElementById("search-bar").value.toLowerCase();
  const genreQuery = document.getElementById("genre-filter").value;

  const filtered = allBooks.filter((book) => {
    const titleMatch = book.title.toLowerCase().includes(titleQuery);
    const genreMatch = genreQuery === "" || book.subjects[0] === genreQuery;
    return titleMatch && genreMatch;
  });

  renderBooks(filtered);
}

window.onload = () => {
  fetchBooks();
  document.getElementById("search-bar").addEventListener("input", filterBooks);
  document.getElementById("genre-filter").addEventListener("change", filterBooks);
};
