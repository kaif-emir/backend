# FinTrack API

A personal finance REST API built with Node.js, Express, TypeScript, PostgreSQL, and Prisma.

## Features
- JWT-based authentication
- Expense tracking with categories
- Category-wise spending summary
- Monthly budget setting with overspend alerts

## Tech Stack
Node.js · Express · TypeScript · PostgreSQL · Prisma · JWT

## API Routes
| Method | Route | Description |
|--------|-------|-------------|
| POST | /auth/register | Register a new user |
| POST | /auth/login | Login and get JWT token |
| POST | /expenses | Add an expense |
| GET | /expenses | List all expenses |
| DELETE | /expenses/:id | Delete an expense |
| GET | /expenses/summary | Total spent per category |
| POST | /budgets | Set a category budget |
| GET | /budgets/alerts | Get over-budget categories |

## Live URL
https://your-render-url.onrender.com