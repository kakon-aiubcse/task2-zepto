import { createBookCard } from "../components/bookcard.js";

async function fetchBooks() {
  try {
    const response = await fetch("https://gutendex.com/books/?languages=en");
    const data = await response.json();

    const bookListContainer = document.getElementById("book-list");

    data.results.forEach((book) => {
      const bookCard = createBookCard(book);
      bookListContainer.appendChild(bookCard);
    });
  } catch (error) {
    console.error("Error fetching books:", error);
  }
}

window.onload = fetchBooks;
