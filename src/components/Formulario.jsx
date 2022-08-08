
import React from 'react'
import { Formik, Form, Field } from "formik";
import { useNavigate } from "react-router-dom";
import * as Yup from 'yup';
import { Alerta } from './Alerta';
import { Spinner } from './Spinner';


export const Formulario = ({cliente, cargando}) => {

  const navigate = useNavigate()

  const nuevoClienteSchema = Yup.object().shape({ //aqui vamos a definir las caracteristicas que debe cumplir cada campo
    nombre: Yup.string()
                        .min(3, 'El Nombre es muy corto') //minimo tiene que ingresar 3 caracteres
                        .max(20, 'El Nombre esmuy largo')
                        .required('El nombre del Cliente es Obligatorio'), //para el ejemplo solo hacemos esta VALIDACIÓN 
    empresa: Yup.string()
                         .required('El nombre de la empresa es Obligatorio'),
    email: Yup.string()
                       .email('Email no válido')
                       .required('El email es Obligatorio'),
    telefono: Yup.number()
                          .positive('Número no válido')
                          .integer('Número no válido') //para que solo admita valores enteros
                          .typeError('El número es no válido') //empleamos "typeError" cuando no aparece el mensaje que queremos que aparezca. "typeError" seria como forzar la muestra de un mensaje
  })

  const handleSubmit = async (valores) => {
        // console.log(valores)
        try {
            let respuesta //definimos como "let" para poder visualizarlo fuera del "if"

            if (cliente.id) //Si existe el "id" significa que estamos editando...
            {
                    //EDITANDO REGISTRO
                    const url = `http://localhost:4000/clientes/${cliente.id}` // es "/clientes" porque es el nombre que le di en el archivo "db.json"

                    respuesta = await fetch(url, {
                        method: 'PUT',
                        body: JSON.stringify(valores), //en "body" pongo la información que voy a pasar para almacenar
                        headers: {
                            'Content-Type': 'application/json'
                        }
                    })
            }
            else
            {
                    // NUEVO  REGISTRO
                    const url = 'http://localhost:4000/clientes' // es "/clientes" porque es el nombre que le di en el archivo "db.json"
                    //Voy a realizar una petición hacia esta URL

                    respuesta = await fetch(url, {
                        method: 'POST',
                        body: JSON.stringify(valores), //en "body" pongo la información que voy a pasar para almacenar
                        headers: {
                            'Content-Type': 'application/json'
                        }
                    })
                    // JSON.stringify: convierte un objeto o valor de JavaScript en una cadena de texto JSON
                    
                    // console.log(respuesta)
            }

            const resultado = await respuesta.json()

            // console.log(resultado);

            navigate('/clientes')
        
        } catch (error) {
            console.log(error)
        }

  }

  return (

    cargando ? <Spinner/> : (

    // px: padding izquierda y derecha
    // py: padding de arriba y abajo
    // rounded: esquinas redondeadas
    // shadow: para crear una sombra
    // mx-auto: para centrar
    <div className='bg-white mt-10 px-5 py-10 rounded-md shadow-md md:w-3/4 mx-auto'>
        <h1 className='text-gray-600 font-bold text-xl uppercase text-center'
        >{ cliente?.nombre ? 'Editar Cliente' : 'Agregar Cliente'}</h1> 
        {/* al poner "{}" estamos indicando que vamos a utilizar codigo de JavaScript */}

        <Formik
            initialValues={{ //La primer llave es para indicar que voy a utilizar codigo de JavaScripts
                nombre: cliente?.nombre ?? "", //en lugar de utilizar "useState"..."formik" me da la posibilidad de hacer esto 
                empresa: cliente?.empresa ?? "", //aqui puedo poner si quiero el valor que aparezca en pantalla. Ej.: empresa: 'El Indiecito'
                email: cliente?.email ?? "",
                telefono: cliente?.telefono ?? "",
                notas: cliente?.notas ?? ""
            }}
            enableReinitialize= { true } //esto permite que se visualice en pantalla los datos pasados por parametro y asignados a los "Field"

            // cliente?.nombre ?? "" : interpretación..si existe "cliente" entonces asigna la info de "nombre"...sino asigna un string vacio
            // cliente?.nombre ?? "" : es lo mismo que "cliente.nombre ? cliente.nombre : "" "

            onSubmit={ async (values, {resetForm}) => {
                // console.log(values)
                await handleSubmit(values); // Ponemos ASYNC y AWAIT para asegurarnos que los datos primero se hayan almacenados

                resetForm() //una vez que envie los datos del formulario que resetee los datos de pantalla
            }}

            validationSchema= {nuevoClienteSchema}
        >
        {/* {(data) => { */}
        {({errors, touched}) => { //estoy desestructurando...de los datos disponibles tomo "errors" 
            // console.log(data)
            return (
            <Form
                className='mt-10'
            >
                <div className='mb-4'>
                    <label
                        className='text-gray-800'
                        htmlFor='nombre' //para hacerlo accesible
                    >Nombre: </label>
                    <Field
                        id='nombre' //para que cuando haga click en "Label" me aparezca el campo para escribir
                        type='text'
                        // w-full: para que ocupe todo el ancho posible
                        className= 'mt-2 block w-full p-3 bg-gray-50'
                        placeholder= 'Nombre del Cliente'
                        name= 'nombre' //a este dato hace referencia el "initialValues"
                    />
                    
                    {/* Cuando pongo llaves significa que voy a utilizar codigo de JavaScript */}
                    {
                        errors.nombre && touched.nombre ? ( //touched: para poder realizar validaciones en tiempo real y no hacerlas al presionar el botón de "submit"
                        <Alerta>{errors.nombre}</Alerta>
                    ) : null} 

                </div>

                <div className='mb-4'>
                    <label
                        className='text-gray-800'
                        htmlFor='empresa' //para hacerlo accesible
                    >Empresa: </label>
                    <Field
                        id='empresa' //para que cuando haga click en "Label" me aparezca el campo para escribir
                        type='text'
                        // w-full: para que ocupe todo el ancho posible
                        className= 'mt-2 block w-full p-3 bg-gray-50'
                        placeholder= 'Empresa del Cliente'
                        name= 'empresa'
                    />

                    {
                        errors.empresa && touched.empresa ? ( //touched: para poder realizar validaciones en tiempo real y no hacerlas al presionar el botón de "submit"
                        <Alerta>{errors.empresa}</Alerta>
                    ) : null} 
                </div>

                <div className='mb-4'>
                    <label
                        className='text-gray-800'
                        htmlFor='email' //para hacerlo accesible
                    >E-mail: </label>
                    <Field
                        id='email' //para que cuando haga click en "Label" me aparezca el campo para escribir
                        type='email'
                        // w-full: para que ocupe todo el ancho posible
                        className= 'mt-2 block w-full p-3 bg-gray-50'
                        placeholder= 'Email del Cliente'
                        name= 'email'
                    />

                    {
                        errors.email && touched.email ? ( //touched: para poder realizar validaciones en tiempo real y no hacerlas al presionar el botón de "submit"
                        <Alerta>{errors.email}</Alerta>
                    ) : null} 

                </div>

                <div className='mb-4'>
                    <label
                        className='text-gray-800'
                        htmlFor='telefono' //para hacerlo accesible
                    >Teléfono: </label>
                    <Field
                        id='telefono' //para que cuando haga click en "Label" me aparezca el campo para escribir
                        type='tel'
                        // w-full: para que ocupe todo el ancho posible
                        className= 'mt-2 block w-full p-3 bg-gray-50'
                        placeholder= 'Teléfono del Cliente'
                        name= 'telefono'
                    />

                    {
                        errors.telefono && touched.telefono ? ( //touched: para poder realizar validaciones en tiempo real y no hacerlas al presionar el botón de "submit"
                        <Alerta>{errors.telefono}</Alerta>
                    ) : null} 
                </div>

                <div className='mb-4'>
                    <label
                        className='text-gray-800'
                        htmlFor='notas' //para hacerlo accesible
                    >Notas: </label>
                    <Field
                        id='notas' //para que cuando haga click en "Label" me aparezca el campo para escribir
                        as= 'textarea'
                        type='text'
                        // w-full: para que ocupe todo el ancho posible
                        className= 'mt-2 block w-full p-3 bg-gray-50'
                        placeholder= 'Notas del Cliente'
                        name= 'notas'
                    />
                </div>

                <input
                        type= 'submit'
                        value= { cliente?.nombre ? 'Editar Cliente' : 'Agregar Cliente'}
                        className= "mt-5 w-full bg-blue-800 p-3 text-white uppercase font-bold text-lg"
                >
                        
                </input>
            </Form>
        )}}
        </Formik>

    </div>
    )
  )
}


Formulario.defaultProps = { //va a hacer un objeto. Realizamos esto para que tome "cliente" como un objeto vacio, en el caso que no haya sido pasado como parametro 
    cliente: {},
    cargando: false // si no esta presente cargando...lo defino aqui como "false". Po ej.: en el caso de cargar un nuevo cliente no utilizamos "cargando"...entonces que en ese caso tome por lo menos el valor por defecto definido aqui
}
