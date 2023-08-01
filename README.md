# Pii Shop

This is the backend application of the Pii.shop platform

### Setup
- Clone the repo
- Install depensencies
```bash
    npm install
```
- Add the env variables using .env.example
- Run migrations
```bash
  npx sequelize db:migrate
```

### Running Redis
Make sure redis is installed on your system and run the command

- On Windows
```bash
  redis-server
```


### Start up development server
```bash
  npm run dev
```

### Add new domain

To add a new domain to the application run:

```bash
npm run create-domain -- [domain-name]
```

This would add a new domain in the src/domains folder
