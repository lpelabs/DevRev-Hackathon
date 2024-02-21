import { client, publicSDK } from "@devrev/typescript-sdk";

export async function handleEvent(
  event: any,
) {
  const endpoint = event.execution_metadata.devrev_endpoint;
  const token = event.context.secrets.service_account_token;

  // Initialize the public SDK client
  const devrevSDK = client.setup({ endpoint, token });

  // Create a ticket. Name the ticket using the current date and time.
  const date = new Date();
  const ticketName = `Ticket created at ${date.toLocaleString()}`;
  const ticketBody = `This ticket was created by a snap-in at ${date.toLocaleString()}`;

  const reponse = await devrevSDK.worksCreate({
    title: ticketName,
    body: ticketBody,
    // The ticket is created in the PROD-1 part. Rename this to match your part.
    applies_to_part: "PROD-1",
    // The ticket is owned by the DEVU-1 user. Rename this to match the required user.
    owned_by: ["DEVU-1"],
    type: publicSDK.WorkType.Ticket,
  });

  console.log(reponse);
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
