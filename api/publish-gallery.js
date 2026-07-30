export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

  const publishSecret = process.env.PUBLISH_SECRET || process.env.VITE_PUBLISH_SECRET;
  const githubToken = process.env.GITHUB_TOKEN || process.env.VITE_GITHUB_TOKEN;
  if (!publishSecret || !githubToken) {
    return res.status(500).json({ error: 'Server not configured' });
  }

  const incomingSecret = req.headers['x-publish-secret'];
  if (!incomingSecret || incomingSecret !== publishSecret) {
    return res.status(401).json({ error: 'Invalid publish secret' });
  }

  try {
    const body = await new Promise((resolve, reject) => {
      let data = '';
      req.on('data', (chunk) => { data += chunk; });
      req.on('end', () => resolve(data ? JSON.parse(data) : {}));
      req.on('error', reject);
    });

    const gallery = body.gallery;
    if (!Array.isArray(gallery)) return res.status(400).json({ error: 'Invalid gallery payload' });

    const owner = 'Zackconnect';
    const repo = 'RURAL-BLOOM-BANK-MAIN';
    const path = 'public/gallery.json';
    const branch = 'main';

    const apiBase = 'https://api.github.com';
    // Get existing file to obtain sha
    const getResp = await fetch(`${apiBase}/repos/${owner}/${repo}/contents/${encodeURIComponent(path)}?ref=${branch}`, {
      headers: { Authorization: `token ${githubToken}`, Accept: 'application/vnd.github.v3+json' },
    });

    let sha = null;
    if (getResp.ok) {
      const getData = await getResp.json();
      sha = getData.sha;
    }

    const contentStr = JSON.stringify(gallery, null, 2);
    const contentB64 = Buffer.from(contentStr).toString('base64');

    const putBody = {
      message: 'Publish gallery via admin UI',
      content: contentB64,
      branch,
    };
    if (sha) putBody.sha = sha;

    const putResp = await fetch(`${apiBase}/repos/${owner}/${repo}/contents/${encodeURIComponent(path)}`, {
      method: 'PUT',
      headers: { Authorization: `token ${githubToken}`, Accept: 'application/vnd.github.v3+json', 'Content-Type': 'application/json' },
      body: JSON.stringify(putBody),
    });

    if (!putResp.ok) {
      const err = await putResp.text();
      return res.status(500).json({ error: 'GitHub update failed', details: err });
    }

    const respData = await putResp.json();
    return res.status(200).json({ ok: true, content: respData.content, commit: respData.commit });
  } catch (err) {
    console.error('publish-gallery error', err);
    return res.status(500).json({ error: 'Internal server error' });
  }
}
