export function createBookCard(book) {
    const card = document.createElement('div');
    card.className = 'book-card';
  
    // Fallback image if book doesn't have an image
    const image = book.formats['image/jpeg'] || 'https://via.placeholder.com/200x250';
    const author = book.authors[0]?.name || 'Unknown Author';
    const genre = book.subjects[0] || 'N/A';
  
    card.innerHTML = `
      <a href="book.html?id=${book.id}" class="book-card-link">
        <img src="${image}" alt="${book.title}" class="book-card-img">
        <h4 class="book-card-title">${book.title}</h4>
        <p class="book-card-author">By: ${author}</p>
        <p class="book-card-genre"><small>${genre}</small></p>
        <p class="book-card-id"><small>ID: ${book.id}</small></p>
      </a>
    `;
  
    return card;
  }
  