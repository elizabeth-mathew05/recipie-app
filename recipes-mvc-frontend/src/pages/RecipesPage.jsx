import { useEffect, useState } from 'react';
import Header from '../components/Header';
import StatusMessage from '../components/StatusMessage';
import RecipeForm from '../components/RecipeForm';
import RecipeCard from '../components/RecipeCard';
import EmptyState from '../components/EmptyState';
import { createRecipe, deleteRecipe, getAllRecipes, updateRecipe } from '../services/recipeService';

const RecipesPage = () => {
  const [recipes, setRecipes] = useState([]);
  const [editingRecipe, setEditingRecipe] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [status, setStatus] = useState({ type: '', message: '' });

  const loadRecipes = async () => {
    try {
      setLoading(true);
      const response = await getAllRecipes();
      setRecipes(response.data.recipes || []);
    } catch (error) {
      setStatus({ type: 'error', message: error.message });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadRecipes();
  }, []);

  const handleSubmit = async (payload) => {
    try {
      setSubmitting(true);
      setStatus({ type: '', message: '' });

      const normalizedPayload = {
        ...payload,
        prepTime: payload.prepTime === '' ? undefined : payload.prepTime,
        cookTime: payload.cookTime === '' ? undefined : payload.cookTime,
        servings: payload.servings === '' ? undefined : payload.servings
      };

      if (editingRecipe) {
        await updateRecipe(editingRecipe._id, normalizedPayload);
        setStatus({ type: 'success', message: 'Recipe updated successfully.' });
      } else {
        await createRecipe(normalizedPayload);
        setStatus({ type: 'success', message: 'Recipe created successfully.' });
      }
      // close modal and clear editing state
      setIsModalOpen(false);
      setEditingRecipe(null);
      await loadRecipes();
    } catch (error) {
      setStatus({ type: 'error', message: error.message });
    } finally {
      setSubmitting(false);
    }
  };

  const handleDelete = async (id) => {
    const confirmed = window.confirm('Delete this recipe?');
    if (!confirmed) {
      return;
    }

    try {
      await deleteRecipe(id);
      setStatus({ type: 'success', message: 'Recipe deleted successfully.' });
      await loadRecipes();
    } catch (error) {
      setStatus({ type: 'error', message: error.message });
    }
  };

  return (
    <main className="app-shell app-shell--wide">
      <Header />
      <StatusMessage type={status.type} message={status.message} />

      <section className="layout">
        <section className="panel list-panel">
          <div className="panel__header">
            <div>
              <p className="eyebrow">Saved recipes</p>
              <h2>{recipes.length} recipes stored</h2>
            </div>
            <div>
              <button type="button" className="button button--soft" onClick={() => { setEditingRecipe(null); setIsModalOpen(true); }}>
                Add Recipe
              </button>
            </div>
          </div>

          {loading ? (
            <div className="loader">Loading recipes...</div>
          ) : recipes.length === 0 ? (
            <EmptyState />
          ) : (
            <div className="recipe-grid">
              {recipes.map((recipe) => (
                <RecipeCard
                  key={recipe._id}
                  recipe={recipe}
                  onEdit={(r) => { setEditingRecipe(r); setIsModalOpen(true); }}
                  onDelete={handleDelete}
                />
              ))}
            </div>
          )}
        </section>
      </section>

      {isModalOpen && (
        <div
          role="dialog"
          aria-modal="true"
          style={{
            position: 'fixed',
            inset: 0,
            background: 'rgba(20, 15, 10, 0.55)',
            zIndex: 99,
            display: 'grid',
            placeItems: 'center',
            padding: '20px',
          }}
        >
          <div
            className="panel"
            style={{
              width: 'min(720px, 100%)',
              maxHeight: '90vh',
              overflowY: 'auto',
            }}
          >
            <div className="panel__header">
              <h2>{editingRecipe ? 'Edit Recipe' : 'Create Recipe'}</h2>
              <button type="button" className="button button--ghost" onClick={() => { setIsModalOpen(false); setEditingRecipe(null); }}>
                Close
              </button>
            </div>

            <RecipeForm
              initialValues={editingRecipe}
              onSubmit={handleSubmit}
              submitting={submitting}
              onCancel={() => { setIsModalOpen(false); setEditingRecipe(null); }}
            />
          </div>
        </div>
      )}
    </main>
  );
};

export default RecipesPage;
