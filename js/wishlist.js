import { createBookCard } from "../components/bookcard.js";

const wishlistContainer = document.getElementById("wishlist-books");
const paginationContainer = document.getElementById("wishlist-pagination");

let wishlistBooks = [];
let currentPage = 1;
const booksPerPage = 2;

function getWishlist() {
  return JSON.parse(localStorage.getItem("wishlist") || "[]");
}

async function fetchWishlistBooks() {
  const wishlist = getWishlist();

  if (wishlist.length === 0) {
    wishlistContainer.innerHTML = "<p>No books in your wishlist.</p>";
    paginationContainer.innerHTML = "";
    return;
  }

  try {
    const promises = wishlist.map((id) =>
      fetch(`https://gutendex.com/books/${id}`).then((res) => res.json())
    );

    wishlistBooks = await Promise.all(promises);
    renderWishlistBooks();
  } catch (err) {
    console.error("Failed to load wishlist books:", err);
  }
}

function renderWishlistBooks() {
  wishlistContainer.innerHTML = "";

  const startIndex = (currentPage - 1) * booksPerPage;
  const endIndex = startIndex + booksPerPage;
  const paginatedBooks = wishlistBooks.slice(startIndex, endIndex);

  paginatedBooks.forEach((book) => {
    const card = createBookCard(book);
    wishlistContainer.appendChild(card);
  });

  renderPagination();
}

function renderPagination() {
    const totalPages = Math.ceil(wishlistBooks.length / booksPerPage);
    paginationContainer.innerHTML = "";
  
    const createPageButton = (page) => {
      const btn = document.createElement("button");
      btn.textContent = page;
      btn.className = `page-btn ${page === currentPage ? "active" : ""}`;
      btn.onclick = () => {
        currentPage = page;
        renderWishlistBooks();
      };
      return btn;
    };
  
    const createEllipsis = () => {
      const btn = document.createElement("button");
      btn.textContent = "...";
      btn.className = "page-btn ellipsis";
      btn.disabled = true;
      return btn;
    };
  
    const prevBtn = document.createElement("button");
    prevBtn.textContent = "Previous";
    prevBtn.className = "page-btn";
    prevBtn.disabled = currentPage === 1;
    prevBtn.onclick = () => {
      currentPage--;
      renderWishlistBooks();
    };
    paginationContainer.appendChild(prevBtn);
  
    if (totalPages <= 3) {
      for (let i = 1; i <= totalPages; i++) {
        paginationContainer.appendChild(createPageButton(i));
      }
    } else {
      if (currentPage <= 2) {
       
        for (let i = 1; i <= 3; i++) {
          paginationContainer.appendChild(createPageButton(i));
        }
        paginationContainer.appendChild(createEllipsis());
        paginationContainer.appendChild(createPageButton(totalPages));
      } else if (currentPage >= totalPages - 1) {
       
        paginationContainer.appendChild(createEllipsis());
        for (let i = totalPages - 2; i <= totalPages; i++) {
          paginationContainer.appendChild(createPageButton(i));
        }
      } else {
       
        paginationContainer.appendChild(createEllipsis());
        for (let i = currentPage - 1; i <= currentPage + 1; i++) {
          paginationContainer.appendChild(createPageButton(i));
        }
        paginationContainer.appendChild(createEllipsis());
        paginationContainer.appendChild(createPageButton(totalPages));
      }
    }
  
 
    const nextBtn = document.createElement("button");
    nextBtn.textContent = "Next";
    nextBtn.className = "page-btn";
    nextBtn.disabled = currentPage === totalPages;
    nextBtn.onclick = () => {
      currentPage++;
      renderWishlistBooks();
    };
    paginationContainer.appendChild(nextBtn);
  }
  

window.onload = fetchWishlistBooks;
