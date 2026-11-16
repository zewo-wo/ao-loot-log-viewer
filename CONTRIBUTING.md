# Contributing to Albion Online Loot Logger

Thanks for considering a contribution! This is a community project, and respectful help is welcome.

## Ways to contribute

- Report reproducible bugs.
- Suggest practical features or usability improvements.
- Improve documentation or translations.
- Submit focused code changes.
- Improve accessibility, performance, and browser compatibility.

## Before you start

1. Search existing issues and pull requests to avoid duplicate work.
2. For large changes, open an issue first to discuss the approach.
3. Do not submit Albion Online artwork, logos, extracted game files, or other third-party material unless you have the necessary permission and can document it.
4. Do not include real player data, private CSV exports, credentials, tokens, or personal information in issues, screenshots, commits, or test fixtures.

## Local testing

This is intended to be a static browser application. Open `index.html` in a modern browser or use a simple local static-file server if your browser requires one. Test with a small, synthetic CSV that contains no real player information. Check the browser console for errors and verify that the page remains usable if remote item images fail to load.

## Pull request guidelines

- Keep each pull request focused and reasonably small.
- Explain the problem and the proposed solution.
- Include steps to test the change.
- Update the README or other documentation when behavior, supported CSV fields, setup, or privacy-relevant behavior changes.
- Preserve existing CSV column names and compatibility unless the change explicitly addresses them.
- Do not add tracking, analytics, or data-upload behavior without prior discussion and clear user-facing disclosure.
- Ensure third-party code and dependencies have compatible licenses; identify new dependencies in `THIRD_PARTY_NOTICES.md`.
- Use clear commit messages and avoid unrelated formatting changes.

## License and contributions

Unless a contribution explicitly states otherwise and the maintainer agrees, contributions intentionally submitted for inclusion are offered under the repository's GNU GPL-3.0 license. By submitting a contribution, you confirm that you have the right to submit it under those terms. You retain ownership of your contribution; this paragraph describes the license offered to the project and downstream recipients, not a transfer of copyright.

## Community standards

Participation is subject to `CODE_OF_CONDUCT.md`. The maintainer may request changes or close contributions that are out of scope, unsafe, unlawful, disrespectful, or inconsistent with the project's licensing requirements.
