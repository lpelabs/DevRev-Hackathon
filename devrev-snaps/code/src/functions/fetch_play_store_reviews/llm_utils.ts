import { StringOutputParser, JsonOutputParser } from "@langchain/core/output_parsers";
import {
  ChatPromptTemplate,
  SystemMessagePromptTemplate,
  HumanMessagePromptTemplate,
} from "@langchain/core/prompts";
import { ChatOpenAI } from "@langchain/openai";

export class LLMUtils {
  public provider!: ChatOpenAI;

  // Constructor to initialize SDK instances
  constructor(openApiKey: string, modelName: string, maxTokens: number) {
    this.provider = new ChatOpenAI({
    openAIApiKey: openApiKey,
      modelName: modelName,
      maxTokens: maxTokens,
    });
  }

  // Chat completion.
  async chatCompletion(sysPrompt: string, humanPrompt: string, argsValues: object): Promise<object> {
    const chatPrompt = ChatPromptTemplate.fromMessages([
      SystemMessagePromptTemplate.fromTemplate(sysPrompt),
      HumanMessagePromptTemplate.fromTemplate(humanPrompt),
    ]);
    const outputParser = new JsonOutputParser();
    const chain = chatPrompt.pipe(this.provider).pipe(outputParser);
    const response = await chain.invoke(argsValues);
    return response;
  }
}