<br />
<div align="center">
  <a href="https://github.com/github_username/repo_name">
    <img src="frontend/src/img/amazon_logo.png" alt="Logo" height="80">
  </a>

<h3 align="center">Amazon clone</h3>

  <p align="center">
    Full stack MERN e-commerce website
    <br />
</div>

## About The Project

[![Product Name Screen Shot][product-screenshot]](https://example.com)

Users can create a new account, add browse items, search for items, add items to the cart and place orders. Order history can also be accessed as one would expect in a real-life app

### Built With

[![Neact][node.js]][node-url]
[![Express][express.js]][express-url]
[![React][react.js]][react-url]
[![MongoDB][mongo.db]][mongo-url]
[![Redux Toolkit][redux]][redux-url]

## Getting Started

Follow the steps below to get the run the app in the local environment

### Prerequisites

- npm

  ```sh
  npm install npm@latest -g
  ```

### Installation

1. Clone the repo
   ```sh
   git clone https://github.com/suyashvsingh/amazon-clone
   ```
2. Install NPM packages
   ```sh
   npm install --prefix frontend && npm install
   ```
3. Cretae a database at [Mongo Cloud](https://cloud.mongodb.com/)

4. Create `.env`

   ```js
   MONGO_URI_PRODUCTS_DATABASE = "Enter MongoDB database URL";
   JWT_SECRET = "Enter a JWT secret key";
   ```

5. Start the frontend and backend simultaneously
   ```sh
   npm run dev
   ```

### Fill products collection

While the backend is running, send POST requrest to http://localhost:5000/api/products to populate the products available on the Home page

<div align='center'>
  <img src="https://user-images.githubusercontent.com/80644262/178810869-0b42c871-eed2-44ef-a3bd-58338942ca6a.png" alt="POST sample">
</div>

## Features

[contributors-shield]: https://img.shields.io/github/contributors/github_username/repo_name.svg?style=for-the-badge
[contributors-url]: https://github.com/github_username/repo_name/graphs/contributors
[forks-shield]: https://img.shields.io/github/forks/github_username/repo_name.svg?style=for-the-badge
[forks-url]: https://github.com/github_username/repo_name/network/members
[stars-shield]: https://img.shields.io/github/stars/github_username/repo_name.svg?style=for-the-badge
[stars-url]: https://github.com/github_username/repo_name/stargazers
[issues-shield]: https://img.shields.io/github/issues/github_username/repo_name.svg?style=for-the-badge
[issues-url]: https://github.com/github_username/repo_name/issues
[license-shield]: https://img.shields.io/github/license/github_username/repo_name.svg?style=for-the-badge
[license-url]: https://github.com/github_username/repo_name/blob/master/LICENSE.txt
[linkedin-shield]: https://img.shields.io/badge/-LinkedIn-black.svg?style=for-the-badge&logo=linkedin&colorB=555
[linkedin-url]: https://linkedin.com/in/linkedin_username
[product-screenshot]: https://user-images.githubusercontent.com/80644262/178795979-add73ca5-6d76-44e7-9e5d-1a2e6db5b940.jpg
[react.js]: https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB
[react-url]: https://reactjs.org/
[node.js]: https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white
[node-url]: https://nodejs.org/en/
[express.js]: https://img.shields.io/badge/Express.js-000000?style=for-the-badge&logo=express&logoColor=white
[express-url]: https://expressjs.com/
[mongo.db]: https://img.shields.io/badge/MongoDB-4EA94B?style=for-the-badge&logo=mongodb&logoColor=white
[mongo-url]: https://www.mongodb.com/
[redux]: https://img.shields.io/badge/Redux-593D88?style=for-the-badge&logo=redux&logoColor=white
[redux-url]: https://redux-toolkit.js.org/
