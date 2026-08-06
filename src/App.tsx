import { useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Index from './pages/Index';
import NotFound from './pages/NotFound';
import IntroLoader from './components/IntroLoader';

const App = () => {
  const [isLoading, setIsLoading] = useState(true);

  return (
    <>
      {/*
        The page mounts under the loader so the wipe uncovers the real hero —
        but the hero's own entrance has to wait for the curtain, or it plays out
        behind it and the reveal lands on an already-finished frame. `ready` is
        what hands the moment over.
      */}
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index ready={!isLoading} />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>

      {isLoading && <IntroLoader onLoadingComplete={() => setIsLoading(false)} />}
    </>
  );
};

export default App;
