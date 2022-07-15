class Usuario {
  constructor(nombre, apellido, libros = [], mascotas = []) {
    this.nombre = nombre;
    this.apellido = apellido;
    this.libros = libros;
    this.mascotas = mascotas;
  }

  listaNombreLibros = [];
  listaAutorLibros = [];

  getFullName() {
    return console.log(`Mi nombre completo es ${this.nombre} ${this.apellido}`);
  }

  addMascotas(newMascota) {
    this.mascotas.push(newMascota);
  }

  getMascotas() {
    return console.log(this.mascotas);
  }

  countMascotas() {
    return console.log(this.mascotas.length);
  }

  addBook(libro) {
    this.libros.push(libro);
  }

  getBookNames() {
    for (let libro of this.libros) {
      this.listaNombreLibros.push(libro.nombre);
    }
    console.log(this.listaNombreLibros);
  }

  getBookAutor() {
    for (let libro of this.libros) {
      this.listaAutorLibros.push(libro.autor);
    }
    console.log(this.listaAutorLibros);
  }
}

const newUser = new Usuario(
  "Ivo",
  "Huaynates",
  [
    { nombre: "El señor de las moscas", autor: "William Golding" },
    { nombre: "Fundacion", autor: "Isaac Asimov" },
    { nombre: "libro3", autor: "autor3" },
  ],
  ["perro", "gato"]
);

newUser.getFullName();
newUser.addMascotas("conejo");
newUser.getMascotas();
newUser.countMascotas();
newUser.addBook({ nombre: "libro agregado", autor: "autor agregado" });
newUser.getBookNames();
newUser.getBookAutor();
