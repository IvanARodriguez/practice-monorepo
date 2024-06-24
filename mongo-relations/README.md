<a name="readme-top"></a>

[![MIT License][license-shield]][license-url]
[![LinkedIn][linkedin-shield]][linkedin-url]

<!-- PROJECT LOGO -->
<br />
<div align="center">

  <h3 align="center">Rent-A-Car Application</h3>

  <p align="center">
   Rent and manage Cars you have for rent
  </p>
</div>

<!-- TABLE OF CONTENTS -->
<details>
  <summary>Table of Contents</summary>
  <ol>
    <li>
      <a href="#about-the-project">About The Project</a>
      <ul>
        <li><a href="#built-with">Built With</a></li>
      </ul>
    </li>
    <li>
      <a href="#getting-started">Getting Started</a>
      <ul>
        <li><a href="#prerequisites">Prerequisites</a></li>
        <li><a href="#installation">Installation</a></li>
      </ul>
    </li>
    <li><a href="#usage">Usage</a></li>
    <li><a href="#roadmap">Roadmap</a></li>
    <li><a href="#contributing">Contributing</a></li>
    <li><a href="#license">License</a></li>
    <li><a href="#contact">Contact</a></li>
    <li><a href="#acknowledgments">Acknowledgments</a></li>
  </ol>
</details>

<!-- ABOUT THE PROJECT -->

## About The Project

The idea behind this full stack application is to allow an administrator to create, update, delete cars that are available for rent. The customers will eventually be able to login and schedule a rental.

Here's why:

- Car rentals need a user friendly platform to rent their cars
- Customers need a better car rental experience
- Car dealers can have a better business representation, and improve their services

This application is meant to start with a monolith approach, which means that a single app will handle all the business logic.

### Built With

This application is built with Node.js, Express.js and uses EJS as the view engine

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- GETTING STARTED -->

## Getting Started

To get a local copy up and running follow these simple example steps. Ensure Node is installed, and pnpm is available globally

### Prerequisites

Open a git terminal which uses bash

- Navigate to server

  ```sh
  cd server
  touch .env
  ```

- Add PORT=[APPLICATION-PORT] to the .env otherwise application will run on port 6000

### Installation

The following dependencies must be installed to run the project

- Install Nodejs
- Install MongoDb

1. Clone the repo
   ```sh
   git clone https://github.com/IvanARodriguez/practice-monorepo.git
   ```
2. Install NPM packages
   ```sh
   pnpm install
   ```
