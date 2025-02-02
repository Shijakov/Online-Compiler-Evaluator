import { Route, Routes } from 'react-router-dom';
import { ProblemList } from './components/problems/ProblemList';
import { Login } from './components/authentication/Login';
import { Register } from './components/authentication/Register';
import { ProtectedRoute } from './components/infrastructure/ProtectedRoute';
import ProblemDetails from './components/problems/ProblemDetails';
import { AuthorProblemList } from './components/author/AuthorProblemList';
import { Layout } from './components/infrastructure/Layout';
import AuthorProblemDetails from './components/author/AuthorProblemDetails';

function App() {
    return (
        <Layout>
            <Routes>
                <Route
                    path="/"
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
                    path="/author/problem/edit/:problemId"
                    element={
                        <ProtectedRoute role="author">
                            <AuthorProblemDetails />
                        </ProtectedRoute>
                    }
                />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
            </Routes>
        </Layout>
    );
}

export default App;
