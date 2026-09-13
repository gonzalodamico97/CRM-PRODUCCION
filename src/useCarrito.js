import { useState, useEffect } from "react";

export function useCarrito() {
  const [carrito, setCarrito] = useState(() => {
    try {
      const guardado = localStorage.getItem("carritoLocal");
      return guardado ? JSON.parse(guardado) : [];
    } catch (e) {
      return [];
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem("carritoLocal", JSON.stringify(carrito));
    } catch (e) {
      console.error("Error guardando carrito:", e);
    }
  }, [carrito]);

  const agregarAlCarrito = (producto) => {
    setCarrito((prev) => {
      // EVALUACIÓN DE IGUALDAD ESTRICTA: Nombre + Tamaño + Gustos
      const index = prev.findIndex(
        (i) =>
          (i.n || "").toUpperCase() === (producto.n || "").toUpperCase() &&
          (i.tam || "").toUpperCase() === (producto.tam || "").toUpperCase() &&
          (i.gustos || "").toUpperCase() === (producto.gustos || "").toUpperCase()
      );

      if (index > -1) {
        // Si coinciden Nombre, Tamaño Y Gustos exactamente, incrementa la cantidad
        const nuevo = [...prev];
        nuevo[index] = {
          ...nuevo[index],
          cantidad: nuevo[index].cantidad + 1,
        };
        return nuevo;
      }

      // Si difiere en cualquiera de los parámetros (gustos o tamaño), crea una nueva línea
      return [
        ...prev,
        {
          ...producto,
          id: Date.now() + Math.random(),
          cantidad: 1,
        },
      ];
    });
  };

  const modificarCantidad = (id, delta) => {
    setCarrito((prev) =>
      prev
        .map((item) => {
          if (item.id === id) {
            const nuevaCant = item.cantidad + delta;
            return nuevaCant > 0 ? { ...item, cantidad: nuevaCant } : null;
          }
          return item;
        })
        .filter(Boolean)
    );
  };

  const eliminarDelCarrito = (id) => {
    setCarrito((prev) => prev.filter((item) => item.id !== id));
  };

  const limpiarCarrito = () => {
    setCarrito([]);
  };

  const montoTotal = carrito.reduce(
    (acc, item) => acc + (Number(item.p) || 0) * item.cantidad,
    0
  );

  return {
    carrito,
    agregarAlCarrito,
    modificarCantidad,
    eliminarDelCarrito,
    limpiarCarrito,
    montoTotal,
  };
}