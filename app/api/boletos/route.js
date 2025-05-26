import axios from 'axios';

export async function GET() {
  try {
    const response = await axios.get('http://localhost:5000/api/boletos'); // Verifique se o URL está correto
    return new Response(JSON.stringify(response.data), {
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}

export async function POST(request) {
  const data = await request.json();
  try {
    const response = await axios.post('http://localhost:5000/api/boletos', data);
    return new Response(JSON.stringify(response.data), {
      status: 201,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), {
      status: 400,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}

export async function PUT(request) {
  const { id } = request.nextUrl.searchParams;
  const data = await request.json();
  try {
    const response = await axios.put(`http://localhost:5000/api/boletos/${id}`, data);
    return new Response(JSON.stringify(response.data), {
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), {
      status: 400,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}

export async function DELETE(request) {
  const { id } = request.nextUrl.searchParams;
  try {
    await axios.delete(`http://localhost:5000/api/boletos/${id}`);
    return new Response(null, { status: 204 });
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}
