import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { describe, it, expect, vi, beforeEach } from "vitest";
import KioskActivation from "../src/features/kiosk/auth/KioskActivation";
import { MemoryRouter } from "react-router-dom";
import { activateKiosk } from "../src/services/kiosk/kiosk";
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

vi.mock("../../services/kiosk", () => ({
  activateKiosk: vi.fn(),
}));

vi.mock("../../hooks/useForm", () => ({
  default: vi.fn(),
}));

describe("KioskActivation", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    (useForm as any).mockReturnValue({
      formData: { activationCode: "" },
      handleChange: vi.fn(),
      handleSubmit: vi.fn((e, callback) =>
        callback({ data: { activationCode: "ABC123" } }),
      ),
      setSuccess: vi.fn(),
      success: false,
      errors: {},
    });
  });

  it("renders activation form correctly", () => {
    render(
      <MemoryRouter>
        <KioskActivation />
      </MemoryRouter>,
    );

    expect(screen.getByText("Terminal Activation")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("ABC123")).toBeInTheDocument();
  });

  it("calls activateKiosk and navigates to login on success", async () => {
    (activateKiosk as any).mockResolvedValue({ success: true });
    const mockSetSuccess = vi.fn();

    (useForm as any).mockReturnValue({
      formData: { activationCode: "ABC123" },
      handleChange: vi.fn(),
      handleSubmit: vi.fn((e, callback) =>
        callback({ data: { activationCode: "ABC123" } }),
      ),
      setSuccess: mockSetSuccess,
      success: false,
      errors: {},
    });

    render(
      <MemoryRouter>
        <KioskActivation />
      </MemoryRouter>,
    );

    const submitButton = screen.getByRole("button", {
      name: /Activate Terminal/i,
    });
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(activateKiosk).toHaveBeenCalledWith({ activationCode: "ABC123" });
      expect(mockSetSuccess).toHaveBeenCalledWith(true);
      expect(mockNavigate).toHaveBeenCalledWith("/customer/kiosk/login");
    });
  });

  it("navigates to home on activation failure", async () => {
    (activateKiosk as any).mockResolvedValue({ success: false });

    render(
      <MemoryRouter>
        <KioskActivation />
      </MemoryRouter>,
    );

    const submitButton = screen.getByRole("button", {
      name: /Activate Terminal/i,
    });
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(mockNavigate).toHaveBeenCalledWith("/");
    });
  });
});
