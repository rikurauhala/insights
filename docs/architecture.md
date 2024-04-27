# Architecture

## Opening the application

The following sequence diagram demonstrates what happens when a user (`User`) loads the application (`React app`) for the first time. As the user is visiting the application for the first time, no data is cached yet.

```mermaid
sequenceDiagram
  autonumber

  actor       USER    as User
  participant APP     as React app
  participant ELEMENT as React component
  participant DATA    as Data service
  participant STORAGE as Session storage
  participant OCTOKIT as Octokit service
  participant GITHUB  as GitHub API

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
  deactivate   ELEMENT
  USER     ->> ELEMENT : reads data
```
