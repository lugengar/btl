<?php
// Cargar el archivo JSON con los datos
$jsonFile = '../JSON/super.json';
$data = json_decode(file_get_contents($jsonFile), true);

// Función para actualizar el archivo JSON
function updateJson($data, $jsonFile) {
    file_put_contents($jsonFile, json_encode($data, JSON_PRETTY_PRINT));
}

// Funciones CRUD
if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    // Agregar o actualizar elementos del carrusel
    if (isset($_POST['add_image'])) {
        $newImage = [
            'titulo' => $_POST['titulo'],
            'texto' => $_POST['texto'],
            'imagen' => $_POST['imagen'],
            'posicionimagen' => $_POST['posicionimagen']
        ];
        $data['carrusel']['imagenes'][] = $newImage;
        updateJson($data, $jsonFile);
    }

    if (isset($_POST['edit_image'])) {
        $index = $_POST['index'];
        $data['carrusel']['imagenes'][$index] = [
            'titulo' => $_POST['titulo'],
            'texto' => $_POST['texto'],
            'imagen' => $_POST['imagen'],
            'posicionimagen' => $_POST['posicionimagen']
        ];
        updateJson($data, $jsonFile);
    }

    if (isset($_POST['delete_image'])) {
        $index = $_POST['index'];
        array_splice($data['carrusel']['imagenes'], $index, 1);
        updateJson($data, $jsonFile);
    }

    // Actualizar URL del video
    if (isset($_POST['update_video'])) {
        $data['video']['url'] = $_POST['video_url'];
        updateJson($data, $jsonFile);
    }

    // Agregar, editar o eliminar productos
    if (isset($_POST['add_producto'])) {
        $newProducto = [
            'titulo' => $_POST['producto_titulo'],
            'texto' => $_POST['producto_texto'],
            'imagen' => $_POST['producto_imagen'],
            'marca' => $_POST['producto_marca'],
            'posicionimagen' => $_POST['producto_posicion']
        ];
        $data['productos']['imagenes'][] = $newProducto;
        updateJson($data, $jsonFile);
    }

    if (isset($_POST['edit_producto'])) {
        $index = $_POST['index'];
        $data['productos']['imagenes'][$index] = [
            'titulo' => $_POST['titulo'],
            'texto' => $_POST['texto'],
            'imagen' => $_POST['imagen'],
            'marca' => $_POST['marca'],
            'posicionimagen' => $_POST['posicionimagen']
        ];
        updateJson($data, $jsonFile);
    }

    if (isset($_POST['delete_producto'])) {
        $index = $_POST['index'];
        array_splice($data['productos']['imagenes'], $index, 1);
        updateJson($data, $jsonFile);
    }

    // Agregar, editar o eliminar servicios
    if (isset($_POST['add_servicio'])) {
        $newServicio = [
            'titulo' => $_POST['servicio_titulo'],
            'texto' => $_POST['servicio_texto'],
            'imagen' => $_POST['servicio_imagen'],
            'posicionimagen' => $_POST['servicio_posicion']
        ];
        $data['servicios']['imagenes'][] = $newServicio;
        updateJson($data, $jsonFile);
    }

    if (isset($_POST['edit_servicio'])) {
        $index = $_POST['index'];
        $data['servicios']['imagenes'][$index] = [
            'titulo' => $_POST['titulo'],
            'texto' => $_POST['texto'],
            'imagen' => $_POST['imagen'],
            'posicionimagen' => $_POST['posicionimagen']
        ];
        updateJson($data, $jsonFile);
    }

    if (isset($_POST['delete_servicio'])) {
        $index = $_POST['index'];
        array_splice($data['servicios']['imagenes'], $index, 1);
        updateJson($data, $jsonFile);
    }

    // Agregar, editar o eliminar marcas
    if (isset($_POST['add_marca'])) {
        $newMarca = [
            'nombre' => $_POST['marca_nombre'],
            'image' => $_POST['marca_imagen'],
            'tamañoespecial' => $_POST['marca_tamaño']
        ];
        $data['marcas']['imagenes'][] = $newMarca;
        updateJson($data, $jsonFile);
    }

    if (isset($_POST['edit_marca'])) {
        $index = $_POST['index'];
        $data['marcas']['imagenes'][$index] = [
            'nombre' => $_POST['nombre'],
            'image' => $_POST['image'],
            'tamañoespecial' => $_POST['tamañoespecial']
        ];
        updateJson($data, $jsonFile);
    }

    if (isset($_POST['delete_marca'])) {
        $index = $_POST['index'];
        array_splice($data['marcas']['imagenes'], $index, 1);
        updateJson($data, $jsonFile);
    }

    // Agregar, editar o eliminar redes sociales
    if (isset($_POST['add_red'])) {
        $newRed = [
            'image' => $_POST['red_imagen'],
            'url' => $_POST['red_url']
        ];
        $data['redes']['imagenes'][] = $newRed;
        updateJson($data, $jsonFile);
    }

    if (isset($_POST['edit_red'])) {
        $index = $_POST['index'];
        $data['redes']['imagenes'][$index] = [
            'image' => $_POST['image'],
            'url' => $_POST['url']
        ];
        updateJson($data, $jsonFile);
    }

    if (isset($_POST['delete_red'])) {
        $index = $_POST['index'];
        array_splice($data['redes']['imagenes'], $index, 1);
        updateJson($data, $jsonFile);
    }
}
?>

<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <title>Panel de Administración</title>
    <link rel="stylesheet" href="styles.css">
</head>
<body>
    <div class="container">
        <h1>Panel de Administración</h1>

        <!-- Formulario para agregar una nueva imagen al carrusel -->
        <h2>Agregar Imagen al Carrusel</h2>
        <form method="POST">
            <label>Título: <input type="text" name="titulo" required></label><br>
            <label>Texto: <input type="text" name="texto" required></label><br>
            <label>Imagen: <input type="text" name="imagen" required></label><br>
            <label>Posición: <input type="text" name="posicionimagen" required></label><br>
            <button type="submit" name="add_image">Agregar Imagen</button>
        </form>

        <h2>Imágenes del Carrusel</h2>
        <ul>
            <?php foreach ($data['carrusel']['imagenes'] as $index => $image): ?>
                <details>
                    <summary>Imagen <?php echo $index + 1; ?></summary>
                    <p><strong>Imagen: </strong><?php echo $image['imagen']; ?></p>
                    <p><strong>Título: </strong><?php echo $image['titulo']; ?></p>
                    <p><strong>Texto: </strong><?php echo $image['texto']; ?></p>
                    <p><strong>Posición: </strong><?php echo $image['posicionimagen']; ?></p>
                    <form method="POST" style="display:inline;">
                        <input type="hidden" name="index" value="<?php echo $index; ?>">
                        <button type="submit" name="delete_image">Eliminar</button>
                    </form>
                    <form method="POST" style="display:inline;">
                        <input type="hidden" name="index" value="<?php echo $index; ?>">
                        <input type="text" name="titulo" value="<?php echo $image['titulo']; ?>">
                        <input type="text" name="texto" value="<?php echo $image['texto']; ?>">
                        <input type="text" name="imagen" value="<?php echo $image['imagen']; ?>">
                        <input type="text" name="posicionimagen" value="<?php echo $image['posicionimagen']; ?>">
                        <button type="submit" name="edit_image">Editar</button>
                    </form>
                </details>
            <?php endforeach; ?>
        </ul>

        <!-- Formulario para actualizar la URL del video -->
        <h2>Actualizar URL del Video</h2>
        <form method="POST">
            <label>URL del Video: <input type="text" name="video_url" value="<?php echo $data['video']['url']; ?>" required></label><br>
            <button type="submit" name="update_video">Actualizar URL</button>
        </form>

        <!-- Sección de Productos -->
        <h2>Agregar Producto</h2>
        <form method="POST">
            <label>Título: <input type="text" name="producto_titulo" required></label><br>
            <label>Texto: <input type="text" name="producto_texto" required></label><br>
            <label>Imagen: <input type="text" name="producto_imagen" required></label><br>
            <label>Marca: <input type="text" name="producto_marca" required></label><br>
            <label>Posición: <input type="text" name="producto_posicion" required></label><br>
            <button type="submit" name="add_producto">Agregar Producto</button>
        </form>

        <h2>Lista de Productos</h2>
        <ul>
            <?php foreach ($data['productos']['imagenes'] as $index => $producto): ?>
                <details>
                    <summary>Producto <?php echo $index + 1; ?></summary>
                    <p><strong>Imagen: </strong><?php echo $producto['imagen']; ?></p>
                    <p><strong>Título: </strong><?php echo $producto['titulo']; ?></p>
                    <p><strong>Texto: </strong><?php echo $producto['texto']; ?></p>
                    <p><strong>Marca: </strong><?php echo $producto['marca']; ?></p>
                    <form method="POST" style="display:inline;">
                        <input type="hidden" name="index" value="<?php echo $index; ?>">
                        <button type="submit" name="delete_producto">Eliminar</button>
                    </form>
                    <form method="POST" style="display:inline;">
                        <input type="hidden" name="index" value="<?php echo $index; ?>">
                        <input type="text" name="titulo" value="<?php echo $producto['titulo']; ?>">
                        <input type="text" name="texto" value="<?php echo $producto['texto']; ?>">
                        <input type="text" name="imagen" value="<?php echo $producto['imagen']; ?>">
                        <input type="text" name="marca" value="<?php echo $producto['marca']; ?>">
                        <input type="text" name="posicionimagen" value="<?php echo $producto['posicionimagen']; ?>">
                        <button type="submit" name="edit_producto">Editar</button>
                    </form>
                </details>
            <?php endforeach; ?>
        </ul>

        <!-- Sección de Servicios -->
        <h2>Agregar Servicio</h2>
        <form method="POST">
            <label>Título: <input type="text" name="servicio_titulo" required></label><br>
            <label>Texto: <input type="text" name="servicio_texto" required></label><br>
            <label>Imagen: <input type="text" name="servicio_imagen" required></label><br>
            <label>Posición: <input type="text" name="servicio_posicion" required></label><br>
            <button type="submit" name="add_servicio">Agregar Servicio</button>
        </form>

        <h2>Lista de Servicios</h2>
        <ul>
            <?php foreach ($data['servicios']['imagenes'] as $index => $servicio): ?>
                <details>
                    <summary>Servicio <?php echo $index + 1; ?></summary>
                    <p><strong>Imagen: </strong><?php echo $servicio['imagen']; ?></p>
                    <p><strong>Título: </strong><?php echo $servicio['titulo']; ?></p>
                    <p><strong>Texto: </strong><?php echo $servicio['texto']; ?></p>
                    <form method="POST" style="display:inline;">
                        <input type="hidden" name="index" value="<?php echo $index; ?>">
                        <button type="submit" name="delete_servicio">Eliminar</button>
                    </form>
                    <form method="POST" style="display:inline;">
                        <input type="hidden" name="index" value="<?php echo $index; ?>">
                        <input type="text" name="titulo" value="<?php echo $servicio['titulo']; ?>">
                        <input type="text" name="texto" value="<?php echo $servicio['texto']; ?>">
                        <input type="text" name="imagen" value="<?php echo $servicio['imagen']; ?>">
                        <input type="text" name="posicionimagen" value="<?php echo $servicio['posicionimagen']; ?>">
                        <button type="submit" name="edit_servicio">Editar</button>
                    </form>
                </details>
            <?php endforeach; ?>
        </ul>

        <!-- Sección de Marcas -->
        <h2>Agregar Marca</h2>
        <form method="POST">
            <label>Nombre: <input type="text" name="marca_nombre" required></label><br>
            <label>Imagen: <input type="text" name="marca_imagen" required></label><br>
            <label>Tamaño Especial: <input type="text" name="marca_tamaño" required></label><br>
            <button type="submit" name="add_marca">Agregar Marca</button>
        </form>

        <h2>Lista de Marcas</h2>
        <ul>
            <?php foreach ($data['marcas']['imagenes'] as $index => $marca): ?>
                <details>
                    <summary>Marca <?php echo $index + 1; ?></summary>
                    <p><strong>Nombre: </strong><?php echo $marca['nombre']; ?></p>
                    <p><strong>Imagen: </strong><?php echo $marca['image']; ?></p>
                    <p><strong>Tamaño Especial: </strong><?php echo $marca['tamañoespecial']; ?></p>
                    <form method="POST" style="display:inline;">
                        <input type="hidden" name="index" value="<?php echo $index; ?>">
                        <button type="submit" name="delete_marca">Eliminar</button>
                    </form>
                    <form method="POST" style="display:inline;">
                        <input type="hidden" name="index" value="<?php echo $index; ?>">
                        <input type="text" name="nombre" value="<?php echo $marca['nombre']; ?>">
                        <input type="text" name="image" value="<?php echo $marca['image']; ?>">
                        <input type="text" name="tamañoespecial" value="<?php echo $marca['tamañoespecial']; ?>">
                        <button type="submit" name="edit_marca">Editar</button>
                    </form>
                </details>
            <?php endforeach; ?>
        </ul>

        <!-- Sección de Redes Sociales -->
        <h2>Agregar Red Social</h2>
        <form method="POST">
            <label>Imagen: <input type="text" name="red_imagen" required></label><br>
            <label>URL: <input type="text" name="red_url" required></label><br>
            <button type="submit" name="add_red">Agregar Red Social</button>
        </form>

        <h2>Lista de Redes Sociales</h2>
        <ul>
            <?php foreach ($data['redes']['imagenes'] as $index => $red): ?>
                <details>
                    <summary>Red <?php echo $index + 1; ?></summary>
                    <p><strong>Imagen: </strong><?php echo $red['image']; ?></p>
                    <p><strong>URL: </strong><?php echo $red['url']; ?></p>
                    <form method="POST" style="display:inline;">
                        <input type="hidden" name="index" value="<?php echo $index; ?>">
                        <button type="submit" name="delete_red">Eliminar</button>
                    </form>
                    <form method="POST" style="display:inline;">
                        <input type="hidden" name="index" value="<?php echo $index; ?>">
                        <input type="text" name="image" value="<?php echo $red['image']; ?>">
                        <input type="text" name="url" value="<?php echo $red['url']; ?>">
                        <button type="submit" name="edit_red">Editar</button>
                    </form>
                </details>
            <?php endforeach; ?>
        </ul>
    </div>
</body>
</html>
