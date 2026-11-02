# COLORS LAMP Application

This project is a simple COLORS web application built using the LAMP stack.

## Technologies Used

- Linux
- Apache
- MySQL
- PHP
- HTML
- CSS
- JavaScript

## Setup

1. Set up a LAMP server.
2. Serve the contents of `public/` as the Apache document root. Map `/LAMPAPI` to the repository's `api/` directory, or copy the PHP endpoints into a `LAMPAPI/` directory under your document root. The JavaScript sends requests to `/LAMPAPI`.
3. Configure the existing lab MySQL database with its `Users` and `Colors` tables. This repository does not include a database creation script.
4. Configure `COLORS_DB_HOST`, `COLORS_DB_USER`, `COLORS_DB_PASSWORD`, and `COLORS_DB_NAME` in the environment of the PHP process. All four must have nonempty values. With Apache mod_php, use an Apache configuration file outside the repository (for example, `SetEnv COLORS_DB_HOST "your-host"` and equivalent directives for the other variables). With PHP-FPM, configure the pool's environment entries instead. Restart the relevant service after configuration. A `.env` file is **not** automatically loaded by this application.
5. Create lab user records through the existing database setup; there is no registration page. Open the configured server URL in a browser, log in, and add or search colors.

## Running the Application

The application can be accessed through a web browser after the files are placed on a working LAMP server.

## Features

The application allows users to log in, search for colors, and add colors to the database.

## Limitations and Assumptions

This project was created for a class lab and is intended as a basic demonstration of a LAMP web application.

## AI Usage

AI tools were used for guidance and troubleshooting during development and documentation.

## Database credential cleanup

The PHP APIs read their connection settings from environment variables; do not put real connection values in tracked files. Local `.env` and configuration files are ignored, but ignored files do not remove values already committed.

Database credentials were present in earlier commits. Change the exposed database password on the server and update the PHP environment configuration. The cleanup commit removes the values from the current files; it does not erase old commits. Removing them from repository history would be a separate history rewrite that must be coordinated with anyone using the repository.

## UML diagrams

The use case, search activity, and class diagrams are in [`docs/uml`](docs/uml/README.md), with editable PlantUML sources, rendered PNGs, and notes that connect each model to the implementation.
