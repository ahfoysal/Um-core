import { Request, RequestHandler, Response } from 'express';
import sendResponse from '../../../shared/response';
import catchAsync from '../../../shared/catchAsync';
import { AcademicSemesterService } from './academicSemester.service';
import { AcademicSemester } from '@prisma/client';

import httpStatus from 'http-status';

const createAcademicSemester: RequestHandler = catchAsync(async (req: Request, res: Response) => {
  const result = await AcademicSemesterService.createAcademicSemester(req.body);

  sendResponse<AcademicSemester>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Academic semester created  successfully!',
    data: result
  });
});
const getAllAcademicSemesters: RequestHandler = catchAsync(async (req: Request, res: Response) => {
  const { data, meta } = await AcademicSemesterService.getAllAcademicSemesters();

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Academic semester fetched  successfully!',
    data,
    meta
  });
});

export const AcademicSemesterController = {
  createAcademicSemester,
  getAllAcademicSemesters
};
