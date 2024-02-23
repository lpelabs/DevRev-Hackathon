import { publicSDK, client } from '@devrev/typescript-sdk';
import { ApiUtils } from './utils';

export const run = async (events: any[]) => {
    for (const event of events) {
        const endpoint: string = event.execution_metadata.devrev_endpoint;
        const token: string = event.context.secrets.service_account_token;

        const apiUtil: ApiUtils = new ApiUtils(endpoint, token);
        const snapInId = event.context.snap_in_id;
        const inputs = event.input_data.global_values;
        let parameters: string = event.payload.parameters.trim();
        const tags = event.input_data.resources.tags;

        let numReviews = 10;
        let commentID: string | undefined;

        if (!parameters) {
            // Send a help message in CLI help format.
            const helpMessage = `Voice To Help Snap-in will help in gathering insights from user feedback across different channel which is in unstructured format. This will also create ticket based on the issue faced by the customer by ingesting data from different platform like twitter and google play store.`;
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