# eBid | Online Auction

## Online auction system with two backend servers and one frontend server. Backend auth_system connects with PostgreSQL and Backend main_server connects with MySQL.

## Table of contents[![](https://raw.githubusercontent.com/aregtech/areg-sdk/master/docs/img/pin.svg)](#table-of-contents)

- [Introduction](#introduction)
- [Installation and Run](#install)
  - [Install Node.js](#node.js)
  - [Install PostgreSQL](#postgreSQL)
  - [Clone the repository and Run](#run)
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

## Installation and Run(#install)

### I. Install Node.js (#node.js)

Please refer to  
 https://nodejs.org/en

### II. Install PostgreSQL (#postgreSQL)

Please refer to  
 https://www.postgresqltutorial.com/postgresql-getting-started/install-postgresql/

Once installed, you can use the respective client tools to connect to the PostgreSQL database.

### III. Clone the repository and Run(#run)

```bash
git clone https://github.com/lzpmpc005/ZooManagementSystem.git
```

#### i. auth_system

1. Navigate to the directory

```bash
cd auth_system
```

2. Install dependencies using pip:

```bash
pip install -r requirements.txt
```

3. create a file ".env.local" and put the following value accordingly:

DEBUG = True
SECRET_KEY = 'djoser secret key'

DOMAIN = 'localhost:3000'

DB_USER = 'database username'
DB_PASSWORD = 'database password'

EMAIL_HOST_USER = 'your email address'
EMAIL_HOST_PASSWORD = 'your email password'

GOOGLE_OAUTH2_KEY = "your google oauth2 key"
GOOGLE_OAUTH2_SECRET = "you secret"

GITHUB_KEY = "your key"
GITHUB_SECRET = "your secret"

4. Perform database migration:

```
python manage.py makemigrations
python manage.py migrate
```

5. Run the auth server:

```
python manage.py runserver
```

#### ii. Next.JS Frontend Server

1. Navigate to the project

```bash
cd online_auction
```

2. Install dependencies using npm:

```bash
 npm install
```

3. Start frontend server:

```bash
 npm run dev
```

## Features[![](https://raw.githubusercontent.com/aregtech/areg-sdk/master/docs/img/pin.svg)](#Features)

1. Auth system

- Register
  - Activate
- Login
- Login with Google/Github
- Logout
- Reset Password

---

## Contribution

If you want to contribute or comment on this project, email lihongtaoix7@gmail.com.
