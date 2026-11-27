(function () {
  const pageName = 'Live Attendance';
  const storageKey = 'emsphere_attribution_live_attendance';
  const leadId = window.crypto && typeof window.crypto.randomUUID === 'function'
    ? window.crypto.randomUUID()
    : Date.now().toString(36) + Math.random().toString(36).slice(2);
  const utmKeys = ['utm_source', 'utm_medium', 'utm_campaign', 'utm_term', 'utm_content', 'utm_id', 'gclid'];
  const trackingFields = utmKeys.concat(['referrer', 'landing_page_url', 'traffic_source', 'traffic_medium', 'page_name', 'lead_id']);
  let attribution = {};

  try {
    attribution = JSON.parse(localStorage.getItem(storageKey) || '{}');
    if (attribution.expiresAt && attribution.expiresAt < Date.now()) attribution = {};
  } catch (error) {
    console.error('Unable to read saved attribution:', error);
  }

  const params = new URLSearchParams(window.location.search);
  utmKeys.forEach(function (key) {
    const value = params.get(key);
    if (value) attribution[key] = value;
  });

  if (document.referrer) {
    try {
      const referrerUrl = new URL(document.referrer);
      const currentHost = window.location.hostname;
      const referrerHost = referrerUrl.hostname;
      const isOwnDomain = referrerHost === currentHost ||
        referrerHost.endsWith('.' + currentHost) ||
        currentHost.endsWith('.' + referrerHost);
      if (!isOwnDomain) attribution.referrer = document.referrer;
    } catch (error) {
      console.error('Unable to parse the referring URL:', error);
    }
  }

  if (!attribution.landing_page_url) attribution.landing_page_url = window.location.href;
  attribution.expiresAt = Date.now() + 30 * 24 * 60 * 60 * 1000;
  try {
    localStorage.setItem(storageKey, JSON.stringify(attribution));
  } catch (error) {
    console.error('Unable to save attribution:', error);
  }

  function classifyReferrer(referrer) {
    if (!referrer) return { source: 'direct', medium: 'direct' };
    const host = new URL(referrer).hostname.toLowerCase();
    const labels = host.split('.');
    const searchEngine = ['google', 'bing'].find(function (name) { return labels.indexOf(name) !== -1; });
    if (searchEngine) return { source: searchEngine, medium: 'organic' };
    const socialNetwork = ['facebook', 'instagram', 'linkedin'].find(function (name) { return labels.indexOf(name) !== -1; });
    if (socialNetwork) return { source: socialNetwork, medium: 'social' };
    return { source: host, medium: 'referral' };
  }

  function populateForm(form) {
    const hasUtm = utmKeys.slice(0, 6).some(function (key) { return !!attribution[key]; });
    const referrerTraffic = classifyReferrer(attribution.referrer);
    const values = {
      utm_source: attribution.utm_source || '',
      utm_medium: attribution.utm_medium || '',
      utm_campaign: attribution.utm_campaign || '',
      utm_term: attribution.utm_term || '',
      utm_content: attribution.utm_content || '',
      utm_id: attribution.utm_id || '',
      gclid: attribution.gclid || '',
      referrer: attribution.referrer || '',
      landing_page_url: attribution.landing_page_url || window.location.href,
      traffic_source: hasUtm ? (attribution.utm_source || referrerTraffic.source) : referrerTraffic.source,
      traffic_medium: hasUtm ? (attribution.utm_medium || '') : referrerTraffic.medium,
      page_name: pageName,
      lead_id: leadId
    };
    Object.keys(values).forEach(function (name) {
      form.querySelectorAll('[name="' + name + '"]').forEach(function (input) {
        input.value = values[name];
      });
    });
  }

  document.querySelectorAll('form').forEach(function (form) {
    populateForm(form);
    form.addEventListener('formdata', function (event) {
      populateForm(form);
      trackingFields.forEach(function (name) {
        const input = form.querySelector('[name="' + name + '"]');
        if (input) event.formData.set(name, input.value);
      });
    });
  });
  document.addEventListener('submit', function (event) {
    if (event.target instanceof HTMLFormElement) populateForm(event.target);
  }, true);
})();
