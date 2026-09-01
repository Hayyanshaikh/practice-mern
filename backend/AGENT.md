# Project Instructions

## Stack

- MERN: MongoDB, Express, React, Node.js
- JavaScript

## Structure

- `backend/` → Express backend
- `backend/models/` → MongoDB models
- `backend/controllers/` → Business logic
- `backend/routes/` → API routes
- `backend/middleware/` → Middleware

## Rules

- Follow existing project patterns.
- Reuse existing code, components, and utilities whenever possible.
- Do not create duplicate code or components.
- Keep business logic in controllers/services, not in UI components.
- Keep API response structures consistent.
- Handle authentication and security-sensitive changes carefully.
- Do not introduce new dependencies unless necessary.
- Before modifying code, inspect related files and existing patterns.

## Communication Rules

- Keep responses concise and action-oriented.
- Do not explain business flows, architecture, or project context unless explicitly asked.
- Treat the `docs/` folder as the source of truth for documented business flows and domain knowledge.
- When a task requires business context, inspect the relevant documentation before making assumptions.
- Do not repeat information already documented unless explicitly requested.

## Documentation

- Business flows → `docs/flows/`
- Module documentation → `docs/modules/`

## Documentation Rule

After implementing a feature, document only permanent business knowledge that will be useful for future development or AI context.

- Create or update documentation when a feature introduces or changes business behavior.
- Do not document trivial code changes.
- Keep documentation concise and focused on business rules, flows, and important constraints.
- Do not duplicate information that can be easily understood from the code.
