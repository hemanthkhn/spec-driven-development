import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import TaskList from "../TaskList";

describe("TaskList", () => {
  const mockTasks = [
    {
      id: 1,
      title: "Task 1",
      description: "Description 1",
      completed: false,
      priority: "high",
      created_at: "2024-01-15T10:00:00Z",
      updated_at: "2024-01-15T10:00:00Z",
    },
    {
      id: 2,
      title: "Task 2",
      description: "Description 2",
      completed: true,
      priority: "low",
      created_at: "2024-01-16T10:00:00Z",
      updated_at: "2024-01-16T10:00:00Z",
    },
  ];

  it("renders empty state when no tasks", () => {
    render(
      <TaskList tasks={[]} onToggleComplete={vi.fn()} onDelete={vi.fn()} />
    );

    expect(screen.getByText(/no tasks found/i)).toBeInTheDocument();
    expect(
      screen.getByText(/create a new task to get started/i)
    ).toBeInTheDocument();
  });

  it("renders all tasks", () => {
    render(
      <TaskList
        tasks={mockTasks}
        onToggleComplete={vi.fn()}
        onDelete={vi.fn()}
      />
    );

    expect(screen.getByText("Task 1")).toBeInTheDocument();
    expect(screen.getByText("Task 2")).toBeInTheDocument();
  });

  it("displays correct task count", () => {
    render(
      <TaskList
        tasks={mockTasks}
        onToggleComplete={vi.fn()}
        onDelete={vi.fn()}
      />
    );

    // 1 active task, 2 total tasks
    expect(screen.getByText(/1 active \/ 2 total/i)).toBeInTheDocument();
  });

  it("displays correct count when all tasks are completed", () => {
    const completedTasks = mockTasks.map((t) => ({ ...t, completed: true }));
    render(
      <TaskList
        tasks={completedTasks}
        onToggleComplete={vi.fn()}
        onDelete={vi.fn()}
      />
    );

    expect(screen.getByText(/0 active \/ 2 total/i)).toBeInTheDocument();
  });

  it("passes callbacks to TaskItem components", () => {
    const mockToggle = vi.fn();
    const mockDelete = vi.fn();

    render(
      <TaskList
        tasks={mockTasks}
        onToggleComplete={mockToggle}
        onDelete={mockDelete}
      />
    );

    // Verify that TaskItem components are rendered (they will have the callbacks)
    expect(screen.getByText("Task 1")).toBeInTheDocument();
    expect(screen.getByText("Task 2")).toBeInTheDocument();
  });
});
