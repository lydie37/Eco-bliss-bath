# EcoBlissBath

EcoBlissBath is a web application developed with Angular to manage and discover natural, plastic-free soaps for hair, face and body.

## Table of Contents

- [Description](#description)
- [Technologies](#technologies)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Development server](#development-server)
- [Running unit tests](#running-unit-tests)
- [Running Cypress tests](#running-cypress-tests)
- [Generating test reports](#generating-test-reports)
- [Contributing](#contributing)
- [Further help](#further-help)

## Description

EcoBlissBath replaces shampoo, shower gel and facial cleanser with a single product.  
It demonstrates the use of Angular components, services, and routing.

## Technologies

- Angular 13.3.0
- Angular CLI 13.3.0
- TypeScript 4.6.2
- HTML5 & CSS3
- Karma & Jasmine (unit tests)
- Cypress 15.6.0 (end-to-end tests)

## Prerequisites

- Node.js 14.x to 16.x (recommended for Angular 13)
- npm >= 6.x
- Angular CLI installed globally:

```bash
npm install -g @angular/cli
```

## Installation

Clone the repository:

```bash
git clone https://github.com/lydie37/Eco-bliss-bath
```

Navigate to the project folder:

```bash
cd EcoBlissBath
```

Install dependencies:

```bash
npm install
```

## Development server

Start the development server:

```bash
npm start
```

Open your browser at [http://localhost:4200](http://localhost:4200).

## Running unit tests

_les tests unitaires ne sont pas encore développés_
Run unit tests using Karma:

```bash
npm test
```

## Running Cypress tests

_dans ce projet, les tests sont exécutés via l’interface graphique de Cypress. Le mode sans interface graphique (`npx cypress run`) n’a pas été utilisé_

Open the Cypress GUI to run tests interactively:

```bash
npx cypress open
```

## Test Environment

The Cypress tests were run locally on the EcoBlissBath application,  
with the backend accessible at [http://localhost:8081](http://localhost:8081)  
and the frontend at [http://localhost:4200](http://localhost:4200).

## Generating test reports

_la génération de rapports n'a pas encore été effectuée dans le cadre de ce projet_
Generate a Cypress report with Mochawesome:

```bash
npx cypress run --reporter mochawesome
```

## Contributing

Fork the repository.  
Create a new branch:

```bash
git checkout -b feature-name
```

Make changes, commit and push.  
Open a Pull Request.

## Further help

For Angular CLI help:

```bash
ng help
```
