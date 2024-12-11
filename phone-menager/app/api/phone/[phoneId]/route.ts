import { NextRequest, NextResponse } from 'next/server';
import prismadb from '@/lib/prismadb';

// Função para validar o ID do celular
const validatePhoneId = (id: string | null) => {
  if (!id || isNaN(Number(id))) {
    return { isValid: false, error: 'ID inválido' };
  }
  return { isValid: true };
};

export async function GET(req: NextRequest) {
  const phoneId = req.nextUrl.searchParams.get('id') || null;
  const validation = validatePhoneId(phoneId);

  if (!validation.isValid) {
    return NextResponse.json({ error: validation.error }, { status: 400 });
  }

  try {
    const phone = await prismadb.phone.findUnique({
      where: { id: Number(phoneId) },
    });

    if (!phone) {
      return NextResponse.json(
        { error: 'Celular não encontrado' },
        { status: 404 },
      );
    }

    return NextResponse.json(phone, { status: 200 });
  } catch (error) {
    console.error('Erro ao buscar celular:', error);
    return NextResponse.json(
      { error: 'Erro ao buscar celular' },
      { status: 500 },
    );
  }
}

export async function DELETE(req: NextRequest) {
  const phoneId = req.nextUrl.pathname.split('/').pop() || null; // Garantindo que seja string ou null
  const validation = validatePhoneId(phoneId);

  if (!validation.isValid) {
    return NextResponse.json({ error: validation.error }, { status: 400 });
  }

  try {
    const phone = await prismadb.phone.delete({
      where: { id: Number(phoneId) },
    });

    return NextResponse.json(
      { message: 'Celular deletado com sucesso', phone },
      { status: 200 },
    );
  } catch (error) {
    console.error('Erro ao deletar celular:', error);
    return NextResponse.json(
      { error: 'Erro ao deletar celular' },
      { status: 500 },
    );
  }
}

export async function PUT(
  req: NextRequest,
  { params }: { params: { phoneId: string } },
) {
  // Validação do phoneId antes de usá-lo
  const phoneId = params?.phoneId ? Number(params.phoneId) : null;

  if (!phoneId || isNaN(phoneId)) {
    return NextResponse.json({ error: 'ID inválido' }, { status: 400 });
  }

  const { model, brand, price, date, endDate, color, code } = await req.json();

  // Validação dos campos recebidos
  if (
    !model ||
    !brand ||
    !price ||
    !date ||
    !endDate ||
    !color ||
    !code ||
    isNaN(Number(price))
  ) {
    return NextResponse.json(
      { error: 'Campos obrigatórios ausentes ou inválidos' },
      { status: 400 },
    );
  }

  try {
    // Atualização do celular no banco de dados
    const phone = await prismadb.phone.update({
      where: { id: phoneId },
      data: {
        model,
        brand,
        price: Number(price),
        startDate: new Date(date),
        endDate: new Date(endDate),
        color,
        code,
      },
    });

    return NextResponse.json(phone, { status: 200 });
  } catch (error) {
    console.error('Erro ao editar celular:', error);
    return NextResponse.json(
      { error: 'Erro ao editar celular' },
      { status: 500 },
    );
  }
}
