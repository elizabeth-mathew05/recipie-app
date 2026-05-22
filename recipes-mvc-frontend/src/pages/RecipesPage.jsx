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
    <main className="app-shell">
      <Header />
      <StatusMessage type={status.type} message={status.message} />

      <section className="layout">
        <RecipeForm
          initialValues={editingRecipe}
          onSubmit={handleSubmit}
          submitting={submitting}
          onCancel={() => setEditingRecipe(null)}
        />

        <section className="panel list-panel">
          <div className="panel__header">
            <div>
              <p className="eyebrow">Saved recipes</p>
              <h2>{recipes.length} recipes stored</h2>
            </div>
          </div>

          {loading ? (
            <div className="loader">Loading recipes...</div>
          ) : recipes.length === 0 ? (
            <EmptyState />
          ) : (
            <div className="recipe-grid">
              {recipes.map((recipe) => (
                <RecipeCard key={recipe._id} recipe={recipe} onEdit={setEditingRecipe} onDelete={handleDelete} />
              ))}
            </div>
          )}
        </section>
      </section>
    </main>
  );
};

export default RecipesPage;
