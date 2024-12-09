import { Response } from 'express';

export interface ResponseGGi extends Response {
  success: boolean;
  data?: {
    pdfBuffer: Buffer;
    fileName: string;
  };
  error?: {
    code: string;
    message: string;
    details?: {
      errorMessage?: string;
      errorStack?: string;
      missingFields?: string[];
    }
  }
}