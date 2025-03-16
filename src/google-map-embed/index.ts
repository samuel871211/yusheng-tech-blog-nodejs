import httpServer from "../httpServer";

// 記得要替換 API_KEY
httpServer.on('request', (req, res) => {
  res.setHeader("Content-Type", "text/html");
  res.end(`<iframe
width="600"
height="450"
style="border:0"
loading="lazy"
allowfullscreen
referrerpolicy="no-referrer-when-downgrade"
src="https://www.google.com/maps/embed/v1/place?key=API_KEY&q=Taipei+101"></iframe>`);
});