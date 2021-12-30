const Image = require("@11ty/eleventy-img");
const faviconPlugin = require("eleventy-favicon");

async function imageUrl(src, size) {
  let metadata = await Image(src, {
    outputDir: "_site/img/",
    widths: [null],
    formats: ["jpeg"]
  });

  let data = metadata.jpeg[metadata.jpeg.length - 1];

  return data.url
}

module.exports = function(eleventyConfig) {
  eleventyConfig.addNunjucksAsyncShortcode("imageUrl", imageUrl);
  eleventyConfig.addLiquidShortcode("imageUrl", imageUrl);
  eleventyConfig.addJavaScriptFunction("imageUrl", imageUrl);

  eleventyConfig.addPlugin(faviconPlugin, { destination: "./_site" });
};
