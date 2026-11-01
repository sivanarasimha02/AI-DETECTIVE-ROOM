import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import LandingPage from '../pages/LandingPage.jsx';
import CaseSelectPage from '../pages/CaseSelectPage.jsx';

describe('AI Detective Room - Frontend Pages', () => {
  it('renders LandingPage with title, start button, and feature cards', () => {
    render(
      <MemoryRouter>
        <LandingPage />
      </MemoryRouter>
    );

    expect(screen.getAllByText(/AI Detective Room/i).length).toBeGreaterThan(0);
    expect(screen.getByText(/Enter the Crime Scene/i)).toBeInTheDocument();
    expect(screen.getByText(/Start Investigation/i)).toBeInTheDocument();
    expect(screen.getByText(/Browse Case Files/i)).toBeInTheDocument();
  });

  it('renders CaseSelectPage with Case #001 docket and difficulty', () => {
    render(
      <MemoryRouter>
        <CaseSelectPage />
      </MemoryRouter>
    );

    expect(screen.getByText(/Active Case Files/i)).toBeInTheDocument();
    expect(screen.getAllByText(/CASE #001/i).length).toBeGreaterThan(0);
    expect(screen.getByText(/The Missing Diamond/i)).toBeInTheDocument();
    expect(screen.getByText(/Medium/i)).toBeInTheDocument();
    expect(screen.getByText(/Open Case Docket & Enter 3D Room/i)).toBeInTheDocument();
  });
});
