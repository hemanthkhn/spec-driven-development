import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import TaskItem from "../TaskItem";

describe("TaskItem", () => {
  const mockTask = {
    id: 1,
    title: "Test Task",
    description: "Test Description",
    completed: false,
    priority: "high",
    created_at: "2024-01-15T10:00:00Z",
    updated_at: "2024-01-15T10:00:00Z",
  };

  it("renders task with all details", () => {
    render(
      <TaskItem task={mockTask} onToggleComplete={vi.fn()} onDelete={vi.fn()} />
    );

    expect(screen.getByText("Test Task")).toBeInTheDocument();
    expect(screen.getByText("Test Description")).toBeInTheDocument();
    expect(screen.getByText("high")).toBeInTheDocument();
  });

  it("renders task without description", () => {
    const taskWithoutDesc = { ...mockTask, description: "" };
    render(
      <TaskItem
        task={taskWithoutDesc}
        onToggleComplete={vi.fn()}
        onDelete={vi.fn()}
      />
    );

    expect(screen.getByText("Test Task")).toBeInTheDocument();
    expect(screen.queryByText("Test Description")).not.toBeInTheDocument();
  });

  it("shows completed state", () => {
    const completedTask = { ...mockTask, completed: true };
    const { container } = render(
      <TaskItem
        task={completedTask}
        onToggleComplete={vi.fn()}
        onDelete={vi.fn()}
      />
    );

    expect(container.querySelector(".task-item.completed")).toBeInTheDocument();
    expect(screen.getByRole("checkbox")).toBeChecked();
  });

  it("calls onToggleComplete when checkbox is clicked", async () => {
    const user = userEvent.setup();
    const mockToggle = vi.fn();

    render(
      <TaskItem
        task={mockTask}
        onToggleComplete={mockToggle}
        onDelete={vi.fn()}
      />
    );

    const checkbox = screen.getByRole("checkbox");
    await user.click(checkbox);

    expect(mockToggle).toHaveBeenCalledWith(mockTask);
  });

  it("calls onDelete when delete button is clicked and confirmed", async () => {
    const user = userEvent.setup();
    const mockDelete = vi.fn();
    window.confirm = vi.fn(() => true);

    render(
      <TaskItem
        task={mockTask}
        onToggleComplete={vi.fn()}
        onDelete={mockDelete}
      />
    );

    const deleteButton = screen.getByRole("button", { name: /delete/i });
    await user.click(deleteButton);

    expect(window.confirm).toHaveBeenCalled();
    expect(mockDelete).toHaveBeenCalledWith(mockTask.id);
  });

  it("does not call onDelete when delete is cancelled", async () => {
    const user = userEvent.setup();
    const mockDelete = vi.fn();
    window.confirm = vi.fn(() => false);

    render(
      <TaskItem
        task={mockTask}
        onToggleComplete={vi.fn()}
        onDelete={mockDelete}
      />
    );

    const deleteButton = screen.getByRole("button", { name: /delete/i });
    await user.click(deleteButton);

    expect(window.confirm).toHaveBeenCalled();
    expect(mockDelete).not.toHaveBeenCalled();
  });

  it("displays correct priority badge class", () => {
    const { rerender } = render(
      <TaskItem
        task={{ ...mockTask, priority: "low" }}
        onToggleComplete={vi.fn()}
        onDelete={vi.fn()}
      />
    );

    expect(screen.getByText("low")).toHaveClass("priority-low");

    rerender(
      <TaskItem
        task={{ ...mockTask, priority: "medium" }}
        onToggleComplete={vi.fn()}
        onDelete={vi.fn()}
      />
    );

    expect(screen.getByText("medium")).toHaveClass("priority-medium");

    rerender(
      <TaskItem
        task={{ ...mockTask, priority: "high" }}
        onToggleComplete={vi.fn()}
        onDelete={vi.fn()}
      />
    );

    expect(screen.getByText("high")).toHaveClass("priority-high");
  });
});
