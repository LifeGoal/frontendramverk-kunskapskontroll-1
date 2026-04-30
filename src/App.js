import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Nav from './components/Nav.jsx';
import Footer from './components/Footer.jsx';
import Home from './pages/Home.jsx';
import List from './pages/List.jsx';
import Details from './pages/Details.jsx';
// import Posts from './pages/Posts.jsx';
// import Post from './pages/Post.jsx';
// import CreatePost from './pages/CreatePost.jsx';
// import EditPost from './pages/EditPost.jsx';
// import Contact from './pages/Contact.jsx';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Nav />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/list" element={<List />} />
          <Route path="/list/:id" element={<Details />} />
          {/* <Route path="/posts" element={<Posts />} />
          <Route path="/posts/create" element={<CreatePost />} />
          <Route path="/posts/:id" element={<Post />} />
          <Route path="/posts/:id/edit" element={<EditPost />} />
          <Route path="/contact" element={<Contact />} /> */}
        </Routes>
        <Footer />
      </BrowserRouter>
    </div>
  );
}

export default App;