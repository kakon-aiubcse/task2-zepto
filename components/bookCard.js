export function getWishlist() {
  return JSON.parse(localStorage.getItem("wishlist")) || [];
}

export function createBookCard(book) {
  const card = document.createElement("div");
  card.className = "book-card";

  const bookId = book.id.toString(); 

  const image = book.formats["image/jpeg"] || "https://via.placeholder.com/200x250";
  const author = book.authors[0]?.name || "Unknown Author";
  const genre = book.subjects[0] || "N/A";

  const isWishlisted = getWishlist().includes(bookId); 

  // Wishlist icon
  const wishlistIcon = document.createElement("div");
  wishlistIcon.className = `wishlist-icon ${isWishlisted ? "active" : ""}`;
  wishlistIcon.dataset.id = bookId;
  wishlistIcon.textContent = `${isWishlisted ? "❤️" : "🤍"}`;

  // Handle wishlist toggle
  wishlistIcon.addEventListener("click", (e) => {
    e.stopPropagation(); 
    e.preventDefault();  
    toggleWishlist(bookId, wishlistIcon); 
  });

  // Book content (inside link)
  const link = document.createElement("a");
  link.href = `book.html?id=${bookId}`;
  link.className = "book-card-link";
  link.innerHTML = `
    <img src="${image}" alt="${book.title}" class="book-card-img">
    <h4 class="book-card-title">${book.title}</h4>
    <p class="book-card-author">By: ${author}</p>
    <p class="book-card-genre"><small>${genre}</small></p>
    <p class="book-card-id"><small>ID: ${book.id}</small></p>
  `;

  card.appendChild(wishlistIcon);
  card.appendChild(link);

  return card;
}

// Toggle wishlist function
function toggleWishlist(bookId, iconElement) {
  let wishlist = getWishlist();

  if (wishlist.includes(bookId)) {
    wishlist = wishlist.filter((id) => id !== bookId);
    iconElement.textContent = "🤍"; 
    iconElement.classList.remove("active");
  } else {
    wishlist.push(bookId);
    iconElement.textContent = "❤️"; 
    iconElement.classList.add("active");
  }

  localStorage.setItem("wishlist", JSON.stringify(wishlist)); 
}