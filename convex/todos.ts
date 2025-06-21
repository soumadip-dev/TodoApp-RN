// Import necessary types and functions from Convex
import { ConvexError, v } from 'convex/values';
import { mutation, query } from './_generated/server';

// Query to fetch all todos in descending order
export const getTodos = query({
  handler: async ctx => {
    const todos = await ctx.db.query('todos').order('desc').collect(); // Fetch and sort todos
    return todos;
  },
});

// Mutation to add a new todo item
export const addTodo = mutation({
  args: { text: v.string() }, // Expect a string argument for the todo text
  handler: async (ctx, args) => {
    const todoId = await ctx.db.insert('todos', {
      text: args.text, // Set the text from user input
      isCompleted: false, // New todos are incomplete by default
    });

    return todoId; // Return the ID of the newly added todo
  },
});

// Mutation to toggle the completion status of a todo
export const toggleTodo = mutation({
  args: { id: v.id('todos') }, // Expect a todo ID as argument
  handler: async (ctx, args) => {
    const todo = await ctx.db.get(args.id); // Fetch the todo by ID
    if (!todo) throw new ConvexError('Todo not found'); // Throw error if not found

    await ctx.db.patch(args.id, {
      isCompleted: !todo.isCompleted, // Toggle the isCompleted flag
    });
  },
});

// Mutation to delete a todo by ID
export const deleteTodo = mutation({
  args: { id: v.id('todos') }, // Expect a todo ID
  handler: async (ctx, args) => {
    await ctx.db.delete(args.id); // Delete the todo from the database
  },
});

// Mutation to update the text of a todo
export const updateTodo = mutation({
  args: {
    id: v.id('todos'), // Expect the ID of the todo
    text: v.string(), // Expect new text for the todo
  },
  handler: async (ctx, args) => {
    await ctx.db.patch(args.id, {
      text: args.text, // Update the text field of the todo
    });
  },
});

// Mutation to delete all todos from the database
export const clearAllTodos = mutation({
  handler: async ctx => {
    const todos = await ctx.db.query('todos').collect(); // Fetch all todos

    // Delete each todo one by one
    for (const todo of todos) {
      await ctx.db.delete(todo._id);
    }

    return { deletedCount: todos.length }; // Return the number of deleted todos
  },
});
