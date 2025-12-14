# DEMO and Setup for Cypress E2E tests

📊 Demo report page: [Mochawesome](https://tarlanziyadov.github.io/Cypress_e2e_TarlanZiyadov_Report/report.html)

🌐 Detailed description for test framework structure can be found in my blog posts: [TarlanZiyadov](https://tarlanziyadov.github.io/about/)

## Steps

- Create separate github repository for report page.

- Github workflow requires personal access token. It can be generated via your github account settings -> Developers settings -> Fine-grained tokens with read and write access to both this repository and report repository. After add it as repository secrets.

- Go through github workflows file and change all repo path to your new repositories.

- Activate github pages for report page repository from settings.

- Install all packages by running npm install

- Install Eslint from Extensions in VScode and enable it

## Run tests

### Terminal

- npm run test

### UI

- npx cypress open
