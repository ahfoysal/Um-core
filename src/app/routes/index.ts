import express from 'express';
import { AcademicSemesterRoutes } from '../modules/academicSemester/academicSemester.routes';

const router = express.Router();

const routes = [
  // {
  //   path: '/auth',
  //   route: AuthRoutes,
  // },
  // {
  //   path: '/users',
  //   route: UserRoutes,
  // },
  // {
  //   path: '/students',
  //   route: StudentRoutes,
  // },
  // {
  //   path: '/faculties',
  //   route: FacultyRoutes,
  // },
  // {
  //   path: '/admins',
  //   route: AdminRoutes,
  // },
  {
    path: '/academic-semesters',
    route: AcademicSemesterRoutes
  }
  // {
  //   path: '/academic-faculties',
  //   route: AcademicFacultyRoutes,
  // },
  // {
  //   path: '/academic-departments',
  //   route: AcademicDepartmentRoutes,
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
