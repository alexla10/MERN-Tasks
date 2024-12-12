import { BrowserRouter, Route, Routes } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import { AuthProvider } from "./context/AuthContext";
import TasksPage from "./pages/TasksPage";
import TaskFormPage from "./pages/TaskFormPage";
import HomePage from "./pages/HomePage";
import ProtectedRoute from "./pages/ProtectedRoute";
import { TaskProvider } from "./context/TaskContext";
import NavBar from "./components/NavBar";
import NotFoundPage from "./pages/NotFoundPage";

function App() {
  return (
    <AuthProvider>
      <TaskProvider>
        <BrowserRouter>
          <Routes>
            {/* Ruta para la página "No encontrado" sin el NavBar */}
            <Route path="*" element={<NotFoundPage />} />
            
            {/* Para las rutas válidas, siempre mostrar el NavBar */}
            <Route element={<Layout />}>
              <Route path="/" element={<HomePage />} />
              <Route path="login/" element={<LoginPage />} />
              <Route path="/register" element={<RegisterPage />} />
              <Route element={<ProtectedRoute />}>
                <Route path="/tasks" element={<TasksPage />} />
                <Route path="/add-task" element={<TaskFormPage />} />
                <Route path="/tasks/:id" element={<TaskFormPage />} />
              </Route>
            </Route>
          </Routes>
        </BrowserRouter>
      </TaskProvider>
    </AuthProvider>
  );
}

function Layout() {
  return (
    <>
      <main className="container mx-auto px-5"> 
        <NavBar /> {/* Renderiza siempre el NavBar en rutas válidas */}
          <Routes>
            {/* Define las rutas dentro del Layout */}
            <Route path="/" element={<HomePage />} />
            <Route path="login/" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route element={<ProtectedRoute />}>
              <Route path="/tasks" element={<TasksPage />} />
              <Route path="/add-task" element={<TaskFormPage />} />
              <Route path="/tasks/:id" element={<TaskFormPage />} />
            </Route>
          </Routes>
      </main>
    </>
  );
}

export default App;