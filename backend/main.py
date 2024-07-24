from fastapi import FastAPI
import json
from fastapi.middleware.cors import CORSMiddleware
app = FastAPI()
ruta = r'books.json'

# Configurar CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"], 
    allow_credentials=True,
    allow_methods=["GET", "POST", "PUT", "DELETE"],
    allow_headers=["*"],
)
#Trae todo los libros
@app.get("/books-store-all")
def traer_libros():
    with open(ruta,'r+',encoding='ANSI') as file:
        libros = json.load(file)
        return libros

@app.get("/books-store")

#Trae los libros buscados por titulo, año y autor
def buscar_libro(title:str=None, year:str = None,author:str = None):
    if year == '': year = None
    if title == '': title = None
    if author == '': author = None
    with open(ruta,'r+',encoding='ANSI') as file:
        data = json.load(file)

        libros = []
    
        for libro in data:
            if (year is None or libro.get('year') == int(year)) and \
                (title is None or libro.get('title') == title) and \
                (author is None or libro.get('author') == author):
                libros.append(libro)
    
        if not libros:
            return 'No hubo coincidencias'
    
        return libros

#Agrega un libro a la base de datos
@app.post("/books-store")
def agregar_libro(author:str,country:str,imageLink:str,language:str,link:str,pages:str,title:str,year:str ):

    libro = buscar_libro(title, year)
    if type(libro) != list:
        nuevo_libro = {
            'author': author,
            'country': country,
            'imageLink': imageLink,
            'language': language,
            'link': link,
            'pages': int(pages),
            'title' : title,
            'year' : int(year)
            }
        with open(ruta,'r+', encoding='ANSI') as file:
            data = json.load(file)
            file.seek(0)
            
            nueva_data = data + [nuevo_libro]
            json.dump(nueva_data, file,indent=1, ensure_ascii=False)
            file.truncate()
        file.close()
        return('libro agregado')
    else:
        return('Ya existe la libro')    

#Busca un libro por su titulo y año de creacion y actualiza sus variables
@app.put("/books-store")
def actualizar_libro( title:str,year:str,author:str,country:str,imageLink:str,language:str,link:str,pages:str,new_title:str,new_year:str):
    if new_year != '': new_year = int(new_year)
    if pages != '': pages =int(pages)
    variables_actualizar =  {
            'author': author,
            'country': country,
            'imageLink': imageLink,
            'language': language,
            'link': link,
            'pages': pages,
            'title' : new_title,
            'year' : new_year
            }
    #Usamos la funcion buscar_libro para ver si existe el libro
    libro_actualizar = buscar_libro(title, year)
    if libro_actualizar != str:
        #Si no es un str, entonces existe el libro, por lo que realizamos la actualización de las variables.
        with open(ruta,'r+', encoding='ANSI') as file:

            data = json.load(file)

            for libro in data:
                if libro['title'] == title and libro['year'] == int(year):
                    for title_variable, valor_variable in variables_actualizar.items():

                        #si la variable tiene un valor para actualizar la actualiza
                        if valor_variable != '':
                            libro[title_variable] = valor_variable
                              
                    file.seek(0)
                    json.dump(data, file, indent=1, ensure_ascii=False)
                    
                    file.truncate()
                    
        file.close()
        return 'variable actualizada'
    else:
        return 'libro no encontrada'

        
#Busca y elimina un libro 
@app.delete("/books-store")
def borrar_libro(title:str,year:str,author:str):
    with open(ruta, 'r+', encoding='ANSI') as file:
        data = json.load(file)
        for libro in data:
            if libro['title'] == title and libro['year'] == int(year) and libro['author'] == author:
                data.remove(libro)
                with open(ruta, 'w', encoding='ANSI') as file:
                    json.dump(data, file, indent=1, ensure_ascii=False)
                    file.close()
                return 'libro borrado'
        return 'No se encontro el libro'