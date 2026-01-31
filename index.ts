import {query} from "@anthropic-ai/claude-agent-sdk"
import { readFileSync } from "fs";
import * as path from "path";

// Process streaming responses
for await (const message of query({
  prompt: "どんなSkillsを持っている？",
  options: {
    maxTurns: 10,
    allowedTools: ["Read", "Grep","Bash"],
    cwd: path.join(process.cwd(),"valley"),
    permissionMode: "default",
    settingSources: ["project"],
    resume: "bfc3bcca-ea0f-4a33-82df-a9c0cfe80b4e"
  }
})) {
    console.log(message.type)
}