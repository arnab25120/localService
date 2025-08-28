# Local Service Project

This repository contains the source code and implementation of a Local Service website  developed using the MERN stack (MongoDB, Express.js, React, Node.js) along with Tailwind CSS for styling and Cloudinary for managing media.

## Table of Contents
- [Overview](#overview)
- [Features](#features)
- [Installation](#installation)
- [Prerequisites](#prerequisites)

## Overview
The Local Service Website is a full-stack web platform that connects service providers with customers in a seamless way. It allows providers to register, post their services, and manage listings, while customers can browse, search, and request services. An admin panel ensures quality control by reviewing and approving services before they become publicly visible.

## Features
-User authentication and authorization(using JWT)
-Service creation,modification and deletion
-Content upload and management via Cloudinary
-Customer can get all services and search services by category
-Admin Panel from where admin can approve and reject any service
-Interactive user interface using React and Tailwind CSS

## Installation

 Clone the project 

```bash
git@github.com:arnab25120/localService.git
```

### Setup instruction  for Frontend

1. Move into the directory

```bash
cd frontend
```
2. install  dependenices

```bash
npm install
```
3.  run the server

```bash
npm run dev
```

### Setup instruction  for Backend

1. Move into the directory

```bash
cd backend
```
2. install  dependenices

```bash
npm install
```
3.  run the server

```bash
npm run dev
```
4.  Set up environment variables:
   Create a `.env` file in the `server` directory and add the following:

```bash
    PORT = <Port number >
    MONGODB_URL=<Connection_LINK>
    JWT_SECRET = <YOUR_LONG_JWT_SECRET>
    JWT_EXPIRY = <JWT_EXPIRY>

    FRONTEND_URL = <YOUR_FRONTEND_WEBSITE_URL>

    CONTACT_US_EMAIL = <YOUR_CONTACT_US_EMAIL>

    CLOUDINARY_CLOUD_NAME = <YOUR_CLOUDINARY_CLOUD_NAME>
    CLOUDINARY_API_KEY = <YOUR_CLOUDINARY_API_KEY>
    CLOUDINARY_API_SECRET = <YOUR_CLOUDINARY_API_SECRET>
```
## Prerequisites

Before running this project locally, ensure you have the following installed:

- [Node.js](https://nodejs.org/) (v14.x or higher)
- [npm](https://www.npmjs.com/) (v6.x or higher)
- [MongoDB](https://www.mongodb.com/) (v4.x or higher)
- [Cloudinary](https://cloudinary.com/) account and API credentials


