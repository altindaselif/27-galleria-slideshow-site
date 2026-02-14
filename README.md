# Galleria Slideshow Site 🎨

A responsive art gallery slideshow built with **Vanilla JavaScript**. This project focuses on handling complex layouts like masonry grids, asynchronous data fetching and managing slideshow states without relying on external libraries.

## 🚀 Overview

The goal was to create an immersive digital art gallery. The application features a dynamic masonry grid layout for the gallery view and a fully functional slideshow mode with autoplay capabilities. All content is rendered dynamically from a JSON file, ensuring scalability and separation of concerns.

## 🔗 Links

- **Live Site:** [View Live Demo](https://altindaselif.github.io/27-galleria-slideshow-site/)
- **Code:** [View GitHub Repository](https://github.com/altindaselif/27-galleria-slideshow-site)

## 💡 Key Features

- **🧱 Masonry Layout:** A custom JavaScript-driven grid that arranges images vertically based on screen width.
- **⏯️ Slideshow Logic:** Autoplay functionality with start/stop controls and a visual progress bar.
- **🖼️ Lightbox View:** A modal overlay to view high-resolution versions of the artwork.
- **📂 JSON Data Integration:** Content is fetched asynchronously to populate the gallery.
- **📱 Responsive Design:** Seamlessly adapts layout and typography across mobile, tablet, and desktop screens.

## 🛠️ Technical Implementation

### 1. JavaScript-Driven Masonry Layout

Standard CSS Grid does not natively support a true masonry layout (waterfall effect) without leaving vertical gaps.

- **Solution:** A **`renderMasonry` function** was developed to dynamically distribute gallery items into columns. The number of columns is determined by checking **`window.innerWidth`**. DOM elements are appended to specific column containers via JavaScript to ensure a balanced vertical flow. A **debounce mechanism** was applied to the resize event listener to optimize performance during window resizing.

### 2. Slideshow State & Timer Management

Managing the interaction between manual navigation (Next/Prev buttons) and the automatic slideshow timer required careful state handling.

- **Solution:** The slideshow logic was encapsulated within **centralized functions**. When manual navigation occurs, the existing **`setInterval`** is cleared and immediately restarted. This ensures that the user has the full duration to view the next slide without being interrupted by a pre-existing timer cycle.

### 3. Asynchronous Data Handling

To simulate a real-world application structure, data is not hardcoded in the HTML.

- **Solution:** An **`async/await` pattern** was utilized to fetch data from a local `data.json` file. The fetched data is stored globally, and rendering functions are triggered only after the **successful retrieval** of data, preventing runtime errors on empty states.

## 📸 Screenshots

- [View Desktop Version](./desktop-screenshot.png)
- [View Tablet Version](./tablet-screenshot.png)
- [View Mobile Version](./mobile-screenshot.png)

## 🧰 Built With

- **Semantic HTML5**
- **CSS3 (Grid, Flexbox & Custom Properties)**
- **Vanilla JavaScript (ES6+, Async/Await)**
- **Responsive Design Principles**

## ✍️ Author

- **LinkedIn:** [Elif Altındaş](https://www.linkedin.com/in/elifaltindas/)
- **Frontend Mentor:** [@altindaselif](https://www.frontendmentor.io/profile/altindaselif)
- **GitHub:** [@altindaselif](https://github.com/altindaselif)
