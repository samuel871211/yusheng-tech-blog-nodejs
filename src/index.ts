import { createServer } from 'http';

const httpServer = createServer().listen(5000);
httpServer.on('request', (req, res) => {
    console.log(req);
    console.log(res);
    res.setHeader('Content-Type', 'application/json');
    res.end();
})