# Users Module

## Purpose

Manages user accounts and profile information.

## Capabilities

- Create user
- List users
- Get user by ID
- Update user
- Delete user
- Get authenticated user's profile
- Update authenticated user's profile

## User Data

- Name
- Email
- Age
- Password for authentication

## User Listing

The user list supports:

- Pagination using limit and offset
- Name-based search
- Total record count

## Validation Rules

- Name is required when creating a user.
- Email is required when creating a user.
- Email must be unique for registered accounts.
- Password must not be exposed in API responses.

## Access

Authenticated user operations require a valid authentication token.
