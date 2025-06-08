const embedYouTube = require("eleventy-plugin-youtube-embed");
const fs = require("fs");
const path = require("path");

module.exports = function(eleventyConfig) {
  
  eleventyConfig.addPlugin(embedYouTube);

  eleventyConfig.addPassthroughCopy("content/images");
  eleventyConfig.addPassthroughCopy("content/fonts");
  eleventyConfig.addPassthroughCopy("content/style/*.css");
  eleventyConfig.addPassthroughCopy("content/posts/pics");

  // Use this so posts are able to be found
  eleventyConfig.setUseGitIgnore(false);

  // Custom date filter for Post dates
  eleventyConfig.addFilter("postDate", date => {
    if (date === undefined)
      return date;

    const monthNames = [
      "Jan", "Feb", "Mar", "Apr", "May", "Jun",
      "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
    ];
    const day = date.getUTCDate();
    const paddedDay = day < 10 ? `0${day}` : day;
    return `${monthNames[date.getUTCMonth()]} ${paddedDay}, ${date.getUTCFullYear()}`;
  });

  eleventyConfig.addFilter("getImagesFromFolder", function (relativeFolder) {
    const fullPath = path.resolve(path.join("content/", relativeFolder));
    if (!fs.existsSync(fullPath)) return [];

    return fs.readdirSync(fullPath)
      .filter(file => /\.(png|jpe?g|gif|webp)$/i.test(file))
      .map(file => `/${path.join(relativeFolder, file)}`.replace(/\\/g, "/"));
  });

  return {
    dir: {
      input: "content",
      layouts: "layouts",
      output: "_site"
    }
  }
};