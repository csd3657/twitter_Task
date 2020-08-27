const _ = require('lodash');
const logger = require('../logger');

const fieldToGet = {
  created_at: 'pub_datetime',
  id: 'tweet_id',
  text: 'ftext',
  user_mentions: 'user_mentions',
  'user.id': 'uid',
  'user.name': 'profile_name',
  'user.screen_name': 'screen_name',
  'user.location': 'country',
  'user.followers_count': 'followers_count',
  'user.friends_count': 'friends_count',
  'user.favourites_count': 'favourites_count',
  'user.statuses_count': 'statuses_count',
  'user.profile_image_url': 'profile_image_url',
  retweet_count: 'retweet_count',
};

function exportTweet(element) {
  const tweet = {};
  Object.keys(fieldToGet).forEach((field) => {
    tweet[fieldToGet[field]] = _.get(element, field);
  });
  return tweet;
}

module.exports = (tweets) => {
  logger.info('Start constructing tweets');

  const reTweets = {
    mentions: [],
  };

  tweets.statuses.forEach((element) => {
    reTweets.mentions.push(exportTweet(element));
    if (element.retweeted_status) {
      reTweets.mentions.push(exportTweet(element.retweeted_status));
    }
  });

  reTweets.search_metadata = tweets.search_metadata;
  return reTweets;
};
