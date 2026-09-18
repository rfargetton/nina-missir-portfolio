const fs = require("fs");
const path = require("path");
const postcss = require("postcss");
const eleventyImage = require("@11ty/eleventy-img");
const markdownIt = require("markdown-it");
const markdownItAnchor = require("markdown-it-anchor");

async function buildCss() {
  const cssPath = path.join(__dirname, "src/assets/css/main.css");
  const css = fs.readFileSync(cssPath, "utf8");
  const result = await postcss([require("@tailwindcss/postcss")]).process(css, {
    from: cssPath,
  });
  const outDir = path.join(__dirname, "_site/assets/css");
  fs.mkdirSync(outDir, { recursive: true });
  fs.writeFileSync(path.join(outDir, "main.css"), result.css);
}

module.exports = function (eleventyConfig) {
  eleventyConfig.setInputDirectory("src");
  eleventyConfig.setOutputDirectory("_site");
  eleventyConfig.setIncludesDirectory("_includes");
  eleventyConfig.setLayoutsDirectory("_includes/layouts");

  eleventyConfig.addWatchTarget("src/assets/css/");
  eleventyConfig.setWatchThrottleWaitTime(100);

  eleventyConfig.on("eleventy.before", async () => {
    await buildCss();
  });

  eleventyConfig.addPassthroughCopy("src/assets/js/");
  eleventyConfig.addPassthroughCopy("src/assets/images/");
  eleventyConfig.addPassthroughCopy("src/admin/");

  eleventyConfig.addNunjucksAsyncFilter(
    "image",
    async function (src, alt, sizes = "100vw") {
      if (!src) throw new Error(`Missing \`src\` on image from: ${this.page.inputPath}`);

      const metadata = await eleventyImage(src, {
        widths: [300, 600, 1200],
        formats: ["webp", "jpeg"],
        outputDir: "./_site/img/",
      });

      return eleventyImage.generateHTML(
        metadata,
        {
          alt,
          sizes,
          loading: "lazy",
          decoding: "async",
        }
      );
    }
  );

  const md = markdownIt({ html: true }).use(markdownItAnchor, {
    permalink: markdownItAnchor.permalink.ariaHidden({
      placement: "after",
      class: "anchor",
    }),
  });
  eleventyConfig.setLibrary("md", md);

  eleventyConfig.addFilter("date", require("./src/_includes/filters/dateFilter"));
  eleventyConfig.addFilter("findBySlug", (collection, slug) =>
    collection.find((item) => item.data.slug === slug)
  );

  eleventyConfig.addCollection("projects", (collection) =>
    collection
      .getFilteredByGlob("src/content/projects/*.md")
      .sort((a, b) => new Date(b.data.date) - new Date(a.data.date))
  );

  eleventyConfig.addCollection("services", (collection) =>
    collection
      .getFilteredByGlob("src/content/services/*.md")
      .sort((a, b) => (a.data.order || 999) - (b.data.order || 999))
  );

  eleventyConfig.addCollection("projectsByService", (collection) => {
    const projects = collection.getFilteredByGlob("src/content/projects/*.md");
    const services = collection.getFilteredByGlob("src/content/services/*.md");
    const projectsByService = {};

    services.forEach((service) => {
      projectsByService[service.data.slug] = [];
    });

    projects.forEach((project) => {
      (project.data.services || []).forEach((serviceSlug) => {
        if (!projectsByService[serviceSlug]) {
          projectsByService[serviceSlug] = [];
        }
        projectsByService[serviceSlug].push(project);
      });
    });

    Object.keys(projectsByService).forEach((serviceSlug) => {
      projectsByService[serviceSlug].sort(
        (a, b) => new Date(b.data.date) - new Date(a.data.date)
      );
    });

    return projectsByService;
  });

  eleventyConfig.addCollection("latestProjects", (collection) =>
    collection
      .getFilteredByGlob("src/content/projects/*.md")
      .sort((a, b) => new Date(b.data.date) - new Date(a.data.date))
      .slice(0, 6)
  );

  eleventyConfig.addCollection("testimonials", (collection) =>
    collection.getFilteredByGlob("src/content/testimonials/*.md")
  );

  eleventyConfig.addFilter("projectsForService", function (serviceSlug) {
    return this.ctx.collections.projectsByService[serviceSlug] || [];
  });

  return {
    markdownTemplateEngine: "njk",
    dataTemplateEngine: "njk",
    htmlTemplateEngine: "njk",
  };
};
