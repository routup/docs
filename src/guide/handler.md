# Handler

A handler is a function, which can process an incoming request, manipulate the request- /response-object or pass the task
to next matching handler in the stack.

## Basic 
A **basic** handler can have up to **3** arguments. The first argument is the request object, the second argument the response object
and the last argument is a function, which can be used to call the next handler.

```typescript
import { Handler, Next, Request, Response } from 'routup';

const handler: Handler = (
    req: Request,
    res: Response,
    next: Next
) => {
    // ...
}
```

## Error
An **error** handler is a special kind of handler, which is only executed if an error occurred in a previous handler. Therefore, it receives an additional error object as first argument.

```typescript
import { ErrorHandler, Next, Request, Response } from 'routup';

const errorHandler : ErrorHandler = (
    error: Error, 
    req: Request,
    res: Response, 
    next: Next
) => {
    // ...
}
```

## Response

A response can be sent in two different ways.

### Explicit

In the explicit variant, the response is sent with the help of a response [helper](../api/response-helpers.md)
(send, sendStream, sendFile, ...). 

```typescript
import { Handler, Request, Response, send } from 'routup';

const handler: Handler = (
    req: Request,
    res: Response
) => {
    send(res, 'Hello World!');
};
```

```typescript
import fs from 'node:fs';
import { Handler, Request, Response, sendStream } from 'routup';

const handler: Handler = (
    req: Request,
    res: Response
) => {
    const readable = fs.createReadStream('...');
    sendStream(res, stream);
};
```

### Implicit

In the implicit variant, the value is simply returned and routup tries to find out for itself how to handle the value. 

```typescript
import { Handler, Request, Response } from 'routup';

const handler: Handler = () => 'Hello World!';
```

```typescript
import { Handler, Request, Response } from 'routup';

const handler: Handler = () => fs.createReadStream('...');
```
