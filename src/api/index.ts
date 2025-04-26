import CryptoJS from "crypto-js";
export const wsUrl = "wss://spark-api.xf-yun.com/v1.1/chat"

function getWebsocketUrl(wsUrl: string) {
  let url = wsUrl;
  const APISecret = "YzQ1ZTgzYzg2YzQ1NGJlOTdiNTlmOWIy";
  const APIKey = "37ee23a4946295d04303bd0d5fec90a3";
  // url = "wss://spark-api.xf-yun.com/v1.1/chat";
  const host = location.host;
  const date = new Date().toUTCString();
  const algorithm = "hmac-sha256";
  const headers = "host date request-line";

  const method = "GET /v1.1/chat HTTP/1.1";
  const signatureOrigin = `host: ${host}\ndate: ${date}\n${method}`;
  const signatureSha = CryptoJS.HmacSHA256(signatureOrigin, APISecret);
  const signature = CryptoJS.enc.Base64.stringify(signatureSha);
  const authorizationOrigin = `api_key="${APIKey}", algorithm="${algorithm}", headers="${headers}", signature="${signature}"`;
  const authorization = btoa(authorizationOrigin);
  url = `${url}?authorization=${authorization}&date=${date}&host=${host}`;
  return url;
}
// getWebsocketUrl(url)
class TTSRecorder {
  APPID: string;
  wsUrl: string;
  ttsWS: WebSocket | null;
  constructor(APPID: string, wsUrl: string) {
    this.APPID = APPID;
    this.wsUrl = wsUrl;
    this.ttsWS = null;
  }
  connectWebSocket() {
    let url = getWebsocketUrl(this.wsUrl);
    let ttsWS = new WebSocket(url);
    this.ttsWS = ttsWS;
    ttsWS.onopen = () => {
      this.webSocketSend("你好")
      // console.log("websocket connected")
    };
    ttsWS.onmessage = (event) => {
      this.result(event.data)
    };
    ttsWS.onclose = () => {
      console.log("websocket closed")
    };
  }
  webSocketSend(iptText: string) {
    const params = {
      "header": {
        "app_id": `${this.APPID}`
      }, "parameter": {
        "chat": {
          "domain": "lite", "temperature": 0.5, "max_tokens": 1024
        }
      }, "payload": {
        "message": {
          "text": [{
            "role": "user", "content": `${iptText}`
          }]
        }
      }
    }
    console.log(JSON.stringify(params))
    this.ttsWS?.send(JSON.stringify(params));
  }
  closeWebSocket() {
    this.ttsWS?.close();
  }
  result(resultData: string) {
    let total_res = ''
    let jsonData = JSON.parse(resultData)
    total_res = total_res + resultData
    // console.log(resultData)
    // 提问失败
    if (jsonData.header.code !== 0) {
      alert(`提问失败: ${jsonData.header.code}:${jsonData.header.message}`)
      console.error(`${jsonData.header.code}:${jsonData.header.message}`)
      return
    }
    if (jsonData.header.code === 0 && jsonData.header.status === 2) {
      this.ttsWS?.close()
    }
    console.log(total_res)
  }
}

export default TTSRecorder;

import axios from "axios";

const instance = axios.create({
  baseURL: "spark-api",
  headers: {
    "Content-Type": "application/json",
    Authorization: "Bearer viSMGoufLRBfgvTzKrWS:jRGcrKPPguqZfgDPhZLp",
  },

  transformRequest: [
    function (data) {
      // console.log("transformRequest", data);
      return JSON.stringify(data);
    },
  ],
  responseType: "stream",
});

instance.interceptors.response.use(
  (response) => {
    console.log("response", response);
    return response;
  },
  (error) => {
    console.log("error", error);
    return Promise.reject(error);
  }
);

export { instance };