import Display from "./components/Display";
import Login from "./components/Login";
import Register from "./components/Register";
import { Toaster } from "react-hot-toast";
import AuthWrapper from "./components/AuthWrapper";
import { BrowserRouter } from "react-router-dom";
function App() {
  return (
    <>
      <Toaster position="top-center" reverseOrder={false} />
      <AuthWrapper>
        <Display />
      </AuthWrapper>
    </>
  );
}

export default App;
