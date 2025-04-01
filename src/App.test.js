import React from 'react';
import App from "./App";

import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import axios from 'axios';
import AuthPage from './pages/Login';
import {
  MemoryRouter, BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from 'react-router';
import { act } from '@testing-library/react'
import Tasks from "./pages/Tasks";

// Mock axios completely
jest.mock("axios");

describe('AuthPage', () => {
  test('renders login form', async () => {
    await act(async () => {
      render(
        <MemoryRouter><AuthPage /></MemoryRouter>);
    });
    expect(screen.getByRole('heading', { name: /login/i, level: 2 })).toBeInTheDocument();
  });

  test("✅ Failed login shows error messages", async () => {
    axios.post.mockRejectedValue({
      response: { data: { error: ["Invalid credentials"] } },
    });

    await act(async () => {
      render(
        <MemoryRouter><AuthPage /></MemoryRouter>
      );
    });

    fireEvent.change(screen.getByPlaceholderText(/Username/i), {
      target: { value: "wronguser" },
    });
    fireEvent.change(screen.getByPlaceholderText(/Password/i), {
      target: { value: "wrongpass" },
    });
    fireEvent.click(screen.getByRole('button', { name: /Login/i }));

    await waitFor(() => expect(screen.getByText("Login failed.")).toBeInTheDocument());
  });

  test("✅ Success Login", async () => {
    axios.post.mockResolvedValue({ status : 200,data: { access: "mock-token" } });

    await act(async () => {
      render(
        <MemoryRouter>
          <AuthPage />
        </MemoryRouter>
      );
    });

    fireEvent.change(screen.getByPlaceholderText(/Username/i), {
      target: { value: "admin" },
    });
    fireEvent.change(screen.getByPlaceholderText(/Password/i), {
      target: { value: "admin" },
    });
    fireEvent.click(screen.getByRole('button', { name: /Login/i }));

    await waitFor(() => expect(localStorage.getItem("access")).toBe("mock-token"));

    // await new Promise(resolve => setTimeout(resolve, 2000));
    // await waitFor(() => expect(screen.getByText("Your Tasks")).toBeInTheDocument());
  });
  test("✅ Success Register", async () => {
    axios.post.mockResolvedValue({ status : 201, data: { access: "mock-token" } });

    await act(async () => {
      render(
        <App />
      );
    });

    fireEvent.click(screen.getByRole('button', { name: /Register/i }));


    fireEvent.change(screen.getByPlaceholderText(/Username/i), {
      target: { value: "admina" },
    });
    fireEvent.change(screen.getByPlaceholderText(/Password/i), {
      target: { value: "adminb" },
    });
    fireEvent.click(screen.getByTitle('btnSubmit', { name: /Register/i }));

    // await waitFor(() => expect(localStorage.getItem("access")).toBe("mock-token"));

    //await new Promise(resolve => setTimeout(resolve, 3999));
    await waitFor(() => expect(screen.getByText("Registration successful. Please log in.")).toBeInTheDocument());
  });
});