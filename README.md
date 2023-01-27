
# NodeJS - Store Api

An API which contains the basic models and functionalities required for the management of an online store.

Fully developed with NodeJS, this API follows the CRUD paradigm to accomplish the main use cases of a store management. It contains several models that are connected to any relational DataBase by Sequelize.



## Installation

Install the required dependencies with:

```bash
  npm install
```

## Deployment

First run the migrations to have the DB synced:
```bash
  npm run migration:run
```

Then to deploy this project in Development mode run:

```bash
  npm run dev
```

To deploy it in Production mode run:

```bash
  npm start
```


