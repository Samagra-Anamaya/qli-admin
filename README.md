# QLI Admin

A basic admin panel built using **[react-admin](https://marmelab.com/react-admin/Readme.html)** that lets you log in and see a list of **Metabase dashboards** to open.

After a successful login, the user's authentication token, along with its expiration time, is stored in local storage. This token is included in the headers of requests to the `/dashboard` API to fetch **Track dashboards** and **Indicator dashboards**, which are displayed as buttons for users to access them.

## Installation

Install the application dependencies by running:

```sh
npm install
# or
yarn install
```

## Development

Start the application in development mode by running:

```sh
npm run dev
# or
yarn dev
```
