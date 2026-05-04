import { BrowserRouter } from "react-router-dom";
import AppRouter from "./routes/AppRouter";
import { AuthProvider } from "./providers/authProvider";

const App = () => {
  return (
    <BrowserRouter>
      <AuthProvider>
        <AppRouter />
      </AuthProvider>
    </BrowserRouter>
  );
};

export default App;
