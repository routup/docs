# Parser

Besides using the `createHandler` method, it is also possible to register a specific parser
as middleware.

## Json

To parse `application/json` input data, mount the json parser to the router instance.

```typescript
import { Router, send } from 'routup';
import { createJsonHandler, useRequestBody } from '@routup/body';

const router = new Router();
router.use(createJsonHandler());

router.get('/', (req, res) => {
    const body = useRequestBody(req);
    console.log(body);
    // ...

    send(res, 'Hello World');
});

router.listen(3000);
```

## UrlEncoded

To parse `application/x-www-form-urlencoded` input data, mount the url-encoded parser to the router instance.

```typescript
import { Router, send } from 'routup';
import { createUrlEncodedHandler, useRequestBody } from '@routup/body';

const router = new Router();
router.use(createUrlEncodedHandler({ extended: false }));

router.get('/', (req, res) => {
    const body = useRequestBody(req);
    console.log(body);
    // ...

    send(res, 'Hello World');
});

router.listen(3000);
```

## Raw

To parse `any` input data as Buffer, mount the raw parser to the router instance.

```typescript
import { Router, send } from 'routup';
import { createRawHandler, useRequestBody } from '@routup/body';

const router = new Router();
router.use(createRawHandler());

router.get('/', (req, res) => {
    const body = useRequestBody(req);
    console.log(body);
    // ...

    send(res, 'Hello World');
});

router.listen(3000);
```

## Text

To parse `any` input data as string, mount the text parser to the router instance.

```typescript
import { Router, send } from 'routup';
import { createTextHandler, useRequestBody } from '@routup/body';

const router = new Router();
router.use(createTextHandler({ type: 'text/html' }));

router.get('/', (req, res) => {
    const body = useRequestBody(req);
    console.log(body);
    // ...

    send(res, 'Hello World');
});

router.listen(3000);
```
