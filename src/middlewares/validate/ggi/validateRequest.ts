import { NextFunction } from "express"
import { RequestGGi } from "../../../types/request"
import { ResponseGGi } from "../../../types/response";

export const validatePdfRequest = (
  req: any,
  res: any,
  next: NextFunction
) => {
  const { html, password, name, pageNum } = req.body as unknown as { html: string; password: string; name: string; pageNum: number };

  if (!html || !password || !name || !pageNum) {
    return res.status(400).json({
      success: false,
      error: {
        code: 'INVALID_PARAMETERS',
        message: '필수 파라미터가 누락되었습니다',
        details: {
          missingFields: ['html', 'password', 'name', 'pageNum']
            .filter(field => !req.body[field as keyof RequestGGi])
        }
      }
    } as ResponseGGi);
  }
  next();
}