import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import LandingPage from './pages/LandingPage.jsx';
import CaseSelectPage from './pages/CaseSelectPage.jsx';
import GameRoomPage from './pages/GameRoomPage.jsx';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/cases" element={<CaseSelectPage />} />
        <Route path="/game/:caseId" element={<GameRoomPage />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

