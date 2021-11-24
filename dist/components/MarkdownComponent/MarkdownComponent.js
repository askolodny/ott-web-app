import React from "../../../_snowpack/pkg/react.js";
const MARKDOWN_LINK_REGEX = /\[([^[]+)]\(((https?:\/\/|www\.)?[^)]+)\)/gi;
const MARKDOWN_ITALIC_REGEX = /(?:\*|_)(\S[\s\S]*?)(?:\*|_)/gi;
const MARKDOWN_STRONG_REGEX = /(?:\*{2}|_{2})(\S[\s\S]*?)(?:\*{2}|_{2})/gi;
const MARKDOWN_ITALIC_STRONG_REGEX = /(?:\*{3}|_{3})(\S[\s\S]*?)(?:\*{3}|_{3})/gi;
const MARKDOWN_HEADERS_REGEX = /^(#{1,6})(.*)$/gm;
const LINEBREAK_REGEX = /(?:\r\n|\r|\n)/g;
const parseMarkdown = (value) => value.replace(/<[^>]+>/gm, "").replace(MARKDOWN_HEADERS_REGEX, (...[, header, title]) => {
  return "<h" + header.length + ">" + title.trim() + "</h" + header.length + ">";
}).replace(MARKDOWN_ITALIC_STRONG_REGEX, (...[, word]) => `<strong><em>${word}</em></strong>`).replace(MARKDOWN_STRONG_REGEX, (...[, word]) => `<strong>${word}</strong>`).replace(MARKDOWN_ITALIC_REGEX, (...[, word]) => `<em>${word}</em>`).replace(MARKDOWN_LINK_REGEX, (...[, word, link]) => {
  const externalLink = /^(https?|www\.|\/\/)/.test(link);
  const target = externalLink ? ' target="_blank"' : "";
  const rel = externalLink ? ' rel="noopener"' : "";
  return `<a href="${link}"${target}${rel}>${word}</a>`;
}).replace(LINEBREAK_REGEX, "<br />");
const MarkdownComponent = ({markdownString, className}) => {
  return /* @__PURE__ */ React.createElement("div", {
    className,
    dangerouslySetInnerHTML: {__html: parseMarkdown(markdownString)}
  });
};
export default MarkdownComponent;
