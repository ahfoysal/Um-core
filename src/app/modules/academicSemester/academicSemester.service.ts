import { AcademicSemester, PrismaClient } from '@prisma/client';
import { IGenericResponse } from '../../../interfaces/common';

const prisma = new PrismaClient();

const createAcademicSemester = async (data: AcademicSemester): Promise<AcademicSemester> => {
  const result = await prisma.academicSemester.create({ data });
  return result;
};
const getAllAcademicSemesters = async (): Promise<IGenericResponse<AcademicSemester[]>> => {
  const result = await prisma.academicSemester.findMany();
  const total = await prisma.academicSemester.count();
  return {
    data: result,
    meta: {
      total,
      page: 1,
      limit: 10
    }
  };
};
export const AcademicSemesterService = {
  createAcademicSemester,
  getAllAcademicSemesters
};
