// expose our config directly to our application using module.exports
const {
  FACEBOOK_CLIENT_ID,
  FACEBOOK_CLIENT_SECRET,
  TWITTER_CONSUMER_KEY,
  TWITTER_CONSUMER_SECRET,
  GOOGLE_CLIENT_ID,
  GOOGLE_CLIENT_SECRET,
} = process.env;

module.exports = {

    facebookAuth : {
        'clientID'        : FACEBOOK_CLIENT_ID, //'1832132633772519', // your App ID
        'clientSecret'    : FACEBOOK_CLIENT_SECRET, // your App Secret
        'callbackURL'     : 'http://localhost:8080/auth/facebook/callback',
        'profileURL': 'https://graph.facebook.com/v2.5/me?fields=first_name,last_name,email'

    },

    twitterAuth : {
        'consumerKey'        : TWITTER_CONSUMER_KEY,
        'consumerSecret'     : TWITTER_CONSUMER_SECRET,
        'callbackURL'        : 'http://localhost:8080/auth/twitter/callback'
    },

    googleAuth : {
        'clientID'         : GOOGLE_CLIENT_ID,
        'clientSecret'     : GOOGLE_CLIENT_SECRET,
        'callbackURL'      : 'http://localhost:8080/auth/google/callback'
    }
};