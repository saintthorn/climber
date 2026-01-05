import express, { type Request, type Response } from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import cors from 'cors';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const DIST_PATH = path.join(__dirname, '../../client/dist');

const PORT: number = 3000;
interface Message {
    id: number;
    text: string;
}

let messages: Message[] = [];
let nextMessageId = 1;

const app = express();

app.use(cors({ origin: 'http://localhost:5173' }));
app.use(express.static(DIST_PATH));
app.use(express.json()); // Middleware to parse JSON request bodies

app.get('/', (req: Request, res: Response) => {
    res.sendFile(path.join(DIST_PATH, 'index.html'));
});

app.get('/messages', (req: Request, res: Response) => {
    res.status(200).json(messages);
});

app.post('/messages', (req: Request, res: Response) => {
    const { text } = req.body;
    if (typeof text !== 'string' || text.trim() === '') {
        return res.status(400).json({ error: 'Message text is required' });
    }
    const newMessage: Message = { id: nextMessageId++, text: text.trim() };
    messages.push(newMessage);
    res.status(201).json(newMessage);
});

app.listen(PORT, () => {
    console.log(`Server is running at http://localhost:${PORT}`);
});
