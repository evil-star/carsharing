import React, { useEffect } from 'react';
import { HashRouter, Route, Routes } from 'react-router-dom';
import routes from './routes';
import { setVhVariable } from './utils/setVhVariable';

const App = () => {
  useEffect(() => {
    window.addEventListener('resize', setVhVariable);
    return () => {
      window.removeEventListener('resize', setVhVariable);
    };
  });

  return (
    <HashRouter>
      <Routes>
        {routes.map(({ path, component, layout: Layout, name }) => (
          <Route
            path={path}
            key={name}
            element={<Layout>{component}</Layout>}
          />
        ))}
      </Routes>
    </HashRouter>
  );
};

export default App;
