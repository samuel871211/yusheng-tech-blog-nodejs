/**
 * @description for 迴圈開啟多個網址，探測 subdomains 很方便
 * @param {Array<string>} urls
 * @param {number} timeout
 */
function openWindowsWithTimeout(urls, timeout = 2000) {
  urls.forEach((url, index) =>
    setTimeout(() => window.open(url, "_blank"), timeout * index),
  );
}
