import { Document } from "../document.js";
import { BaseRetriever } from "../schema/index.js";
import { AsyncCaller } from "../util/async_caller.js";
export class ChatGPTPluginRetriever extends BaseRetriever {
    constructor({ url, auth, topK = 4, filter, ...rest }) {
        super();
        Object.defineProperty(this, "url", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "auth", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "topK", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "filter", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "asyncCaller", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        this.url = url;
        this.auth = auth;
        this.topK = topK;
        this.asyncCaller = new AsyncCaller(rest);
    }
    async getRelevantDocuments(query) {
        const res = await this.asyncCaller.call(fetch, `${this.url}/query`, {
            method: "POST",
            body: JSON.stringify({
                queries: [
                    {
                        query,
                        top_k: this.topK,
                        filter: this.filter,
                    },
                ],
            }),
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
                ...(this.auth && this.auth.bearer
                    ? { Authorization: `Bearer ${this.auth.bearer}` }
                    : {}),
            },
        });
        if (!res.ok) {
            throw new Error(`Error calling ChatGPTPluginRetriever: ${res.status}`);
        }
        const body = await res.json();
        const results = body?.results?.[0]?.results;
        if (!results) {
            // Note an empty array of results would not fall into this case
            throw new Error("No results returned from ChatGPTPluginRetriever");
        }
        return results.map(
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        (result) => new Document({
            pageContent: result.text,
            metadata: result.metadata,
        }));
    }
}
//# sourceMappingURL=chatgpt-plugin.js.map