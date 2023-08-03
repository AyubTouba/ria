![Logo](https://i.ibb.co/9ZyYGd3/2631b4c6-874b-4bc9-8249-6c31bce6f64d.jpg)

# RIA (Webtracker engine)

RIA is an engine designed to save Apache/Nginx logs into MongoDB using Node.js. It provides the functionality to set up configurations for both the server and web application. This project is currently under development and is not ready for production use.

## Installation

To install and set up RIA, follow these steps:

1. Clone the RIA project repository :

```bash
  git clone https://github.com/AyubTouba/ria.git
```

1. Change to the project directory::

```bash
  cd ria-project

```

1. Install the dependencies using npm:

```bash
  npm install
```

## Configuration

The RIA project requires configuration settings for database. Modify the respective configuration files to match your environment:

- Web Application Configuration: config/default.js

```json
  "DbConfig" : {
        "mongo_server":"mongodb://localhost:27017",
        "mongo_database":"tracker"
    },
```

Please refer to the configuration files for more details on available options and their usage.

## Usage (soon)

## Related

[RIA (API REST)](https://github.com/AyubTouba/ria-rest-api.git)

## License

RIA is licensed under the [MIT](https://choosealicense.com/licenses/mit/). Feel free to use, modify, and distribute this project according to the terms of the license.
