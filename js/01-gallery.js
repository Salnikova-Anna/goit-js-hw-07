import { galleryItems } from "./gallery-items.js";
// Change code below this line

const galleryListRef = document.querySelector(".gallery");

const galleryListMarkup = galleryItems
  .map(({ preview, original, description }) => {
    return `<li class="gallery__item">
        <a class="gallery__link" href="${original}">
    <img
      loading="lazy"
      class="gallery__image lazyload"
      data-src="${preview}"
      data-source="${original}"
      alt="${description}"
    />
  </a>
    </li>`;
  })
  .join("");

galleryListRef.insertAdjacentHTML("afterbegin", galleryListMarkup);

galleryListRef.addEventListener("click", onGalleryListClick);

// function onGalleryListClick(event) {
//   event.preventDefault();

//   if (!event.target.classList.contains("gallery__image")) {
//     return;
//   }

//   const instance = basicLightbox.create(`
//     <img src="${event.target.dataset.source}" alt="${event.target.alt}" width="800" height="600">`);

//   instance.show();
//   document.addEventListener("keydown", onEscPress);

//   function onEscPress(event) {
//     if (event.code === "Escape") {
//       instance.close();
//       document.removeEventListener("keydown", onEscPress);
//     }
//   }
// }

/* =================Second variant==================*/

const instance = basicLightbox.create(
  `
     <img src="" alt="" width="800" height="600">`,
  {
    onShow: (instance) => {
      document.addEventListener("keydown", onEscPress);
      document.querySelector("body").classList.add("no-scroll");
    },

    onClose: (instance) => {
      document.removeEventListener("keydown", onEscPress);
      document.querySelector("body").classList.remove("no-scroll");
    },
  }
);

function onGalleryListClick(event) {
  event.preventDefault();

  if (!event.target.classList.contains("gallery__image")) return;

  instance.element().querySelector("img").src = event.target.dataset.source;
  instance.element().querySelector("img").alt = event.target.alt;
  instance.show();
}

function onEscPress(event) {
  if (event.code !== "Escape") return;
  instance.close();
}

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
