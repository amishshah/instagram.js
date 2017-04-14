const cache = new Map();

module.exports = {
  cache,
  getExisting(url) {
    if (cache.has(url)) {
      const item = cache.get(url);
      if (item[0] > Date.now()) return item[1];
    }
  },
  cacheItem(url, data, expiration) {
    cache.set(url, [expiration, data]);
    return data;
  }
}