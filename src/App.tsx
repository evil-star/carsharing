import React from 'react';
import { HashRouter, Route, Routes } from 'react-router-dom';
import routes from './routes';

const App = () => {
  return (
    <HashRouter>
      <Routes>
        {routes.map(
          ({ path, component: Component, layout: Layout, name }) => (
            <Route
              path={path}
              key={name}
              element={
                <Layout>
                  <React.Suspense fallback={<>...</>}>
                    <Component />
                  </React.Suspense>
                </Layout>
              }
            />
          )
        )}
      </Routes>
    </HashRouter>
  );
};

export default App;
