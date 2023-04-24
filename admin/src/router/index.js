import { createRouter, createWebHashHistory } from "vue-router";

const routes = [
  {
    path: "/",
    name: "Home",
    component: () => import("../views/Home.vue"),
    children: [
      //   {
      //   path: '/admin',
      //   name: 'admin',
      //   component: () => import('../views/admin/admin.vue')
      // },
      {
        path: "/create-student",
        name: "createStudent",
        component: () => import("../views/student/create-student.vue"),
      },
      {
        path: "/read-student",
        name: "readStudent",
        component: () => import("../views/student/read-student.vue"),
      },
      {
        path: "/updata-student",
        name: "updataStudent",
        component: () => import("../views/student/updata-student.vue"),
      },
      {
        path: "/create-teacher",
        name: "createTeacher",
        component: () => import("../views/teacher/create-teacher.vue"),
      },
      {
        path: "/read-teacher",
        name: "readTeacher",
        component: () => import("../views/teacher/read-teacher.vue"),
      },
      {
        path: "/updata-teacher",
        name: "updataTeacher",
        component: () => import("../views/teacher/updata-teacher.vue"),
      },
      {
        path: "/updata-admin",
        name: "updataAdmin",
        component: () => import("../views/admin/updata-admin.vue"),
      },
      {
        path: "/create-message",
        name: "createMessage",
        component: () => import("../views/admin/create-message.vue"),
      },
      {
        path: "/admin-message",
        name: "adminMessage",
        component: () => import("../views/admin/admin-message.vue"),
      },
      {
        path: "/settime",
        name: "settime",
        component: () => import("../views/admin/setTime.vue"),
      },
      {
        path: "/admin-chengji",
        name: "adminChengji",
        component: () => import("../views/admin/admin-chengji.vue"),
      },
      {
        path: "/create-admin",
        name: "createAdmin",
        component: () => import("../views/admin/create-admin.vue"),
      },
      {
        path: "/teacher-chengji",
        name: "teacherChengji",
        component: () => import("../views/teacher/teacher-chengji.vue"),
      },
      {
        path: "/teacher-excel",
        name: "teacher-excel",
        component: () => import("../views/teacher/teacher-excel.vue"),
      },
      {
        path: "/read-message",
        name: "readMessage",
        component: () => import("../views/admin/read-message.vue"),
      },
      {
        path: "/student-score",
        name: "student-score",
        component: () => import("../views/student/student-score.vue"),
      },
      {
        path: "/read-apply",
        name: "read-apply",
        component: () => import("../views/admin/read-apply.vue"),
      },
    ],
  },
  {
    path: "/logn",
    name: "logn",
    component: () => import("../views/logn.vue"),
  },
];
const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

export default router;
