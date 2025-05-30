// public/js/catalogo.js
document.addEventListener('DOMContentLoaded', () => {
  const tabla = document.getElementById('tabla-productos');

  fetch('/api/productos')
    .then(res => res.json())
    .then(productos => {
      tabla.innerHTML = '';
      productos.forEach(p => {
        const fila = document.createElement('tr');
        fila.innerHTML = `
          <td>${p.nombre}</td>
          <td>${p.autor}</td>
          <td>$${p.precio}</td>
          <td>
            <a href="/productos/editar/${p.id}" class="button edit">Editar</a>
            <button data-id="${p.id}" class="button delete">Eliminar</button>
          </td>
        `;
        tabla.appendChild(fila);
      });

      tabla.addEventListener('click', async (e) => {
        if (e.target.classList.contains('delete')) {
          const id = e.target.dataset.id;
          if (confirm('¿Seguro que querés eliminar este producto?')) {
            await fetch(`/api/productos/${id}`, { method: 'DELETE' });
            location.reload();
          }
        }
      });
    })
    .catch(error => {
      tabla.innerHTML = '<tr><td colspan="4">Error al cargar productos</td></tr>';
      console.error(error);
    });
});