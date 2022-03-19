import { Suspense } from 'react';
import { Route, RouteObject, Routes } from 'react-router-dom';
import './App.scss';

import router from "./router";

function getRoutes(route: RouteObject) {
  return route.children ?
    <Route key={Math.random()} {...route} element={<Suspense fallback={<></>}>{route.element}</Suspense>}>
      {route.children.map(getRoutes)}
    </Route> :
    <Route key={Math.random()} {...route} element={<Suspense fallback={<></>}>{route.element}</Suspense>} />;
}

const App = (): JSX.Element => {
  return (
    <div className="app">
      <Routes>
        {router.map(getRoutes)}
      </Routes>
    </div>
  );
};

export default App;