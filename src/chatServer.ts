import http from 'node:http';
import { readFile } from 'node:fs/promises';
import path from 'node:path';
import { Client } from '@modelcontextprotocol/sdk/client/index.js';
import { StdioClientTransport } from '@modelcontextprotocol/sdk/client/stdio.js';

type ChatRequest = { message: string };
type ChatResponse = { toolName: string; reply: string; payload: unknown };

class McpChatService {
    private client: Client | null = null;
    private transport: StdioClientTransport | null = null;

    private async ensureConnected() {
        if (this.client && this.transport) {
            return;
        }

        const serverPath = path.resolve(process.cwd(), 'dist', 'index.js');

        this.transport = new StdioClientTransport({
            command: process.execPath,
            args: [serverPath],
            cwd: process.cwd(),
            stderr: 'pipe',
        });

        this.client = new Client(
            { name: 'product-chat-ui', version: '1.0.0' },
            { capabilities: {} }
        );

        await this.client.connect(this.transport);
    }

    private inferTool(message: string) {
        const uidMatch = message.match(/\b(P-[A-Z0-9]+)\b/);

        if (uidMatch) {
            return {
                name: 'get_product_details',
                arguments: { uid: uidMatch[1] },
            };
        }

        return {
            name: 'search_products',
            arguments: { query: message, limit: 5 },
        };
    }

    private parsePayload(text: string): unknown {
        try {
            return JSON.parse(text);
        } catch {
            return text;
        }
    }

    private formatReply(toolName: string, payload: unknown): string {
        if (toolName === 'search_products') {
            const items = Array.isArray(payload) ? payload : [];

            if (!items.length) {
                return 'No matching products were found.';
            }

            const summary = items
                .slice(0, 3)
                .map((item: any) => `- ${item.enName || item.name?.en || item.uid}`)
                .join('\n');

            return `I found ${items.length} matching products:\n${summary}`;
        }

        if (toolName === 'get_product_details') {
            const product = (payload as any) || {};
            const name = product.name?.en || product.enName || product.uid || 'this product';
            const price = product.price ? `${product.price.minMrp} - ${product.price.maxMrp} BDT` : 'Price unavailable';
            return `${name}\nPrice: ${price}\nCategory: ${product.category?.enName || 'N/A'}\nAvailability: ${product.availability?.inStock ? 'In stock' : 'Currently unavailable'}`;
        }

        return typeof payload === 'string' ? payload : JSON.stringify(payload, null, 2);
    }

    async handleMessage(message: string): Promise<ChatResponse> {
        await this.ensureConnected();

        const { name, arguments: args } = this.inferTool(message);
        const result = await this.client!.callTool({ name, arguments: args });
        const content = Array.isArray(result.content) ? result.content : [];
        const rawText = content
            .map((item: any) => item.text || '')
            .join('\n');

        const payload = this.parsePayload(rawText);

        return {
            toolName: name,
            reply: this.formatReply(name, payload),
            payload,
        };
    }
}

const chatService = new McpChatService();

function sendJson(res: http.ServerResponse, statusCode: number, body: unknown) {
    res.writeHead(statusCode, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify(body));
}

async function readJsonBody(req: http.IncomingMessage): Promise<ChatRequest> {
    const chunks: Buffer[] = [];
    for await (const chunk of req) {
        chunks.push(Buffer.isBuffer(chunk) ? chunk : Buffer.from(chunk));
    }

    if (!chunks.length) {
        return { message: '' };
    }

    const text = Buffer.concat(chunks).toString('utf8');
    return JSON.parse(text) as ChatRequest;
}

async function getHtml() {
    return readFile(path.resolve(process.cwd(), 'src', 'chat.html'), 'utf8');
}

const server = http.createServer(async (req, res) => {
    if (!req.url) {
        sendJson(res, 400, { error: 'Missing URL' });
        return;
    }

    if (req.method === 'GET' && req.url === '/') {
        res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
        res.end(await getHtml());
        return;
    }

    if (req.method === 'GET' && req.url === '/health') {
        sendJson(res, 200, { status: 'ok' });
        return;
    }

    if (req.method === 'POST' && req.url === '/api/chat') {
        try {
            const body = await readJsonBody(req);
            const response = await chatService.handleMessage(body.message || '');
            sendJson(res, 200, response);
        } catch (error) {
            sendJson(res, 500, {
                toolName: 'error',
                reply: error instanceof Error ? error.message : 'Unknown error',
                payload: null,
            });
        }
        return;
    }

    sendJson(res, 404, { error: 'Not found' });
});

const port = Number(process.env.PORT || 3001);
server.listen(port, () => {
    console.log(`Chat UI listening on http://localhost:${port}`);
});
