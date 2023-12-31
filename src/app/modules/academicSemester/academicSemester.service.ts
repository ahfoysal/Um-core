import { AcademicSemester, Prisma } from '@prisma/client';
import { IGenericResponse } from '../../../interfaces/common';
import { paginationHelper } from '../../../helpers/paginationHelper';
import { IPaginationOptions } from '../../../interfaces/pagination';
import { IAcademicSemesterFilters } from './academicSemester.interface';
import { academicSemesterSearchableFields } from './academicSemester.constant';
import prisma from '../../../server';

const createAcademicSemester = async (data: AcademicSemester): Promise<AcademicSemester> => {
  const result = await prisma.academicSemester.create({ data });
  return result;
};
const getAllAcademicSemesters = async (
  filters: IAcademicSemesterFilters,

  options: IPaginationOptions
): Promise<IGenericResponse<AcademicSemester[]>> => {
  const { page, limit, skip } = paginationHelper.calculatePagination(options);
  const { searchTerm, ...filterData } = filters;

  const andConditions = [];

  if (searchTerm) {
    andConditions.push({
      OR: academicSemesterSearchableFields.map((field) => ({
        //
        [field]: {
          contains: searchTerm,
          mode: 'insensitive'
        }
      }))
    });
  }
  if (Object.keys(filterData).length > 0) {
    andConditions.push({
      AND: Object.keys(filterData).map((key) => ({
        [key]: {
          equals: (filterData as any)[key]
        }
      }))
    });
  }
  const whereConditions: Prisma.AcademicSemesterWhereInput =
    andConditions.length > 0 ? { AND: andConditions } : {};
  const result = await prisma.academicSemester.findMany({
    where: whereConditions,
    skip,
    take: limit,
    orderBy:
      options.sortBy && options.sortOrder
        ? {
            [options.sortBy]: options.sortOrder
          }
        : {
            createdAt: 'desc'
          }
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
const getSingleAcademicSemester = async (id: string): Promise<AcademicSemester | null> => {
  const result = await prisma.academicSemester.findUnique({
    where: {
      id
    }
  });

  return result;
};
export const AcademicSemesterService = {
  createAcademicSemester,
  getAllAcademicSemesters,
  getSingleAcademicSemester
};
