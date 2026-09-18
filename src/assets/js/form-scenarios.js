const scenarios = {
  "decor-vitrine": {
    label: "Infos spécifiques — Décors de vitrines",
    fields: [
      { type: "text", name: "surface", label: "Surface approximative (m²)", placeholder: "Ex : 5 m²" },
      { type: "text", name: "style", label: "Style recherché", placeholder: "Ex : Moderne, vintage…" },
      { type: "text", name: "couleurs", label: "Palette de couleurs préférée", placeholder: "Ex : Sauge et crème" },
    ],
  },
  "peintures-murales": {
    label: "Infos spécifiques — Peintures murales",
    fields: [
      { type: "text", name: "surface", label: "Surface à couvrir (m²)", placeholder: "Ex : 20 m²" },
      { type: "text", name: "theme", label: "Thème / motif", placeholder: "Ex : Nature, géométrique…" },
      { type: "text", name: "localisation", label: "Localisation (intérieur/extérieur)", placeholder: "Intérieur ou extérieur ?" },
    ],
  },
  "dessin-illustration": {
    label: "Infos spécifiques — Dessin et illustration",
    fields: [
      { type: "text", name: "type-illustration", label: "Type d'illustration", placeholder: "Ex : Portrait, paysage, produit…" },
      { type: "text", name: "usage", label: "Usage prévu", placeholder: "Ex : Web, print, logo…" },
      { type: "text", name: "format", label: "Format / dimensions", placeholder: "Ex : A4, carré, bannière…" },
    ],
  },
};

document.getElementById("serviceSelect")?.addEventListener("change", function () {
  const container = document.getElementById("scenarioFields");

  if (!this.value) {
    container.innerHTML = "";
    return;
  }

  const scenario = scenarios[this.value];
  if (!scenario) return;

  let html = '<div class="bg-cream p-4 rounded-lg border border-sand">';
  html += `<h3 class="font-semibold text-sm text-bark mb-4">${scenario.label}</h3>`;

  scenario.fields.forEach((field) => {
    const id = `field-${field.name}`;
    html += `
      <div class="mb-4">
        <label for="${id}" class="block text-sm font-medium text-bark mb-1">${field.label}</label>
        <input type="${field.type}" id="${id}" name="${field.name}" placeholder="${field.placeholder}"
          class="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent">
      </div>`;
  });

  html += "</div>";
  container.innerHTML = html;
});

document.getElementById("serviceSelect")?.dispatchEvent(new Event("change"));
