import { Router } from "express";
import { z } from "zod";
import * as itemService from "../services/items.js";

const router = Router();

const createItemSchema = z.object({
  name: z.string().min(1, "Name is required"),
  description: z.string().optional(),
});

const updateItemSchema = z.object({
  name: z.string().min(1).optional(),
  description: z.string().optional(),
  status: z.enum(["active", "archived"]).optional(),
});

// GET /api/items — list all items
router.get("/", (_req, res) => {
  const items = itemService.listItems();
  res.json({ success: true, data: items });
});

// GET /api/items/:id — get a single item
router.get("/:id", (req, res) => {
  const item = itemService.getItem(req.params.id);
  if (!item) {
    res.status(404).json({ success: false, error: "Item not found" });
    return;
  }
  res.json({ success: true, data: item });
});

// POST /api/items — create a new item
router.post("/", (req, res) => {
  const parsed = createItemSchema.safeParse(req.body);
  if (!parsed.success) {
    res
      .status(400)
      .json({ success: false, error: parsed.error.issues[0].message });
    return;
  }

  const item = itemService.createItem(parsed.data);
  res.status(201).json({ success: true, data: item });
});

// PATCH /api/items/:id — update an item
router.patch("/:id", (req, res) => {
  const parsed = updateItemSchema.safeParse(req.body);
  if (!parsed.success) {
    res
      .status(400)
      .json({ success: false, error: parsed.error.issues[0].message });
    return;
  }

  const item = itemService.updateItem(req.params.id, parsed.data);
  if (!item) {
    res.status(404).json({ success: false, error: "Item not found" });
    return;
  }
  res.json({ success: true, data: item });
});

// DELETE /api/items/:id — delete an item
router.delete("/:id", (req, res) => {
  const deleted = itemService.deleteItem(req.params.id);
  if (!deleted) {
    res.status(404).json({ success: false, error: "Item not found" });
    return;
  }
  res.json({ success: true, data: null });
});

export default router;
