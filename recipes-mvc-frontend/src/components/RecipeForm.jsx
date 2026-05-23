import { useEffect, useState } from 'react';

const emptyForm = {
  title: '',
  description: '',
  ingredients: '',
  instructions: '',
  prepTime: '',
  cookTime: '',
  servings: '',
  category: '',
  imageUrl: ''
};

const RecipeForm = ({ initialValues, onSubmit, submitting, onCancel }) => {
  const [formData, setFormData] = useState(emptyForm);

  useEffect(() => {
    if (initialValues) {
      setFormData({
        title: initialValues.title || '',
        description: initialValues.description || '',
        ingredients: Array.isArray(initialValues.ingredients)
          ? initialValues.ingredients.join('\n')
          : '',
        instructions: Array.isArray(initialValues.instructions)
          ? initialValues.instructions.join('\n')
          : '',
        prepTime: initialValues.prepTime ?? '',
        cookTime: initialValues.cookTime ?? '',
        servings: initialValues.servings ?? '',
        category: initialValues.category || '',
        imageUrl: initialValues.imageUrl || ''
      });
      return;
    }

    setFormData(emptyForm);
  }, [initialValues]);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((current) => ({ ...current, [name]: value }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    onSubmit(formData);

    if (!initialValues) {
      setFormData(emptyForm);
    }
  };

  return (
    <form className="panel form recipe-form two-column" onSubmit={handleSubmit}>
      <div className="panel__header" style={{ gridColumn: '1 / -1', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <p className="eyebrow">{initialValues ? 'Update recipe' : 'New recipe'}</p>
          <h2>{initialValues ? 'Edit selected recipe' : 'Create a recipe'}</h2>
        </div>
        {initialValues ? (
          <button type="button" className="button button--ghost" onClick={onCancel}>
            Cancel
          </button>
        ) : null}
      </div>

      <div className="col">
        <label>
          Title
          <input name="title" value={formData.title} onChange={handleChange} placeholder="Mango smoothie" />
        </label>

        <label>
          Prep time
          <input type="number" min="0" name="prepTime" value={formData.prepTime} onChange={handleChange} />
        </label>

        <label>
          Servings
          <input type="number" min="1" name="servings" value={formData.servings} onChange={handleChange} />
        </label>

        <label>
          Image URL
          <input name="imageUrl" value={formData.imageUrl} onChange={handleChange} placeholder="https://..." />
        </label>
      </div>

      <div className="col">
        <label>
          Category
          <input name="category" value={formData.category} onChange={handleChange} placeholder="Breakfast" />
        </label>

        <label>
          Cook time
          <input type="number" min="0" name="cookTime" value={formData.cookTime} onChange={handleChange} />
        </label>

        <label>
          
        </label>
      </div>

      <div style={{ gridColumn: '1 / -1' }}>
        <label>
          Description
          <textarea name="description" value={formData.description} onChange={handleChange} rows="3" />
        </label>

        <label>
          Ingredients
          <textarea
            name="ingredients"
            value={formData.ingredients}
            onChange={handleChange}
            rows="5"
            placeholder="One ingredient per line"
          />
        </label>

        <label>
          Instructions
          <textarea
            name="instructions"
            value={formData.instructions}
            onChange={handleChange}
            rows="6"
            placeholder="One instruction per line"
          />
        </label>
      </div>

      <div className="form-actions" style={{ gridColumn: '1 / -1' }}>
        <button className="button" type="button" onClick={onCancel} disabled={submitting}>
          Cancel
        </button>
        <button className="button button--primary" type="submit" disabled={submitting}>
          {submitting ? 'Saving...' : initialValues ? 'Update recipe' : 'Create recipe'}
        </button>
      </div>
    </form>
  );
};

export default RecipeForm;
