import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { describe, it, expect, vi, beforeEach } from "vitest";
import KioskLogin from "../src/features/kiosk/auth/KioskLogin";
import { MemoryRouter } from "react-router-dom";
import { loginKiosk } from "../src/services/kiosk/kiosk";
import useForm from "../src/hooks/useForm";

// Mocks
const mockNavigate = vi.fn();
vi.mock("react-router-dom", async () => {
  const actual = await vi.importActual("react-router-dom");
  return {
    ...actual,
    useNavigate: () => mockNavigate,
  };
});

vi.mock("../../hooks/useKioskDevice", () => ({
  useKioskDevice: () => ({
    terminal: { name: "Test Terminal" },
  }),
}));

vi.mock("../../services/kiosk", () => ({
  loginKiosk: vi.fn(),
}));

vi.mock("../../hooks/useForm", () => ({
  default: vi.fn(),
}));

describe("KioskLogin", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    // Default implementation for useForm
    (useForm as any).mockReturnValue({
      formData: { email: "", password: "" },
      setFormData: vi.fn(),
      setErrors: vi.fn(),
      handleChange: vi.fn(),
      handleSubmit: vi.fn((e, callback) =>
        callback({ data: { email: "test@test.com", password: "password" } }),
      ),
    });
  });

  it("renders correctly with terminal name", () => {
    render(
      <MemoryRouter>
        <KioskLogin />
      </MemoryRouter>,
    );

    expect(screen.getByText("Test Terminal")).toBeInTheDocument();
    expect(screen.getByText("Staff Sign In")).toBeInTheDocument();
    expect(
      screen.getByPlaceholderText("name@business.com"),
    ).toBeInTheDocument();
  });

  it("calls loginKiosk and navigates on success", async () => {
    (loginKiosk as any).mockResolvedValue({ userId: "123", name: "John Doe" });

    render(
      <MemoryRouter>
        <KioskLogin />
      </MemoryRouter>,
    );

    const submitButton = screen.getByRole("button", {
      name: /Authorize & Launch/i,
    });
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(loginKiosk).toHaveBeenCalled();
      expect(mockNavigate).toHaveBeenCalledWith("/customer/kiosk/main");
    });
  });

  it("sets error when login fails", async () => {
    (loginKiosk as any).mockResolvedValue(null);
    const mockSetErrors = vi.fn();

    (useForm as any).mockReturnValue({
      formData: { email: "wrong@test.com", password: "wrong" },
      setFormData: vi.fn(),
      setErrors: mockSetErrors,
      handleChange: vi.fn(),
      handleSubmit: vi.fn((e, callback) =>
        callback({ data: { email: "wrong@test.com", password: "wrong" } }),
      ),
    });

    render(
      <MemoryRouter>
        <KioskLogin />
      </MemoryRouter>,
    );

    const submitButton = screen.getByRole("button", {
      name: /Authorize & Launch/i,
    });
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(mockSetErrors).toHaveBeenCalledWith({
        root: "Invalid user data received",
      });
    });
  });
});
