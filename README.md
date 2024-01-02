## Development

To start development, first make sure you have Docker installed. Then, in the root folder of this project run

```
docker-compose up
```

If you modify requirements.txt run

```
docker-compose up --build
```

When you're finished run

```
docker-compose down
```

This properly stops and removes the containers and associated resources.

### Frontend Development

You will also want to run the following commands if you are working on the frontend:

```
npm install
```

-- When you update the api.yaml file run


```
npm run generate
```
