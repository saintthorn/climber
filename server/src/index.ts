import express, { type Request, type Response } from 'express';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const DIST_PATH = path.join(__dirname, '../../client/dist');

const PORT: number = 3000;
const app = express();

app.use(express.static(DIST_PATH));

app.get('/', (req: Request, res: Response) => {
    res.sendFile(path.join(DIST_PATH, 'index.html'));
});

app.listen(PORT, () => {
    console.log(`Server is running at http://localhost:${PORT}`);
});


