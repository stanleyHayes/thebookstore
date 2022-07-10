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

function App() {
  const {themeVariant} = useSelector(selectUI);
  const theme = themeVariant === 'dark' ? THEMES.darkTheme : THEMES.lightTheme;

  return (
      <ThemeProvider theme={theme}>
        <Routes>
          <Route element={<HomePage/>} exact={true} path="/"/>
          <Route element={<BooksPage/>} exact={true} path="/books"/>
          <Route element={<SettingsPage/>} exact={true} path="/settings"/>
          <Route element={<ProfilePage/>} exact={true} path="/profile"/>
          <Route element={<CreateBookPage/>} exact={true} path="/trailer/new"/>
          <Route element={<BookDetailPage/>} exact={true} path="/books/:bookID"/>
          <Route element={<AboutPage/>} exact={true} path="/about"/>
          <Route element={<NotFoundPage/>} exact={true} path="*"/>
        </Routes>
      </ThemeProvider>
  );
}

export default App;
