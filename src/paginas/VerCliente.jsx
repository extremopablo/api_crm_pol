
import { useEffect, useState } from 'react'
import { useParams } from "react-router-dom";
import { Spinner } from '../components/Spinner';


export const VerCliente = () => {

  const [cliente, setCliente] = useState({})

  const [cargando, setCargando]= useState(true)

  // const params = useParams() //para poder leer los paremetros de la url del navegador
  const { id } = useParams()

  // console.log(params);
  // console.log(id)

  useEffect(() => {

    const obtenerClienteAPI = async () => {
        try {
            const url = `http://localhost:4000/clientes/${id}`
            const respuesta = await fetch(url)

            const resultado = await respuesta.json()

            setCliente(resultado);

        } catch (error) {
            console.log(error);
        }
        
        // setTimeout(() => { //este "setTimeout" solo se puso para que se pueda visualizar el dibujito de cargando...no hace falta
        //   setCargando(!cargando)
        // }, 3000);

        setCargando(!cargando)
        
    }
    obtenerClienteAPI()

  }, [])

  // console.log(cargando)

  return (
    
    cargando ? <Spinner/> :
        Object.keys(cliente).length === 0 ?
        <p>No hay Resultados</p> : (

    <div>
                <h1 className='font-black text-4xl text-blue-900'>Ver Cliente: {cliente.nombre}</h1>
                <p className='mt-3'>Información del cliente</p>

                {/* "Cliente:" lo pone dentro de un "span" porque va a actuar como un "label" */}
                <p className='text-2xl text-gray-600 mt-10'>
                    <span className='text-gray-800 uppercase font-bold'>Cliente: </span> 
                    { cliente.nombre }
                </p>

                <p className='text-2xl text-gray-600 mt-4'>
                    <span className='text-gray-800 uppercase font-bold'>Email: </span> 
                    { cliente.email }
                </p>

                <p className='text-2xl text-gray-600 mt-4'>
                    <span className='text-gray-800 uppercase font-bold'>Telefono: </span> 
                    { cliente.telefono }
                </p>
                {
                  cliente.empresa && (
                    <p className='text-2xl text-gray-600 mt-4'>
                        <span className='text-gray-800 uppercase font-bold'>Empresa: </span> 
                        { cliente.empresa }
                    </p>
                  )
                }
                
                { //si tiene información "notas" entonces la muestra, en caso contrario no muestra
                    cliente.notas && ( //este "(" es un "return" implicito
                      <p className='text-2xl text-gray-600 mt-4'>
                      <span className='text-gray-800 uppercase font-bold'>Notas: </span> 
                      { cliente.notas }
                      </p>
                    )
                }
    </div>
    )
  )
}
