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
        const company = inputs['company_name']

        if (!parameters) {
            // Send a help message in CLI help format.
            const helpMessage = `View Insights here -> https://lpe-labs-devrev.vercel.app/client-dashboard?client_name=${company}`;
            let postResp = await apiUtil.postTextMessageWithVisibilityTimeout(snapInId, helpMessage, 1);
            if (!postResp.success) {
                console.error(`Error while creating timeline entry: ${postResp.message}`);
                continue;
            }
            continue;
        }
    }
};

export default run;