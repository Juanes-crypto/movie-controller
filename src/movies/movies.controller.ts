import { Controller, Get, Post, Put, Delete, Param, Body, Query } from '@nestjs/common';

@Controller('movies')
export class MoviesController {
  // Array para simular la base de datos de películas
  private movies = [
    { id: 1, title: 'Inception', year: 2010 },
    { id: 2, title: 'The Matrix', year: 1999 },
  ];
  @Get()
findAll(@Query('year') year?: string) {
  return year ? this.movies.filter(movie => movie.year.toString() === year) : this.movies;
}
//obtener una pelicula por id
    @Get(':id')//capturo id desde la URL
findOne(@Param('id') id: string) {
  const movie = this.movies.find(m => m.id === parseInt(id));
  return movie || { message: `Pelicula con ID: ${id} no fue encontrada` };
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
  create() {
    return { message: 'Product created' };
  }




  // TODO: Implementar los métodos según las indicaciones
}