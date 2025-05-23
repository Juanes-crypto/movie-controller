import { Controller, Get, Post, Put, Delete, Param, Body, Query } from '@nestjs/common';

@Controller('movies')
export class MoviesController {
  // Array para simular la base de datos de películas
  private movies = [
    { id: 1, title: 'Inception', year: 2010 },
    { id: 2, title: 'The Matrix', year: 1999 },
  ];
  @Get()//@Query('year') → Esto captura el año desde la URL, el ? indica que es opcional
findAll(@Query('year') year?: string) {//findAll su trabajo es devolver todas las pelis, a excepcion de si manda un año
  return year ? this.movies.filter(movie => movie.year.toString() === year) : this.movies;
}
//this.movies muestra todas las peliculas, filter busca las peliculas que coincidan al año
//obtener una pelicula por id
    @Get(':id')//capturo id desde la URL, busca una peli con ese id en el array
findOne(@Param('id') id: string) {//param (id) obtiene el id de la URL y se guarda en la variable id
  const movie = this.movies.find(m => m.id === parseInt(id));//find recorre el array, busca un objeto que coincida con paseint(id)
  //parseint convierte el id de la URL a numero, para que la comparacion sea estricta, si se encuentra la pelicula, se guarda en movie
  return movie || { message: `Pelicula con ID: ${id} no fue encontrada` };//si movie existe, devuelve movie (return movie)
  //si movie es undefined usa || (operador logico OR) para devolver el mensaje de error
}
//actualizar una pelicula
@Put(':id')
update(@Param('id') id: string, @Body() body: { title?: string; year?: number }) {
  const movie = this.movies.find(m => m.id === parseInt(id));
  if (!movie) return { message: `Pelicula con ID: ${id} no fue encontrada` };

  Object.assign(movie, body);
  return movie;
}

//eliminar una pelicula

@Delete(':id')
remove(@Param('id') id: string) {
  const index = this.movies.findIndex(m => m.id === parseInt(id));
  if (index === -1) return { message: `Pelicula con ID: ${id} no fue encontrada` };

  this.movies.splice(index, 1);
  return { message: `Pelicula con ID: ${id} no fue encontrada` };
}

@Post()
  create(@Body()  body: {title: string; year: number } ) {
    const newMovie = { id: this.movies.length + 1, ...body};
    this.movies.push(newMovie);
    return newMovie;
  }




  // TODO: Implementar los métodos según las indicaciones
}