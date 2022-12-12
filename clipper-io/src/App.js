import {
  Routes,
  Route,
  Outlet,
} from "react-router-dom";

import Sheet from '@mui/joy/Sheet';
import Link from '@mui/joy/Link';

import ProgramsPage from './views/Programs'
import ClipsPage from './views/Clips'

function App() {
  return (
    <div className="App">
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<ProgramsPage />} />
          <Route path="/clips/*" element={<ClipsPage />} />
          <Route path="/favorites" element={<ClipsPage />} />
        </Route>
      </Routes>
    </div>
  );
}

function Layout() {
  return (
    <div>
      <header>
        <Sheet sx={{ pt: 2, pl: 6 }}>
          <Link href="/">Programs</Link>
          <Link href="/favorites" sx={{ pl: 4 }}>Favorites</Link>
        </Sheet>
      </header>
      <Outlet />
    </div>
  );
}

export default App;
