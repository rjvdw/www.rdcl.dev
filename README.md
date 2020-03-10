# www.rdcl.dev

## Preview deploys

When a preview or branch deploy is available on netlify, you can also see this preview on preview.rdcl.dev.
Just take the preview name, and pass it in a query parameter like so:

    https://preview.rdcl.dev?__preview_set=<DEPLOY NAME>

This will set a cookie (`__preview_val`) and proxy your request to the correct netlify domain:

    https://<DEPLOY NAME>--www-rdcl-dev.netlify.com

As long as this cookie is in place, all requests to preview.rdcl.dev will be proxied to this domain.
To clear the cookie, simply call:

    https://preview.rdcl.dev?__preview_clear=1

Example:

    https://preview.rdcl.dev?__preview_set=deploy-preview-8
