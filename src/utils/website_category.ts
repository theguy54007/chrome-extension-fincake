//check url is what category
export function getCategory(url) {
  if (isFincakeCategory(url)) return 'fincake';

  if (isTravelPage(url)) {
    return 'travel';
  } else if (isEntertaimentPage(url)) {
    return 'entertaiment';
  } else if (isEcPage(url)) {
    return 'ec';
  } else {
    return 'other';
  }
}

//check url is fincake category
export function isFincakeCategory(url) {
  const keywords = ['fincake'];
  return keywords.some(keyword => url.includes(keyword));
}

export function getCategoryInfo(category) {
  return categoryIdMapping[category];
}

function isTravelPage(url) {
  const keywords = ['flight','airbnb','expedia','tripadvisor', 'agoda', 'booking', 'trip', 'china-airlines'];
  return keywords.some(keyword => url.includes(keyword));
}


function isEntertaimentPage(url) {
  const keywords = ['netflix', 'friday', 'disneyplus','iqiyi', 'hbo', 'youtube', 'twitch', 'spotify', 'soundcloud', 'primevideo'];
  return keywords.some(keyword => url.includes(keyword));
}


function isEcPage(url) {
  const keywords = ['momo', 'pchome', 'shopee', 'lazada', 'taobao', 'tmall', 'ebay', 'ruten', 'yahoo', 'carrefour', 'costco'];
  return keywords.some(keyword => url.includes(keyword));
}


const categoryIdMapping = {
  travel: {
    id: 9,
    path: 'travel-booking',
  },
  entertaiment: {
    id: 68,
    path: 'video-platform',
  },
  ec: {
    id: 20,
    path: 'onlineshopping',
  },
};
