# Seed It

La idea de este proyecto es tener una herramienta CLI para Node.js con la cual podamos hacer seeding de data auto generada para MongoDB.

1. Estaría bueno poder configurar la herramienta desde un archivo en la carpeta donde se está runeando la app.
2. Tendría que poder leer templates de la data hechos en JSON.
3. Me gustaría que puedas especificar cuantos documentos te gustaría que se generen a partir del template.
4. El comando básico para poder usar esta herramienta debería ser algo así como `seedit [connection string] [pathToTemplate] [amount]`
5. Me gustaría que pueda ser descargable desde npm para usarla como herramienta global o dentro del proyecto y además que haya una versión web donde puedas usar seed it desde un cliente.

## Instalación

Seed it debe de estar disponible para ser instalado de forma global o local usando npm:
`npm install --save-dev seedit` o `npm install -g seedit`

si se installa como dependencia de desarrollo es posible usar seed it con npx:
`npx seedit [required arguments]`

## Uso básico

Queremos que esta sea una herramienta ligera e intuitiva por lo cual por el momento no se contempla que tenga muchas funcionalidades por fuera de lo que promete: Dado un string de conexión, un template y una cantidad de documentos a generar, seed it va a hacer seeding en tu base de datos.

La forma más básica de utilizar el CLI es la siguiente:
`seedit [connection string] -p [path to template] -a [amount]`

Un ejemplo de esto sería:
`seedit 'mongodb://localhost:27017/TEST' -p './template.json' -a 255`

# CLI

| Opción       | Alias | Descripción                                                                                                            |
| ------------ | ----- | ---------------------------------------------------------------------------------------------------------------------- |
| --path       | -p    | Flag para especificar el path a un template                                                                            |
| --collection | -c    | El nombre de la colección, si no está especificada se usara el nombre del template                                     |
| --amount     | -a    | Permite especificar la cantidad de documentos que se desean generar                                                    |

Ejemplo:

```shell
seedit "mongodb://localhost:27017/TEST" -c Users -p './template.json' -a 2000

# Templates

La estructura de los templates debería ser la siguiente:

```json
{
	"campo 1": "tipo",
	"campo 2": "tipo",
	"campo 3": ["tipo"],
	"campo 4": {
		"atributo 1": "tipo",
		"atributo 2": "tipo",
		"atributo 3": "tipo"
	}
}
```

- Tiene que poder aceptar todos los [tipos de faker](https://fakerjs.dev/guide/).
- Se debe de verificar que los tipos de datos del template son correctos para asegurarse de que la data generada sea válida.

Estaría bueno poder indicar que datos son o no son requeridos, si son únicos y un porcentaje de la frecuencia en la que quieres que aparezcan los que no sean obligatorios; se podría declarar un objeto donde va el tipo del campo y que en lugar de tener propiedades de un objeto tenga definiciones para ese campo:

```json
{
	"firstName": { "type": "string", "required": true },
	"email": { "type": "string", "required": true, "unique": true }
}
```

Seed it debería de poder diferenciar entre una definición del dato como lo es la anterior a un objeto el cual tiene que mostrarse como tal; por ejemplo, si el usuario quiere generar dentro del template un objeto llamado address el cual tiene como atributos los datos de la dirección por separado como son el número de puerta o la calle seed it debería de reconocer esto como tal:

```json
{
	"firstName": { "type": "string", "required": true },
	"addres": {
		"AddressLine1": { "type": "string", "required": true },
		"AddressLine2": { "type": "string", "required": false, "frequency": 60 },
		"city": { "type": "string", "required": true },
		"state": { "type": "string", "required": true },
		"zip": "string",
		"country": { "type": "string", "required": true }
	}
}
```

# Configuración

Poder configurar la herramienta con un archivo .seeditrc o un seedit.config.json sería una de sus características más importantes; esto nos daría la capacidad de poder generar configuraciones específicas para cada proyecto que desarrollemos, pudiendo incluso facilitarnos su uso en los contenedores de Docker que usemos para ambientes de Dev, Test y Stage.

La idea es poder realizar las siguientes configuraciones:

1. La url a donde tengamos que hacer el seed
2. La configuración de las colecciones:
   - Un objeto conteniendo el nombre de la colección y el path del template en caso de ser una sola colección.
   - Un array de objetos como el anterior en caso de querer seedear más de una colección.
3. La cantidad de documentos a generar:
   - Si se define de forma global se debe verificar si hay más de una colección y si las hay dividir esta cantidad en partes iguales para cada coleccion
   - En caso de especificar esto dentro del objeto que define la coleccion:
     1. Si hay más de una colección definida, todas deben también estarlo a menos que el número de documentos global este definido
     2. Si solo una está definida, el número global de documentos debe de estarlo
     3. Si hay más de una colección definida, este valor no puede ser ni mayor ni igual al número global de documentos.
     4. Si hay más de una colección definida y todas tienen una cantidad definida de documentos, no se debe de especificar la cantidad total de documentos.
4. Plugins. _todavía no sé cómo, pero me encantaría que se pudieran agregar plugins y que la gente se cuelgue a hacer sus plugins customs jejeje_

Todas las opciones disponibles en el CLI deben de poder ser configuradas en este archivo.

```json
{
	"url": "mongodb://<user>:<password>@localgost:27017/",
	"collections": [
		{
			"name": "users",
			"template": "./path/to/template",
			"amount": 70
		},
		{
			"name": "activities",
			"template": "./path/to/template"
		},
		{
			"name": "locations",
			"template": "./path/to/template"
		}
	],
	"amount": 125
}
```

Otra cosa que estaría interesante de lograr es poder configurar seed it desde el archivo _package.json_:

```json
/// Config on package.json
"seedit": {
    "url": "mongodb://<user>:<password>@localgost:27017/",
    "collections": [
        {
            "name": "users",
            "template": "./path/to/template",
            "amount": 70
        },
        {
            "name": "toDos",
            "template": "./path/to/template"
        }
    ],
    "amount": 125
}
```

# License

Open-Source MIT License.

Copyright (c) 2021 Facundo Carbonel / Seed It

