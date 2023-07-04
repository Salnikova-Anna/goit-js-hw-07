import { galleryItems } from "./gallery-items.js";
// Change code below this line

const galleryListRef = document.querySelector(".gallery");

const galleryListMarkup = galleryItems
  .map(({ preview, original, description }) => {
    return `<li class="gallery__item">
        <a class="gallery__link" href="${original}">
    <img
      class="gallery__image"
      src="${preview}"
      data-source="${original}"
      alt="${description}"
    />
  </a>
    </li>`;
  })
  .join("");

galleryListRef.insertAdjacentHTML("afterbegin", galleryListMarkup);

galleryListRef.addEventListener("click", onGalleryListClick);

function onGalleryListClick(event) {
  event.preventDefault();

  if (!event.target.classList.contains("gallery__image")) {
    return;
  }

  const instance = basicLightbox.create(`
    <img src="${event.target.dataset.source}">`);

  instance.show();
  document.addEventListener("keydown", onEscPress);

  function onEscPress(event) {
    if (event.code === "Escape") {
      instance.close();
      document.removeEventListener("keydown", onEscPress);
    }
  }
}
