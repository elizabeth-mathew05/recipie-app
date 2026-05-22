const Header = () => {
  return (
    <header className="hero">
      <div className="hero__copy">
        <p className="eyebrow">Recipes MVC</p>
        <h1>Manage recipes with a fast React frontend.</h1>
        <p className="hero__text">
          Create, edit, and delete recipes from a polished interface that talks to an Express and
          Mongoose backend.
        </p>
      </div>
      <div className="hero__card">
        <span>React UI</span>
        <strong>Recipe Manager</strong>
      </div>
    </header>
  );
};

export default Header;
