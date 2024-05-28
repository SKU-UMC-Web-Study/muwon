import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import PopularPage from './pages/PopularPage.jsx';
import './App.css';
import Nav from './components/Nav.jsx';
import MainPage from './pages/MainPage.jsx';
import SignupPage from './pages/SignupPage.jsx';
import LoginPage from './pages/LoginPage.jsx';
import NowPlayingPage from './pages/NowPlayingPage.jsx';
import TopRatedPage from './pages/TopRatedPage.jsx';
import UpComing from './pages/UpComing.jsx';
import DetailPage from './pages/DetailPage.jsx';
import Notfound from './pages/Notfound.jsx';
import styled from 'styled-components';

const Container = styled.div`
  background-color: rgb(45, 41, 120);
  position: relative;
  width: 100%;
  padding: 0px;
  margin: 0 auto;
`;

const Content = styled.div`
  background-color: rgb(45, 41, 120);
  width: 100%;
  height: 200px;
  top: 0;
`;

const queryClient = new QueryClient();

function App() {
  return (
    <Container>
      <QueryClientProvider client={queryClient}>
        <Router>
          <Nav />
          <Content>
            <Routes>
              <Route path="/" element={<MainPage />} />
              <Route path="/signup" element={<SignupPage />} />
              <Route path="/login" element={<LoginPage />} />
              <Route path="/popular/:page" element={<PopularPage />} />
              <Route path="/nowplaying" element={<NowPlayingPage />} />
              <Route path="/toprated" element={<TopRatedPage />} />
              <Route path="/upcoming" element={<UpComing />} />
              <Route path="/movie/:id" element={<DetailPage />} />
              <Route path="/notfound" element={<Notfound />} />
            </Routes>
          </Content>
        </Router>
      </QueryClientProvider>
    </Container>
  );
}

export default App;
