# Profile Service Infra 😈

This project is part of my backend + system design learning journey.

Main goal of this project:
- understand Redis caching
- visualize cache hit & cache miss
- understand distributed systems basics
- use Docker in real projects
- learn how scalable backend systems work

---

# Current Architecture

client
↓
NGINX
↓
Node.js App
↓
Redis Cache
↓
MongoDB

---

# Folder Structure

redis-cache-project/

app/
- controllers/
- routes/
- models/
- config/

nginx/
- nginx.conf

docker-compose.yml

README.md

---

# Why this structure?

## controllers/
Contains business logic.

Example:
- fetch profile
- handle cache
- DB queries

---

## routes/
Contains API routes.

Example:
GET /profile/:id

---

## models/
MongoDB schemas.

---

## config/
Centralized configs for:
- MongoDB
- Redis

---

## nginx/
Will be used for:
- reverse proxy
- load balancing
- scaling multiple containers

---

# Concepts Covered

## Docker 😈
- containers
- docker compose
- networking

## NGINX 😈
- reverse proxy
- load balancing

## Redis 😈
- centralized storage
- distributed rate limiting
- caching

## MongoDB 😈
- profile storage
- database simulation

---

# Production Concepts Learned

## Horizontal Scaling
Multiple app containers running together.

---

## Distributed Rate Limiter
Redis used as centralized shared storage.

---

## Race Condition
Observed why:
get → modify → set

can fail under concurrency.

Solved using:
Redis atomic INCR.

---

# Learning Goal

This is not just a CRUD project.

Goal is to understand:
- scaling
- caching
- infra
- distributed systems
- production backend engineering

step by step 😈

---

# Upcoming Features

- Redis caching
- cache invalidation
- TTL
- MongoDB optimization
- NGINX load balancing
- stress testing
- multi-container scaling
- production simulations

---

# Notes

This project is intentionally built slowly to deeply understand:
- why systems fail
- how systems scale
- how production systems behave under traffic

😈🔥