const { error } = require("console");
const fs = require("fs");

class Contenedor {
  constructor(nombreArchivo) {
    this.nombreArchivo = "./archivos/" + nombreArchivo + ".json";
  }

  async getData(objeto) {
    try {
      return await fs.promises.readFile(this.nombreArchivo, "utf-8");
    } catch (e) {
      if (e.code == "ENOENT") {
        fs.writeFile(this.nombreArchivo, "[]", (error) => {
          if (error) {
            console.log("El archivo no pudo ser creado");
          }
        });
      }
    }
  }

  async save(objeto) {
    try {
      let arreglo = [];
      let contenidoDeArchivo = await this.getData();

      if (!contenidoDeArchivo) {
        objeto.id = 1;
        arreglo = [{ ...objeto }];
        await fs.promises.writeFile(
          this.nombreArchivo,
          JSON.stringify(arreglo)
        );
        return arreglo[0].id;
      }

      let contenidoEnJson = JSON.parse(contenidoDeArchivo);
      const indice = contenidoEnJson.map((x) => x.id).sort();

      if (indice.length == 0) {
        objeto.id = 1;
      } else {
        objeto.id = indice[indice.length - 1] + 1;
      }

      contenidoEnJson.push(objeto);

      await fs.promises.writeFile(
        this.nombreArchivo,
        JSON.stringify(contenidoEnJson)
      );
    } catch (e) {
      console.log("Fallo el save en el archivo");
    }
  }

  async getById(productFind) {
    try {
      let contenidoDeArchivo = await this.getData();

      let contenidoEnJson = JSON.parse(contenidoDeArchivo);

      let productById = contenidoEnJson.filter(({ id }) => id === productFind);

      if (productById.length == 0) {
        console.log("No se encontró el ID producto");
      } else {
        console.log(productById);
      }
    } catch (e) {
      console.log("ID no encontrado en el archivo");
    }
  }

  async getAll() {
    try {
      let contenidoDeArchivo = await this.getData();

      let contenidoEnJson = JSON.parse(contenidoDeArchivo);

      console.log(contenidoEnJson);
    } catch (e) {
      console.log("No existen productos");
    }
  }

  async deleteById(productDelete) {
    try {
      let contenidoDeArchivo = await this.getData();

      if (!contenidoDeArchivo) {
        console.log("No exista data para borrar");
        return 0;
      }

      let contenidoEnJson = JSON.parse(contenidoDeArchivo);

      let encontrar = contenidoEnJson.filter(({ id }) => id === productDelete);
      if (encontrar.length == 0) {
        console.log("No se encontró el ID del producto");
        return 0;
      }

      let productosDeleteId = contenidoEnJson.filter(
        (prod) => prod.id !== productDelete
      );

      await fs.promises.writeFile(
        this.nombreArchivo,
        JSON.stringify(productosDeleteId)
      );
    } catch (e) {
      console.log("Fallo el deleteById en el archivo");
    }
  }

  async deleteAll() {
    try {
      await fs.promises.writeFile(this.nombreArchivo, "");
    } catch (e) {
      console.log("Fallo deleteAll en el archivo");
    }
  }
}

const producto1 = {
  nombre: "Cuaderno",
  categoria: "Articulo de Escritorio",
  precio: "123",
};

const producto2 = {
  nombre: "Folder",
  categoria: "Articulo de Escritorio",
  precio: "100",
};

const producto3 = {
  nombre: "Detergente",
  categoria: "Articulo de Limpieza",
  precio: "20",
};

const contenedorProductos = new Contenedor("archivoproductos");

// Descomentar la funcion que desea validar
//contenedorProductos.save(producto1);
//contenedorProductos.getById(3);
//contenedorProductos.getAll();
//contenedorProductos.deleteById(1);
//contenedorProductos.deleteAll();
