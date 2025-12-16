import Display from "./components/Display";
import Login from "./components/Login";
import Register from "./components/Register";
import { Toaster } from "react-hot-toast";
import AuthWrapper from "./components/AuthWrapper";
import { BrowserRouter } from "react-router-dom";
import Sidebar from "./components/Sidebar";
function App() {
  return (
    <>
      <Toaster position="top-center" reverseOrder={false} />
      <AuthWrapper>
        <div className="h-screen bg-black">
          <div className="h-[90%] flex">
            <Sidebar />
            <Display />
          </div>
          {/* Player compoent */}
        </div>
      </AuthWrapper>
    </>
  );
}

export default App;
