const Twitter = require('twitter');
const groupTweets = require('./controller');

const client = new Twitter({
  consumer_key: process.env.TWITTER_CONSUMER_KEY,
  consumer_secret: process.env.TWITTER_CONSUMER_SECRET,
  bearer_token: process.env.TWITTER_BEARER_TOKEN,
});

module.exports = (req, res) => {
  const { query } = req;
  client.get('search/tweets', { ...query }, ((error, tweets, response) => res.send(groupTweets(tweets))));
};
