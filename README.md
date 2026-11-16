<div align="center">

# ⚔️ Albion Online Loot Log Viewer ⚔️

### Your loot, your players, your guild — all in one place.

A simple, browser-based viewer for your Albion Online loot CSVs. Import a report, explore loot records, compare player totals, and view item icons at a glance.

**No installation. No database. No server-side CSV upload. Open the page and import your CSV.**

[⚔️ Visit Albion Loot Log Viewer ⚔️](https://zewo-wo.github.io/ao-loot-log-viewer/)

[Features](#-features) · [Getting started](#-getting-started) · [CSV guide](#-csv-file-guide) · [Privacy](#-privacy) · [Contributing](#-community--contributing)

</div>

---

## 🌟 About the project

**Albion Online Loot Log Viewer** is a lightweight web app for viewing and exploring loot reports exported as CSV files. It runs in your browser and is designed to make loot records easier to search, filter, compare, and review.

The dashboard starts empty by design. It does not ship with demo loot or sample player records. You choose which CSV to import.

## ✨ Features

| Feature | What it does |
| --- | --- |
| 📥 **Import loot CSV** | Read your Albion loot report directly in your browser. |
| 🔎 **Search** | Find items, players, guilds, clusters, and related loot details. |
| 👥 **Player filter** | Show loot from one player or everyone. |
| 🏰 **Guild filter** | Filter by the looter's guild; the selection also applies to the other views. |
| 🗺️ **Cluster filter** | Narrow records to a specific cluster. |
| ↕️ **Sort records** | Sort by newest, estimated value, quantity, or item name. |
| 📜 **Loot log** | Browse individual records with item icons and useful details. |
| 💎 **Top items** | See which items contribute the most estimated value. |
| 📊 **Player stats** | Compare players by estimated loot value and item counts. |
| 🎒 **Player loot** | View items grouped by player and guild, with wrapping icons and quantity badges. |
| ☠️ **Death styling** | Apply a red treatment when the CSV's `died` field indicates a death. |
| 📤 **Export filtered CSV** | Download only the records matching the current filters. |

### 🧭 Main views

- **Loot log** — the full record-by-record view.
- **Top items** — item totals and estimated values.
- **Player stats** — a quick comparison of player loot values and counts.
- **Player loot** — an inventory-style view of each player's loot, grouped by player and guild.

Search, player, guild, and cluster filters work together across the views.

## 🚀 Getting started

1. Open the [Albion Online Loot Log Viewer](https://zewo-wo.github.io/ao-loot-log-viewer/).
2. Click **Import CSV**.
3. Choose your Albion Online loot `.csv` file.
4. Wait for the dashboard to read it.
5. Search, filter, sort, and explore your records.

The dashboard starts empty intentionally. Import your own report to populate it.

### 🔍 Filtering and exporting

- Search for an item, player, guild, or cluster.
- Use **All looters** to select a player.
- Use **Guild** to select a guild.
- Use **All clusters** to select a cluster.
- Change the sort order to rearrange records.
- Combine filters to narrow the results.
- Click **Export filtered CSV** to download the currently matching records. The export control is disabled when no records match.

## 🎒 Player loot view

The **Player loot** view groups items by player and guild.

- Item icons use a wrapping layout and move onto additional rows instead of stretching into a long horizontal strip.
- The number shown on an icon represents the total quantity for that item.
- On desktop, hover over an icon to see its item name, quantity, and estimated value, when available.
- A player's card uses the red death style when their data indicates a death.
- Without a death indication, the card keeps its normal dark appearance.

The death style is based on the CSV's `died` column. Values such as `true`, `yes`, `dead`, `died`, `1`, or a positive numeric value may be treated as a death by the current app logic. A positive numeric value may also be displayed as compact death fame. If you change this behavior in the code, update this description to match.

## 📄 CSV file guide

The viewer accepts **comma-separated** and **semicolon-separated** CSV files and supports quoted values.

### Required columns

Your CSV must include both headers:

| Column | Purpose |
| --- | --- |
| `item_id` | Identifies the Albion item and is used to request its icon. |
| `item_name` | Provides the readable item name. |

If either required column is missing, the import is rejected.

### Recommended columns

| Column | Purpose |
| --- | --- |
| `timestamp_utc` | Record time and newest-first sorting. |
| `looted_by__name` | Player name and player filter. |
| `looted_by__guild` | Guild name and guild filter. |
| `cluster` | Cluster filter and location display. |
| `quantity` | Item quantity totals. |
| `average_est_market_value` | Estimated loot value calculations. |
| `quality` | Item icon quality, when supplied. |
| `enchantment` | Item enchantment level, when supplied. |
| `died` | Death styling and optional death fame. |
| `looted_from__name` | Name of the player or entity the loot came from. |
| `looted_from__guild` | Source guild. |

Other CSV columns are retained when filtered records are exported.

### Starter CSV template

A header-only template is included in the website project:

[`data/albion-loot-upload-template.csv`](data/albion-loot-upload-template.csv)

The template uses semicolons between columns.

**CSV tips**
- Keep column names exactly as shown; spelling and underscores matter.
- Use numeric values for `quantity` and `average_est_market_value`.
- Keep player and guild names consistent so records group together cleanly.
- Item IDs may include enchantment suffixes such as `@1`, `@2`, or `@3`. Separate `quality` and `enchantment` columns are also supported.

## 🏰 Deploy with GitHub Pages

To update an existing GitHub Pages deployment:

1. Download and extract the website package.
2. Open the `albion-loot-logger-site` folder.
3. Upload the **contents inside that folder** to your repository's publishing location.
4. Keep `index.html`, `css/`, `js/`, and `data/` together.
5. Commit the changes.
6. Wait for GitHub Pages to publish, then refresh your website.

For a first-time setup, open your repository's **Settings → Pages** and select the branch and folder used for publishing.

### 📁 Website files

```text
albion-loot-logger-site/
├── index.html
├── README.md
├── css/
│   └── styles.css
├── js/
│   └── app.js
└── data/
    ├── README.md
    └── albion-loot-upload-template.csv
```

No local `assets/` folder is required for item artwork; icons are requested online.

## 🖼️ Item icons and internet connection

Item icons are requested from Albion Online's public image-rendering service:

`https://render.albiononline.com/v1/item/`

- An internet connection is needed to load item artwork.
- The website does not need a local copy of every item image.
- If an icon cannot be loaded, the app may show a fallback symbol instead.

This project does not own or claim rights to the image-rendering service, Albion Online artwork, game assets, or trademarks. See [THIRD_PARTY_NOTICES.md](THIRD_PARTY_NOTICES.md).

## 🔒 Privacy

Your selected CSV is read in your browser. The app is designed not to upload your loot file to a project server, send it to GitHub, or store it in the website repository.

Please note:

- Imported data is held in the current page session. Import your CSV again after reloading the page.
- Item icons are fetched from an external image service. The item identifier and image request details are sent to that service as part of loading the image.
- Your CSV may contain player names, guild names, and loot history. Be careful before sharing or publishing it.
- If you publish a CSV yourself, its contents may become public.

Read [PRIVACY.md](PRIVACY.md) for more detail.

## 📜 License

The original code and documentation in this repository are licensed under the **GNU General Public License v3.0 (GPL-3.0)**. Copyright © 2026 **zewowantotree**. See [LICENSE](LICENSE) for the full license text.

The project license does not grant permission to use, reproduce, or redistribute Albion Online's artwork, game assets, logos, or trademarks. Those remain subject to their respective rights holders and applicable terms. See [THIRD_PARTY_NOTICES.md](THIRD_PARTY_NOTICES.md).

## 💬 Community & contributing

Community contributions are welcome! You can help by reporting bugs, suggesting features, improving documentation, translating text, or submitting code changes.

Before contributing, please read:

- [CONTRIBUTING.md](CONTRIBUTING.md) — how to propose changes and submit pull requests.
- [CODE_OF_CONDUCT.md](CODE_OF_CONDUCT.md) — community expectations.
- [SECURITY.md](SECURITY.md) — how to report security concerns privately.
- [SUPPORT.md](SUPPORT.md) — where to ask questions and get help.

Use the GitHub issue templates for bug reports and feature requests. Please do not include private loot CSVs or personal player information in public issues.

## 🌐 README translations

<details open>
<summary>🇬🇧 English</summary>

Albion Online Loot Log Viewer is a browser-based tool for importing and exploring your own loot CSV reports. It provides search, player/guild/cluster filters, loot records, top-item summaries, player statistics, player-grouped loot icons, and filtered CSV export.

**Quick start:** Open the [website](https://zewo-wo.github.io/ao-loot-log-viewer/), choose **Import CSV**, and select a loot report. Your CSV is processed in your browser; it is not uploaded to the project's server.

Your CSV must include `item_id` and `item_name`. For supported columns, privacy details, contribution instructions, and license terms, see the English sections above and the linked project documents.

</details>

<details>
<summary>🇵🇭 Filipino</summary>

### Tungkol sa proyekto

Ang **Albion Online Loot Log Viewer** ay isang web-based na tool para mag-import at tumingin ng sarili mong loot report na CSV. May search, player/guild/cluster filters, loot log, top items, player statistics, player loot view na may item icons, at pag-export ng naka-filter na CSV.

### Paano gamitin

1. Buksan ang [Albion Online Loot Log Viewer](https://zewo-wo.github.io/ao-loot-log-viewer/).
2. Piliin ang **Import CSV**.
3. Piliin ang sarili mong Albion Online loot `.csv` file.
4. Gamitin ang search at filters para hanapin ang mga record.
5. Piliin ang **Export filtered CSV** para i-download ang mga record na tumutugma sa filters.

Kailangang may `item_id` at `item_name` na mga column ang CSV. Tumatanggap ang app ng comma-separated at semicolon-separated na CSV.

### Privacy

Binabasa ang CSV sa browser mo. Hindi ito ina-upload sa server ng proyekto. Gayunman, kumukuha ang app ng item icons mula sa external image service, kaya maaaring maipadala roon ang item identifier sa image request. Mag-ingat sa pagbabahagi ng CSV dahil maaaring kasama rito ang player names, guild names, at loot history.

### Lisensya at kontribusyon

Ang orihinal na code at dokumentasyon ng proyekto ay nasa ilalim ng **GNU GPL-3.0**. Hindi kasama sa lisensyang ito ang artwork, game assets, logo, o trademarks ng Albion Online. Malugod na tinatanggap ang community contributions. Basahin ang `CONTRIBUTING.md`, `CODE_OF_CONDUCT.md`, `SECURITY.md`, at `THIRD_PARTY_NOTICES.md` bago mag-ambag.

</details>

<details>
<summary>🇨🇳 简体中文</summary>

### 项目简介

**Albion Online Loot Log Viewer** 是一个基于网页的工具，可导入并查看你自己的 Albion Online 战利品 CSV 报告。功能包括搜索、玩家/公会/区域筛选、战利品记录、热门物品统计、玩家统计、按玩家分组显示物品图标，以及导出筛选后的 CSV。

### 开始使用

1. 打开 [Albion Online Loot Log Viewer](https://zewo-wo.github.io/ao-loot-log-viewer/)。
2. 点击 **Import CSV**。
3. 选择你的 Albion Online 战利品 `.csv` 文件。
4. 使用搜索框和筛选器查找记录。
5. 点击 **Export filtered CSV** 导出符合当前筛选条件的记录。

CSV 文件必须包含 `item_id` 和 `item_name` 两列。应用支持逗号分隔和分号分隔的 CSV 文件。

### 隐私说明

CSV 文件在你的浏览器中读取，不会上传到本项目的服务器。不过，应用会从外部图片服务加载物品图标，因此图片请求可能会向该服务发送物品标识符。请谨慎分享 CSV，因为其中可能包含玩家名称、公会名称和战利品记录。

### 许可证与社区贡献

本项目原创代码和文档采用 **GNU GPL-3.0** 许可证。该许可证不包含 Albion Online 的美术作品、游戏资源、标志或商标。欢迎社区贡献。提交贡献前，请阅读 `CONTRIBUTING.md`、`CODE_OF_CONDUCT.md`、`SECURITY.md` 和 `THIRD_PARTY_NOTICES.md`。

</details>

---

<div align="center">

**Have fun, and good hunting out there! ⚔️**

Made for the Albion Online community.

</div>
