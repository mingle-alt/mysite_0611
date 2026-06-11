export default async function handler(req, res) {
  try {
    const response = await fetch(
      "https://api.counterapi.dev/v1/ai-link-hub-mysite/visits/up"
    );
    if (!response.ok) throw new Error("counter api error");
    const data = await response.json();
    res.status(200).json({ count: data.count });
  } catch {
    res.status(500).json({ count: null });
  }
}
