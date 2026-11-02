# Frost Client

A static, Chromebook-friendly browser launcher and preference manager.

## Publish with GitHub Pages
This repository is configured for a static site. In GitHub, open **Settings → Pages**, choose **Deploy from a branch**, select **main** and **/(root)**, then click **Save**. GitHub will show the public website URL on that page.

## Included
- Responsive icy-blue Frost interface
- Eaglercraft 26.2 launch link
- Local mod preference toggles and safe JSON pack import
- Performance recommendations
- PWA manifest and service-worker cache

## Compatibility
This starter does not bundle the Eaglercraft engine or modify game files. Mod toggles save preferences only; they do not inject into the game. It does not provide Java/Bedrock account linking, a Java runtime, Bedrock client, or access to Java/Bedrock-only servers such as DonutSMP. Those require the actual compatible client and supported authentication.

Frost imports declarative JSON only and never executes uploaded JavaScript. FPS depends on device hardware, browser, game build, world and server.
