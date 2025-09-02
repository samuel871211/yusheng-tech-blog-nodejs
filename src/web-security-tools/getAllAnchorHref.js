// 快速抓出頁面上所有的超連結，探測 subdomains 很方便
const allAnchorHrefs = [
  ...new Set([...document.querySelectorAll("a")].map((a) => a.href)).values(),
];
