import prismadb from '@/lib/prismadb';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest) {
  try {
    const phones = await prismadb.phone.findMany();
    return NextResponse.json(phones, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { error: 'Erro ao listar celulares' },
      { status: 500 },
    );
  }
}

export async function POST(req: NextRequest) {
  try {
    const { model, brand, price, date, endDate, color, code } =
      await req.json();

    if (!model || !brand || !price || !date || !endDate || !color || !code) {
      return NextResponse.json(
        { error: 'Todos os campos são obrigatórios' },
        { status: 400 },
      );
    }

    const priceNumber = parseFloat(price);
    if (isNaN(priceNumber)) {
      return NextResponse.json({ error: 'Preço inválido' }, { status: 400 });
    }

    const startDate = new Date(date);
    const endDateObj = new Date(endDate);

    if (isNaN(startDate.getTime()) || isNaN(endDateObj.getTime())) {
      return NextResponse.json({ error: 'Data inválida' }, { status: 400 });
    }

    const phone = await prismadb.phone.create({
      data: {
        model,
        brand,
        price: priceNumber,
        startDate,
        endDate: endDateObj,
        color,
        code,
      },
    });

    return NextResponse.json(phone, { status: 201 });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: 'Erro ao criar celular' },
      { status: 500 },
    );
  }
}
