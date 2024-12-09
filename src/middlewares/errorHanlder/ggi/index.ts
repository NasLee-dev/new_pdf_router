import { config } from "../../../config";
import { ResponseGGi } from "../../../types/response";

export const errorHandler = (
  err: Error, 
  res: any, 
  ) => {
  return res.status(500).json({
    success: false,
    error: {
      code: 'PDF_GENERATION_FAILED',
      message: 'PDF 생성 중 오류가 발생했습니다',
      details: {
        errorMessage: err.message,
        errorStack: config.env === 'development' ? err.stack : undefined
      }
    }
  } as ResponseGGi);
};