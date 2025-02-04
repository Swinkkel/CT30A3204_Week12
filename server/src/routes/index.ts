import {Request, Response, Router} from "express"
import { compile } from "morgan"
import { Book } from "../models/Book"

const router: Router = Router()

router.post("/api/book", async (req: Request, res: Response) => {
    const {name, author, pages} = req.body;

    try {
        // Check if book already exist
        const existingBook = await Book.findOne({name});
        if (existingBook) {
            res.status(403).json({ message: 'Book already in database.' });
            return 
        }

        const newBook = new Book({ name, author, pages });
        await newBook.save();

        res.status(200).json(newBook);
        return
    } catch (error) {
        res.status(500).json({message: 'Internal server error.'});
        return
    }

    return
})

export default router