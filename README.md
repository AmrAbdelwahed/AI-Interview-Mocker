# AI Interview Mocker

AI-powered technical interview preparation platform built with Next.js. Practice coding interviews with real-time AI feedback.

## Features
- **AI Mock Interviews**: Simulated technical interviews using Gemini AI
- **Real-Time Feedback**: Instant analysis of your interview responses
- **User Authentication**: Secure login and session management with Clerk
- **Responsive Design**: Optimized for all devices

## Technologies Used

### Frontend:

- **React.js**: JavaScript library for building user interfaces.
- **Next.js**:  React framework for server-side rendering and static site generation
- **Tailwind CSS**: Utility-first CSS framework for styling.

### Backend:

- **Node.js**: JavaScript runtime for building scalable network applications.
- **Drizzle ORM**:  TypeScript ORM for SQL databases.
- **PostgreSQL**: Relational database for data storage.

### APIs and Services:

- **Gemini AI**: Provides AI-driven responses for mock interviews.
- **Clerk**:  User authentication and management service.

## Deployment

The application is now deployed in a Dockerized environment and can be accessed via the following URL:


**[AI Interview Mocker](https://ai-interview-mocker-amrabdelwaheds-projects.vercel.app/)**


## Optional: Running the Application Locally with node.js and npm

Follow these instructions to set up and run the project locally.

### Prerequisites
- Node.js (v14.x or later)
- npm (v6.x or later)
- PostgreSQL

### Steps to Run Locally

1. **Clone the Repository:**
   ```bash
    git clone https://github.com/AmrAbdelwahed/AI-Interview-Mocker.git
    cd AI-Interview-Mocker
    ```

2. **Install Dependencies:**
   ```bash
    npm install
    ```

3. **Env variables configuration:**
   ```bash
    DATABASE_URL=postgresql://username:password@localhost:5432/database_name
    NEXT_PUBLIC_CLERK_FRONTEND_API=your_clerk_frontend_api
    CLERK_API_KEY=your_clerk_api_key
    GEMINI_API_KEY=your_gemini_api_key
    ```

- Replace username, password, database_name with your PostgreSQL credentials.
- Replace your_clerk_frontend_api and your_clerk_api_key with your Clerk credentials.
- Replace your_gemini_api_key with your Gemini AI API key.

4. **Database Migration:** 
   ```bash
    npx drizzle-kit up
    ```

5. **Start the Development Server:**
   ```bash
    npm run dev
    ```
- Open your browser and navigate to http://localhost:3000.

## Directory Structure
    AI-Interview-Mocker/
    ├── app/                # Next.js app directory
    │   ├── components/     # React components
    │   ├── pages/          # Next.js pages
    │   ├── styles/         # CSS styles
    │   └── ...             # Other Next.js specific folders
    ├── drizzle/            # Drizzle ORM configurations and migrations
    ├── public/             # Public assets
    ├── utils/              # Utility functions
    ├── .env.local          # Environment variables
    ├── package.json        # npm package configuration
    └── ...                 # Other configuration files
## License

This project is licensed under the MIT License. See the **[LICENSE](https://github.com/AmrAbdelwahed/AI-Interview-Mocker/blob/main/LICENSE)** file for details.