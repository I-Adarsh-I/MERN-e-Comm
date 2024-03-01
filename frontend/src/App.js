import "./App.css";
import Navbar from "./components/navbar/Navbar";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import DynamicRoute from "./DynamicRoute";


function App() {
  return (
    <div className="App">
      <Navbar />
      <DynamicRoute />
      <ToastContainer autoClose={5000} />
    </div>
  );
}

export default App;
