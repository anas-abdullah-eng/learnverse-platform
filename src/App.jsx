import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "./Pages/login/Login";
import Error404 from "./Pages/Error404/Error404";
import SignUp from "./Pages/sign up/SignUp";
import TranslatorPage from "./Pages/translator/TranslatorPage";
import GrammarCheckerPage from "./Pages/GrammarChecker/GrammarCheckerPage";
import HomePage from "./Pages/Homepage/Homepage";
import { QueryClient, QueryClientProvider } from "react-query";
import Layout from "./Components/Layout/Layout";
import { useEffect, useState } from "react";
import ProfilePage from "./Pages/ProfilePage/ProflePage";
import NotificationPage from "./Pages/NotificationPage/NotificationPage";
import Notification from "./Components/Notification/Notification";
import NotificationDetails from "./Components/Notification/NotificationDetails";
import CourseDetailsPage from "./Pages/CourseDetails/CourseDetailsPage";
import OnlineTestPage from "./Pages/OnlineTest/OnlineTestPage";
import VocabularyManagerPage from "./Pages/Vocabulary/VocabularyManagerPage";
import VocabularyTestPage from "./Pages/Vocabulary/VocabularyTestPage";
import QuestionBankPage from "./Pages/QuestionBank/QuestionBankPage";
import VideoManagerPage from "./Pages/VideoManager/VideoManagerPage";
import DictionaryPage from "./Pages/Dictionary/DictionaryPage";
import LovesListPage from "./Pages/LovesList/LovesListPage";

const queryClient = new QueryClient();

function App() {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    const storedToken = localStorage.getItem("token");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    if (storedToken) {
      setToken(storedToken);
    }
  }, []);

  const handleLogin = (user, token) => {
    setUser(user);
    setToken(token);
    localStorage.setItem("token", token);
    localStorage.setItem("user", JSON.stringify(user));
  };

  const handleLogout = () => {
    setUser(null);
    setToken(null);
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    window.location.href = "/";
  };

  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <Routes>
          <Route
            element={
              <Layout user={user} token={token} onLogout={handleLogout} />
            }
          >
            <Route path="/" element={<HomePage user={user} token={token} />} />
            <Route
              path="/translator"
              element={<TranslatorPage user={user} token={token} />}
            />
            <Route
              path="/grammar-checker"
              element={<GrammarCheckerPage user={user} token={token} />}
            />
            <Route
              path="/notification"
              element={<NotificationPage user={user} token={token} />}
            />

            <Route
              path="/profile"
              element={<ProfilePage user={user} token={token} />}
            />
            <Route
              path="/course/:id"
              element={<CourseDetailsPage user={user} />}
            />
            <Route
              path="/notification/:id"
              element={<NotificationDetails user={user} />}
            />
            <Route
              path="/online-test"
              element={<OnlineTestPage user={user} token={token} />}
            />
            <Route
              path="/vocabulary-manager"
              element={<VocabularyManagerPage user={user} token={token} />}
            />
            <Route
              path="/vocabulary-test"
              element={<VocabularyTestPage user={user} token={token} />}
            />
            <Route
              path="/question-bank"
              element={<QuestionBankPage user={user} token={token} />}
            />
            <Route
              path="/video-manager"
              element={<VideoManagerPage user={user} token={token} />}
            />
            <Route
              path="/dictionary"
              element={<DictionaryPage user={user} token={token} />}
            />
            <Route
              path="/loved-videos"
              element={<LovesListPage user={user} token={token} />}
            />

            <Route path="*" element={<Error404 />} />
          </Route>
          <Route path="/login" element={<Login onLogin={handleLogin} />} />
          <Route path="/signup" element={<SignUp onSignUp={handleLogin} />} />
        </Routes>
      </BrowserRouter>
    </QueryClientProvider>
  );
}

export default App;
