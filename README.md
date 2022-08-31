 <p align="center">
  <br>
  <img src="/demo/LOGO.png" />
  <h3 align="center">
  Travel-Around-Taiwan
  </h3>
 </p>

## Table of contents

- [Demo](#Demo)
- [Introduction](#Introduction)
- [Quick start](#quick-start)
- [Acknowledgements](#Acknowledgements)

## Demo

<a href="https://travel-around-taiwan.netlify.app/" target="_blank"><img src="/demo/home-demo.png" width=650 alt="home-page-demo" /></a>

## Introduction

This is my first project done ever since I started to learn web development and it is mainly for testing my knowledge acquired along the way.

This web application was built upon the followings:

- Vanilla JavaScript
- MVC Architecture
- SASS
- SASS 7-1 Pattern
- Webpack

The third party APIs used are as follows:

- [TDX Tourism API](https://tdx.transportdata.tw/api-service/swagger#/Tourism)
- [Google Maps Embed API](https://developers.google.com/maps/documentation/embed/get-started)

> The cloud service chosen for deployment is [Netlify](https://www.netlify.com/)

## Quick start

### Environment Variables

To run this project, you will need to add the following environment variables to your `.env` file

`API_ID`

`API_KEY`

`GOOGLE_API_KEY`

> The `API_ID`, `API_KEY` For TDX can be applied for [here](https://tdx.transportdata.tw/api-service/swagger#/Tourism)

> Google Maps Embed API is used and corresponds to `GOOGLE_API_KEY`

### Clone the project

```
git clone
```

### Install dependencies

```
$ npm i
```

### Run locally in development mode

```
$ npm run start:dev
```

## Acknowledgements

- [Thef2e](https://2021.thef2e.com/) for the resources
- [Jhen](https://www.figma.com/file/fnHynjl6HHHCcqay2C4KVn/2021-THE-F2E--Week1?node-id=5%3A2) for UI design
