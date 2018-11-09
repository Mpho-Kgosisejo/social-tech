
var FB = require('fb');
FB.setAccessToken('EAAEqh05q7SoBADKe1hXVJD55infs3Bw9smrVz9BKAlYNLHKXQY5fnt6Y57SUh6quAsq9Jmi4Hh2WjD3n3dd641dJvkhRFfZCbZBnSVKSfZAIzuFpw5JBc4mmjcvXOGyT0vgNMHevXO0FeSZB6uuLMZANgickJS3XWkZBcl461qRFT7pTZABHxuzZCHb1AXN2pNThkmhBPNYWjwZDZD');


FB.api('oauth/access_token', {
  client_id: '328235601292586',
  client_secret: '5f521ba1967c1dafa3eb02d9550ca8a6',
  redirect_uri: 'http://localhost:3000/callback',
  code: 'code'
}, function (res) {
  if(!res || res.error) {
      console.log(!res ? 'error occurred' : res.error);
      return;
  }

  var accessToken = res.access_token;
  // var expires = res.expires ? res.expires : 0;
  console.log(accessToken);
});