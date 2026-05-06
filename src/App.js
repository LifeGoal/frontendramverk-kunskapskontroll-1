import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Nav from './components/Nav.jsx';
import Footer from './components/Footer.jsx';
import Home from './pages/Home.jsx';
import List from './pages/List.jsx';
import Details from './pages/Details.jsx';
import Admin from './pages/Admin.jsx';
import Create from './pages/Create.jsx';
import Edit from './pages/Edit.jsx';

function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen flex flex-col bg-slate-900 text-white">
        <Nav />
        <main className="flex-1 flex justify-center">
          <section className="w-full sm:w-[85%] lg:w-[70%]">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/list" element={<List />} />
              <Route path="/list/:id" element={<Details />} />
              <Route path="/admin" element={<Admin />} />
              <Route path="/create" element={<Create />} />
              <Route path="/edit/:id" element={<Edit />} />
            </Routes>
          </section>
        </main>
        <Footer />
      </div>
    </BrowserRouter>
  );
}

export default App;