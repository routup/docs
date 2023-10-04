# Paths

Paths define endpoints (URIs) on which a handler or router is mounted.

## Variants

Besides, defining [string](#string) paths, [regular expressions](#regular-expressions) can be used as well.
The following examples should illustrate how paths can be defined:

### String

Respond to a **GET** request on the `/foo` route.

```typescript
router.get('/foo', coreHandler(() => 'foo'));
```

### Regular Expressions

::: warning **Note**

In a future version, regular expression may no longer be supported to arrange handlers & routers as a tree instead of a stack.
Thus, the lookup could be faster.
However, this has yet to be evaluated and decided.

:::

Respond to a **GET** request on all paths containing a string with `a` in it.

```typescript
router.get(/a/, coreHandler(() => '/a/'));
```

Respond to a **GET** request where the path matches `butterfly` and `dragonfly`, but **not** `butterflyman`, `dragonflyman`, and so on.

```typescript
router.get(/.*fly$/, coreHandler(() => '/.*fly$/'));
```

## Parameters

Path parameters are named URL segments that are used to capture the corresponding value at the position in the URL.
The captured values can be acquired using the helper [useRequestParam](../api/request-helpers.md#userequestparam) and
[useRequestParams](../api/request-helpers.md#userequestparams).

```typescript
router.get('/users/:id/roles/:roleId', coreHandler((req, res) => {
    const params = useRequestParams(req);
    console.log(params);
    // { id: 'xxx', roleId: 'xxx' }

    const param = useRequestParam(req, 'id');
    console.log(param);
    // xxx
    
    return params;
}));
```
