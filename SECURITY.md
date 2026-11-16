# Security Policy

## Supported versions

Security fixes are currently considered for the latest published version on the project's default branch. Older copies may not receive updates.

## Reporting a vulnerability

Please do not publish exploitable security details in a public issue or pull request.

Use GitHub's **Private vulnerability reporting** feature for this repository if it is enabled. If it is not enabled, contact the maintainer privately using a contact method explicitly published in the repository profile or project support page. This repository does not publish an email address in this policy because no verified security contact has been supplied.

Include, when safe:

- A concise description and potential impact.
- Affected version, browser, and environment.
- Minimal reproduction steps or a proof of concept that does not access other people's data.
- Any suggested mitigation.

Please allow reasonable time for investigation and a fix before public disclosure. Do not access, modify, or retain data that is not yours while testing. Do not perform denial-of-service, social engineering, or destructive testing.

## Scope notes

The application is designed to process user-selected CSV files in the browser. Security reports may include unexpected script execution, unsafe CSV handling, dependency compromise, unintended data transmission, or other vulnerabilities in project-controlled code. Issues in third-party services should be reported to their respective operators as well.
