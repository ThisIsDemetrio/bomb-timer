# BombTimer

[![Netlify Status](https://api.netlify.com/api/v1/badges/f1924daa-a340-48c6-9808-3612fc9276d2/deploy-status)](https://app.netlify.com/sites/timer-bomb/deploys)

Small single-page Application generated with [Angular CLI](https://github.com/angular/angular-cli) to simulate a bomb-timer countdown. Includes some small configurations to customize the countdown (such as time, showing milliseconds, which color use).

This project is deployed with [Netlify](https://www.netlify.com) after every successful merge request.

The code is completely open-source and written in [TypeScript](https://www.typescriptlang.org) and using the [Angular](https://angular.io) framework, using the latest available version. It uses [ESLint](https://eslint.org) and [Prettier](https://prettier.io) for code formatting.

It is intended to be a showcase project to display personal skills in programming and web development with a simple project. You can use any part of the code, but mind that the following credits must be due:

- [Blambot Comic Fonts](https://www.1001fonts.com/users/blambot/) for the font
- [Studio Kolomna](https://audiojungle.net/user/studiokolomna/portfolio) for the clock-ticking music
- [Pixabay](https://pixabay.com/) for the bomb explosion music

## How to run locally the BombTimer application

We use [npm](https://www.npmjs.com/) as a package manager. First of all, you have to run `npm ci` before attempting to build or start the application.

Run `npm run start` (`ng serve`) for a dev server. Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.

Run `npm run build` (`ng build`) to build the project. The build artifacts will be stored in the `dist/` directory.

There are no test suites for unit tests, integration tests or e2e tests. Yet.
