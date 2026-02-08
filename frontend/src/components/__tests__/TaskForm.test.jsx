import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import TaskForm from "../TaskForm";

describe("TaskForm", () => {
  it("renders form with all fields", () => {
    render(<TaskForm onSubmit={vi.fn()} />);

    expect(screen.getByLabelText(/task title/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/priority/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/description/i)).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: /add task/i })
    ).toBeInTheDocument();
  });

  it("updates form fields when user types", async () => {
    const user = userEvent.setup();
    render(<TaskForm onSubmit={vi.fn()} />);

    const titleInput = screen.getByLabelText(/task title/i);
    const descriptionInput = screen.getByLabelText(/description/i);

    await user.type(titleInput, "Test Task");
    await user.type(descriptionInput, "Test Description");

    expect(titleInput).toHaveValue("Test Task");
    expect(descriptionInput).toHaveValue("Test Description");
  });

  it("submits form with correct data", async () => {
    const user = userEvent.setup();
    const mockOnSubmit = vi.fn().mockResolvedValue(true);
    render(<TaskForm onSubmit={mockOnSubmit} />);

    await user.type(screen.getByLabelText(/task title/i), "New Task");
    await user.type(screen.getByLabelText(/description/i), "Task Description");
    await user.selectOptions(screen.getByLabelText(/priority/i), "high");

    const submitButton = screen.getByRole("button", { name: /add task/i });
    await user.click(submitButton);

    await waitFor(() => {
      expect(mockOnSubmit).toHaveBeenCalledWith({
        title: "New Task",
        description: "Task Description",
        priority: "high",
        completed: false,
      });
    });
  });

  it("clears form after successful submission", async () => {
    const user = userEvent.setup();
    const mockOnSubmit = vi.fn().mockResolvedValue(true);
    render(<TaskForm onSubmit={mockOnSubmit} />);

    const titleInput = screen.getByLabelText(/task title/i);
    const descriptionInput = screen.getByLabelText(/description/i);

    await user.type(titleInput, "Test Task");
    await user.type(descriptionInput, "Test Description");
    await user.click(screen.getByRole("button", { name: /add task/i }));

    await waitFor(() => {
      expect(titleInput).toHaveValue("");
      expect(descriptionInput).toHaveValue("");
    });
  });

  it("does not submit when title is empty", async () => {
    const user = userEvent.setup();
    const mockOnSubmit = vi.fn();

    // Mock window.alert
    window.alert = vi.fn();

    render(<TaskForm onSubmit={mockOnSubmit} />);

    await user.click(screen.getByRole("button", { name: /add task/i }));

    expect(mockOnSubmit).not.toHaveBeenCalled();
  });

  it("has medium priority selected by default", () => {
    render(<TaskForm onSubmit={vi.fn()} />);

    const prioritySelect = screen.getByLabelText(/priority/i);
    expect(prioritySelect).toHaveValue("medium");
  });
});
