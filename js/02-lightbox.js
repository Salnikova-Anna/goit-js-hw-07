import { galleryItems } from "./gallery-items.js";
// Change code below this line

const galleryListRef = document.querySelector(".gallery");

const galleryListMarkup = galleryItems
  .map(({ preview, original, description }) => {
    return `
    <li class="gallery__item">
   <a class="gallery__link" href="${original}">
      <img class="gallery__image lazyload"
      data-src="${preview}" 
      alt="${description}"
      loading="lazy"
       />
   </a>
</li>`;
  })
  .join("");

galleryListRef.insertAdjacentHTML("afterbegin", galleryListMarkup);

const lightbox = new SimpleLightbox(".gallery a", {
  captionsData: "alt",
  captionDelay: 250,
  disableScroll: true,
});

/*=================================LAZY LOADING===============================*/

if ("loading" in HTMLImageElement.prototype) {
  const images = document.querySelectorAll('img[loading="lazy"]');

  images.forEach((img) => {
    img.src = img.dataset.src;
  });
} else {
  const script = document.createElement("script");

  script.src =
    "https://cdnjs.cloudflare.com/ajax/libs/lazysizes/5.3.2/lazysizes.min.js";
  script.integrity =
    "sha512-q583ppKrCRc7N5O0n2nzUiJ+suUv7Et1JGels4bXOaMFQcamPk9HjdUknZuuFjBNs7tsMuadge5k9RzdmO+1GQ==";
  script.crossorigin = "anonymous";
  script.referrerpolicy = "no-referrer";

  document.body.appendChild(script);
}
