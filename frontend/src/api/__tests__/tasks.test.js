import { describe, it, expect, vi, beforeEach } from "vitest";
import axios from "axios";
import { tasksAPI } from "../tasks";

// Mock axios
vi.mock("axios");

describe("tasksAPI", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe("getTasks", () => {
    it("fetches tasks without parameters", async () => {
      const mockTasks = [{ id: 1, title: "Task 1" }];
      axios.create.mockReturnValue({
        get: vi.fn().mockResolvedValue({ data: mockTasks }),
      });

      const result = await tasksAPI.getTasks();
      expect(result).toEqual(mockTasks);
    });

    it("fetches tasks with filter parameters", async () => {
      const mockTasks = [{ id: 1, title: "Task 1", completed: true }];
      const mockGet = vi.fn().mockResolvedValue({ data: mockTasks });
      axios.create.mockReturnValue({ get: mockGet });

      const params = { completed: true, priority: "high" };
      await tasksAPI.getTasks(params);

      expect(mockGet).toHaveBeenCalledWith("/tasks", { params });
    });
  });

  describe("getTask", () => {
    it("fetches a single task by id", async () => {
      const mockTask = { id: 1, title: "Task 1" };
      const mockGet = vi.fn().mockResolvedValue({ data: mockTask });
      axios.create.mockReturnValue({ get: mockGet });

      const result = await tasksAPI.getTask(1);

      expect(mockGet).toHaveBeenCalledWith("/tasks/1");
      expect(result).toEqual(mockTask);
    });
  });

  describe("createTask", () => {
    it("creates a new task", async () => {
      const newTask = { title: "New Task", priority: "high" };
      const createdTask = { id: 1, ...newTask };
      const mockPost = vi.fn().mockResolvedValue({ data: createdTask });
      axios.create.mockReturnValue({ post: mockPost });

      const result = await tasksAPI.createTask(newTask);

      expect(mockPost).toHaveBeenCalledWith("/tasks", newTask);
      expect(result).toEqual(createdTask);
    });
  });

  describe("updateTask", () => {
    it("updates an existing task", async () => {
      const updates = { completed: true };
      const updatedTask = { id: 1, title: "Task", completed: true };
      const mockPatch = vi.fn().mockResolvedValue({ data: updatedTask });
      axios.create.mockReturnValue({ patch: mockPatch });

      const result = await tasksAPI.updateTask(1, updates);

      expect(mockPatch).toHaveBeenCalledWith("/tasks/1", updates);
      expect(result).toEqual(updatedTask);
    });
  });

  describe("deleteTask", () => {
    it("deletes a task", async () => {
      const mockDelete = vi.fn().mockResolvedValue({ data: null });
      axios.create.mockReturnValue({ delete: mockDelete });

      await tasksAPI.deleteTask(1);

      expect(mockDelete).toHaveBeenCalledWith("/tasks/1");
    });
  });
});
