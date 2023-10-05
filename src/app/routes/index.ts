import express from 'express';
import { AcademicSemesterRoutes } from '../modules/academicSemester/academicSemester.routes';
import { academicFacultyRoutes } from '../modules/academicFaculty/academicFaculty.routes';
import { academicDepartmentRoutes } from '../modules/academicDepartment/academicDepartment.routes';
import { facultyRoutes } from '../modules/faculty/faculty.routes';
import { studentRoutes } from '../modules/student/student.routes';

const router = express.Router();

const routes = [
  {
    path: '/academic-semesters',
    route: AcademicSemesterRoutes
  },
  {
    path: '/academic-faculties',
    route: academicFacultyRoutes
  },
  {
    path: '/academic-departments',
    route: academicDepartmentRoutes
  },
  {
    path: '/students',
    route: studentRoutes
  },
  {
    path: '/faculties',
    route: facultyRoutes
  }
  // {
  //   path: '/auth',
  //   route: AuthRoutes,
  // },
  // {
  //   path: '/users',
  //   route: UserRoutes,
  // },

  // {
  //   path: '/admins',
  //   route: AdminRoutes,
  // },

  // {
  //   path: '/management-departments',
  //   route: ManagementDepartmentRoutes,
  // },
];

routes.forEach((route) => {
  router.use(route.path, route.route);
});

export default router;
