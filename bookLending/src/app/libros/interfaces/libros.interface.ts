export interface Libros {
    id?:          string;
    titulo:      string;
    Autor:       string;
    Categoria?:   string;
    Anio?:         number;
    Idioma:      Idioma;
    paginas?:     number;
    Resenia:      string;
    alt_img?:     string;
}

export enum Idioma {
    Castellano = "Castellano",
    Español = "Español",
}
