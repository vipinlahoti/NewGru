Accounts.onCreateUser(function(options, user){
  user = Grudr.callbacks.run("onCreateUser", user, options);
  return user;
});
