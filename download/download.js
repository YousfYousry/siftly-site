'use strict';
function detectPlatform(nav) {
  const ua = nav.userAgent || '';
  if (/android/i.test(ua)) return 'android';
  if (/iPad|iPhone|iPod/i.test(ua) || (nav.platform === 'MacIntel' && nav.maxTouchPoints > 1)) return 'ios';
  return null;
}
function validStoreUrl(platform, value) {
  if (!value) return null;
  try {
    const url = new URL(value);
    if (url.protocol !== 'https:') return null;
    const expected = platform === 'ios' ? 'apps.apple.com' : 'play.google.com';
    if (url.hostname !== expected) return null;
    if (platform === 'ios' && !/\/id\d+/.test(url.pathname)) return null;
    if (platform === 'android' && (url.pathname !== '/store/apps/details' || !url.searchParams.get('id'))) return null;
    return url.href;
  } catch { return null; }
}
const platform = detectPlatform(navigator);
const stores = window.SIFTLY_STORES || {};
for (const target of ['ios', 'android']) {
  const link = document.querySelector(`#${target}-link`);
  const url = validStoreUrl(target, stores[target]);
  if (url) {
    link.href = url;
    document.querySelector(`#${target}-label`).textContent = target === 'ios' ? 'Open in the App Store ↗' : 'Open in Google Play ↗';
  } else {
    link.addEventListener('click', () => {
      document.querySelector('#availability').textContent = `${target === 'ios' ? 'The App Store' : 'The Google Play'} link hasn’t been added yet. Please check back soon.`;
    });
  }
}
if (platform) {
  document.querySelector(`#${platform}-link`).classList.add('detected');
  const label = platform === 'ios' ? 'an iPhone or iPad' : 'an Android device';
  document.querySelector('#device-message').textContent = `Looks like you’re on ${label}. We’ll point you to the right store.`;
  const destination = validStoreUrl(platform, stores[platform]);
  if (destination) {
    document.querySelector('#availability').textContent = 'Opening your store… If it doesn’t open, use the button above.';
    window.location.replace(destination);
  } else {
    document.querySelector('#availability').textContent = 'Your device is detected. Its store link will be available here once added.';
  }
} else if (validStoreUrl('ios', stores.ios) || validStoreUrl('android', stores.android)) {
  document.querySelector('#availability').textContent = 'Choose a store above, or open this same link on your phone.';
}
