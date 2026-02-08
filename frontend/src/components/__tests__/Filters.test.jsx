import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Filters from "../Filters";

describe("Filters", () => {
  const mockFilters = {
    completed: null,
    priority: null,
    search: "",
  };

  it("renders all filter controls", () => {
    render(<Filters filters={mockFilters} onFilterChange={vi.fn()} />);

    expect(screen.getByLabelText(/status/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/priority/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/search/i)).toBeInTheDocument();
  });

  it("calls onFilterChange when status filter changes", async () => {
    const user = userEvent.setup();
    const mockOnFilterChange = vi.fn();

    render(
      <Filters filters={mockFilters} onFilterChange={mockOnFilterChange} />
    );

    const statusSelect = screen.getByLabelText(/status/i);
    await user.selectOptions(statusSelect, "true");

    expect(mockOnFilterChange).toHaveBeenCalledWith({
      ...mockFilters,
      completed: true,
    });
  });

  it("calls onFilterChange when priority filter changes", async () => {
    const user = userEvent.setup();
    const mockOnFilterChange = vi.fn();

    render(
      <Filters filters={mockFilters} onFilterChange={mockOnFilterChange} />
    );

    const prioritySelect = screen.getByLabelText(/priority/i);
    await user.selectOptions(prioritySelect, "high");

    expect(mockOnFilterChange).toHaveBeenCalledWith({
      ...mockFilters,
      priority: "high",
    });
  });

  it("calls onFilterChange when search input changes", async () => {
    const user = userEvent.setup();
    const mockOnFilterChange = vi.fn();

    render(
      <Filters filters={mockFilters} onFilterChange={mockOnFilterChange} />
    );

    const searchInput = screen.getByLabelText(/search/i);
    await user.type(searchInput, "test");

    // Check that it was called for each character
    expect(mockOnFilterChange).toHaveBeenCalled();
    expect(mockOnFilterChange).toHaveBeenLastCalledWith({
      ...mockFilters,
      search: "test",
    });
  });

  it('sets completed to null when "All Tasks" is selected', async () => {
    const user = userEvent.setup();
    const mockOnFilterChange = vi.fn();

    render(
      <Filters
        filters={{ ...mockFilters, completed: true }}
        onFilterChange={mockOnFilterChange}
      />
    );

    const statusSelect = screen.getByLabelText(/status/i);
    await user.selectOptions(statusSelect, "all");

    expect(mockOnFilterChange).toHaveBeenCalledWith({
      ...mockFilters,
      completed: null,
    });
  });

  it('sets priority to null when "All Priorities" is selected', async () => {
    const user = userEvent.setup();
    const mockOnFilterChange = vi.fn();

    render(
      <Filters
        filters={{ ...mockFilters, priority: "high" }}
        onFilterChange={mockOnFilterChange}
      />
    );

    const prioritySelect = screen.getByLabelText(/priority/i);
    await user.selectOptions(prioritySelect, "all");

    expect(mockOnFilterChange).toHaveBeenCalledWith({
      ...mockFilters,
      priority: null,
    });
  });

  it("displays current filter values", () => {
    const activeFilters = {
      completed: false,
      priority: "high",
      search: "test search",
    };

    render(<Filters filters={activeFilters} onFilterChange={vi.fn()} />);

    expect(screen.getByLabelText(/status/i)).toHaveValue("false");
    expect(screen.getByLabelText(/priority/i)).toHaveValue("high");
    expect(screen.getByLabelText(/search/i)).toHaveValue("test search");
  });
});
