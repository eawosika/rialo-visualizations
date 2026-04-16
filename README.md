# Rialo Visualizations

Interactive visualizations for Rialo's blog, built with vanilla HTML, CSS, and JavaScript and hosted on GitHub Pages.

**Live index:** [eawosika.github.io/rialo-visualizations](https://eawosika.github.io/rialo-visualizations)

---

## Visualizations

| Name | File | Type |
|---|---|---|
| World credit markets | `world-credit-market-map.html` | Data visualization |
| Cash App vs SoFi | `cash-app-sofi-comparison.html` | Data visualization |
| Native data access | `native-data-access.html` | Workflow visualization |
| Loan origination simulator | `loan-origination.html` | Demo |
| Loan lifecycle simulator | `loan-state-machine.html` | Demo |

---

## Structure

Each visualization is a self-contained HTML file with embedded fonts, styles, and scripts. Static JPG fallbacks are included for mobile embeds.

```
/
├── index.html                          # Visualization index page
├── world-credit-market-map.html
├── cash-app-sofi-comparison.html
├── native-data-access.html
├── loan-origination.html
├── loan-state-machine.html
├── thumb-credit-map.jpg                # Index page thumbnails
├── thumb-cash-app.jpg
├── thumb-loan-orig.jpg
├── thumb-loan-lifecycle.jpg
├── native-data-access-default.jpg
├── world-credit-market-map-v3.jpg      # Mobile fallback JPGs
├── cash-app-sofi-comparison-v4.jpg
├── loan-origination-default.jpg
├── loan-state-machine-default.jpg
└── [versioned files]                   # Previous versions kept for reference
```

---

## Embedding

Each visualization supports two URL parameters:

- `?embed=1` — swaps the "Read the article" button to "Open in full view", used in Webflow article embeds
- `?embed=1` with a `postMessage` of `{ type: 'rialo-hide-header' }` — hides the page header entirely, used when opening from the index page modal

### Mobile fallback pattern

```html
<div id="viz-wrap" style="margin:24px 0">
  <iframe src="https://eawosika.github.io/rialo-visualizations/[file].html?embed=1"
    style="width:100%;height:680px;border:none;display:block"></iframe>
  <div id="viz-mobile" style="display:none">
    <img src="https://eawosika.github.io/rialo-visualizations/[fallback].jpg"
      style="width:100%;display:block;border-radius:8px">
    <div style="text-align:center;margin-top:10px">
      <a href="https://eawosika.github.io/rialo-visualizations/[file].html"
        target="_blank"
        style="display:inline-block;font-size:11px;padding:6px 14px;border-radius:6px;background:#0a0a0a;border:1px solid rgba(169,221,211,0.3);color:#a9ddd3;text-decoration:none">
        See visualization
      </a>
    </div>
  </div>
</div>
<style>
@media (max-width: 600px) {
  #viz-wrap iframe { display: none !important; }
  #viz-mobile { display: block !important; }
}
</style>
```

---

## Article

[Upgrading the Consumer Lending Stack](https://www.rialo.io/posts/upgrading-the-lending-stack)
