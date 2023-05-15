# Usage

The first step is to mount the handler, to parse the cookie string for every request.

```typescript
import { Router, send } from 'routup';
import { createHandler } from '@routup/cookie';

const router = new Router();

router.use(createHandler());

router.listen(3000);
```

After the handler is set, the parsed cookie string can be accessed in a request handler/middleware.

```typescript
import {Router, send} from 'routup';
import {
    createHandler,
    useRequestCookie,
    useRequestCookies
} from '@routup/cookie';

const router = new Router();

router.use(createHandler());

router.get('/', (req, res) => {
    const cookies = useRequestCookies(req);
    console.log(cookies);
    // { key: value, ... }

    send(res, cookies);
});

router.listen(3000);
```
