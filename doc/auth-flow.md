# Authentication Flow

[[_TOC_]]

## Login

### Happy Flow

```mermaid
sequenceDiagram
    participant client
    participant auth function
    participant keycloak

    client->>+auth function: POST /login
    auth function->>+keycloak: POST .../openid-connect/token
    keycloak-->>-auth function: 200 OK
    auth function-->>-client: 200 OK [1]
```

### Unhappy Flow

```mermaid
sequenceDiagram
    participant client
    participant auth function
    participant keycloak

    client->>+auth function: POST /login
    auth function->>+keycloak: POST .../openid-connect/token
    keycloak-->>-auth function: 401 Unauthorized
    auth function-->>-client: 401 Unauthorized
```

## Logout

```mermaid
sequenceDiagram
    participant client
    participant auth function
    participant keycloak

    client->>+auth function: POST /logout
    auth function->>+keycloak: POST .../openid-connect/logout
    keycloak-->>-auth function: 200 OK
    auth function-->>-client: 200 OK
```

## Authenticated API Call

### Happy Flow

```mermaid
sequenceDiagram
    participant client
    participant auth middleware
    participant function
    participant keycloak

    client->>+auth middleware: VERB /path
    auth middleware->>auth middleware: verify JWT
    Note right of auth middleware: valid
    auth middleware->>+function: VERB /path
    deactivate auth middleware
    function-->>-client: API Response
```

### Unhappy Flow

#### Invalid Token

```mermaid
sequenceDiagram
    participant client
    participant auth middleware
    participant function
    participant keycloak

    client->>+auth middleware: VERB /path
    auth middleware->>auth middleware: verify JWT
    Note right of auth middleware: invalid
    auth middleware-->>-client: 401 Unauthorized
```

#### Expired Token, Successful Refresh

```mermaid
sequenceDiagram
    participant client
    participant auth middleware
    participant function
    participant keycloak

    client->>+auth middleware: VERB /path
    auth middleware->>auth middleware: verify JWT
    Note right of auth middleware: expired
    auth middleware->>+keycloak: POST .../openid-connect/token
    keycloak-->>-auth middleware: 200 OK
    auth middleware->>+function: VERB /path
    deactivate auth middleware
    function-->>-client: API Response [1]
```

Notes:
1. Includes updated `x-access-token` and `x-refresh-token` headers

#### Expired Token, Unsuccessful Refresh

```mermaid
sequenceDiagram
    participant client
    participant auth middleware
    participant function
    participant keycloak

    client->>+auth middleware: VERB /path
    auth middleware->>auth middleware: verify JWT
    Note right of auth middleware: expired
    auth middleware->>+keycloak: POST .../openid-connect/token
    keycloak-->>-auth middleware: 401 Unauthorized
    auth middleware-->>-client: 401 Unauthorized
```
