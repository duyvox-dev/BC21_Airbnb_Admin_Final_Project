import logo from "./logo.svg";
import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { adminRoutes } from "./routes/adminRoutes";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          {adminRoutes.map((route, index) => {
            return (
              <Route key={index} path={route.path} element={route.component} />
            );
          })}
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
