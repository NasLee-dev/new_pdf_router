import { NextFunction } from "express"
import { RequestGGi } from "../../../types/request"
import { ResponseGGi } from "../../../types/response";

type RequestProps = {
  html: string;
  password?: string;
  name?: string;
  pageNum: number;
  fileName?: string;
}

export const validatePdfRequest = (
  req: any,
  res: any,
  next: NextFunction
) => {
  const { html, pageNum } = req.body as unknown as RequestProps;

  if (!html || !pageNum) {
    return res.status(400).json({
      success: false,
      error: {
        code: 'INVALID_PARAMETERS',
        message: '필수 파라미터가 누락되었습니다',
        details: {
          missingFields: ['html', 'pageNum']
            .filter(field => !req.body[field as keyof RequestProps])
        }
      }
    } as ResponseGGi);
  }
  next();
}