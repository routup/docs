# Usage

The first step is to mount the handler, to parse the query string for every request.

```typescript
import { Router, send } from 'routup';
import { createHandler } from '@routup/query';

const router = new Router();

router.use(createHandler());

router.listen(3000);
```

After the handler is set, the parsed query string can be accessed in a request handler/middleware.

```typescript
import { Router, send } from 'routup';
import {
    createHandler,
    useRequestQuery
} from '@routup/query';

const router = new Router();

router.use(createHandler());

router.get('/', (req, res) => {
    const query = useRequestQuery(req);
    console.log(query);
    // { key: ..., ... }
    
    send(res, query);
});

router.listen(3000);
```
