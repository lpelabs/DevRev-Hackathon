import { publicSDK } from '@devrev/typescript-sdk';
import gplay from "google-play-scraper";
import { ApiUtils, HTTPResponse } from './utils';
import { LLMUtils } from './llm_utils';
import axios, { AxiosResponse } from 'axios';

interface QueryParams {
  app_id: string;
  ratings: number;
  numReviews: number;
}

export const run = async (events: any[]) => {
  for (const event of events) {
    const endpoint: string = event.execution_metadata.devrev_endpoint;
    const token: string = event.context.secrets.service_account_token;
    const openApiKey: string = event.input_data.keyrings.openai_api_key;
    const apiUtil: ApiUtils = new ApiUtils(endpoint, token);
    // Get the number of reviews to fetch from command args.
    const snapInId = event.context.snap_in_id;
    const devrevPAT = event.context.secrets.service_account_token;
    const baseURL = event.execution_metadata.devrev_endpoint;
    const inputs = event.input_data.global_values;
    let parameters: string = event.payload.parameters.trim();
    const tags = event.input_data.resources.tags;
    const llmUtil: LLMUtils = new LLMUtils(openApiKey, "gpt-4", 200);
    let numReviews = 10;
    let ratings = 1;
    let commentID: string | undefined;

    // Parse parameters to get ratings and numReviews
    const paramsArray = parameters.split(" ");
    if (paramsArray.length >= 2) {
      ratings = parseInt(paramsArray[0]);
      numReviews = parseInt(paramsArray[1]);
    }

    if (parameters === 'help') {
      // Send a help message in CLI help format.
      const helpMessage = `playstore_reviews_process - Fetch reviews from Google Play Store and create tickets in DevRev.\n\nUsage: /playstore_reviews_process <ratings> <numReviews>\n\n\`ratings\`: Number of ratings to fetch from Google Playstore. Should be a number between 1 and 5. \n\`numReviews\`: Number of reviews to fetch from Google Playstore. Should be a number between 1 and 100. If not specified, it defaults to 10.`;
      let postResp = await apiUtil.postTextMessageWithVisibilityTimeout(snapInId, helpMessage, 1);
      if (!postResp.success) {
        console.error(`Error while creating timeline entry: ${postResp.message}`);
        continue;
      }
      continue
    }

    let postResp: HTTPResponse = await apiUtil.postTextMessageWithVisibilityTimeout(snapInId, 'Fetching reviews from Playstore', 1);
    if (!postResp.success) {
      console.error(`Error while creating timeline entry: ${postResp.message}`);
      continue;
    }

    // Default to 10 reviews if numReviews is not provided
    if (isNaN(numReviews) || numReviews <= 0) {
      numReviews = 10;
    }

    // Default to 0 ratings if ratings is not provided
    if (isNaN(ratings) || ratings < 0 || ratings > 5) {
      ratings = 0;
    }

    async function postReviewData(queryParams: QueryParams): Promise<AxiosResponse<any>> {
      const url = `https://devrev-hackathon-production.up.railway.app/playstore_reviews?app_name=${queryParams.app_id}&ratings=${queryParams.ratings}&numReviews=${queryParams.numReviews}`;
      try {
        const response = await axios.get(url);
        return response;
      } catch (error) {
        console.error('Error:', error);
        throw error;
      }
    }

    const queryParams: QueryParams = {
      app_id: inputs['app_id'],
      ratings: ratings,
      numReviews: numReviews
    };

    // // Call google playstore scraper to fetch those number of reviews.
    let getReviewsResponse: any = await postReviewData(queryParams)
    //   appId: inputs['app_id'],
    //   sort: gplay.sort.RATING,
    //   num: numReviews,
    //   throttle: 10,
    // });

    // Post an update about the number of reviews fetched.
    postResp = await apiUtil.postTextMessageWithVisibilityTimeout(snapInId, `Fetched ${numReviews} reviews, creating tickets now.`, 1);
    if (!postResp.success) {
      console.error(`Error while creating timeline entry: ${postResp.message}`);
      continue;
    }
    commentID = postResp.data.timeline_entry.id;
    let reviews = getReviewsResponse.data;

    // For each review, create a ticket in DevRev.
    for (const review of reviews) {
      // Post a progress message saying creating ticket for review with review URL posted.
      postResp = await apiUtil.postTextMessageWithVisibilityTimeout(snapInId, `Creating ticket for review id: ${review.reviewId}`, 1);
      if (!postResp.success) {
        console.error(`Error while creating timeline entry: ${postResp.message}`);
        continue;
      }
      const reviewText = `Ticket created from Playstore review ${review.reviewId}\n\n${review.content}. it has ${review.thumbsUpCount} of upvotes`;
      const reviewTitle = `Ticket created from Playstore review id ${review.reviewId}`;
      const reviewID = review.id;
      const systemPrompt = `You are an expert at labelling a given Google Play Store Review as bug, feature_request, question or feedback. You are given a review provided by a user for the app ${inputs['app_id']}. You have to label the review as bug, feature_request, question or feedback. The output should be a JSON with fields "category" and "reason". The "category" field should be one of "bug", "feature_request", "question" or "feedback". The "reason" field should be a string explaining the reason for the category. \n\nReview: {review}\n\nOutput:`;
      const humanPrompt = ``;

      let llmResponse = {};
      try {
        llmResponse = await llmUtil.chatCompletion(systemPrompt, humanPrompt, { review: (reviewText) })
      } catch (err) {
        console.error(`Error while calling LLM: ${err}`);
      }
      let tagsToApply = [];
      let inferredCategory = 'failed_to_infer_category';
      if ('category' in llmResponse) {
        inferredCategory = llmResponse['category'] as string;
        if (!(inferredCategory in tags)) {
          inferredCategory = 'failed_to_infer_category';
        }
      }
      // Create a ticket with title as review title and description as review text.
      const createTicketResp = await apiUtil.createTicket({
        title: reviewTitle,
        tags: [{ id: tags[inferredCategory].id }],
        body: reviewText,
        type: publicSDK.WorkType.Ticket,
        owned_by: [inputs['default_owner_id']],
        applies_to_part: inputs['default_part_id'],
      });
      if (!createTicketResp.success) {
        console.error(`Error while creating ticket: ${createTicketResp.message}`);
        continue;
      }
      // Post a message with ticket ID.
      const ticketID = createTicketResp.data.work.id;
      const ticketCreatedMessage = inferredCategory != 'failed_to_infer_category' ? `Created ticket: <${ticketID}> and it is categorized as ${inferredCategory}` : `Created ticket: <${ticketID}> and it failed to be categorized`;
      const postTicketResp: HTTPResponse = await apiUtil.postTextMessageWithVisibilityTimeout(snapInId, ticketCreatedMessage, 1);
      if (!postTicketResp.success) {
        console.error(`Error while creating timeline entry: ${postTicketResp.message}`);
        continue;
      }
    }
  }
};

export default run;