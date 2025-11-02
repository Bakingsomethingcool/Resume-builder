import { v } from "convex/values";
import { mutation, query } from "./_generated/server";
import { getCurrentUser } from "./users";

export const list = query({
  args: {},
  handler: async (ctx) => {
    const user = await getCurrentUser(ctx);
    if (!user) {
      return [];
    }
    return await ctx.db
      .query("resumes")
      .withIndex("by_user", (q) => q.eq("userId", user._id))
      .order("desc")
      .collect();
  },
});

export const get = query({
  args: { id: v.id("resumes") },
  handler: async (ctx, args) => {
    const user = await getCurrentUser(ctx);
    if (!user) {
      return null;
    }
    const resume = await ctx.db.get(args.id);
    if (!resume || resume.userId !== user._id) {
      return null;
    }
    return resume;
  },
});

export const create = mutation({
  args: {
    name: v.string(),
    markdown: v.string(),
    css: v.string(),
    template: v.string(),
  },
  handler: async (ctx, args) => {
    const user = await getCurrentUser(ctx);
    if (!user) {
      throw new Error("Not authenticated");
    }
    return await ctx.db.insert("resumes", {
      userId: user._id,
      name: args.name,
      markdown: args.markdown,
      css: args.css,
      template: args.template,
    });
  },
});

export const update = mutation({
  args: {
    id: v.id("resumes"),
    markdown: v.optional(v.string()),
    css: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    const user = await getCurrentUser(ctx);
    if (!user) {
      throw new Error("Not authenticated");
    }
    const resume = await ctx.db.get(args.id);
    if (!resume || resume.userId !== user._id) {
      throw new Error("Resume not found");
    }
    await ctx.db.patch(args.id, {
      markdown: args.markdown,
      css: args.css,
    });
  },
});

export const rename = mutation({
  args: {
    id: v.id("resumes"),
    name: v.string(),
  },
  handler: async (ctx, args) => {
    const user = await getCurrentUser(ctx);
    if (!user) {
      throw new Error("Not authenticated");
    }
    const resume = await ctx.db.get(args.id);
    if (!resume || resume.userId !== user._id) {
      throw new Error("Resume not found");
    }
    await ctx.db.patch(args.id, { name: args.name });
  },
});

export const remove = mutation({
  args: { id: v.id("resumes") },
  handler: async (ctx, args) => {
    const user = await getCurrentUser(ctx);
    if (!user) {
      throw new Error("Not authenticated");
    }
    const resume = await ctx.db.get(args.id);
    if (!resume || resume.userId !== user._id) {
      throw new Error("Resume not found");
    }
    await ctx.db.delete(args.id);
  },
});
