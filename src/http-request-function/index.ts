import { request as httpRequest } from "http";
import { request as httpsRequest } from "https";

const requestCallback: Parameters<typeof httpRequest>[2] = (res) => {
    const chunks: Buffer[] = [];
    res.on('data', (chunk) => { chunks.push(chunk) });
    res.on('end', () => {
        const buffer = Buffer.concat(chunks);
        const payload = buffer.toString('utf-8');
        console.log(payload);
    });
}

// 使用 http 模組去請求 https，會噴錯
// TypeError: Protocol "https:" not supported. Expected "http:"
// code: 'ERR_INVALID_PROTOCOL'
// const httpClientRequest = httpRequest("https://example.com", requestCallback);
// httpClientRequest.end();

// 使用 https 模組去請求 http，會噴錯
// TypeError: Protocol "http:" not supported. Expected "https:"
// code: 'ERR_INVALID_PROTOCOL'
// const httpsClientRequest = httpsRequest("http://example.com", requestCallback);
// httpsClientRequest.end();