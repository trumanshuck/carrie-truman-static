const Image = require("@11ty/eleventy-img");

async function imageUrl(src, size) {
  let metadata = await Image(src, {
    outputDir: "_site/img/",
    widths: [null],
    formats: ["jpeg"]
  });

  let data = metadata.jpeg[metadata.jpeg.length - 1];

  return data.url
}

async function imageShortcode(src, alt, sizes) {
  let metadata = await Image(src, {
    outputDir: "_site/img/",
    widths: [null],
    formats: ["jpg", "jpeg"]
  });

  let imageAttributes = {
    alt,
    sizes,
    loading: "lazy",
    decoding: "async",
  };

  // You bet we throw an error on missing alt in `imageAttributes` (alt="" works okay)
  return Image.generateHTML(metadata, imageAttributes);
}

module.exports = function(eleventyConfig) {
  eleventyConfig.addNunjucksAsyncShortcode("imageUrl", imageUrl);
  eleventyConfig.addLiquidShortcode("imageUrl", imageUrl);
  eleventyConfig.addJavaScriptFunction("imageUrl", imageUrl);

  eleventyConfig.addNunjucksAsyncShortcode("image", imageShortcode);
  eleventyConfig.addLiquidShortcode("image", imageShortcode);
  eleventyConfig.addJavaScriptFunction("image", imageShortcode);
};
