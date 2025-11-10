export async function getPatient() {
    const res = await fetch('http://localhost:5000/patient',
        {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({}),
        }
    );
    if (!res.ok) throw new Error('AI API error');
    return res.json();
}

export async function createPatient(data) {
    const res = await fetch('http://localhost:5000/patient',
        {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data),
        }
    );
    if (!res.ok) throw new Error('AI API error');
    return res.json();
}

export async function updatePatient(id, data) {
    const res = await fetch(`http://localhost:5000/patient/${id}`,
        {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data),
        }
    );
    if (!res.ok) throw new Error('AI API error');
    return res.json();
}