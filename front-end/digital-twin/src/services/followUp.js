export async function getFollowUp() {
    const res = await fetch('http://localhost:5000/follow-up',
        {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({}),
        }
    );
    if (!res.ok) throw new Error('AI API error');
    return res.json();
}

export async function createFollowUp(data) {
    const res = await fetch('http://localhost:5000/follow-up',
        {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data),
        }
    );
    if (!res.ok) throw new Error('AI API error');
    return res.json();
}

export async function updateFollowUp(id, data) {
    const res = await fetch(`http://localhost:5000/follow-up/${id}`,
        {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data),
        }
    );
    if (!res.ok) throw new Error('AI API error');
    return res.json();
}