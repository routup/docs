# Usage

The first step is to mount the handler, to parse the payload for every request.

```typescript
import { Router, send } from 'routup';
import { createHandler, useRequestBody } from '@routup/body';

const router = new Router();
// This will parse requests with Content-Type:
// application/json
// application/x-www-form-urlencoded
router.use(createHandler());

router.listen(3000);
```

After the handler is set, the parsed payload can be accessed in a request handler/middleware.

```typescript
import { Router, send } from 'routup';
import { createHandler, useRequestBody } from '@routup/body';

const router = new Router();
// This will parse requests with Content-Type:
// application/json
// application/x-www-form-urlencoded
router.use(createHandler());

router.get('/', (req, res) => {
    const body = useRequestBody(req);
    console.log(body);
    // ...

    send(res, body);
});

router.listen(3000);
```
