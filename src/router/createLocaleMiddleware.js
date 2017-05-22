export default ({
  defaultLocale,
  siteLocales,
} = {}) => (req, res, next) => {
  if (typeof defaultLocale !== 'string') {
    throw new Error(`Expected defaultLocale to be a locale string.`);
  }
  if (typeof siteLocales !== 'object' || siteLocales.constructor !== Array) {
    throw new Error(`Expected siteLocales to be an array of locale string.`);
  }
  let [ language, country ] = defaultLocale.split('-');
  const [ url ] = req.url.substr(1).split('?');
  const [ localeSegment ] = url.split('/');
  if (localeSegment) {
    const [ languageSegment, countrySegment ] = localeSegment.split('-');
    language = languageSegment || language;
    country = countrySegment || country;
    const newLocale = [ language, country ].join('-');
    if (siteLocales.indexOf(newLocale) !== -1) {
      req.url = '/' + url.substr(localeSegment.length + 1);
    }
  }
  req.locale = {
    country,
    language,
  };
  next();
};
