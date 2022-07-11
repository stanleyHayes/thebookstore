import './App.css';
import {useSelector} from "react-redux";
import {selectUI} from "./redux/features/ui/ui-slice";
import {ThemeProvider} from "@mui/material";
import {Route, Routes} from "react-router";
import {THEMES} from "./utils/themes";
import HomePage from "./pages/home/home-page";
import BooksPage from "./pages/books/books-page";
import CreateBookPage from "./pages/books/create-book-page";
import BookDetailPage from "./pages/books/book-detail-page";
import NotFoundPage from "./pages/404/not-found-page";
import AboutPage from "./pages/about/about-page";
import SettingsPage from "./pages/profile/settings-page";
import ProfilePage from "./pages/profile/profile-page";
import LoginPage from "./pages/authentication/login-page";
import ResetPasswordPage from "./pages/authentication/reset-password-page";
import ForgotPasswordPage from "./pages/authentication/forgot-password-page";
import RegisterPage from "./pages/authentication/register-page";
import VerifyAccountPage from "./pages/authentication/verify-account-page";
import WelcomePage from "./pages/authentication/welcome-page";
import VerifyLoginOtpPage from "./pages/authentication/verify-login-otp-page";
import RequireAuth from "./components/shared/require-auth";
import VerificationAcknowledgmentPage from "./pages/authentication/verification-acknowledgment-page";

function App() {
    const {themeVariant} = useSelector(selectUI);
    const theme = themeVariant === 'dark' ? THEMES.darkTheme : THEMES.lightTheme;

    return (
        <ThemeProvider theme={theme}>
            <Routes>
                <Route element={<HomePage/>} exact={true} path="/"/>
                <Route element={<BooksPage/>} exact={true} path="/books"/>
                <Route element={<RequireAuth><SettingsPage/></RequireAuth>} exact={true} path="/settings"/>
                <Route element={<RequireAuth><ProfilePage/></RequireAuth>} exact={true} path="/profile"/>
                <Route element={<RequireAuth><CreateBookPage/></RequireAuth>} exact={true} path="/trailer/new"/>
                <Route element={<BookDetailPage/>} exact={true} path="/books/:bookID"/>
                <Route element={<AboutPage/>} exact={true} path="/about"/>
                <Route element={<VerifyAccountPage/>} exact={true} path="/auth/verify/:token"/>
                <Route element={<VerificationAcknowledgmentPage/>} exact={true} path="/account/verify/success"/>
                <Route element={<RegisterPage/>} exact={true} path="/auth/register"/>
                <Route element={<VerifyLoginOtpPage/>} exact={true} path="/auth/otp/:token/verify"/>
                <Route element={<LoginPage/>} exact={true} path="/auth/login"/>
                <Route element={<WelcomePage/>} exact={true} path="/welcome"/>
                <Route element={<ResetPasswordPage/>} exact={true} path="/auth/reset-password"/>
                <Route element={<ForgotPasswordPage/>} exact={true} path="/auth/forgot-password"/>
                <Route element={<NotFoundPage/>} exact={true} path="*"/>
            </Routes>
        </ThemeProvider>
    );
}

export default App;
