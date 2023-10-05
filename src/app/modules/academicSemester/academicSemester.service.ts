import { AcademicSemester, Prisma, PrismaClient } from '@prisma/client';
import { IGenericResponse } from '../../../interfaces/common';
import { paginationHelper } from '../../../helpers/paginationHelper';
import { IPaginationOptions } from '../../../interfaces/pagination';
import { IAcademicSemesterFilters } from './academicSemester.interface';

const prisma = new PrismaClient();

const createAcademicSemester = async (data: AcademicSemester): Promise<AcademicSemester> => {
  const result = await prisma.academicSemester.create({ data });
  return result;
};
const getAllAcademicSemesters = async (
  filters: IAcademicSemesterFilters,

  options: IPaginationOptions
): Promise<IGenericResponse<AcademicSemester[]>> => {
  const { page, limit, skip } = paginationHelper.calculatePagination(options);
  // const { searchTerm, ...filterData } = filters;
  const searchTerm = filters.searchTerm;
  const andConditions = [];
  if (searchTerm) {
    andConditions.push({
      OR: ['title', 'code', 'startMonth', 'endMonth'].map((field) => ({
        //
        [field]: {
          contains: searchTerm,
          mode: 'insensitive'
        }
      }))
    });
  }
  const whereConditions: Prisma.AcademicSemesterWhereInput = andConditions.length > 0 ? (And : andConditions) : {}
  const result = await prisma.academicSemester.findMany({
    where: andConditions,
    skip,
    take: limit
  });
  const total = await prisma.academicSemester.count();
  return {
    data: result,
    meta: {
      total,
      page,
      limit
    }
  };
};
export const AcademicSemesterService = {
  createAcademicSemester,
  getAllAcademicSemesters
};
