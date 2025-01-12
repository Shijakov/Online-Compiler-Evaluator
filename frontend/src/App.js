import { Route, Routes } from 'react-router-dom';
import { ProblemList } from './components/problems/ProblemList';
import { Login } from './components/authentication/Login';
import { Register } from './components/authentication/Register';
import { ProtectedRoute } from './components/infrastructure/ProtectedRoute';

function App() {
    return (
        <Routes>
            <Route
                path="/"
                element={
                    <ProtectedRoute>
                        <ProblemList />
                    </ProtectedRoute>
                }
            />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
        </Routes>
    );
}

export default App;
