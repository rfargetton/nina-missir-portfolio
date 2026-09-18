document.addEventListener("DOMContentLoaded", () => {
  const images = document.querySelectorAll("[data-lightbox]");
  if (!images.length) return;

  const overlay = document.createElement("div");
  overlay.className =
    "fixed inset-0 z-50 hidden items-center justify-center bg-black/90 p-4";
  overlay.innerHTML =
    '<button type="button" class="absolute top-4 right-4 text-white text-3xl leading-none" aria-label="Fermer">&times;</button><img class="max-h-[90vh] max-w-full rounded-lg" alt="">';

  document.body.appendChild(overlay);

  const img = overlay.querySelector("img");
  const closeBtn = overlay.querySelector("button");

  const close = () => {
    overlay.classList.add("hidden");
    overlay.classList.remove("flex");
  };

  images.forEach((el) => {
    el.addEventListener("click", () => {
      img.src = el.src;
      img.alt = el.alt;
      overlay.classList.remove("hidden");
      overlay.classList.add("flex");
    });
  });

  closeBtn.addEventListener("click", close);
  overlay.addEventListener("click", (e) => {
    if (e.target === overlay) close();
  });
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") close();
  });
});
