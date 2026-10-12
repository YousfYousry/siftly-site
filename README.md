# Siftly landing page

Responsive, buildless landing page and universal download destination.

- Website: https://yousfyousry.github.io/siftly-site/
- Universal download URL: https://yousfyousry.github.io/siftly-site/download/

## Add store links

Edit `store-config.js`, replacing the `null` values with the confirmed HTTPS App Store and Google Play listing URLs. Push to `main`; GitHub Pages publishes the update automatically. Until then, the download page detects the device and displays an availability message. It never redirects to another app or invents a store listing.

The download link detects Android, iPhone, iPod and iPad (including desktop user agents on iPadOS). Desktop and unknown devices see both store choices. Only HTTPS URLs on the correct store domains are accepted. JavaScript is needed for automatic routing.

## Local preview

Run `python3 -m http.server 8096` in this directory.

## Assets

App icon and glossy feature illustrations from the Siftly app project. App screen captures from `store_screenshots/` showcase smart categories, storage intelligence, and the compression studio. The website palette follows `lib/theme/siftly_theme.dart`: charcoal #0C0E13, electric blue #168BFF, and ice cyan #58CEFF. Example landscape photographs from Unsplash:
- https://images.unsplash.com/photo-1464822759023-fed622ff2c3b
- https://images.unsplash.com/photo-1470770841072-f978cf4d019e
- https://images.unsplash.com/photo-1500530855697-b586d89ba3ee

Phone and library scenes are illustrative previews, not app screenshots. Demo decisions affect only the example photos on this page. Typography uses Google Fonts, with system fallbacks. No analytics, account system, or user-photo upload is included in this website.
