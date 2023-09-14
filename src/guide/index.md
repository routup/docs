# What is it?

**Routup** is a lightweight, runtime agnostic and extendable routing library.
It uses node's vanilla request and response interfaces, which are injected into route handlers aka middlewares as function argument.
Helpers provide additional functionalities to transform and interact with the request and manipulate the response upstream.

Use the same routing framework for each project, regardless of the used runtime environment (Node.Js, Bun, ... ) 🎉.
Besides, it is even **228%** faster than Express.

## Features

- 🚀 runtime agnostic (Node.JS, Bun, Deno, ...)
- 🧰 response & request composables/helpers
- 💼 extendable & compact
- 🛫 named route parameters
- 📁 nestable routers
- 🤝️ define one or many (error-) middlewares (inc. express middlewares)
- ✨ promise support for route- & middleware-handlers
- 👕 TypeScript fully supported
- 🤏 Minimalistic to fit into any solution with minimum overhead
- & much more
