// Import the necessary functions from 'convex/server'
import { defineSchema, defineTable } from 'convex/server';
import { v } from 'convex/values';

// Define the schema for the application
export default defineSchema({
  // Define the 'todos' table with its fields
  todos: defineTable({
    // Field for the todo item text
    text: v.string(),
    // Field to indicate if the todo item is completed
    isCompleted: v.boolean(),
  }),
});
