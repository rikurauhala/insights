# Architecture

## Structure

```mermaid
erDiagram
  user      ["User"]
  app       ["React app"]
  info      ["Info"]
  commits   ["Commits"]
  issues    ["Issues and PRs"]
  languages ["Languages"]
  topics    ["Topics"]
  data      ["Data service"]
  storage   ["Session storage"]
  octokit   ["Octokit service"]
  api       ["GitHub API"]

  user      }|--|| app       : "views and interacts with"
  app       ||--|| info      : renders
  app       ||--|| commits   : renders
  app       ||--|| issues    : renders
  app       ||--|| languages : renders
  app       ||--|| topics    : renders
  info      ||--|| data      : "fetches data"
  commits   ||--|| data      : "fetches data"
  issues    ||--|| data      : "fetches data"
  languages ||--|| data      : "fetches data"
  topics    ||--|| data      : "fetches data"
  data      ||--|| octokit   : "fetches data"
  data      ||--|| storage   : "stores data"
  octokit   ||--|| api       : "fetches data"
```

### Components

**Directory**: [src/components](../src/components/)

The user interface is made up of various React components. The main components that display information are:

- [Info](../src/components/Info/)
  - Displays basic information about the user
    - Name
    - Username
    - Registration date
    - Location
- [Commits](../src/components/Commits/)
  - Displays commits made by the user as a line chart
    - By month
    - By year
- [Issues and PRs](../src/components/IssuesAndPullRequests/)
  - Displays the share of opened and closed issues or PRs as pie charts
- [Languages](../src/components/Languages/)
  - Displays the share of programming languages as a bar chart
    - By repository main language
    - By total number of bytes
- [Topics](../src/components/Topics/)
  - Displays the most used topics across all repositories as a word cloud

Each component is responsible for rendering one type of information. They may be made up of smaller sub-components.

### Services

**Directory**: [src/services](../src/services/)

#### Data service

The data service formats and serves data to the components. It caches formatted data in the session storage or calls the Octokit service if no data is cached yet.

#### Octokit service

The Octokit service interacts with the [GitHub API](https://docs.github.com/en/rest) via the [Octokit.js](https://github.com/octokit/octokit.js) library. The sole responsibility of the Octokit service is to make API calls and pass the data back to the data service.

### Repositories

**Directory**: [src/repositories](../src/repositories/)

#### Session storage

Session storage is used to store the formatted data. It uses the [session storage](https://developer.mozilla.org/en-US/docs/Web/API/Window/sessionStorage) feature of modern web browsers.

## Data flow

### Opening the application

When a user (`User`) loads the application (`React app`) for the first time in their web browser, no data is being cached yet. This means that the data has to be fetched via the GitHub API. The component (`React component`) could be any of the five main sections, they all work the same way but are used to display different types of information.

```mermaid
sequenceDiagram
  autonumber

    actor       USER    as User
  box rgba(0, 255, 0, 0.1) Browser
    participant APP     as React app
    participant ELEMENT as React component
    participant DATA    as Data service
    participant STORAGE as Session storage
    participant OCTOKIT as Octokit service
  end
  box rgba(0, 0, 255, 0.1) Internet
    participant GITHUB  as GitHub API
  end

  USER     ->> APP     : opens
  APP      ->> ELEMENT : loads
  activate     ELEMENT
  ELEMENT  ->> ELEMENT : renders skeleton loader
  ELEMENT  ->> DATA    : requests data
  activate     DATA
  DATA     ->> STORAGE : checks for data
  STORAGE -->> DATA    : no data
  deactivate   DATA
  DATA     ->> OCTOKIT : requests data
  activate     OCTOKIT
  OCTOKIT  ->> GITHUB  : requests data
  GITHUB  -->> OCTOKIT : returns data
  OCTOKIT -->> DATA    : returns data
  deactivate   OCTOKIT
  activate     DATA
  DATA     ->> DATA    : formats data
  DATA     ->> STORAGE : stores data
  DATA    -->> ELEMENT : returns data
  deactivate   DATA
  ELEMENT  ->> ELEMENT : renders data
  USER     ->> ELEMENT : views and interacts with data
  deactivate   ELEMENT
```

### Reloading the page

After loading the application at least once, data is now being stored in the session storage. No additional requests are made via Octokit service to the GitHub API. There is also no need to format the data as the cached data is already formatted and ready to be rendered.

```mermaid
sequenceDiagram
  autonumber

    actor       USER    as User
  box rgba(0, 255, 0, 0.1) Browser
    participant APP     as React app
    participant ELEMENT as React component
    participant DATA    as Data service
    participant STORAGE as Session storage
    participant OCTOKIT as Octokit service
  end
  box rgba(0, 0, 255, 0.1) Internet
    participant GITHUB  as GitHub API
  end

  USER     ->> APP     : reloads
  APP      ->> ELEMENT : loads
  activate     ELEMENT
  ELEMENT  ->> ELEMENT : renders skeleton loader
  ELEMENT  ->> DATA    : requests data
  activate     DATA
  DATA     ->> STORAGE : checks for data
  STORAGE -->> DATA    : returns cached data
  DATA    -->> ELEMENT : returns data
  deactivate   DATA
  ELEMENT  ->> ELEMENT : renders data
  USER     ->> ELEMENT : views and interacts with data
  deactivate   ELEMENT
```

### Incremental fetching

Due to the rate limits imposed on their API by GitHub, it is only possible to fetch up to 1000 data points per query. Only 100 results can be fetched per page so to fetch all 1000 results, a minimum of 10 GET requests must be made.

The `Issues and Pull Requests` component works this way. In the `Commits` component, the same process is repeated for each month as active users are likely to have made more than 1000 commits. If data is already stored in the session storage, only one request to data service is enough. See the previous diagram.

```mermaid
sequenceDiagram
  autonumber

    actor       USER    as User
  box rgba(0, 255, 0, 0.1) Browser
    participant APP     as React app
    participant ISSUES  as Issues and Pull Requests
    participant DATA    as Data service
    participant STORAGE as Session storage
    participant OCTOKIT as Octokit service
  end
  box rgba(0, 0, 255, 0.1) Internet
    participant GITHUB  as GitHub API
  end

  USER     ->> APP     : opens
  APP      ->> ISSUES  : loads
  activate     ISSUES
  ISSUES   ->> ISSUES  : renders skeleton loader
  ISSUES   ->> ISSUES  : displays an orange "Fetching data" notification chip
  loop Up to 10 times
    ISSUES   ->> DATA    : requests data
    activate     DATA
    DATA     ->> STORAGE : checks for data
    STORAGE -->> DATA    : no data
    deactivate   DATA
    DATA     ->> OCTOKIT : requests partial data
    activate     OCTOKIT
    OCTOKIT  ->> GITHUB  : requests partial data
    GITHUB  -->> OCTOKIT : returns partial data
    OCTOKIT -->> DATA    : returns partial data
    deactivate   OCTOKIT
    activate     DATA
    DATA     ->> DATA    : formats partial data
    DATA     ->> STORAGE : stores and updates stored data
    DATA    -->> ISSUES  : returns partial data
    deactivate   DATA
    ISSUES   ->> ISSUES  : renders data / updates partial data
    USER     ->> ISSUES  : views and interacts with partial data
  end
  ISSUES   ->> ISSUES  : displays a green "Data fetched" notification chip
  USER     ->> ISSUES  : views and interacts with complete data
  deactivate   ISSUES
```
