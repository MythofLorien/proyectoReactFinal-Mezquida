Se usa la libreria npm de GH Pages. Pero para evitar problemas con el routeado de url las modificaciones que se realicen en el proyecto para ser reflejadas en el GH Page deberán ser las siguientes:<br>
1- npm run build<br>
2- npm run deploy<br>
Con los puntos 1 y 2 la pagina se debería cargar   después de unos pocos minutos, pero solo se puede navegar por la pagina entrando a la url principal _"https://mythoflorien.github.io/proyectoReactFinal-Mezquida/"_, pero si
por ejemplo se deseara ir diractemente a la url _"https://mythoflorien.github.io/proyectoReactFinal-Mezquida/about"_, se conseguiría un error 404. Para ello la solución es sencilla:<br>
3- en la carpeta dist donde se haya lo que se va a deployear al GH page, copiar el index.html y a la copia renombrarla como 404.html.
Con esos 3 pasos debería andar de igual manera que deployeando de manera local.


Componentes del proyecto:

- CartBuy
- CartItem
- CartItemContainer
- CartWidget
- Footer
- Item
- Item Detail
- ItemListContainer
- NavBar
- Product

Tecnologias usadas:

- React.js + Vite
- Node.js
- Javascrip
- CSS
- Bootstrap
- Firebase
