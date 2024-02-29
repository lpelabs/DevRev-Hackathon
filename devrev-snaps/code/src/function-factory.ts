import data_collector from './functions/data_collector';
import snapin_intro from './functions/snapin_intro'
import fetch_play_store_reviews from './functions/fetch_play_store_reviews'
import insights from './functions/insights'
import review_tweets from './functions/review_tweet'

export const functionFactory = {
  data_collector,
  snapin_intro,
  fetch_play_store_reviews,
  insights,
  // review_tweets
} as const;

export type FunctionFactoryType = keyof typeof functionFactory;
