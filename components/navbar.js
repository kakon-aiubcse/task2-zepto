export function renderNavbar() {
  document.getElementById('navbar').innerHTML = `
    <nav class="navbar">
      <a href="index.html" class="logo">BookStore</a>
      <div class="navbar-links">
        <a href="index.html">Home</a>
        <a href="wishlist.html">Wishlist</a>
      </div>
    </nav>
  `;
}