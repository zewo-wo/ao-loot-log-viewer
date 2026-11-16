# Privacy Notes

## What the application handles

The viewer is designed to read a CSV selected by the user in the browser. In the ordinary local workflow, the CSV is not intentionally uploaded to a project-operated backend because the project does not require one for basic viewing.

CSV files can contain player names, guild names, timestamps, item details, locations, or other information. Treat exports as potentially sensitive. Use only data you are authorized to access, and avoid sharing unredacted files in public issues or pull requests.

## External item images

To display item images, the browser may request image resources from the Albion Online 2D rendering service at `https://render.albiononline.com/`. Such requests can disclose the requested item identifier, your IP address, browser/network metadata, and other information ordinarily included in web requests to the service. The service is operated by a third party and is not controlled by this project.

If image loading is unavailable, the core CSV viewing workflow may still work, depending on the deployed version.

## No blanket guarantee

This document describes the intended basic workflow, not a guarantee about every fork, deployment, browser extension, hosting provider, or future version. A modified version may add analytics, storage, or network requests. Review the source code and browser network activity for the exact version you use.

## GitHub Pages and hosting

If you access a hosted copy, the hosting provider may process ordinary server logs and connection information under its own privacy terms. If you download and run the site locally, your browser still makes external requests when loading remote item images.

## Data minimization

- Use test CSVs with synthetic data when reporting bugs.
- Redact player and guild names from screenshots and examples.
- Never commit personal CSV exports, access tokens, passwords, or private logs.
- Do not add telemetry or CSV uploads without discussion, clear disclosure, and an appropriate consent and privacy design.

## Questions

For project-related privacy questions, use the support route documented in `SUPPORT.md`. For data handled by a third-party service, consult that service's own privacy information.
