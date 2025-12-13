import Display from "./components/Display";
import Login from "./components/Login";
import Register from "./components/Register";
import { Toaster } from "react-hot-toast";
import AuthWrapper from "./components/AuthWrapper";
function App() {
  return (
    <>
      <AuthWrapper>
        <Toaster position="top-center" reverseOrder={false} />
        <Display />
      </AuthWrapper>
    </>
  );
}

export default App;
