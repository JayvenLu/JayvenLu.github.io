# Xiaofan Lu Academic Website

Source for [jayvenlu.github.io](https://jayvenlu.github.io/), a static academic homepage covering vision-based tactile sensing, robotic perception, and edge AI.

## Local Preview

```powershell
cd E:\JayvenLu.github.io
python -m http.server 8200
```

Open `http://127.0.0.1:8200/`.

## Information Architecture

- `About`: biography, education, research interests, technical practice, and brief news
- `Publications`: reusable entries for peer-reviewed papers
- `Projects`: public summaries of selected research and engineering work

The active section is encoded in the URL hash, for example `#publications`.

## Maintenance

- Add a paper by duplicating one `.publication-item` block in `index.html`.
- Add a project by duplicating one `.project-item` block.
- Add a public update to the `.news-list`.
- Keep images in `assets/images/` and specify their intrinsic `width` and `height`.
- Link public project summaries to their dedicated project pages or publication records.

## Asset Sources

- Portrait: personal application-material archive
- SMF-PSNN image: public SMF-PSNN project-page assets
- GelSplitter3D image: public GelSplitter3D project-page assets
- IBM Plex: distributed under the SIL Open Font License

Publication images remain subject to their respective paper and publisher rights. They may not be reused without permission.

## Public Boundaries

This website includes published papers, publicly disclosed manuscripts, high-level public project summaries, and publicly announced industry collaborations or technology-transfer outcomes confirmed for personal disclosure. It intentionally excludes private source code, datasets, author manuscripts, company identities from confidential collaborations, private contact details, and academic records.
