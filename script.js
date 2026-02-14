const headerStartButton = document.querySelector(".header-start-button");
const headerStopButton = document.querySelector(".header-stop-button");
const headerReturnButton = document.querySelector(".header-return-button");

const galleryContainer = document.querySelector(".gallery-container");
const galleryItems = document.querySelectorAll(".gallery-item");

const slideContainer = document.querySelector(".slideshow-container");
const slideImg = document.querySelector(".slideshow-img");
const slideViewImgButton = document.querySelector(".slideshow-view-img-button");
const slideTitle = document.querySelector(".slideshow-title");
const slideName = document.querySelector(".slideshow-name");
const slidePainterImg = document.querySelector(".slideshow-painter-img");
const slideBgYear = document.querySelector(".slideshow-bg-year");
const slideInfoText = document.querySelector(".slideshow-info-text");
const slideInfoLink = document.querySelector(".slideshow-info-link");

const footerContainer = document.querySelector(".footer-container");
const footerProgressFill = document.querySelector(".footer-progress-fill");
const footerTitle = document.querySelector(".footer-title");
const footerName = document.querySelector(".footer-name");
const footerPrevButton = document.querySelector(".footer-prev-button");
const footerNextButton = document.querySelector(".footer-next-button");

const lightboxOverlay = document.querySelector(".lightbox-overlay");
const lightboxCloseButton = document.querySelector(".lightbox-close-button");
const lightboxImg = document.querySelector(".lightbox-img");

const masonryItems = [...galleryItems];
let jsonData = null;
let currentIndex = 0;
let slideInterval = null;
let resizeTimeout = null;

const fetchData = async () => {
  try {
    const response = await fetch("./data.json");

    if (!response.ok) throw new Error("Failed to load data.");

    jsonData = await response.json();

    renderMasonry();
  } catch (error) {
    console.error("Error:", error);
  }
};
fetchData();

const renderMasonry = () => {
  const w = window.innerWidth;
  let colCount = 4;
  if (w <= 768) colCount = 2;
  if (w <= 384) colCount = 1;

  galleryContainer.innerHTML = "";

  const columns = [];
  for (let i = 0; i < colCount; i++) {
    const col = document.createElement("div");
    col.classList.add("gallery-column");
    galleryContainer.appendChild(col);
    columns.push(col);
  }

  masonryItems.forEach((item, index) => {
    let targetColIndex = index % colCount;

    if (index === 14) {
      if (colCount === 4) {
        targetColIndex = 3;
      } else if (colCount === 2) {
        targetColIndex = 1;
      }
    }

    columns[targetColIndex].appendChild(item);
  });
};

const updateSlideUI = () => {
  if (!jsonData) return;

  const currentData = jsonData[currentIndex];
  const totalItems = jsonData.length;

  // Slide Content
  renderSlideContent(currentData);

  // Footer Progress Bar
  updateProgressBar(currentIndex, totalItems);

  // Footer Navigation Buttons (Enable/Disable)
  updateFooterButtons(currentIndex, totalItems);
};

const updateHeaderButtons = (mode) => {
  headerStartButton.classList.toggle("hidden", mode !== "gallery");
  headerStopButton.classList.toggle("hidden", mode !== "playing");
  headerReturnButton.classList.toggle("hidden", mode !== "manual");
};

const renderSlideContent = (data) => {
  slideImg.src = data.images.hero.large;
  slideImg.alt = data.name;
  slideTitle.textContent = data.name;
  slideName.textContent = data.artist.name;
  slidePainterImg.src = data.artist.image;
  slidePainterImg.alt = data.artist.name;
  slideBgYear.textContent = data.year;
  slideInfoText.textContent = data.description;
  slideInfoLink.href = data.source;

  footerTitle.textContent = data.name;
  footerName.textContent = data.artist.name;

  lightboxImg.src = data.images.gallery;
};

const updateProgressBar = (index, total) => {
  const percent = ((index + 1) / total) * 100;
  footerProgressFill.style.width = `${percent}%`;
};

const updateFooterButtons = (index, total) => {
  footerPrevButton.disabled = index === 0;
  footerNextButton.disabled = index === total - 1;
};

const toggleSlidePage = () => {
  galleryContainer.classList.toggle("hidden");
  slideContainer.classList.toggle("hidden");
  footerContainer.classList.toggle("hidden");
};

const toggleLightbox = () => {
  lightboxOverlay.classList.toggle("hidden");
  document.body.classList.toggle("scroll-lock");
};

const startSlide = () => {
  if (!galleryContainer.classList.contains("hidden")) {
    currentIndex = 0;
    toggleSlidePage();
  }

  updateHeaderButtons("playing");
  updateSlideUI();

  if (slideInterval) clearInterval(slideInterval);

  slideInterval = setInterval(() => {
    if (currentIndex === jsonData.length - 1) {
      stopSlide();
    } else {
      currentIndex++;
      updateSlideUI();
    }
  }, 3000);
};

const stopSlide = () => {
  toggleSlidePage();
  clearInterval(slideInterval);

  slideInterval = null;

  updateHeaderButtons("gallery");
};

const resetTimerIfPlaying = () => {
  if (slideInterval) {
    clearInterval(slideInterval);

    slideInterval = setInterval(() => {
      if (currentIndex === jsonData.length - 1) {
        stopSlide();
      } else {
        currentIndex++;
        updateSlideUI();
      }
    }, 3000);
  }
};

const goToNextSlide = () => {
  if (currentIndex < jsonData.length - 1) {
    currentIndex++;
    updateSlideUI();
    resetTimerIfPlaying();
  }
};

const goToPrevSlide = () => {
  if (currentIndex > 0) {
    currentIndex--;
    updateSlideUI();
    resetTimerIfPlaying();
  }
};

galleryItems.forEach((painting) => {
  painting.addEventListener("click", (e) => {
    const index = e.currentTarget.dataset.index;
    if (index !== undefined) {
      currentIndex = Number(index);
      updateSlideUI();
      toggleSlidePage();

      updateHeaderButtons("manual");
    }
  });
});

headerStartButton.addEventListener("click", startSlide);
headerStopButton.addEventListener("click", stopSlide);
headerReturnButton.addEventListener("click", stopSlide);

window.addEventListener("resize", () => {
  clearTimeout(resizeTimeout);
  resizeTimeout = setTimeout(() => {
    renderMasonry();
  }, 100);
});

slideViewImgButton.addEventListener("click", toggleLightbox);
lightboxCloseButton.addEventListener("click", toggleLightbox);
lightboxOverlay.addEventListener("click", (e) => {
  if (e.target === e.currentTarget) toggleLightbox();
});

footerNextButton.addEventListener("click", goToNextSlide);
footerPrevButton.addEventListener("click", goToPrevSlide);

document.addEventListener("keydown", (e) => {
  if (!lightboxOverlay.classList.contains("hidden")) {
    if (e.key === "Escape") {
      toggleLightbox();
    }
    return;
  }

  if (slideContainer.classList.contains("hidden")) return;

  if (e.key === "ArrowRight") goToNextSlide();
  if (e.key === "ArrowLeft") goToPrevSlide();
});
