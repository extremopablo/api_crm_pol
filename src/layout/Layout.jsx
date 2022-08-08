
import { Outlet, Link, useLocation } from 'react-router-dom'

// Outlet: lo que me permite es que donde ponga <Outlet/> va a renderizar los componentes anidados

export const Layout = () => {

  const location = useLocation();

  // console.log(location);

  const urlActual = location.pathname;

  return (
    <div className = "md: flex md: min-h-screen">
        {/* <h1>Desde Layout.jsx</h1> */}

        <div className='md:w-1/4 bg-blue-900 px-5 py-10'>
            <h2 className='text-4xl font-black text-center text-white'>CRM Clientes</h2>

            <nav className='mt-10'>
              <Link
                // CUANDO PONGO "{}" SIGNIFICA QUE VOY A UTILIZAR CODIGO DE JS
                className={`${urlActual === '/clientes' ? 'text-blue-300' : 'text-white'}
                text-2xl block mt-2 hover:text-blue-300`} //block: para que tome todo el ancho
                to='/clientes'
              >Clientes</Link>
              
              <Link
                className={`${urlActual === '/clientes/nuevo' ? 'text-blue-300' : 'text-white'}
                text-white text-2xl block mt-2 hover:text-blue-300`}
                to='/clientes/nuevo'
              >Nuevo Cliente</Link>
            </nav>
        </div>

        {/* md:h-screen: estamos diciendo que en tamaño mediano o mas grande la altura va a ser lo que mida la pantalla */}
        {/* overflow-scroll: estoy indicando que tenga "scroll"... este SOLO aparecera del lado derecho de la pantalla, porque solo lo defini para este bloque */}
        <div className="md:w-3/4 p-10 md:h-screen overflow-scroll">
            {/* <p>Antes del Outlet</p> */}
            <Outlet/>
            {/* <p>Despues del Outlet</p> */}
        </div>
    </div>
  )
}
