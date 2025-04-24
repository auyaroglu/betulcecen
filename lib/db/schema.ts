import { pgTable, serial, text, timestamp, varchar } from 'drizzle-orm/pg-core';

// Projeler tablosu
export const projects = pgTable('projects', {
  id: serial('id').primaryKey(),
  title: varchar('title', { length: 255 }).notNull(),
  description: text('description'),
  thumbnail: varchar('thumbnail', { length: 255 }),
  category: varchar('category', { length: 100 }),
  client: varchar('client', { length: 255 }),
  year: varchar('year', { length: 4 }),
  createdAt: timestamp('created_at').defaultNow(),
  updatedAt: timestamp('updated_at').defaultNow(),
});

// Proje görselleri tablosu
export const projectImages = pgTable('project_images', {
  id: serial('id').primaryKey(),
  projectId: serial('project_id').references(() => projects.id).notNull(),
  imageUrl: varchar('image_url', { length: 255 }).notNull(),
  altText: varchar('alt_text', { length: 255 }),
  order: serial('order').notNull(),
  createdAt: timestamp('created_at').defaultNow(),
});

// İletişim bilgileri tablosu
export const contacts = pgTable('contacts', {
  id: serial('id').primaryKey(),
  name: varchar('name', { length: 255 }).notNull(),
  email: varchar('email', { length: 255 }).notNull(),
  message: text('message').notNull(),
  createdAt: timestamp('created_at').defaultNow(),
});

// Kullanıcılar tablosu (admin için)
export const users = pgTable('users', {
  id: serial('id').primaryKey(),
  name: varchar('name', { length: 255 }).notNull(),
  email: varchar('email', { length: 255 }).notNull().unique(),
  password: varchar('password', { length: 255 }).notNull(),
  createdAt: timestamp('created_at').defaultNow(),
});

export type Project = typeof projects.$inferSelect;
export type ProjectInsert = typeof projects.$inferInsert;
export type ProjectImage = typeof projectImages.$inferSelect;
export type Contact = typeof contacts.$inferSelect;
export type User = typeof users.$inferSelect; 