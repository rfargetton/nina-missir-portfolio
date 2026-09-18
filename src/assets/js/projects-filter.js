document.addEventListener("DOMContentLoaded", () => {
  const cards = document.querySelectorAll("[data-project-card]");
  const filters = document.querySelectorAll("[data-filter]");
  const pageSize = 6;
  let activeFilter = "all";
  let visibleCount = pageSize;

  const getFiltered = () =>
    Array.from(cards).filter(
      (card) => activeFilter === "all" || card.dataset.services?.includes(activeFilter)
    );

  const render = () => {
    const filtered = getFiltered();
    cards.forEach((card) => card.classList.add("hidden"));
    filtered.slice(0, visibleCount).forEach((card) => card.classList.remove("hidden"));

    const loadMore = document.getElementById("load-more");
    if (loadMore) {
      loadMore.classList.toggle("hidden", visibleCount >= filtered.length);
    }
  };

  filters.forEach((btn) => {
    btn.addEventListener("click", (e) => {
      e.preventDefault();
      activeFilter = btn.dataset.filter;
      visibleCount = pageSize;

      filters.forEach((f) => {
        f.classList.remove("bg-primary", "text-white");
        f.classList.add("bg-sand", "text-bark");
      });
      btn.classList.add("bg-primary", "text-white");
      btn.classList.remove("bg-sand", "text-bark");

      render();
    });
  });

  document.getElementById("load-more")?.addEventListener("click", () => {
    visibleCount += pageSize;
    render();
  });

  render();
});
