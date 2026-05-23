import React, { useMemo, useState } from 'react';

function RecipeCard({ recipe, onEdit, onDelete }) {
  const imageCandidates = useMemo(() => {
    const source = recipe?.imageUrl || recipe?.image || recipe?.thumbnailUrl || '';

    if (!source) {
      return [];
    }

    return [
      source,
      `http://localhost:5000/api/image-proxy?url=${encodeURIComponent(source)}`,
      `https://images.weserv.nl/?url=${encodeURIComponent(source)}`,
    ];
  }, [recipe?.image, recipe?.imageUrl, recipe?.thumbnailUrl]);

  const [imageIndex, setImageIndex] = useState(0);
  const imageSrc = imageCandidates[imageIndex] || '';

  return (
    <article className="recipe-card">
      <div className="recipe-card__media">
        {imageSrc ? (
          <img
            src={imageSrc}
            alt={recipe?.title || 'Recipe image'}
            loading="lazy"
            referrerPolicy="no-referrer"
            onError={() => {
              setImageIndex((current) => {
                const next = current + 1;
                return next < imageCandidates.length ? next : current;
              });
            }}
          />
        ) : (
          <div className="recipe-card__fallback">{(recipe?.title || 'R').charAt(0)}</div>
        )}
      </div>

      <div className="recipe-card__body">
        <div className="recipe-card__meta">
          <span>{recipe?.category || recipe?.cuisine || 'General'}</span>
          <span>{recipe?.totalTime ? `${recipe.totalTime} min` : ''}</span>
        </div>

        <h3>{recipe?.title}</h3>
        <p>{recipe?.description || recipe?.summary || 'No description provided.'}</p>

        <div className="recipe-card__stats">
          <span>{recipe?.servings ? `${recipe.servings} servings` : ''}</span>
          <span>{recipe?.ingredients?.length ? `${recipe.ingredients.length} ingredients` : ''}</span>
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
}

export default RecipeCard;