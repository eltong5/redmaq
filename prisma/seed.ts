import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  await prisma.producto.deleteMany(); // 🔄 Limpia datos previos

  await prisma.producto.createMany({
    data: [
      {
        nombre: "Excavadora CAT 320",
        categoria: "Maquinaria pesada",
        precio: 250000,
        imagen: "/images/excavadora.jpg",
        descripcion:
          "Excavadora de alto rendimiento para obras de construcción con alta eficiencia y durabilidad.",
        especificaciones: JSON.stringify([
          "Motor CAT C7.1",
          "Peso 20.8 Ton",
          "Potencia 162 kW",
        ]),
      },
      {
        nombre: "Martillo hidráulico",
        categoria: "Accesorios",
        precio: 5000,
        imagen: "/images/martillo.jpg",
        descripcion:
          "Martillo diseñado para trabajos pesados en minería y construcción.",
        especificaciones: JSON.stringify([
          "Presión 180 bar",
          "Peso 350 kg",
        ]),
      },
      {
        nombre: "Camión volquete",
        categoria: "Transporte",
        precio: 80000,
        imagen: "/images/camion.jpg",
        descripcion: "Camión robusto ideal para transporte de materiales.",
        especificaciones: JSON.stringify([
          "Capacidad 18 m³",
          "Motor diésel",
          "Tracción 6x4",
        ]),
      },
      {
        nombre: "Trituradora de piedra",
        categoria: "Construcción",
        precio: 120000,
        imagen: "/images/trituradora.jpg",
        descripcion:
          "Trituradora potente para procesamiento de áridos y rocas de gran dureza.",
        especificaciones: JSON.stringify([
          "Producción 150 T/h",
          "Boca 900x600 mm",
        ]),
      },
    ],
  });

  console.log("✅ Datos insertados correctamente");
}

main()
  .catch((e) => {
    console.error("❌ Error al insertar datos:", e);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
