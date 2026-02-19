import { Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import HomePage from "./pages/HomePage";
import DashboardPage from "./pages/DashboardPage";
import DataTablePage from "./pages/DataTablePage";
import FormPage from "./pages/FormPage";
import DetailPage from "./pages/DetailPage";
import ComponentsPage from "./pages/ComponentsPage";
import { Toaster } from "@/components/ui/sonner";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<HomePage />} />
          <Route path="dashboard" element={<DashboardPage />} />
          <Route path="data-table" element={<DataTablePage />} />
          <Route path="form" element={<FormPage />} />
          <Route path="detail" element={<DetailPage />} />
          <Route path="components" element={<ComponentsPage />} />
        </Route>
      </Routes>
      <Toaster />
    </>
  );
}

export default App;
