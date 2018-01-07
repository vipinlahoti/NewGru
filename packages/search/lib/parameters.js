function addSearchQueryParameter (parameters, terms) {
  if(!!terms.query) {
    var parameters = Grudr.utils.deepExtend(true, parameters, {
      find: {
        $or: [
          {title: {$regex: terms.query, $options: 'i'}},
          {url: {$regex: terms.query, $options: 'i'}},
          {body: {$regex: terms.query, $options: 'i'}}
        ]
      }
    });
  }
  return parameters;
}
Grudr.callbacks.add("articlesParameters", addSearchQueryParameter);
