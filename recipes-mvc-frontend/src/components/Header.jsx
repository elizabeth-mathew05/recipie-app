function Header({ onAddClick }) {
  return (
    <header className="hero">
      <div className="hero__copy">
        <p className="eyebrow">Recipe Dashboard</p>
        <h2>Cook something great today</h2>
        <p className="hero__text">
          Create, edit, and organize your favorite recipes in one place.
        </p>
      </div>

    </header>
  );
}

export default Header;