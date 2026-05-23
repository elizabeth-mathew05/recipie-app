function Header({ onAddClick }) {
  return (
    <header className="hero">
      <div className="hero__copy">
        <p className="eyebrow">Recipe Dashboard</p>
        <h1>Cook something great today</h1>
        <p className="hero__text">
          Create, edit, and organize your favorite recipes in one place.
        </p>
      </div>

      <div className="hero__card">
        <button type="button" className="button button--primary" onClick={onAddClick}>
          Add Recipe
        </button>
      </div>
    </header>
  );
}

export default Header;