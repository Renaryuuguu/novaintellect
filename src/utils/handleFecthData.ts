function handleFetchData(value: Uint8Array) {
  const text = new TextDecoder().decode(value);
  let content = "";
  let role = "";
  let sid = "";
  let id = "";
  if (text.startsWith("data:")) {
    const json = JSON.parse(text.slice(5)) as ISparkResponse;
    content = json.choices[0].delta.content || "";
    role = json.choices[0].delta.role;
    sid = json.sid;
    id = json.id;
  }
  return {
    content,
    role,
    sid,
    id,
  };
}

export default handleFetchData;
