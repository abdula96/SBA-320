Rick and Morty Character Viewer

Project Overview

This project is a React application that fetches and displays character data from the Rick and Morty API. The application leverages Redux Toolkit for state management and implements pagination, character searching, and filtering. It is designed to showcase the characters, locations, and episodes from the popular animated series "Rick and Morty."


Technologies Used

React: A JavaScript library for building user interfaces.
Redux Toolkit: A library for efficient Redux state management, including async logic.
Vite: A fast build tool for modern web development.
Axios: A promise-based HTTP client for making API requests.
CSS: Styling for the components.
API Details


The Rick and Morty API is used to fetch data about characters, locations, and episodes. The endpoints used in the project include:

Character API: https://rickandmortyapi.com/api/character/
Parameters: Supports pagination (page numbers), and allows filtering by character attributes (e.g., species, status).
Endpoints
GET /api/character/ - Fetches a list of characters.
Example response:
{
  "info": { "count": 826, "pages": 42, "next": "https://rickandmortyapi.com/api/character?page=2", "prev": null },
  "results": [ ... ]
}
How to Run the Project


Follow these steps to set up and run the project locally:

Clone the repository:
git clone https://github.com/yourusername/rick-and-morty-character-viewer.git
Navigate to the project directory:
cd rick-and-morty-character-viewer
Install dependencies:
npm install
Start the development server:
npm run dev
Open your browser and navigate to http://localhost:3000 to view the project.
Features

Character List
The character list is fetched from the Rick and Morty API and displayed on the page. Each character's name, status, species, and gender are shown.

Pagination
Pagination is implemented to manage the large number of characters. The application fetches characters page by page and allows navigation between pages. The current page and the total number of pages are tracked in the state.

Why is nextPage tracked for pagination? The nextPage state keeps track of the URL for the next set of characters to be loaded. This helps in efficient data fetching and handling the large number of characters without overwhelming the UI.
Searching and Filtering
Users can search for characters by name. The search input is connected to the Redux store, allowing for easy updates and efficient filtering of character data.

Error Handling
If an API request fails (e.g., no internet or invalid endpoint), the app displays a user-friendly error message.

Redux Logic and API Calls

Redux Toolkit
The state of the application is managed using Redux Toolkit. The following parts are crucial:

charactersSlice.js

Handles the character data, including the async logic to fetch characters from the API.

fetchCharacters (async thunk): Fetches characters from the Rick and Morty API. It accepts parameters like the current page and any search filters.
export const fetchCharacters = createAsyncThunk(
  'characters/fetchCharacters',
  async ({ page, search }) => {
    const response = await axios.get(`https://rickandmortyapi.com/api/character/`, {
      params: {
        page,
        name: search, // Filter by character name
      },
    });
    return response.data;
  }
);
fetchCharacters: This async thunk makes a request to the API to retrieve character data for a specific page. It supports optional filtering based on the character's name.
Request: The API call is made using axios, and query parameters (page and search) are passed.
Response: The response includes character data, as well as pagination info like the next page URL.
Error Handling
If the API request fails or there is a network issue, an error message is shown.

Future Improvements

Character Detail View: Add a detailed view for each character, showing more information like the origin, location, and episode appearances.
Location and Episode Lists: Add views for locations and episodes from the API.
State Persistence: Use localStorage or sessionStorage to persist state (e.g., current page or search query) across page reloads.
Contributors

[Abdula Ahmed]: Lead Developer and Project Manager
[]: API Integration and Redux Logic
