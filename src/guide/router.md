# Router

A router is a wrapper containing other routers & (error-) handlers, which are composed and executed
in a stack-like manner upon request.

Besides that, a router is the entrypoint for determining how an application should respond to an incoming client request on a particular endpoint, 
which is identified by a URI (or path) and a HTTP method (GET, POST, ...).

Each endpoint aka path can have one or more handler functions, which are executed when the route (& method) is matched.

## Environment

It is possible to use Routup in any javascript runtime environment. Below are examples for Node.Js, Bun and Deno.
There are different [dispatchers](dispatcher.md) how requests can be transmitted in different ways.

### Node

```typescript
import { createServer } from 'http';
import { 
    createNodeDispatcher,
    Router
} from 'routup';

const router = new Router();

router.get('/', () => 'Hello World');

createServer(createNodeDispatcher(router)).listen(3000);
```

### Bun

```typescript
import {
    createWebDispatcher,
    Router,
    send
} from 'routup';

const router = new Router();

router.get('/', () => 'Hello World');

const dispatch = createWebDispatcher(router);

Bun.serve({
    async fetch(request) {
        return dispatch(request);
    },
    port: 3000,
});
```

### Deno

```typescript
import {
    createWebDispatcher,
    Router,
    send
} from 'routup';

const router = new Router();

router.get('/', () => 'Hello World');

const dispatch = createWebDispatcher(router);

const server = Deno.listen({
    port: 3000
});
for await (const conn of server) {
    const httpConn = Deno.serveHttp(conn);

    for await (const requestEvent of httpConn) {
        const response = await dispatch(
            requestEvent.request
        );
        requestEvent.respondWith(response);
    }
}
```
