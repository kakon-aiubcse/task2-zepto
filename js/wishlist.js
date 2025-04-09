import { createBookCard } from "../components/bookcard.js";

const wishlistContainer = document.getElementById("wishlist-books");

function getWishlist() {
  return JSON.parse(localStorage.getItem("wishlist") || "[]");
}

async function fetchWishlistBooks() {
  const wishlist = getWishlist();

  if (wishlist.length === 0) {
    wishlistContainer.innerHTML = "<p>No books in your wishlist.</p>";
    return;
  }

  try {
    const promises = wishlist.map((id) =>
      fetch(`https://gutendex.com/books/${id}`).then((res) => res.json())
    );

    const books = await Promise.all(promises);

    books.forEach((book) => {
      const card = createBookCard(book);  
      wishlistContainer.appendChild(card);
    });
  } catch (err) {
    console.error("Failed to load wishlist books:", err);
  }
}

window.onload = fetchWishlistBooks;