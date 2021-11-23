## Prerequisites
TODO
1. Copy your service account JSON credentials to `key.json`
2. Export the following

    ```sh
    $ export GOOGLE=<project id>
    ```
## Running

#### Locally
```sh
# Set your default Dataset
$ export DATASET_ID=$PROJECT_ID

# Install the dependencies
$ npm install

# Start the server
$ npm start
```

#### [Docker](https://docker.com)
```sh
# Build your Docker image
$ docker build -t app .

# Start a new Docker container
$ docker run -e DATASET_ID=$PROJECT_ID -p 8080:8080 app
```

## Command Line
This sample can also be run from the command line:
[Command Line Example](//github.com/GoogleCloudPlatform/gcloud-node-todos/tree/main/cli)

```sh
$ npm link
$ datastore-todos
```