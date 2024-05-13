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
- bid on auctions
- winner notification

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

### 3. Customize .env.local

(1) go to "online_auction" directory, create a file named ".env.local" and paste the following inside and save. Remember to change the SECRET and ID to your own. For Uploadthing secret and id, just Sign up for uploadthing and create a new app, you will see https://uploadthing.com/dashboard.

```bash
NEXT_PUBLIC_HOST=http://localhost:8000
NEXT_PUBLIC_CONTENT_HOST=http://localhost:8080/api
NEXT_PUBLIC_LOGO="/logo.png"

UPLOADTHING_SECRET=Your SECRET
UPLOADTHING_APP_ID=Your ID
```

(2) go to "auth_system" directory, create a file named ".env.local" and paste the following inside and save. Remember to change the Keys and SECRETs to your own. You don't need Google and Github keys if you don't need Login with Google and Github.

```bash
DEBUG = True

DOMAIN = 'localhost:3000'

EMAIL_HOST_USER = 'change to your email account'
EMAIL_HOST_PASSWORD = 'change to your email password'

GOOGLE_OAUTH2_KEY = "Your Key"
GOOGLE_OAUTH2_SECRET = "Your Secret"

GITHUB_KEY = "Your Key"
GITHUB_SECRET = "Your Secret"
```

> [!NOTE]
> If you don't want to customize you Google and Github key and secret, the login with Google and Github won't work, but the normal login will work fine.

### 4. Navigate to the project root directory

```bash
cd eBid_Online_Auction
```

### 5. Dockerize the project

```bash
dokcer-compose build
```

> [!NOTE]
> First build could take serveral minutes.

### 6. Run the image in Docker

```bash
docker-compose up -d
```

> [!NOTE]
> You may need to manually go to your docker container and start auth_system again.

### 7. Initialize the project

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

4. Bid on Auction

- Click on an Auction
- Bid on it based on current_price

5. Winner Notification

- Notify winner by email -when auction closes

---

## Contribution

If you want to contribute or comment on this project, email lihongtaoix7@gmail.com.
