# www.rdcl.dev

[![Netlify Status][netlify-badge]][netlify-deploy]
[![CI][github-badge]][github-actions]

## Starting the application locally

In order to start the application locally, run the following commands:

```bash
npm install
npx netlify-cli dev
```

## Running cypress tests

First start the application (as described above), and then run:

```bash
npx cypress open
```


[netlify-badge]: https://api.netlify.com/api/v1/badges/a82c4a72-5c08-4870-80f3-dc8e4dc07626/deploy-status
[netlify-deploy]: https://app.netlify.com/sites/www-rdcl-dev/deploys
[github-badge]: https://github.com/rjvdw/www.rdcl.dev/actions/workflows/ci.yml/badge.svg
[github-actions]: https://github.com/rjvdw/www.rdcl.dev/actions/workflows/ci.yml
