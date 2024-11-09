const socket = io();
socket.on('actualizacionProductos', (data) => {
  if (data.action === 'add') {
    console.log('Producto añadido:', data.product);
  } else if (data.action === 'delete') {
    console.log('Producto eliminado con ID:', data.productId);
  }
});
