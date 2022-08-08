import { useEffect, useState } from 'react'
import { Cliente } from '../components/Cliente'



export const Inicio = () => {

  const [clientes, setClientes] = useState([])

  useEffect(() => {

      const obtenerClientesAPI = async () => {
          try {
              const url = 'http://localhost:4000/clientes'

              const respuesta = await fetch(url) //si no pongo el metodo...en forma implicita es GET

              const resultado = await respuesta.json()

            //   console.log(resultado)

              setClientes(resultado)
          
          } catch (error) {
              console.log(error)
          }
      }

      obtenerClientesAPI()

  }, []) //"[]": se va a ejecutar una sola vez, cuando se cargue la pagina

  
  const handleEliminar = async (id) => { //como es un solo parametro...puedo poner "id" sin los "()"
    // console.log('Eliminando...', id)

    const confirmar = confirm('¿Deseas eliminar este cliente?')

    // console.log(confirmar)

    if (confirmar)
    {
        try {
            const url= `http://localhost:4000/clientes/${id}`

            const respuesta = await fetch(url, {
                method: 'DELETE' //no pasamos "body" porque con el "id" es suficiente para eliminar
            })

            await respuesta.json()

            //location.reload() //podria emplearse esto para que se recargue la página y no se visualice en pantalla el registro eliminado
                              //pero cada vez que recarga la página hace un llamado a la API...lo cual no es muy optimo
            const arrayClientes = clientes.filter(cliente => cliente.id !== id)

            setClientes(arrayClientes) //ESTO SERIA LO CORRECTO PARA EVITAR TANTAS LLAMADAS A LA API

        } catch (error) {
            console.log(error)
        }
    }
  }
  
  return (
    <div>
        <>
            <h1 className='font-black text-4xl text-blue-900'>Clientes</h1>
            <p className='mt-3'>Administra tus clientes</p>

            {/* w-full: para que tome todo el ancho de la pantalla */}
            {/* table-auto: para que cuando haga mas pequeñla la pantalla...tambien se hagan pequeña las columnas */}
            {/* shadsow: para tener una sombra */}
            <table className='w-full mt-5 table-auto shadow bg-white'>
                <thead className='bg-blue-800 text-whide'>
                    
                    <tr>
                        <th className='p-2'>Nombre</th>
                        <th className='p-2'>Contacto</th>
                        <th className='p-2'>Empresa</th>
                        <th className='p-2'>Acciones</th>
                    </tr>
                    
                </thead>
                    
                
                <tbody>
                    { clientes.map(cliente => ( //este "(" seria el "return"...si voy a retornar algo en forma directa entonces se reemplaza el "return" por "()"
                        <Cliente
                            key= {cliente.id}
                            cliente={cliente}
                            handleEliminar= { handleEliminar }
                        />
                    ))}
                </tbody>
            </table>
        </>
    </div>
  )
}
