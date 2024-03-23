## Scripts

To get started developing right away:

- install all project dependencies with `npm install`
- start the development server with `npm start`
- launch test runnter `npm run test`

## Default users

- username : "sarahedo" / password : "Udacity123!"
- username : "tylermcginnis" / password : "Udacity123!"
- username : "johndoe" / password : "Udacity123!"

## Project structure
```bash
├── CONTRIBUTING.md
├── README.md - This file.
├── package.json # npm package manager file. It's unlikely that you'll need to modify this.
└── src
    ├── components
    │  ├──  AuthGuard
    │  │   └── AuthGuard.component.tsx # AuthGuard component
    │  ├──  Question
    │  │   └── Question.component.tsx # Question component
    │  ├── Navbar
    │  │   ├── Navbar.component.scss # Styles for navbar component
    │  │   └── Navbar.component.tsx # Navbar component
    ├── helpers
    │  └── control.helpers.ts # Common function
    ├── models
    │  ├── auth.model.ts # Model for authentication
    │  ├── questions.model.ts # Model for questions
    │  └── users.model.ts # Model for users
    ├── pages
    │  ├── AppLayout
    │  │   ├── AppLayout.page.scss # Styles for app layout
    │  │   └── AppLayout.page.tsx # App layout
    │  ├── Home
    │  │   ├── Home.page.scss # Styles for main page
    │  │   └── Home.page.tsx # Main home page
    │  ├── Leaderboard
    │  │   └── Leaderboard.page.tsx # Leaderboard page
    │  ├── Login
    │  │   ├── Login.page.scss # Styles for login page
    │  │   └── Login.page.tsx # Login page
    │  ├── NewQuesiton
    │  │   ├── NewQuesiton.page.scss # Styles for new question page
    │  │   └── NewQuesiton.page.tsx # New Question page
    │  ├── NotFound
    │  │   ├── NotFound.page.scss # Styles for 404 page
    │  │   └── NotFound.page.tsx # 404 page
    │  ├── QuestionDetail
    │  │   ├── QuestionDetail.page.scss # Styles for question detail
    │  │   └── QuestionDetail.page.tsx # Question detail page
    │  ├── Questions
    │  │   ├── Questions.page.scss # Styles for questions
    │  │   └── Questions.page.tsx # Questions page
    ├── store
    │  ├── authSlice.store.ts # store for authentication
    │  ├── questionsSlice.store.ts # store for questions
    │  └── usersSlice.store.ts # store for users
    ├── App.tsx # This is the root of your app. Contains static HTML right now.
    ├── App.test.tsx # Used for testing. Provided with Create React App.
    └── index.tsx # You should not need to modify this file. It is used for DOM rendering only.
```

