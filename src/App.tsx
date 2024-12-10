import { BrowserRouter, Routes, Route } from "react-router";
import MainLayout from "./components/pages/MainLayout";
import JobQueryForm from "./components/templates/JobQueryForm";
import PageNotFound from "./components/organisms/PageNotFound";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MainLayout />}>
          <Route index element={<JobQueryForm />} />
          <Route path={"leads"} element={<PageNotFound />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
