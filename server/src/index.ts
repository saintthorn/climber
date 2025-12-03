import express, { type Request, type Response } from 'express';

const PORT: number = 3000;
const app = express();

app.get('/', (req: Request, res: Response) => {
    res.json({ message: 'Hello from climber!'});
});

app.listen(PORT, () => {
    console.log(`Server is running at http://localhost:${PORT}`);
});

