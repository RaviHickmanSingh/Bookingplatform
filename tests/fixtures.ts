import { test as base, expect } from '@playwright/test';
import { HomePage } from './pages/home-page';
import LoginPage from './pages/login-page';
import BookingPage from './pages/booking-page';
import DashboardPage from './pages/dashboard-page';
import RegisterPage from './pages/register-page';

type Pages = {
  homePage: HomePage;
  loginPage: LoginPage;
  bookingPage: BookingPage;
  dashboardPage: DashboardPage;
  registerPage: RegisterPage;
};

export const test = base.extend<Pages>({
    homePage: async ({ page }, use) => {
        await use(new HomePage(page));
    },
    loginPage: async ({ page }, use) => {
        await use(new LoginPage(page));
    },
    bookingPage: async ({ page }, use) => {
        await use(new BookingPage(page));
    },
    dashboardPage: async ({ page }, use) => {
        await use(new DashboardPage(page)); 
    },
    registerPage: async ({ page }, use) => {
        await use(new RegisterPage(page)); 
    }
});

export { expect };

