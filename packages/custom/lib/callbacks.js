function alertThanks (article) {
  alert("Thanks for submitting a article!");
  return article;
}
Grudr.callbacks.add("articleSubmitClient", alertThanks);
