import { genGGIPdf } from "../../ggi-pdf";

export const pdfController = {
  async generatePdf(req: any, res: any) {
    const { html, password, name, pageNum } = req.body as unknown as { html: string; password: string; name: string; pageNum: number };
    
    const { pdfBuffer, sanitizedFileName } = await genGGIPdf(html, password, name, pageNum);
    
    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader('Content-Disposition', `attachment; filename=${encodeURIComponent(sanitizedFileName)}`);
    res.setHeader('Content-Length', pdfBuffer.length);
    res.setHeader('X-Generated-Filename', sanitizedFileName);
    
    return res.send(pdfBuffer);
  }
};