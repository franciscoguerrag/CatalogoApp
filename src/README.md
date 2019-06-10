# CatalogoAngular

## Requerimientos

Utilizando sus conocimientos de Angular 6 o superior, desarrolle una pequeña aplicación que presente un catálogo de productos, el cual se obtiene de una API, y brinde la opción de radicar un pedido de un producto a través de un formulario, y persista los datos del pedido localmente, de modo que se puedan consultar los pedidos generados y filtrarlos por ID.

Condiciones:
•	Ruta de la API (sólo tiene 5 productos, IDs del 1 al 5): 
https://fvwzxk56cg.execute-api.us-east-1.amazonaws.com/mock/productos
•	En el catálogo se deben mostrar las miniaturas y al hacer clic, debe mostrar la imagen grande
•	Debe permitir solicitar los productos que tienen cantidad disponible
•	El formulario del pedido debe solicitar:
o	Nombre
o	Fecha de nacimiento
o	Dirección de envío
o	Lista desplegable con la ciudad (los valores pueden estar “quemados”)
o	Solicitar la carga de un archivo que correspondería a la copia de la cédula (sólo exigir que sea PDF y pese menos de 1MB)
•	Los pedidos se deben almacenar localmente
•	Se debe generar un ID numérico por cada pedido generado
•	No es necesario descontar el inventario
•	La opción de visualización de los pedidos radicados debe hacerse mediante una tabla que permita editar los datos registrados y guardar los cambios, y filtrar por ID
•	Se deben incluir los popups con mensajes de éxito y error que considere pertinentes
•	Se debe hacer un buen manejo del “maquetado” utilizando CSS3 o SASS
•	Se debe entregar el repositorio de Github con el código del proyecto demostrando todas las buenas prácticas, y un buen README.md con la descripción del proyecto

