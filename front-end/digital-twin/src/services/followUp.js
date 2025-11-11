export async function getFollowUp() {
    const res = await fetch('http://localhost:5000/follow-up',
        {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({}),
        }
    );
    if (!res.ok) throw new Error('API error');
    return res.json();
}

export async function createFollowUp({ fk_user, name, email, phone, address, gender, birthdate, illnesses }) {
    const res = await fetch('http://localhost:5000/follow-up',
        {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({fk_user, name, email, phone, address, gender, birthdate, illnesses }),
        }
    );
    if (!res.ok) throw new Error('API error');
    return res.json();
}

export async function updateFollowUp(id, { name, email, phone, address, gender, birthdate, illnesses }) {
    const res = await fetch(`http://localhost:5000/follow-up/${id}`,
        {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ name, email, phone, address, gender, birth, illnesses }),
        }
    );
    if (!res.ok) throw new Error('API error');
    return res.json();
}