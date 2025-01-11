import { LoginOrRegister } from './components/authentication/LoginOrRegister';
import { ProblemList } from './components/problems/ProblemList';
import { useUser } from './GlobalState';

function App() {
    const [user, setUser] = useUser();

    if (!user) {
        return <LoginOrRegister />;
    }

    return <ProblemList />;
}

export default App;
