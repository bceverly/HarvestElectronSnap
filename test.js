const { describe, it } = require('node:test');
const assert = require('node:assert/strict');
const { HARVEST_URL, HARVEST_DOMAINS, isHarvestURL } = require('./config');

describe('config', () => {
  describe('HARVEST_URL', () => {
    it('points to the Harvest accounts page', () => {
      assert.equal(HARVEST_URL, 'https://id.getharvest.com/accounts');
    });

    it('is a valid URL', () => {
      const parsed = new URL(HARVEST_URL);
      assert.equal(parsed.protocol, 'https:');
    });
  });

  describe('HARVEST_DOMAINS', () => {
    it('includes getharvest.com', () => {
      assert.ok(HARVEST_DOMAINS.includes('getharvest.com'));
    });

    it('includes harvestapp.com', () => {
      assert.ok(HARVEST_DOMAINS.includes('harvestapp.com'));
    });
  });
});

describe('isHarvestURL', () => {
  it('allows the main Harvest URL', () => {
    assert.equal(isHarvestURL('https://id.getharvest.com/accounts'), true);
  });

  it('allows getharvest.com subdomains', () => {
    assert.equal(isHarvestURL('https://app.getharvest.com/time'), true);
  });

  it('allows harvestapp.com', () => {
    assert.equal(isHarvestURL('https://www.harvestapp.com/something'), true);
  });

  it('allows getharvest.com root', () => {
    assert.equal(isHarvestURL('https://getharvest.com/'), true);
  });

  it('denies unrelated URLs', () => {
    assert.equal(isHarvestURL('https://www.google.com'), false);
  });

  it('denies URLs with harvest in the path but wrong domain', () => {
    assert.equal(isHarvestURL('https://evil.com/getharvest.com'), false);
  });

  it('denies lookalike domains', () => {
    assert.equal(isHarvestURL('https://notgetharvest.com/'), false);
  });

  it('denies URLs with harvest domain as subdomain of another', () => {
    assert.equal(isHarvestURL('https://getharvest.com.evil.com/'), false);
  });

  it('returns false for invalid URLs', () => {
    assert.equal(isHarvestURL('not a url'), false);
  });

  it('returns false for empty string', () => {
    assert.equal(isHarvestURL(''), false);
  });
});
