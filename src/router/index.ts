import { createRouter, createWebHistory } from 'vue-router';
import LoginView from '@/views/LoginView.vue';
import DashboardView from '@/views/DashboardView.vue';
import HomeView from '@/views/HomeView.vue';
import AboutView from '@/views/AboutView.vue';
import TotpView from '@/views/TotpView.vue';
import TotpSetupView from '@/views/TotpSetupView.vue';
import BoardsView from '@/views/BoardsView.vue';
import CalendarView from '@/views/CalendarView.vue';
import ProfileView from '@/views/ProfileView.vue';
import LoggedOutView from '@/views/LoggedOutView.vue';
import SingleBoardView from '@/views/SingleBoardView.vue';
import TaskView from '@/views/TaskView.vue';
import { useUserStore } from '@/stores/user';
import dayjs from 'dayjs';

const authenticatedGuard = () => {
  const userStore = useUserStore();
  return (
    userStore.token?.automaticLogoutTime.isAfter(dayjs()) &&
    userStore.token?.encryptedToken.length > 0
  );
};

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: AboutView,
    },
    {
      path: '/login',
      name: 'login',
      component: LoginView,
    },
    {
      path: '/dashboard',
      name: 'dashboard',
      component: DashboardView,
      beforeEnter: authenticatedGuard,
    },
    {
      path: '/totp-setup',
      name: 'totp-setup',
      component: TotpSetupView,
      beforeEnter: authenticatedGuard,
    },
    {
      path: '/totp',
      name: 'totp',
      component: TotpView,
      beforeEnter: authenticatedGuard,
    },
    {
      path: '/boards',
      name: 'boards',
      component: BoardsView,
      beforeEnter: authenticatedGuard,
    },
    {
      path: '/board/:id',
      name: 'board',
      component: SingleBoardView,
      beforeEnter: authenticatedGuard,
    },
    {
      path: '/task/:id',
      name: 'task',
      component: TaskView,
      beforeEnter: authenticatedGuard,
    },
    {
      path: '/calendar',
      name: 'calendar',
      component: CalendarView,
      beforeEnter: authenticatedGuard,
    },
    {
      path: '/profile',
      name: 'profile',
      component: ProfileView,
      beforeEnter: authenticatedGuard,
    },
    {
      path: '/logged-out',
      name: 'loggedOut',
      component: LoggedOutView,
    },
  ],
});

export default router;
