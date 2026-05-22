const RecipeCard = ({ recipe, onEdit, onDelete }) => {
  return (
    <article className="recipe-card">
      <div className="recipe-card__media">
        {recipe.imageUrl ? (
          <img src={recipe.imageUrl} alt={recipe.title} />
        ) : (
          <div className="recipe-card__fallback">{recipe.title?.charAt(0)?.toUpperCase()}</div>
        )}
      </div>
      <div className="recipe-card__body">
        <div className="recipe-card__meta">
          <span>{recipe.category || 'General'}</span>
          <span>{recipe.totalTime || 0} min</span>
        </div>
        <h3>{recipe.title}</h3>
        <p>{recipe.description || 'No description provided.'}</p>
        <div className="recipe-card__stats">
          <span>{recipe.servings || 1} servings</span>
          <span>{recipe.ingredients?.length || 0} ingredients</span>
        </div>
        <div className="recipe-card__actions">
          <button type="button" className="button button--soft" onClick={() => onEdit(recipe)}>
            Edit
          </button>
          <button type="button" className="button button--danger" onClick={() => onDelete(recipe._id)}>
            Delete
          </button>
        </div>
      </div>
    </article>
  );
};

export default RecipeCard;
