import { eq } from "drizzle-orm";
import { db, items } from "../db/index.js";
import type { CreateItemInput, UpdateItemInput } from "@starter/shared";

export function listItems() {
  return db.select().from(items).all();
}

export function getItem(id: string) {
  return db.select().from(items).where(eq(items.id, id)).get();
}

export function createItem(input: CreateItemInput) {
  const id = crypto.randomUUID();
  const now = new Date();

  db.insert(items)
    .values({
      id,
      name: input.name,
      description: input.description ?? null,
      status: "active",
      createdAt: now,
      updatedAt: now,
    })
    .run();

  return getItem(id);
}

export function updateItem(id: string, input: UpdateItemInput) {
  const existing = getItem(id);
  if (!existing) return null;

  db.update(items)
    .set({
      ...(input.name !== undefined && { name: input.name }),
      ...(input.description !== undefined && {
        description: input.description ?? null,
      }),
      ...(input.status !== undefined && { status: input.status }),
      updatedAt: new Date(),
    })
    .where(eq(items.id, id))
    .run();

  return getItem(id);
}

export function deleteItem(id: string) {
  const existing = getItem(id);
  if (!existing) return false;

  db.delete(items).where(eq(items.id, id)).run();
  return true;
}
