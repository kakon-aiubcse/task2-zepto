import { createBookCard } from "../components/bookcard.js";

let allBooks = [];

async function fetchBooks() {
  try {
    const response = await fetch("https://gutendex.com/books/?languages=en");
    const data = await response.json();
    allBooks = data.results;
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

function filterBooks(event) {
  const query = event.target.value.toLowerCase();
  const filtered = allBooks.filter((book) =>
    book.title.toLowerCase().includes(query)
  );
  renderBooks(filtered);
}

window.onload = () => {
  fetchBooks();
  document.getElementById("search-bar").addEventListener("input", filterBooks);
};
