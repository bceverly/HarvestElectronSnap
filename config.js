const HARVEST_URL = 'https://id.getharvest.com/accounts';

const HARVEST_DOMAINS = [
  'getharvest.com',
  'harvestapp.com',
  'id.getharvest.com'
];

function isHarvestURL(url) {
  try {
    const parsed = new URL(url);
    return HARVEST_DOMAINS.some(d =>
      parsed.hostname === d || parsed.hostname.endsWith('.' + d)
    );
  } catch {
    return false;
  }
}

module.exports = { HARVEST_URL, HARVEST_DOMAINS, isHarvestURL };
