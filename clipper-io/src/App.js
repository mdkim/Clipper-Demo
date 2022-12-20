import {
  Link as RouterLink,
  Outlet, Route, Routes
} from "react-router-dom";

import Link from '@mui/joy/Link';
import Sheet from '@mui/joy/Sheet';

import ClipsPage from './views/Clips';
import ProgramsPage from './views/Programs';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<ProgramsPage />} />
          <Route path="/clips/:programId" element={<ClipsPage />} />
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
          <Link component={RouterLink} to="/">Programs</Link>
          <Link component={RouterLink} to="/favorites" sx={{ pl: 4 }}>Favorites</Link>
        </Sheet>
      </header>
      <Outlet />
    </div>
  );
}

export default App;
