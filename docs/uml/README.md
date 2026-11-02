# COLORS UML diagrams

These diagrams model the application in this repository. Each diagram has a PlantUML source (`.puml`) and a rendered PNG with the same base name.

| Diagram | Source | Rendered diagram |
| --- | --- | --- |
| Use case | [usecase.puml](usecase.puml) | [usecase.png](usecase.png) |
| Activity | [activity.puml](activity.puml) | [activity.png](activity.png) |
| Class | [class.puml](class.puml) | [class.png](class.png) |

## Scope and verification

- **Use case:** The user can log in, log out, add a color, and search their colors. `public/index.html`, `public/color.html`, and `public/js/code.js` provide these actions. Registration, editing, deleting, and administration are not implemented. Login is a normal UI precondition for color operations, rather than an `include` relationship that would repeat login on every request. The database is internal to the modeled system, rather than an external user actor.
- **Activity:** The diagram follows one search attempt from loading `color.html` through `readCookie()`, `searchColor()`, and `api/SearchColors.php`. A focused activity diagram models this operation rather than implying that the UI forces a fixed sequence of adding and searching. It preserves the lab code's existing client behavior on error responses. The connection-error decision represents the source's explicit `connect_error` check; on PHP runtimes that throw connection exceptions, the script may terminate earlier.
- **Class:** The application uses procedural JavaScript and PHP. The `module` and `script` stereotypes group real global state and functions; they do not claim that source-level classes exist. Dependencies are used for HTTP calls and SQL access. User-to-Color ownership is an association, not inheritance or composition. Users can have zero or more colors. Only fields referenced by the SQL are shown; the repository contains no SQL schema to verify extra fields or physical foreign-key enforcement.

## Source checks

| Modeled behavior | Source evidence |
| --- | --- |
| Login | `doLogin()` sends `login` and `password` to `Login.php`; SQL reads `Users`; an ID greater than zero leads to a cookie and `color.html`. |
| Logout | `doLogout()` clears browser state, expires the cookie, and redirects to `index.html`. There is no logout API. |
| Add color | `addColor()` sends `color` and `userId`; `AddColor.php` inserts `UserId` and `Name` into `Colors`. |
| Search colors | `searchColor()` sends `search` and `userId`; `SearchColors.php` uses a prepared `LIKE` query with a user filter and returns color names. |
| Client state | `userId`, `firstName`, and `lastName` are globals stored by `saveCookie()` and restored by `readCookie()`. The cookie is given a 20-minute expiration. |
| Connection settings | Each endpoint uses the lab's direct `mysqli` connection format. The repository contains placeholder connection values; actual database settings are supplied on the server. |

## Existing limitations reflected in the model

The APIs trust the `userId` in the request; the browser cookie is not a server-verified session. The search API returns an error object without `results` when there are no matches. The current JavaScript displays a retrieval-success message before trying to read `results.length`, so that response causes an uncaught callback error rather than a clean no-results message. Adding a color also displays a success message on HTTP 200 without inspecting the response's `error`. These behaviors have not been silently corrected by the diagrams. The login code sends the entered password directly; the MD5 calls in `code.js` are commented out.

## Rendering

Rendered with PlantUML 1.2025.2. With the PlantUML JAR and Java available, run this from the repository root:

```sh
java -Djava.awt.headless=true -jar /path/to/plantuml.jar -charset UTF-8 -tpng docs/uml/*.puml
```

The class and use-case sources use PlantUML's Smetana layout engine, so no separate Graphviz installation is needed.

## Validation performed

All three sources were rendered and the PNGs visually inspected. PHP 8.3 syntax checks passed for the three endpoints. The direct connection format was checked against the original lab code; a live database was not tested. A JavaScript mock verified both successful search rendering and the existing no-results callback error described by the activity diagram.

## AI usage

AI assisted with drafting the PlantUML sources, reviewing their correspondence to the repository, and rendering the diagrams. The source mapping and implementation limitations above document the verification. The submitter should review all diagrams against their deployed lab application before submitting.
