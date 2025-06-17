import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import Register from "../components/Register.jsx";
import axios from "axios";
import { vi } from "vitest";
import "@testing-library/jest-dom";

// Mock axios
vi.mock("axios");

describe("Register Page", () => {
  test("renders register form correctly", () => {
    render(<Register />);
    expect(screen.getByText(/registration/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/full name/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/user name/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/password/i)).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /register/i })).toBeInTheDocument();
  });

test("shows validation errors on missing fields", async () => {
  render(<Register />);
  fireEvent.click(screen.getByRole("button", { name: /register/i }));

  const errors = await screen.findAllByText(/cannot be empty/i);

  expect(errors).toHaveLength(4);

  expect(errors).toEqual(
    expect.arrayContaining([
      expect.objectContaining({ textContent: "Name cannot be empty" }),
      expect.objectContaining({ textContent: "Email cannot be empty" }),
      expect.objectContaining({ textContent: "Username cannot be empty" }),
      expect.objectContaining({ textContent: "Password cannot be empty" }),
    ])
  );
});

  test("shows success message on valid submission", async () => {
    axios.post.mockResolvedValue({
      data: { message: "User registered successfully" },
    });

    render(<Register />);
    fireEvent.change(screen.getByLabelText(/full name/i), {
      target: { value: "John Doe" },
    });
    fireEvent.change(screen.getByLabelText(/email/i), {
      target: { value: "john@example.com" },
    });
    fireEvent.change(screen.getByLabelText(/user name/i), {
      target: { value: "johndoe" },
    });
    fireEvent.change(screen.getByLabelText(/password/i), {
      target: { value: "Password123" },
    });

    fireEvent.click(screen.getByRole("button", { name: /register/i }));

    await waitFor(() =>
      expect(screen.getByText(/user registered successfully/i)).toBeInTheDocument()
    );
  });
});
