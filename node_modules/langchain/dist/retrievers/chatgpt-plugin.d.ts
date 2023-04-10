import { Document } from "../document.js";
import { BaseRetriever } from "../schema/index.js";
import { AsyncCaller, AsyncCallerParams } from "../util/async_caller.js";
interface ChatGPTPluginRetrieverFilter {
    document_id?: string;
    source?: string;
    source_id?: string;
    author?: string;
    start_date?: string;
    end_date?: string;
}
type ChatGPTPluginRetrieverAuth = false | {
    bearer: string;
};
interface ChatGPTPluginRetrieverParams extends AsyncCallerParams {
    /**
     * The URL of the ChatGPTRetrievalPlugin server
     */
    url: string;
    /**
     * The authentication method to use, currently implemented is
     * - false: no authentication
     * - { bearer: string }: Bearer token authentication
     */
    auth: ChatGPTPluginRetrieverAuth;
    /**
     * The number of results to request from the ChatGPTRetrievalPlugin server
     */
    topK?: number;
    /**
     * The filter to use when querying the ChatGPTRetrievalPlugin server
     */
    filter?: ChatGPTPluginRetrieverFilter;
}
export declare class ChatGPTPluginRetriever extends BaseRetriever implements ChatGPTPluginRetrieverParams {
    url: string;
    auth: ChatGPTPluginRetrieverAuth;
    topK: number;
    filter?: ChatGPTPluginRetrieverFilter;
    asyncCaller: AsyncCaller;
    constructor({ url, auth, topK, filter, ...rest }: ChatGPTPluginRetrieverParams);
    getRelevantDocuments(query: string): Promise<Document[]>;
}
export {};
