import logo from "./logo.svg";
import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { adminRoutes } from "./routes/adminRoutes";
import Loading from "./components/Loading";
function App() {
    return (
        <div className="App relative">
            <Loading />
            <BrowserRouter>
                <Routes>
                    {adminRoutes.map((route, index) => {
                        return (
                            <Route
                                key={index}
                                path={route.path}
                                element={route.component}
                            />
                        );
                    })}
                </Routes>
            </BrowserRouter>
        </div>
    );
}

export default App;
