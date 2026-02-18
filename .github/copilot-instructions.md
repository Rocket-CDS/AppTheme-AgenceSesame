# AppThemes Context (AppTheme-AgenceSesame)

This repository is a DNN Rocket AppThemes project targeting `.NET Standard 2.0`.
It contains multiple AppThemes (Razor templates) under:

`/DesktopModules/RocketThemes/AppTheme-AgenceSesame/<systemkey>.<AppThemeName>/<version>/`

Example:
```
rocketcontentapi.HeroHeader
  /1.0
    /default   (Razor templates)
    /css
    /js
    /img
    /dep       (dependencies .dep XML)
```

## AppTheme Basics
- AppThemes are Razor template groups for display/admin pages.
- Each AppTheme is in GitHub and follows the standard folder structure above.
- Folder name must not start with a number.

## Dependencies (`/dep/*.dep`)
Dependencies are declared in XML files under `/dep` and load CSS/JS for front-end views only.

Key fields:
- `<ctrltype>`: `css` or `js`
- `<url>`: absolute `/...`, tokenized, or `{jquery}`
- `<ecofriendly>`: `true` loads in ECO Mode, `false` loads only when ECO is off
- `<ignoreonskin>`: comma-separated skin names
- `<ignoreontemplate>`: comma-separated template filenames (e.g., `listonly.cshtml`)

Tokens:
- `{domainurl}`: full domain URL
- `{appthemefolder}`: current theme path
- `{appthemesystemfolder}`: system path
- `{jquery}`: jQuery library

## Module Templates
`<moduletemplates>` section in dependency file defines available templates:

```
<moduletemplates list="true">
  <genxml>
    <file>view.cshtml</file>
    <name>List View</name>
    <cmd>list</cmd>
  </genxml>
</moduletemplates>
```

### RocketDirectory `cmd` values:
- `listdetail`, `list`, `listonly`, `detailonly`, `catmenu`, `satellite`

## Partial/Shared Templates
Two supported approaches:

### 1) Render Token (compile on call)
Uses `RenderTemplate(...)` methods. Simple but slower (multiple compiles).

### 2) INJECT Token (replacement)
`[INJECT:<AppThemeKey>,<template name>]`

Split marker in sub-template (case-sensitive):
```
<!--inject-->
```
If missing, first `<div` is used.

Common AppTheme object keys:
```
apptheme
appthemesystem
appthemedirectory
appthemedirectorydefault
appthemedefault
appthemeview
appthemeplugin
```

## File Download (RocketDirectory)
- Public download: use standard link (`doc.RelPath`).
- Secure download: `simplisity_filedownload` with `s-cmd="remote_publicdownload"`.
- Must be inside a `simplisity_panel` and initialized via `simplisityStartUp(...)`.
- Server-side access via `genxml/urlparams/***`.

## IntelliSense
Use Visual Studio. References in `.csproj` point to DNN `/bin` assemblies.

## Notes
- AppThemes only load dependencies in front-end view.
- Admin resources should be loaded via `AdminFirstHeader.cshtml` or `AdminLastHeader.cshtml`.
- Circular template injects will crash/loop.
- Missing templates show the inject token in output.

## Project-specific examples (AppTheme-AgenceSesame)
### Shared templates
`rocketcontentapi.01shared/1.0/default` contains shared templates that use the `<!--inject-->` marker (for example, `ArticleHeader.cshtml`).

### RocketDirectory example dependency (`rocketdirectoryapi.Oma/1.0/dep/products.dep`)
- Uses `{appthemefolder}` for theme CSS and external CDN dependencies.
- Defines module templates with capitalized filenames (`View.cshtml`, `Featured.cshtml`, `CategoryChildMenu.cshtml`, `Search.cshtml`).
- `cmd` values include `list`, `catmenu`, `satellite`.
- Defines `adminpanelinterfacekeys` with `rocketdirectoryadmin` disabled (`show=false`).
- `queryparams` uses `id` for article and `catid` for category.
- Includes `<menuprovider>` and `<searchindex>` sections.
