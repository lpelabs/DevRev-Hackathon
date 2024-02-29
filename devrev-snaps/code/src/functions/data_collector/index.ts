import { client, publicSDK } from "@devrev/typescript-sdk";
import axios, { AxiosResponse } from 'axios';

interface QueryParams {
  app_id: string;
  subreddit_name: string;
  owner: string;
  repo: string;
  twitter_handle: string;
  issue: string;
  get_news_for: string;
  open_ai_key: string;
}

export async function handleEvent(
  event: any,
) {
  const endpoint = event.execution_metadata.devrev_endpoint;
  const token = event.context.secrets.service_account_token;
  const openApiKey: string = event.input_data.keyrings.openai_api_key;

  // Initialize the public SDK client
  const devrevSDK = client.setup({ endpoint, token });
  const inputs = event.input_data.global_values;
  const snapInId = event.context.snap_in_id;

  // Create a ticket. Name the ticket using the current date and time.
  async function postReviewData(queryParams: QueryParams): Promise<AxiosResponse<any>> {
    const url = `https://devrev-hackathon-production.up.railway.app/generate_csv?app_name=${queryParams.app_id}&subreddit_name=${queryParams.subreddit_name}&owner=${queryParams.owner}&repo=${queryParams.repo}&twitter_handle=${queryParams.twitter_handle}&issue=${queryParams.issue}&get_news_for=${queryParams.get_news_for}&open_ai_key=${queryParams.open_ai_key}`;
    try {
      const response = await axios.get(url);

      const createPayload: publicSDK.TimelineEntriesCreateRequest = {
        body: "fetching latest VoC data to generate insights...",
        body_type: publicSDK.TimelineCommentBodyType.Text,
        object: snapInId,
        type: publicSDK.TimelineEntriesCreateRequestType.TimelineComment,
        visibility: publicSDK.TimelineEntryVisibility.Internal,
      };

      await createTimeLine(createPayload)

      return response;
    } catch (error) {
      console.error('Error:', error);
      throw error;
    }
  }

  const queryParams: QueryParams = {
    app_id: inputs['app_id'],
    get_news_for: inputs['company_name'],
    subreddit_name: inputs['subreddit'],
    repo: inputs['github_repo_name'],
    owner: inputs['github_owner'],
    twitter_handle: inputs['twitter_handle'],
    issue: inputs['twitter_hashtag'],
    open_ai_key: openApiKey
  };

  await postReviewData(queryParams)

  async function createTimeLine(payload: publicSDK.TimelineEntriesCreateRequest) {
    try {
      const response: AxiosResponse = await devrevSDK.timelineEntriesCreate(payload);
      return { data: response.data, message: 'Timeline created successfully', success: true };
    } catch (error: any) {
      if (error.response) {
        const err = `Failed to create timeline. Err: ${JSON.stringify(error.response.data)}, Status: ${error.response.status}`;
        return { message: err };
      } else {
        return { message: error.message };
      }
    }
  }
}

export const run = async (events: any[]) => {
  /*
  Put your code here to handle the event.
  */
  for (let event of events) {
    await handleEvent(event);
  }
};

export default run;
