import ticket_creator from './functions/ticket_creator';
import snapin_intro from './functions/snapin_intro'
import fetch_play_store_reviews from './functions/fetch_play_store_reviews'
import insights from './functions/insights'
// import review_tweets from './functions/review_tweets'

export const functionFactory = {
  ticket_creator,
  snapin_intro,
  fetch_play_store_reviews,
  insights,
  // review_tweets
} as const;

export type FunctionFactoryType = keyof typeof functionFactory;
