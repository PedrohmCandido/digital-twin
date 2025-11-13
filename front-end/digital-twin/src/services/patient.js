export async function getPatient() {
    const res = await fetch("http://localhost:5000/patients", {
        method: "GET",
        headers: { "Content-Type": "application/json" },
    });
    if (!res.ok) {
        const text = await res.text().catch(() => "");
        throw new Error(`API error GET /patients ${res.status} ${text}`);
    }
    return res.json();
}

export async function createPatient(data) {
    const res = await fetch("http://localhost:5000/patients", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
    });

    if (!res.ok) {
        const text = await res.text().catch(() => "");
        throw new Error(`Erro ao criar paciente: ${res.status} ${text}`);
    }
    return await res.json();
}

export async function updatePatient(id, data) {
    const res = await fetch(`http://localhost:5000/patients/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
    });
    if (!res.ok) {
        const text = await res.text().catch(() => "");
        throw new Error(`API error PUT /patients/${id} ${res.status} ${text}`);
    }
    return res.json();
}
