import { publicSDK, client } from '@devrev/typescript-sdk';
import { ApiUtils } from './utils';

export const run = async (events: any[]) => {
    console.log(events)
    for (const event of events) {
        const endpoint: string = event.execution_metadata.devrev_endpoint;
        const token: string = event.context.secrets.service_account_token;

        const apiUtil: ApiUtils = new ApiUtils(endpoint, token);
        const snapInId = event.context.snap_in_id;
        const inputs = event.input_data.global_values;
        let parameters: string = event.payload.parameters.trim();
        const tags = event.input_data.resources.tags;
        
        const openApiKey: string = event.input_data.keyrings.openai_api_key;
        const app_name = inputs['company_name']
        const owner = inputs['github_owner']
        const repo = inputs['github_repo']
        const twitter_handle = inputs['twitter_handle']

        const url = `https://lpe-labs.up.railway.app/generate_csv?app_name=${app_name}&subreddit_name=${app_name}&owner=${owner}&repo=${repo}&twitter_handle=${twitter_handle}&get_news_for=${app_name}`;

        try {
            const response = await fetch(url);
            if (!response.ok) {
                throw new Error('Failed to fetch data');
            }
            const responseData = await response.json();
            if (response.status === 201) {
                return responseData;
            }
        } catch (error) {
            console.error('Error:', error);
        }
    }
};

export default run;