# Middlewares

A middleware is usually a [handler](./handler.md) that does not finalize the request.
Instead, it calls the `next()` callback function or returns a value that resolves to **undefined** to execute the next handler in the chain.

::: warning **Note**

Express middleware libraries (like body-parser, multer, ...) should work in most cases
out of the box 🔥.

:::

```typescript
import { Router } from 'routup';

const router = new Router();

const middleware = (req, res, next) => {
    console.log('My amazing middleware 🥳');
    next();
};

router.use(middleware);
```

To share data between middlewares or handlers in general, it is recommended
to use the helpers [setRequestEnv](../api/request-helpers.md#setrequestenv)
and [useRequestEnv](../api/request-helpers.md#userequestenv).

```typescript
import { Router, setRequestEnv, useRequestEnv } from 'routup';

const router = new Router();

router.use((req, res, next) => {
    setRequestEnv(req, 'foo', 'bar');
    next();
});

router.use((req, res, next) => {
    const foo = useRequestEnv(req, 'foo');
    console.log(foo);
    // bar
})
```
