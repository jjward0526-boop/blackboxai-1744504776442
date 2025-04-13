
Built by https://www.blackbox.ai

---

```markdown
# AI Art Generator

## Project Overview

The **AI Art Generator** is a web application that enables users to create stunning artwork using artificial intelligence. Simply describe your desired artwork, and our AI will transform your ideas into beautiful art pieces. It's designed to be user-friendly, enabling both novices and experienced artists to explore their creativity and generate unique artwork effortlessly.

## Installation

To run the AI Art Generator locally, follow these steps:

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/ai-art-generator.git
   cd ai-art-generator
   ```

2. Open the `index.html` file directly in your web browser to view the application.

   Alternatively, you can set up a local server using tools like [Live Server](https://marketplace.visualstudio.com/items?itemName=ritwickdey.LiveServer) for a better experience with local development.

## Usage

1. Open the application in a web browser.
2. Click on the "Generate Art" link in the navigation menu.
3. Enter a detailed description of the artwork you want to generate in the provided text area.
4. Click on the "Generate Art" button.
5. View your generated art piece, and choose to save it to your history or generate a new one.

## Features

- **Easy to Use**: No artistic skills required; just describe your vision and let the AI do the rest.
- **Instant Results**: Get your AI-generated artwork in seconds.
- **Save Your History**: Keep track of all your generated artwork in your personal gallery.
- **Responsive Design**: Works seamlessly on different device sizes.

## Dependencies

The application uses the following external libraries:
- [Tailwind CSS](https://tailwindcss.com/): For styling the UI components.
- [Font Awesome](https://fontawesome.com/): For icons in navigation and buttons.
- [Google Fonts](https://fonts.google.com/): Specifically using the 'Poppins' font for its readability.

The `package.json` file is not included in this project, but necessary libraries are linked via CDN in the HTML files.

## Project Structure

```
ai-art-generator/
│
├── index.html                 # Main landing page of the application
├── generate_art.html          # Page for generating AI artwork
└── history.html               # Page to view saved artworks
```

### HTML Files

1. **index.html**: The homepage that describes the project and provides navigation to the other sections.
2. **generate_art.html**: The form where users can input descriptions to generate artwork.
3. **history.html**: A display of the user's saved artwork history with options to manage it.

## License

This project is open-source and available under the [MIT License](LICENSE).
```