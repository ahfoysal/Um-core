import { Request, RequestHandler, Response } from 'express';
import sendResponse from '../../../shared/response';
import catchAsync from '../../../shared/catchAsync';
import { AcademicSemesterService } from './academicSemester.service';
import { AcademicSemester } from '@prisma/client';

import httpStatus from 'http-status';
import pick from '../../../shared/pick';
import { academicSemesterFilterableFields } from './academicSemester.constant';

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
  const filters = pick(req.query, academicSemesterFilterableFields);
  const options = pick(req.query, ['limit', 'page', 'sortBy', 'sortOrder']);

  const { data, meta } = await AcademicSemesterService.getAllAcademicSemesters(filters, options);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Academic semester fetched  successfully!',
    data,
    meta
  });
});
const getSingleAcademicSemester: RequestHandler = catchAsync(
  async (req: Request, res: Response) => {
    const result = await AcademicSemesterService.getSingleAcademicSemester(req.params.id);

    sendResponse<AcademicSemester | null>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Academic semester created  successfully!',
      data: result
    });
  }
);

export const AcademicSemesterController = {
  createAcademicSemester,
  getAllAcademicSemesters,
  getSingleAcademicSemester
};
