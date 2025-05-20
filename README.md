<a id="readme-top"></a>

# 📚 BookBuddy

<br />

<div align="center">
    <img src="./public/banner-app.jpg" alt="Logo" width="800" >
</div>
<br />

Welcome to **BookBuddy**, a simple and responsive React app that helps users discover new books and manage their personal reading list. This project was built as a take-home assignment using the Open Library API and demonstrates key React concepts including hooks, routing and components.

## 📋 &nbsp; Table of Contents

1. [Project Overview](#project-overview)
2. [Data Management](#data)
3. [Installation](#installation)
4. [Technologies Used](#tech)
4. [Testing](#testing)
5. [Contact](#contact)

## 🚀 &nbsp; <a id="project-overview">Project Overview</a>

- **Search for Books**: Quickly find books by typing a title or author’s name. Results are fetched in real time using the Open Library API.

- **Browse Results**: Display a clean list of books with cover images, titles, and author names.

- **View Details**: Click on any book to see more information (like subjects and publication year) displayed in a modal for a smooth and focused experience.

- **Save Favorites**: Easily add books you like to your personal reading list.

- **Persist Data**: Your reading list is stored with `localStorage` so it stays saved between sessions.

<p align="right">(<a href="#readme-top">back to top</a>)</p>

## 📦 &nbsp; <a id="data">Data Management</a>

All book data is fetched from [Open Library Search API](https://openlibrary.org/developers/api).

- Example search endpoint:
  [`https://openlibrary.org/search.json?title=the+hobbit`](https://openlibrary.org/search.json?title=the+hobbit)

- Book covers:
  [`https://covers.openlibrary.org/b/id/{cover_i}-M.jpg`](https://covers.openlibrary.org/b/id/{cover_i}-M.jpg)  

<p align="right">(<a href="#readme-top">back to top</a>)</p>

## 🔧  &nbsp; <a id="installation">Installation</a>

```bash
# Clone the repository
git clone https://github.com/JonaRhood/BookBuddy.git

# Navigate into the project folder
cd BookBuddy

# Install dependencies
npm install

# Run the development server and follow the instructions displayed in the terminal
npm run dev
```

<p align="right">(<a href="#readme-top">back to top</a>)</p>

## 🧪 &nbsp; <a id="testing">Testing</a>

```bash
# Make sure dependencies are installed
npm install

# Run all tests using Jest
npm run test
```
- _Tests can be found in the [test folder](./test/) located in the root of the project._


<p align="right">(<a href="#readme-top">back to top</a>)</p>

## ⚙️ &nbsp; <a id="tech">Technologies Used</a>

[![NEXT.JS][NEXT.js]][NEXTJS-url]
[![REACT][REACT.js]][REACT-url]
[![TYPESCRIPT][TYPESCRIPT.js]][TYPESCRIPT-url]
[![JAVASCRIPT][JAVASCRIPT.js]][JAVASCRIPT-url]
[![TAILWIND][TAILWIND]][TAILWIND-URL]
[![CSS][CSS.js]][CSS-url]
[![HTML5][HTML5.js]][HTML5-url]
[![GIT][GIT.js]][GIT-url]

<p align="right">(<a href="#readme-top">back to top</a>)</p>

## 👤 &nbsp; <a id="contact">Contact</a>

<a href="https://github.com/JonaRhood/reddit-client/graphs/contributors">
  <img src="https://contrib.rocks/image?repo=JonaRhood/reddit-client" />
</a>

[![LinkedIn][linkedin-shield]][linkedin-url] <br />
Jonathan Cano -  jonathancanofreta@gmail.com

<p align="right">(<a href="#readme-top">back to top</a>)</p>

[product-screenshot]: ./src/resources/img/screen2.png
[linkedin-shield]: https://img.shields.io/badge/-LinkedIn-blue.svg?style=for-the-badge&logo=linkedin&colorBlue
[linkedin-url]: https://www.linkedin.com/in/jonathancanocalduch
[React.js]: https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB
[React-url]: https://reactjs.org/
[Tailwind]: https://img.shields.io/badge/Tailwind%20css-20232A?style=for-the-badge&logo=tailwindcss
[Tailwind-url]: https://tailwindcss.com/
[Next.js]: https://img.shields.io/badge/NEXT.JS-20232A?style=for-the-badge&logo=next.js&logoColor=white
[nextjs-url]: https://nextjs.org/
[typescript.js]: https://img.shields.io/badge/TYPESCRIPT-20232A?style=for-the-badge&logo=typescript&logoColor=blue
[typescript-url]: https://www.typescriptlang.org/
[Javascript.js]: https://img.shields.io/badge/Javascript-20232A?style=for-the-badge&logo=JavaScript&logoColor=Y
[Javascript-url]: https://developer.mozilla.org/es/docs/Web/JavaScript
[CSS.js]: https://img.shields.io/badge/CSS-20232A?style=for-the-badge&logo=css&logoColor=306af1
[CSS-url]: https://developer.mozilla.org/es/docs/Web/CSS
[HTML5.js]: https://img.shields.io/badge/HTML5-20232A?style=for-the-badge&logo=html5&logoColor=e8571f
[HTML5-url]: https://developer.mozilla.org/es/docs/Glossary/HTML5
[Git.js]: https://img.shields.io/badge/git-20232A?style=for-the-badge&logo=git&logoColor=e8571f
[Git-url]: https://git-scm.com/
