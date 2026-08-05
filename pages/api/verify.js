import members from '../../data/members.json';

export default function handler(req, res) {
  const { id } = req.query;

  if (!id) {
    return res.status(400).json({ error: 'ID is required' });
  }

  const cleanSearchID = id.toLowerCase().replace(/[^a-z0-9]/g, '');

  const member = members.find(m => 
    m.id.toLowerCase().replace(/[^a-z0-9]/g, '') === cleanSearchID
  );

  if (member) {
    return res.status(200).json({ found: true, member });
  } else {
    return res.status(200).json({ found: false });
  }
}
