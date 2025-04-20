# FoodRecipe - Your Culinary Companion

A modern, responsive web application that helps you discover and save your favorite recipes. Built with React and powered by the Forkify API, this application provides an intuitive interface for searching recipes, viewing detailed instructions, and managing your favorite culinary discoveries.

## Features

- **Recipe Search**: Instantly search through thousands of recipes
- **Detailed Recipe View**: Get comprehensive information about each recipe, including:
  - Ingredients with quantities
  - Cooking instructions
  - Publisher information
  - High-quality recipe images
- **Favorites System**: 
  - Save your favorite recipes for quick access
  - Persistent storage using localStorage
  - Easy management of your recipe collection
- **Responsive Design**:
  - Seamless experience across all devices
  - Mobile-first approach
  - Beautiful, intuitive interface
- **Real-time Updates**: Instant search results and favorites management

## Tech Stack

- **Frontend Framework**: React 18
- **Routing**: React Router v6
- **Styling**: 
  - Tailwind CSS for utility-first styling
  - Custom CSS for specific components
- **Icons**: Lucide React for beautiful, consistent iconography
- **State Management**: React Context API
- **API Integration**: Forkify API v2
- **Build Tool**: Vite
- **Type Safety**: TypeScript
- **Development Tools**:
  - ESLint for code quality
  - PostCSS for CSS processing
  - Autoprefixer for browser compatibility

## Setup Instructions

1. **Clone the Repository**
   ```bash
   git clone <repository-url>
   cd food-recipe
   ```

2. **Install Dependencies**
   ```bash
   npm install
   ```

3. **Environment Setup**
   - No additional environment variables needed
   - The application uses public APIs

4. **Development Server**
   ```bash
   npm run dev
   ```
   - Access the application at `http://localhost:5173`

5. **Build for Production**
   ```bash
   npm run build
   ```

6. **Preview Production Build**
   ```bash
   npm run preview
   ```

## Usage

1. **Search Recipes**
   - Use the search bar in the navigation
   - Enter ingredients or recipe names
   - Results appear instantly

2. **View Recipe Details**
   - Click on any recipe card
   - View full ingredients list
   - See cooking instructions

3. **Manage Favorites**
   - Click the heart icon to save/unsave
   - Access favorites through the navigation
   - Favorites persist across sessions
