# To run project, you need to:
1. run: 'npm i'
2. run: 'yarn start'

# Endpoints
1. Login page: 'http://localhost:3000/login'
2. Home page: 'http://localhost:3000/home'
3. Add new Question: 'http://localhost:3000/add'
4. Leader Board Page: 'http://localhost:3000/leaderboard'
5. Detail Question page: 'http://localhost:3000/questions/:question_id'

# Describe the functions of the project
- Login/Logout: User must be logged in to view other sections
- The polls (questions) in both categories (answered and unanswered) are arranged from the most recently created (top) to the least recently created (bottom) at home page.
- Vote on poll and see the results
- Create new Question
- Learder Board page: Users are ordered in descending order based on the sum of the number of questions they’ve answered and the number of questions they’ve asked.
- Show 404 page when url doesn't exist