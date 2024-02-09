

# InfluenzaNet
This project was generated using [Nx](https://nx.dev).
<p style="text-align: center;"><img src="https://raw.githubusercontent.com/nrwl/nx/master/images/nx-logo.png" width="450"></p>

## Development

1 - copy and rename /docker/development/example.env to /docker/development/.env
```
  cd docker/development/
  cp example.env .env
```

&nbsp;

2 - Build the docker images. This step is required only the first time you run the application locally.

This step could take several minutes to complete. You might want to have a coffee in the meantime.
```
  cd docker/development/
  docker-compose build
```

&nbsp;

3 - Run the application
```
  cd docker/development/
  docker-compose up
```

## Build
1 - Stop all the docker containers of this project
```
  cd docker/development/
  docker-compose down
```

&nbsp;

2 - Launch build container
```
  cd docker/development/build
  docker-compose up
```

&nbsp;

3 - Wait for the "build container" to complete without error. 

The "build container" will free your terminal when the process is finished.

A dist directory should appear at the root of this project

&nbsp;

4 - The application is now ready to be committed to production.


## Production
If you want you can deploy only the content of the /dist directory in production.

1 - Copy and rename /dist/docker/example.env to /dist/docker/.env
```
  cd dist/docker/
  cp example.env .env
```
You might want to change some variables contained in the .env file (eg: the port where the application will be exposed)

&nbsp;

2 - Build all the docker images. This step is required only the first time you run the application on production.

This step could take several minutes to complete. You might want to have a coffee in the meantime.
```
  cd dist/docker/
  docker-compose build
```

&nbsp;

3 - Run the application
```
  cd dist/docker/
  docker-compose up -d
```

&nbsp;

4 (optional) - If you want to setup the application with example data, run the following command in the shell of the api container:

```
  migration seed
```

## SSL
To enable https put the certificate files in /dist/docker/ssl

file names should be:

nginx.crt

nginx.key


## Static Data

Upload platform data files to /dist/data/platform-data

file names should have the following pattern: 

[COUTRY SHORTNAME]_[FETAURE].csv

eg: IT_active.csv, DE_incidence.csv, DKC_visits_cumulated.csv

Platform Data files are statically served from backend so restarting the nginx container after and Upload/Update is not required.

&nbsp;

## Migrations and seed

Run the following commands in the shell of the api container(named node in development) in order to perform migrations and seed the database with initial data:

- **Seed with example data**

  `migration seed`
  
  This command will create and setup database tables, seed the database with example data and expose some assets like platform data files and images.


- **Apply migrations**

  `migration apply`

- **Undo migration**

  `migration undo`


    
