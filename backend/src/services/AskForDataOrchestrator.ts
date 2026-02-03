import { AskForDataPlanner, AskForDataPlan } from "./AskForDataPlanner";
import { LlmClient } from "./LlmClient";
import { VectorStoreClient } from "./EmbeddingService";
import { RagCompletionService } from "./RagCompletionService";

export class AskForDataOrchestrator {
  private planner: AskForDataPlanner;
  private ragCompletionService: RagCompletionService;

  constructor(vectorStoreClient: VectorStoreClient, llmClient: LlmClient) {
    this.planner = new AskForDataPlanner(llmClient);
    this.ragCompletionService = new RagCompletionService(
      vectorStoreClient,
      llmClient
    );
  }

  async handle(params: {
    workspaceId: string;
    assistantId: string;
    userQuery: string;
    knownFields: Record<string, any>;
    model?: string;
  }): Promise<
    | {
        type: "ask_for_data";
        plan: AskForDataPlan;
      }
    | {
        type: "answer";
        answer: string;
        context: Array<{
          chunkId: string;
          text: string;
          documentId: string;
          documentTitle: string;
          score: number;
        }>;
      }
  > {
    const plan = await this.planner.plan({
      model: params.model,
      assistantInstruction: null,
      userQuery: params.userQuery,
      knownFields: params.knownFields,
    });

    const missingRequired = plan.missingFields.filter((f) => f.required);
    if (missingRequired.length > 0) {
      return {
        type: "ask_for_data",
        plan,
      };
    }

    const completion = await this.ragCompletionService.complete({
      workspaceId: params.workspaceId,
      assistantId: params.assistantId,
      query: params.userQuery,
      model: params.model,
    });

    return {
      type: "answer",
      answer: completion.answer,
      context: completion.context,
    };
  }
}
