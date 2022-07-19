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

## Demo

- <a href='http://194.195.112.138' target="_blank">Hosted on Linode</a>
- <a href='https://svs-amazon-clone.herokuapp.com' target="_blank">Hosted on Heroku</a>

## About The Project

[![Product Name Screen Shot][product-screenshot]](https://example.com)

Users can create a new account, add and browse items, search for items, add items to the cart, place orders and make payments. Users can access their order history as expected in a real-life app.

### Built With

[![Neact][node.js]][node-url]
[![Express][express.js]][express-url]
[![React][react.js]][react-url]
[![MongoDB][mongo.db]][mongo-url]
[![Redux Toolkit][redux]][redux-url]

## Getting Started

Follow the steps below to get run the app in the local environment.

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
3. Create a database at [Mongo Cloud](https://cloud.mongodb.com/)

4. Create a `.env` file.

   ```js
   MONGO_URI_PRODUCTS_DATABASE = "Enter MongoDB database URL";
   JWT_SECRET = "Enter a JWT secret key";
   ```

5. Start the frontend and backend simultaneously
   ```sh
   npm run dev
   ```

### Fill products collection

While the backend is running, send a POST request to http://localhost:5000/api/products to populate the products available on the Home page.

<div align='center'>
  <img src="https://user-images.githubusercontent.com/80644262/178810869-0b42c871-eed2-44ef-a3bd-58338942ca6a.png" alt="POST sample">
</div>

### Information regarding payments

Enter the card number: 378282246310005 for all orders for a successful transaction.

## Features

### Register and log in

<div align='center'>
  <img src="https://user-images.githubusercontent.com/80644262/178795995-2bddd6b1-068f-4a6a-852d-e69772d91112.jpg" width=95% alt="">
  <img src="https://user-images.githubusercontent.com/80644262/178795999-17f5d2f6-601f-48b9-b99e-6b3406b7f2b6.jpg" width=95% alt="">
  <img src="https://user-images.githubusercontent.com/80644262/178796001-c8a6a551-721f-494e-b904-db34a9ebd0e2.jpg" width=95% alt="">
</div>

### Searching

<div align='center'>
  <img src="https://user-images.githubusercontent.com/80644262/178798744-877f29c4-a6ef-473c-9044-a89b7ec96d7e.jpg" width=95% alt="">
  <img src="https://user-images.githubusercontent.com/80644262/178798765-ebbda387-e776-45ea-ba28-f629ff886a7c.jpg" width=95% alt="">
 
</div>

### Add to Cart

<div align='center'>
  <img src="https://user-images.githubusercontent.com/80644262/178796003-b60f7956-04d4-4d61-9db6-971391efa0a5.jpg" width=95% alt="">
  <img src="https://user-images.githubusercontent.com/80644262/178796016-64a4beaf-1b6b-4af4-a0bd-740860b5c333.jpg" width=95% alt=""> 
</div>

### Place order

<div align='center'>
  <img src="https://user-images.githubusercontent.com/80644262/178796023-934ef75b-e3f5-4927-88d0-1bd820680a13.jpg" width=95% alt="">
</div>

### Clear cart

<div align='center'>
  <img src="https://user-images.githubusercontent.com/80644262/178796024-83cadc97-2f1a-44b1-a85a-b32d24cb7e3e.jpg" width=95% alt="">
  <img src="https://user-images.githubusercontent.com/80644262/178796027-3d5e0ce0-1e18-4af7-88d9-39507c251765.jpg" width=95% alt=""> 
</div>

### Sign out

<div align='center'>
  <img src="https://user-images.githubusercontent.com/80644262/178796032-4816e94a-5679-474a-8270-f5bf430ad28c.jpg" width=95% alt="">
  <img src="https://user-images.githubusercontent.com/80644262/178796034-9a4b7eb7-63e2-4353-80e7-7f25b9b90e31.jpg" width=95% alt=""> 
</div>

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
