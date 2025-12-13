import Login from "./components/Login";
import Register from "./components/Register";
import { Toaster } from "react-hot-toast";
function App() {
  return (
    <>
      <div>
        <Toaster position="top-center" reverseOrder={false} />
        {/* <Login /> */}
        <Register />
      </div>
    </>
  );
}

export default App;
