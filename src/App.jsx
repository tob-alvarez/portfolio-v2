/* eslint-disable react/no-unescaped-entities */
import { HashRouter,Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage";
import Provider from "./context/TobContext";

function App() {

  return (
    <HashRouter>
      <Provider>
        <Routes>
          <Route exact path="/*" element={<HomePage />}/>
          
        </Routes>
      </Provider>
    </HashRouter>
  );
}

export default App;
