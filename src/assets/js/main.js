document.addEventListener("DOMContentLoaded", () => {
  const toggle = document.getElementById("nav-toggle");
  const menu = document.getElementById("nav-menu");

  toggle?.addEventListener("click", () => {
    menu?.classList.toggle("hidden");
    menu?.classList.toggle("flex");
  });
});
