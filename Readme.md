# Coffee App Frontend

## Context

This repository is part of the coffee rating application project. The project
provides a rating appliation for coffees where its possible to add/delete and
rate different coffee beans. The project consists of the following repositories:

- [Frontend](https://github.com/andifg/coffee_frontend_ts.git) - A react typescript progressive web app
- [Backend](https://github.com/andifg/coffee_backend.git) - Fastapi based python backend
- [Helm Chart](https://github.com/andifg/coffee-app-chart.git) - Helm Chart deploying front and backend together with database and minio hem charts
- [GitOps](https://github.com/andifg/coffee-app-gitops.git) - Gitops repository for ArgoCD reflecting deployed applications for test and prod env

# Compile

```bash
npm run build
```

# Build container

```bash
./scripts/build.sh
```

#TODO
Fetch openapi json from url instead of local

Created with:
npx create-react-app coffee-new-frontend --template cra-template-pwa-typescript
