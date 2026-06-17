# System Design

## High Level Architecture

Frontend
|
v
API Gateway
|
v
Workflow Service
|
v
Agent Service
|
v
Redis + PostgreSQL

---

# Services

## API Gateway

Responsibilities:

* Authentication
* Authorization
* Request Validation
* Routing
* Swagger Documentation

---

## Workflow Service

Responsibilities:

* Assessment Creation
* Workflow Management
* State Tracking
* Agent Scheduling

---

## Agent Service

Responsibilities:

* Agent Registration
* Agent Execution
* Prompt Construction
* Result Aggregation

---

## Memory Service

Responsibilities:

* Context Storage
* Agent Memory
* Workflow Memory
* Cache Management

---

## Audit Service

Responsibilities:

* System Events
* User Actions
* Workflow History
* Agent Decisions

---

# Database Design

## projects

* id
* name
* description
* status
* created_at

---

## assessments

* id
* project_id
* title
* scenario
* status
* created_at

---

## workflows

* id
* assessment_id
* state
* started_at
* completed_at

---

## agent_executions

* id
* workflow_id
* agent_name
* status
* output
* execution_time

---

# Redis Usage

## Cache

* Project Cache
* Assessment Cache

## Workflow State

* Current Agent
* Current Stage
* Execution Status

## Agent Memory

* Previous Outputs
* Shared Context

---

# Observability

OpenObserve will track:

* Request Latency
* Workflow Duration
* Agent Execution Time
* Error Rates
* System Health

---

# Future Architecture

Phase 2+

* Microservice Separation
* Event Driven Communication
* Message Queue Integration
* Horizontal Scaling
* Multi-Tenant Support

---

# Deployment Strategy

Development:

* Docker Compose
* Local PostgreSQL
* Local Redis
* Local Ollama

Production:

* EC2
* Docker
* Nginx
* OpenObserve

Target Cost:

₹0 during development.
