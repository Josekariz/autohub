# AutoHub – MVP v1 Product & Logic Specification

## Purpose

AutoHub is a community-driven car review platform focused on **real ownership and mechanic experience**. Instead of sales listings, the app helps users understand **common issues, fuel usage, and reliability** of specific car models based on aggregated reviews.

This document defines **MVP v1 only**. Anything not listed here is **out of scope**.

---

## Core Problem

People want honest, practical insight about cars **before owning or servicing them**, but existing platforms focus on marketing, dealerships, or fragmented opinions.

AutoHub solves this by:

* Aggregating owner & mechanic reviews
* Highlighting common issues
* Showing average sentiment per model

---

## MVP v1 Goals

MVP v1 answers ONE question well:

> "What do real people say about this car model?"

---

## User Roles

### User (only role in v1)

* Can submit reviews
* Can browse and search reviews
* Can manage their own content

No admin panel in v1.

---

## Data Model (Conceptual)

### Car Model

* id
* brand (e.g. Toyota)
* model (e.g. Corolla)
* year range (optional)

### Review

* id
* carModelId
* userId
* commonIssues (text)
* fuelUsage (text or rating)
* overallRating (1–5)
* upvotes
* createdAt

### User

* id
* username
* profileImage

---

## Core Features (MVP v1)

### 1. Submit Review

User can:

* Select a car model
* Describe common issues
* Describe fuel usage
* Submit a review

---

### 2. Browse Reviews (Home Screen)

Home screen shows:

* A scrollable list of **random or recent reviews**
* Each card shows:

  * Car model
  * Short issue summary
  * Average rating

No filters in v1.

---

### 3. Search

User can:

* Search by car brand or model
* View aggregated reviews for that model

Search result page shows:

* Average rating
* Common issues summary
* List of reviews

---

### 4. Voting System

* Users can upvote reviews
* Upvotes increase review credibility
* No downvotes in v1

---

### 5. Library Screen (User Content)

Library screen includes:

* A **+ button** to add a new review
* A list of the user’s submitted reviews
* CRUD actions:

  * Create
  * Edit
  * Delete

---

### 6. Profile Screen

User can:

* Change username
* Change profile image
* Delete account and all associated data

---

## Navigation Structure

* Home
* Search
* Library
* Profile

Tab-based navigation.

---

## Out of Scope (NOT MVP)

The following are intentionally excluded:

* Messaging or chat
* Car sales or listings
* Payments
* Bookings
* Comments on reviews
* Moderation tools

---

## Tech Assumptions (Subject to change)

* Frontend: React Native (Expo)
* Backend (later): Supabase or Firebase
* Authentication: Email / OAuth (later)

---

## Development Phases

### Phase 1: UI + Static Data

* Screens
* Hardcoded data
* Navigation

### Phase 2: Data Logic

* Real data models
* CRUD operations

### Phase 3: Backend Integration

* Auth
* Database
* Persistence

---

## Success Criteria for MVP v1

* User can submit a review
* User can search a car model
* User can see aggregated reviews
* User can manage their own content

If these work → MVP v1 is complete.
