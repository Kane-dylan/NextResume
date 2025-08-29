## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

### Integration Flow

```mermaid
graph TD
    A[Frontend React App] --> B[Stream Chat React Components]
    B --> C[Stream Chat API]
    C --> D[Backend Node.js Server]
    D --> E[OpenAI API]
    D --> F[Tavily Web Search]
    D --> G[AI Agent Management]
```
