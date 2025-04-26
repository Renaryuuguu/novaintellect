/// <reference types="vite/client" />
interface ISparkResponse {
  code: number;
  message: string;
  sid: string;
  id: string;
  created: number;
  choices: IChoices[];
}
interface IDelta {
  role: string;
  content?: string;
}

interface IChoices {
  delta: IDelta;
  index: number;
}


// data: {"code":0,"message":"Success","sid":"cha000b2cb5@dx1966f7015d29a4b532","id":"cha000b2cb5@dx1966f7015d29a4b532","created":1745626339,"choices":[{"delta":{"role":"assistant","content":"你好"},"index":0}]}

