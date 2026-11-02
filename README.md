# COLORS Lab

This is my COLORS lab project for COP4331. Users can log in, add colors, and search for colors saved to their account. The application is based on the starter files provided in class.

## Technologies

Linux, Apache, MySQL, PHP, HTML, CSS, and JavaScript.

## Files

- `html/` contains the login and color pages.
- `LAMPAPI/` contains the PHP files for login, adding colors, and searching.
- `css/`, `js/`, and `images/` contain the styles, browser code, and images.

## Setup

1. Set up a LAMP server, such as the DigitalOcean droplet used in the lab. PHP needs the `mysqli` extension.
2. Create the MySQL database and tables using the class guide. The app uses a `Users` table with `ID`, `FirstName`, `LastName`, `Login`, and `Password`, and a `Colors` table with `ID`, `Name`, and `UserID`.
3. Add a test user to the database. This version follows the starter code with the MD5 calls commented out, so the lab user's password must match the value sent by the login page.
4. Copy the `html`, `LAMPAPI`, `css`, `js`, and `images` folders into `/var/www/html`, keeping these folders together.
5. In the three PHP files on the server, replace `YOUR_DB_USER`, `YOUR_DB_PASSWORD`, and `YOUR_DB_NAME` with your database settings. The sample host is `localhost`. Keep the real settings out of GitHub.

## License

This project uses the MIT License. See `LICENSE.md`.
