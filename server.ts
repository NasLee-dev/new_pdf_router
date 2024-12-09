import express from "express";
import cors from 'cors';
import { validatePdfRequest } from "./src/middlewares/validate/ggi/validateRequest";
import { pdfController } from "./src/controllers/ggi";
import { errorHandler } from "./src/middlewares/errorHanlder/ggi";

const PORT = 9999;
const app = express();

app.use(cors({ origin: '*' }));
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ extended: true, limit: '50mb' }));

const router = express.Router();

router.post('/ggi-pdf', 
  validatePdfRequest,
  pdfController.generatePdf
);

app.use('/api', router);
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});