# MovieHub Frontend

MovieHub Frontend is a React-based web application built with TypeScript and Vite. It provides a user-friendly interface for browsing movies, creating posts, and interacting with user-character data.

## Features

- **Responsive Navbar**: A visually appealing navigation bar with dark mode support.
- **Movie Carousel**: A carousel showcasing popular movies with hover effects.
- **Post Creation**: A form to share thoughts about movies, with validation and error handling.
- **User-Character List**: Displays a list of users and their favorite characters for desktop users.
- **User-Character Drawer**: A mobile-friendly drawer for user-character data.
- **Dark Mode**: Toggle between light and dark themes.


## Installation

1. Clone the repository:
   ```sh
   git clone https://github.com/your-username/moviehub-frontend.git
   cd moviehub-frontend
   ```

2. Install dependencies:
   ```sh
   npm install
   ```

3. Start the development server:
   ```sh
   npm run dev
   ```

4. Open the app in your browser at [http://localhost:5173](http://localhost:5173).

## Scripts

- `npm run dev`: Start the development server.
- `npm run build`: Build the app for production.
- `npm run preview`: Preview the production build.
- `npm run lint`: Run ESLint to check for code issues.

## Technologies Used

- **React**: UI library for building components.
- **TypeScript**: Strongly typed JavaScript for better code quality.
- **Vite**: Fast build tool for modern web projects.
- **Tailwind CSS**: Utility-first CSS framework.
- **Radix UI**: Accessible UI primitives.
- **Embla Carousel**: Lightweight carousel library.

## Deployment

The app is containerized using Docker and served with Nginx. To deploy:

1. Build the Docker image:
   ```sh
   docker build -t moviehub-frontend .
   ```

2. Run the container:
   ```sh
   docker run -p 3000:80 moviehub-frontend
   ```

3. Access the app at [http://localhost:3000](http://localhost:3000).

## Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository.
2. Create a new branch:
   ```sh
   git checkout -b feature-name
   ```
3. Commit your changes:
   ```sh
   git commit -m "Add feature-name"
   ```
4. Push to your branch:
   ```sh
   git push origin feature-name
   ```
5. Open a pull request.

## License

This project is licensed under the MIT License. See the LICENSE file for details.

## Acknowledgments

- Icons by [Lucide](https://lucide.dev/)
- Carousel by [Embla Carousel](https://www.embla-carousel.com/)
- UI components inspired by [Radix UI](https://www.radix-ui.com/)

