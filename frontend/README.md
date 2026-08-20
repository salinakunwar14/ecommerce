# Buy Me Storefront Replica

This package is a responsive static React replica of the homepage currently shown at **buyme.gt.tc**. It contains the original user-owned logo, homepage images, and all 20 product images in `client/public/assets/source-images/`, so the project works fully offline without relying on external image CDNs.

## Run locally

Install a recent version of Node.js, open a terminal in the extracted folder, and run:

```bash
pnpm install
pnpm dev
```

Then open the local address shown in the terminal, normally `http://localhost:3000`.

## Edit the storefront

The main page is `client/src/pages/Home.tsx`. It contains the visible homepage copy, collection-card information, image mapping, navigation, cart-drawer state, and interactions. The visual styling is in `client/src/index.css`. The downloadable image files are inside `client/public/assets/source-images/`.

## Notes

This is a front-end replica. It includes responsive navigation, collection-card feedback, and a working visual cart drawer, but it intentionally has no real payments, accounts, checkout, stock, or WooCommerce connection. For WordPress use, upload the separate `buyme-demo-theme-elementor.zip` through **Appearance → Themes → Add New → Upload Theme**.

## Asset inventory

### Brand assets
| File | Website placement |
| --- | --- |
| `buyme-logo.png` | Header logo mark |
| `hero.jpg` | Main hero image |
| `editorial-banner.jpg` | "Made for your everyday rhythm" banner |
| `soft-layers.jpg` | Soft Layers collection card |
| `everyday-tees.jpg` | Everyday Tees collection card |
| `relaxed-bottoms.jpg` | Relaxed Bottoms collection card |
| `effortless-dresses.jpg` | Effortless Dresses collection card |

### Product images
| File | Product |
| --- | --- |
| `softlayer.jpg` | Soft Layer |
| `cardigan.jpg` | Soft Cardigan |
| `brushed over shirt.jpg` | Brushed Overshirt |
| `cotton crew knit.jpg` | Cotton Crew Knit |
| `Merino Zip Hoodie.jpg` | Merino Zip Hoodie |
| `Essential Crew Tee.jpg` | Essential Crew Tee |
| `classic crew tee.jpg` | Classic Crew Tee |
| `v neck tee.jpg` | V-Neck Tee |
| `long sleeve tee.jpg` | Long Sleeve Tee |
| `pocket tee.jpg` | Pocket Tee |
| `relaxed trouser.jpg` | Relaxed Trouser |
| `linen culottes.jpg` | Linen Culottes |
| `straight leg jean.jpg` | Straight Leg Jean |
| `drawstring short.jpg` | Drawstring Short |
| `wide leg pant.jpg` | Wide Leg Pant |
| `drape midi slip.jpg` | Drape Midi Slip |
| `wrap dress.jpg` | Wrap Dress |
| `shirt dress.jpg` | Shirt Dress |
| `midi tiered dress.jpg` | Midi Tiered Dress |
| `knit tank dress.jpg` | Knit Tank Dress |
