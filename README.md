## Todo App Project Documentation

This documentation is designed according to the requirements outlined in the Novestra Full Stack Upskilling Program ToDo App assignment and should accompany the code hosted at [ibrartalab/Todo-App](https://github.com/ibrartalab/Todo-App).

### 1. Objective

The purpose of this project is to demonstrate hands-on, industry-relevant skills in full-stack development by building a robust and maintainable Todo Application. It showcases mastery in modern technologies including:

- **Frontend**: React (with hooks, context, and react-router)
- **Backend**: .NET Core Web API (with Clean Architecture principles)
- **Authentication**: custom JWT
- **Testing**: Automated unit tests for both backend (.NET xUnit) and frontend (Jest/React Testing Library)


### 2. User Stories

| As a... | I want to... | So that... |
| :-- | :-- | :-- |
| User | Register and log in | My tasks are private and secure |
| User | Add, edit, delete tasks | I can manage my daily activities |
| User | Mark tasks as completed | I can track my progress |
| User | Filter tasks by status | I can easily find active, completed, or all tasks |
| User | View a dashboard of completed/pending tasks | I understand my productivity at a glance |

### 3. Database Design

#### Entity Relationship Diagram (ERD)

- **Users** (UserID, Username, Email, PasswordHash)
- **Tasks** (TaskID, UserID, Title, Description, Status, CreatedAt, DueDate, CompletedAt)

**Relationships**:

- One-to-many: Each user can have multiple tasks.


### 4. API Design

#### Authentication (Auth0/JWT Based)

- **POST** `/api/auth/register` — Register user
- **POST** `/api/auth/login` — Login user


#### Tasks

- **GET** `/api/TodoItems` — List of tasks (with filtering query params: status, date)
- **POST** `/api/TodoItems` — Create a new task
- **GET** `/api/TodoItems/{id}` — Get a specific task
- **PUT** `/api/TodoItems/{id}` — Edit a task
- **DELETE** `/api/TodoItems/{id}` — Delete a task


#### Dashboard

- **Access Dashbaord** `/dashboard/username` — Task stats for dashboard view


### 5. Architecture Overview

- **Frontend** (React):
    - Modular component structure: `TodoList`, `TodoItem`, `Filter`, `Dashboard`
    - CSS or Tailwind CSS for styling
    - Routing with `react-router-dom` (e.g., `/login`, `/dashboard`)
    - State management with Context API or Redux Toolkit
    - API communication via Axios
- **Backend** (.NET Core Web API):
    - Follows Clean Architecture: separation of concerns for Controllers, Business Logic, Repositories
    - Uses Entity Framework/Core for ORM
    - Dependency Injection for services and repositories
    - Exception handling and validation


### 6. Testing

- **Frontend**: Automated unit tests using **Jest** and **React Testing Library**
    - Rendering, state changes, event handling, and API integration (using mocking/stubbing)
- **Backend**: Unit tests in **xUnit** or **MSTest**
    - Test all API endpoints, business logic, and repository/database interactions
    - Target 80%+ code coverage

## Project Plan: Gantt Chart for Todo App Development

The following day-wise Gantt chart maps milestones and deadlines for each task, starting from Monday, July 21, 2025, to Monday, July 28, 2025. This schedule includes dedicated learning time for C# and .NET Core alongside development tasks.

| Date       | Task                                      | Hours |
|------------|-------------------------------------------|-------|
| 2025-07-21 | Learn C# and .NET basics                   | 4     |
| 2025-07-21 | Setup React project                        | 2     |
| 2025-07-21 | Task management UI components              | 2     |
| 2025-07-22 | Deepen C#/.NET API familiarity            | 3     |
| 2025-07-22 | Setup .NET Core API project                | 2     |
| 2025-07-22 | Setup routing/auth (frontend)              | 3     |
| 2025-07-23 | API endpoints (learning & coding)          | 4     |
| 2025-07-23 | DB schema + EF core (learning & hands-on) | 4     |
| 2025-07-24 | Complete authentication integration        | 3     |
| 2025-07-24 | Write tests (learn testing frameworks)     | 3     |
| 2025-07-24 | Write tests (hands-on)                     | 2     |
| 2025-07-25 | Buffer/Review, Coding best practices       | 2     |
| 2025-07-25 | Testing, Bug fixes                         | 3     |

**Notes:**

- Learning and development tasks are combined daily to support skill acquisition while progressing on project deliverables.
- The final days (July 26–28) are allocated as buffer time for review, additional coding, testing, or demo preparation.
- Daily work hours are balanced between 6 to 8 hours for sustainable progress.


### 8. Deliverables

- **Source Code**: In the specified [GitHub repository](https://github.com/ibrartalab/Todo-App)
- **Documentation**: This file, and in-code comments
- **Database design/ERD**: Included in this documentation
- **API Specification**: Listed above
- **Estimation plan \& timeline**: See section 7
- **Demo Video/Presentation**: Slides or a screen recording of the architecture and main flows

This template provides a complete overview tailored for submission and demonstration as per the Novestra Full-Stack Upskilling Program requirements. Please adjust technical specifics to match actual implementation in your codebase.
