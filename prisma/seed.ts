import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

async function main() {
  await prisma.producto.createMany({
    data: [
      { nombre: "Excavadora CAT 320", categoria: "Maquinaria pesada", precio: 250000 },
      { nombre: "Martillo hidráulico", categoria: "Accesorios", precio: 5000 },
      { nombre: "Camión volquete", categoria: "Transporte", precio: 80000 },
      { nombre: "Trituradora de piedra", categoria: "Construcción", precio: 120000 }
    ]
  });
}

main()
  .then(() => {
    console.log("Datos insertados");
    prisma.$disconnect();
  })
  .catch((e) => {
    console.error(e);
    prisma.$disconnect();
  });
