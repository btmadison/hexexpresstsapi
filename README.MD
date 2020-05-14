# Node Typescript Rest API

Basic Sample of a Hexagonal Architected TS / NodeJS / Express API well structured with separation of concerns to allow transition of different data sources, api logic from business logic, and testing.

## Hexagonal Application
This Application follows the [Hexagonal Architectural Pattern](https://en.wikipedia.org/wiki/Hexagonal_architecture_(software)), and goes by other names also such as Ports and Adapters, and Onion Architecture.  There is much literature available on this pattern, but at the simplest level, this basics are that we are building a layered architecture where inner layers have now knowledge of the outter layers.

In the Case of building a rest API, the outer layer defines the app routing and controllers.  The controllers use a service from an inner layer.  The service if needed will use a repository from a lower layer, following a repository pattern.

With the hexagonal architecture, this allows us to swap in and out components.  For example, by making the service and repository both injectable through interface specifications, and keeping a clean separation of concerns, it becomes possible to easily swap in and out different persistance layers (in memory, cloud api, databases) and also the services themselves have no knowledge of the higher layer router, so if for examples swapping out an express router controller for aws lambdas or azure functions, the services will behave exactly the same, with no required code change.

## Benefits of separation of concerns and DI
- Easier Testing
- Classes follow SOLID
- Business logic doesnt need to know about the persisance mechanism, doesnt care if data is in json, xml, encoded in another format, when data comes from repositry, it is returned in expected model format.
- Business logic functions are simple javascript classes that do not need to know anything about the api layer such as express specifics, aws handlers, dealing with requests and responses etc...

## File/Folder Structure
```
/env               // .env files
/src
    index.ts       // app main entry point
    /controllers   // request response handlers, no business logic, user services
    /middleware    // express middleware could go here
    /data          // connectes to data stores, external APIs, no business logic
    /models        // model classes and interfaces, domain models, crud models, interfaces
    /routes        // route registraion and controller func map (express) 
    /services      // injected into controller funcs, perform logic, uses repositories
    /util          // custom utility functions
package.json
tsconfig.json
tslint.json
```

In this starter project, a simple User API is set up with some common rest API functionality such as getting a single user, all users, create and update users, and delete users.

For simplicity, DI is manually handled.  The User Controller creates a new instance of a User Service, with an injected In Memory instance of type IUserRepository.  This could easily be swapped out for a different storage mechanism, as long as it satisfies the same interface contract the service expects.

To go further with the pattern (not in this current example), the User Service could also be injected into the controller, and easily swapped out for a service that may not even use a data layer, or may be drastically different internally, but still expose the same interface contractual methods.

## Testing
Jest is set up for

## Local Setup to run the example API
First, clone repo and run npm install from project root.  After this, create a .env file in it, with the following contents (or set the environment variables as follows):
```
NODE_ENV=development
BASE_URL=http://localhost
SERVER_PORT=8080
```

### Commands:
- run `npm run dev` to run dev server with live reload
- run `npm run test` to run unit tests
- run `npm run lint` to lint files and autofix linting and prettier issues that it can
