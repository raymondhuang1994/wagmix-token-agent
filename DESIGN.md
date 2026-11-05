# WAGMIx landing design

## Direction

WAGMIx connects institutional asset work with on-chain market access. The oversized X in the hero acts as a single junction motif; the supporting page uses a quiet, ruled structure so the product details remain legible. The copy and product claims are V17's approved text.

## Tokens

| Token | Value | Role |
| --- | --- | --- |
| `--bg` | `#061322` | Deep blue base |
| `--surface` | `#0B2034` | Raised navigation and surfaces |
| `--line` | `#28445B` | Meaningful section separators |
| `--text` | `#E9F6FB` | Primary copy |
| `--muted` | `#9DB9C7` | Supporting copy |
| `--accent` | `#8DE7FA` | High contrast actions and focus |
| `--brand` | `#2F78EE` | Small gradients in the X field |

Display and product codes use Barlow Condensed. Body text uses IBM Plex Sans, with native Traditional Chinese font fallbacks. Layout is left aligned throughout; hero copy and X form an asymmetric pair. Capability details run along an open spine instead of identical cards, and the two products get distinct surfaces.

```text
desktop hero                         narrow screen
┌────────────────┬────────────────┐   ┌────────────────────┐
│ title          │                │   │ title              │
│ intro          │   large X      │   │ intro              │
│ CTA / CTA      │                │   │ CTA                │
└────────────────┴────────────────┘   │ compact X          │
                                     └────────────────────┘
```

The load sequence reveals the hero once. Scroll reveal touches section headings and key blocks; hover motion responds only to actionable controls. Reduced motion disables these effects. Focus rings, mobile navigation, and contrast were designed with the same palette.
