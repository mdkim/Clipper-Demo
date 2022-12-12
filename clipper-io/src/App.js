import {
  Routes,
  Route,
  Outlet,
} from "react-router-dom";

import ProgramsPage from './views/Programs'
import ClipsPage from './views/Clips'

function App() {
  return (
    <div className="App">
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<ProgramsPage />} />
          <Route path="/clips/*" element={<ClipsPage />} />
        </Route>
      </Routes>
    </div>
  );
}

function Layout() {
  return (
    <div>
      <header>
      </header>
      <Outlet />
    </div>
  );
}

export default App;
