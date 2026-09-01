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

## Workflow

For every development task:

1. Read `AGENTS.md` first.
2. Inspect the existing codebase and identify relevant patterns.
3. Read only the relevant documentation from `docs/`.
4. Follow existing architecture and conventions.
5. Implement the requested feature.
6. Test the implementation.
7. Create or update relevant documentation when the feature introduces permanent business knowledge.
8. Keep documentation concise and avoid documenting implementation details.
9. Do not explain business flows or implementation details unless explicitly asked.
10. Do not ask for information that can be determined by inspecting the codebase or documentation.

## Documentation

- Business flows → `docs/flows/`
- Module documentation → `docs/modules/`

## Documentation Rule

After implementing a feature, document only permanent business knowledge that will be useful for future development or AI context.

- Create or update documentation when a feature introduces or changes business behavior.
- Do not document trivial code changes.
- Keep documentation concise and focused on business rules, flows, and important constraints.
- Do not duplicate information that can be easily understood from the code.
