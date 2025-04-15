const productos = [
  { id: 1, nombre: "Pelota de Goma", precio: 25000, categoria: "juguetes", imagen: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSKmhkIExVh71yBJ9sk70GL9HAtVMPS4jq3MQ&s" },
  { id: 2, nombre: "Croquetas Premium", precio: 45000, categoria: "comida", imagen: "https://kanu.pet/cdn/shop/files/ProductoenAccion_af30d658-6f04-4692-beaf-815c86365dbf.jpg?v=1736975411&width=1445" },
  { id: 3, nombre: "Impermeable", precio: 75000, categoria: "ropa", imagen: "https://wuftrek.com/cdn/shop/files/Impermeable-para-perros-HydroTrek-Mustard3-771422.jpg?v=1733940359&width=1500" },
  { id: 4, nombre: "Hueso Masticable", precio: 30000, categoria: "juguetes", imagen: "https://www.latiendadefrida.com/cdn/shop/files/DSC01293_1599x2000.jpg?v=1724441080" },
  { id: 5, nombre: "Galletas Caninas", precio: 20000, categoria: "comida", imagen: "https://www.piloncilloyvainilla.com/wp-content/uploads/2018/03/galletas-de-Miko-6-of-6.jpg" },
];

// Ahora el carrito será un array de objetos con id, nombre, precio, cantidad
let carrito = [];

function mostrarProductos(lista) {
  const contenedor = document.getElementById("productos");
  contenedor.innerHTML = "";
  lista.forEach(prod => {
    const div = document.createElement("div");
    div.classList.add("producto");
    div.innerHTML = `
      <img src="${prod.imagen}" alt="${prod.nombre}">
      <h3>${prod.nombre}</h3>
      <p>Precio: $${prod.precio}</p>
      <button onclick="agregarAlCarrito(${prod.id})">Agregar al carrito</button>
    `;
    contenedor.appendChild(div);
  });
}

function agregarAlCarrito(id) {
  const producto = productos.find(p => p.id === id);
  const existente = carrito.find(item => item.id === id);

  if (existente) {
    existente.cantidad += 1;
  } else {
    carrito.push({ ...producto, cantidad: 1 });
  }

  actualizarCarrito();
}

function actualizarCarrito() {
  const lista = document.getElementById("listaCarrito");
  const total = document.getElementById("total");
  lista.innerHTML = "";

  let totalPrecio = 0;

  carrito.forEach(item => {
    const subtotal = item.precio * item.cantidad;
    totalPrecio += subtotal;

    const li = document.createElement("li");
    li.textContent = `${item.nombre} x${item.cantidad} - $${subtotal}`;
    lista.appendChild(li);
  });

  total.textContent = `$${totalPrecio}`;
}

document.getElementById("vaciarCarrito").addEventListener("click", () => {
  carrito = [];
  actualizarCarrito();
  document.getElementById("pago").innerHTML = "";
});

document.getElementById("finalizarCompra").addEventListener("click", () => {
  if (carrito.length === 0) return alert("¡El carrito está vacío!");
  document.getElementById("pago").innerHTML = "<h3>¡Gracias por tu compra! 🐶</h3>";
  carrito = [];
  actualizarCarrito();
});

document.getElementById("filtroCategoria").addEventListener("change", (e) => {
  const categoria = e.target.value;
  if (categoria === "todos") {
    mostrarProductos(productos);
  } else {
    const filtrados = productos.filter(p => p.categoria === categoria);
    mostrarProductos(filtrados);
  }
});

mostrarProductos(productos);
