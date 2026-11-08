export async function onRequestPost({ request, env }) {
  const headers = {
    "Content-Type": "application/json; charset=utf-8",
    "Cache-Control": "no-store"
  };

  if (!env.NOTE_ANSWER) {
    return new Response(JSON.stringify({ message: "验证暂未启用。" }), {
      status: 503,
      headers
    });
  }

  let submitted;
  try {
    const body = await request.json();
    submitted = typeof body.answer === "string" ? body.answer.trim() : "";
  } catch {
    return new Response(JSON.stringify({ message: "请填写答案。" }), {
      status: 400,
      headers
    });
  }

  if (submitted !== env.NOTE_ANSWER) {
    return new Response(JSON.stringify({ correct: false }), { status: 200, headers });
  }

  return new Response(JSON.stringify({ correct: true, contact: "QQ:2647147262" }), {
    status: 200,
    headers
  });
}
