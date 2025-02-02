import { Navigate, Route, Routes } from 'react-router-dom';
import { ProblemList } from './components/problems/ProblemList';
import { Login } from './components/authentication/Login';
import { Register } from './components/authentication/Register';
import { ProtectedRoute } from './components/infrastructure/ProtectedRoute';
import ProblemDetails from './components/problems/ProblemDetails';
import { AuthorProblemList } from './components/author/AuthorProblemList';
import { Layout } from './components/infrastructure/Layout';
import AuthorEditProblem from './components/author/AuthorEditProblem';
import AuthorAddProblem from './components/author/AuthorAddProblem';
import { UserList } from './components/admin/UserList';

function App() {
    return (
        <Layout>
            <Routes>
                <Route
                    path="/problem"
                    element={
                        <ProtectedRoute>
                            <ProblemList />
                        </ProtectedRoute>
                    }
                />
                <Route
                    path="/problem/:id"
                    element={
                        <ProtectedRoute>
                            <ProblemDetails />
                        </ProtectedRoute>
                    }
                />
                <Route
                    path="/author/problem"
                    element={
                        <ProtectedRoute role="author">
                            <AuthorProblemList />
                        </ProtectedRoute>
                    }
                />
                <Route
                    path="/author/problem/edit/:id"
                    element={
                        <ProtectedRoute role="author">
                            <AuthorEditProblem />
                        </ProtectedRoute>
                    }
                />
                <Route
                    path="/author/problem/add"
                    element={
                        <ProtectedRoute role="author">
                            <AuthorAddProblem />
                        </ProtectedRoute>
                    }
                />
                <Route
                    path="/admin"
                    element={
                        <ProtectedRoute role="admin">
                            <UserList />
                        </ProtectedRoute>
                    }
                />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/" element={<Navigate to="/problem" />} />
            </Routes>
        </Layout>
    );
}

export default App;
