import { createBookCard } from "../components/bookcard.js";
let allBooks = [];
let filteredBooks = [];
let currentPage = 1;
const booksPerPage = 8;

async function fetchBooks() {
  try {
    const response = await fetch("https://gutendex.com/books/?languages=en");
    const data = await response.json();
    allBooks = data.results;
    filteredBooks = [...allBooks];

    populateGenres(allBooks);
    renderBooks();
    renderPagination();
  } catch (error) {
    console.error("Error fetching books:", error);
  }
}

function renderBooks() {
  const bookListContainer = document.getElementById("book-list");
  bookListContainer.innerHTML = "";

  const startIndex = (currentPage - 1) * booksPerPage;
  const endIndex = startIndex + booksPerPage;
  const paginatedBooks = filteredBooks.slice(startIndex, endIndex);

  paginatedBooks.forEach((book) => {
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

  filteredBooks = allBooks.filter((book) => {
    const titleMatch = book.title.toLowerCase().includes(titleQuery);
    const genreMatch = genreQuery === "" || book.subjects[0] === genreQuery;
    return titleMatch && genreMatch;
  });

  currentPage = 1; 
  renderBooks();
  renderPagination();
}

function renderPagination() {
  const paginationContainer = document.getElementById("pagination");
  paginationContainer.innerHTML = "";

  const totalPages = Math.ceil(filteredBooks.length / booksPerPage);

  const createPageButton = (page) => {
    const btn = document.createElement("button");
    btn.textContent = page;
    btn.className = `page-btn ${page === currentPage ? "active" : ""}`;
    btn.onclick = () => {
      currentPage = page;
      renderBooks();
      renderPagination();
    };
    return btn;
  };

  const createEllipsis = () => {
    const ellipsisBtn = document.createElement("button");
    ellipsisBtn.textContent = "...";
    ellipsisBtn.className = "page-btn ellipsis";
    ellipsisBtn.disabled = true;
    return ellipsisBtn;
  };

  
  const prevBtn = document.createElement("button");
  prevBtn.textContent = "Previous";
  prevBtn.className = "page-btn";
  prevBtn.disabled = currentPage === 1;
  prevBtn.onclick = () => {
    currentPage--;
    renderBooks();
    renderPagination();
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
    renderBooks();
    renderPagination();
  };
  paginationContainer.appendChild(nextBtn);
}



window.onload = () => {
  fetchBooks();
  document.getElementById("search-bar").addEventListener("input", filterBooks);
  document.getElementById("genre-filter").addEventListener("change", filterBooks);
};
