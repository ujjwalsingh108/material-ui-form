import { BrowserRouter, Routes, Route } from "react-router";
import MainLayout from "./components/pages/MainLayout";
import JobQueryForm from "./components/templates/JobQueryForm";
import PageNotFound from "./components/organisms/PageNotFound";
import { GlobalStateProvider } from "./hooks/GlobalStateProvider";
import { FormSubmission } from "./components/organisms/FormSubmission";

function App() {
  return (
    <GlobalStateProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<MainLayout />}>
            <Route index element={<JobQueryForm />} />
            <Route path={"leads"} element={<PageNotFound />} />
            <Route path="form-summary" element={<FormSubmission />} />
          </Route>
          <Route path="*" element={<PageNotFound />} />
        </Routes>
      </BrowserRouter>
    </GlobalStateProvider>
  );
}

export default App;
