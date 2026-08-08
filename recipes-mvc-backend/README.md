# Recipes App API

CRUD documentation for the Recipes API. Each request includes a sample payload and the expected response shape.

## GET Recipe By Id

Endpoint:

http://localhost:5000/api/recipes/6650c2a2f0a12345ab678901

Returns a single recipe by MongoDB ID.

Example Request (curl):

```bash
curl --location 'http://localhost:5000/api/recipes/6650c2a2f0a12345ab678901'
```

Example Response (200 OK):

```json
{
	"status": "success",
	"data": {
		"recipe": {
			"_id": "6650c2a2f0a12345ab678901",
			"title": "Creamy Pasta"
		}
	}
}
```

## PATCH Update Recipe

Endpoint:

http://localhost:5000/api/recipes/6650c2a2f0a12345ab678901

Updates fields on a recipe.

Headers:

- Content-Type: application/json

Request Body:

```json
{
	"title": "Creamy Garlic Pasta",
	"servings": 4
}
```

Example Request (curl):

```bash
curl --location --request PATCH 'http://localhost:5000/api/recipes/6650c2a2f0a12345ab678901' \
--header 'Content-Type: application/json' \
--data '{
	"title": "Creamy Garlic Pasta",
	"servings": 4
}'
```

Example Response (200 OK):

```json
{
	"status": "success",
	"message": "Recipe updated successfully",
	"data": {
		"recipe": {
			"title": "Creamy Garlic Pasta"
		}
	}
}
```

## DELETE Delete Recipe

Endpoint:

http://localhost:5000/api/recipes/6650c2a2f0a12345ab678901

Deletes a recipe by ID.

Example Request (curl):

```bash
curl --location --request DELETE 'http://localhost:5000/api/recipes/6650c2a2f0a12345ab678901'
```

Example Response (200 OK):

```json
{
	"status": "success",
	"message": "Recipe deleted successfully",
	"data": null
}
```
## Public API documentation: https://documenter.getpostman.com/view/48839502/2sBY4TqJ1M