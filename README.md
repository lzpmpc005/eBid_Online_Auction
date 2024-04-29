# eBid | Online Auction

## Online auction system with two backend servers and one frontend server. Backend auth_system and Backend express_server both connect to MySQL.

## Table of contents[![](https://raw.githubusercontent.com/aregtech/areg-sdk/master/docs/img/pin.svg)](#table-of-contents)

- [Introduction](#introduction)
- [Installation](#installation)
  - [Install Docker]
  - [Clone the repository]
- [Features](#Features)
- [Contribution](#Contribution)

---

<!-- markdownlint-disable -->

## Introduction[![](https://raw.githubusercontent.com/aregtech/areg-sdk/master/docs/img/pin.svg)](#introduction)

**Online Auction**  
This project is a web application for online auction. It has been implemented with the following features:

- register/activate
- login/logout
- password reset
- create auctions
- browser auctions
- search/filter auctions

## Installtion[![](https://raw.githubusercontent.com/aregtech/areg-sdk/master/docs/img/pin.svg)](#installation)

### 1. Install Docker

Please refer to  
 https://www.docker.com/products/docker-desktop/

> [!NOTE]
> Remember to start the Docker desktop and keep it running.

### 2. Clone the repository

```bash
git clone https://github.com/lzpmpc005/eBid_Online_Auction.git
```

### 3. Navigate to the project root directory

```bash
cd eBid_Online_Auction
```

### 4. Dockerize the project

```bash
dokcer-compose build
```

> [!NOTE]
> First build could take serveral minutes.

### 5. Run the image in Docker

```bash
dokcer-compose up -d
```

> [!NOTE]
> You may need to manually go to your docker container and start auth_system again.

### 6. Initialize the project

```bash
docker exec -it ebid_online_auction-frontend-1 node ./scripts/initialize.ts
```

> [!NOTE]
> This command will create Categories for this project.

## Features[![](https://raw.githubusercontent.com/aregtech/areg-sdk/master/docs/img/pin.svg)](#Features)

1. Auth system

- Register
  - Activate
- Login
- Login with Google/Github
- Logout
- Reset Password

2. Auction Creation

- Go to seller mode after login
- Name you auction and continue
- Customize your auction
- Set up start price and close time
- Publish the auction

3. Browser Auctions

- Go to Explore page after login
- Check current auctions
- Search wanted auctions by title
- Fileter auctions by categories

---

## Contribution

If you want to contribute or comment on this project, email lihongtaoix7@gmail.com.
