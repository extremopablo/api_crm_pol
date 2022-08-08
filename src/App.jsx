import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Layout } from './layout/Layout';
import { EditarCliente } from './paginas/EditarCliente';
import { Inicio } from './paginas/inicio';
import { NuevoCliente } from './paginas/NuevoCliente';
import { VerCliente } from './paginas/VerCliente';


function App() {

  return (
    // <h1 className = "text-6xl font-extrabold">CRM React</h1>
    // Si el "Route" tiene apertura y cierre (<Routes> </Routes>) significa que es un grupo de rutas
    // Si aparece solo <Route /> significa que es una sola ruta
    <BrowserRouter>
        <Routes>
            {/* <Route path='/' element= {<IniciarSesion/>}> 
                <Route index element= { <LoginForm/> }/>
            </Route> */}

            <Route path='/clientes' element= {<Layout/>}>
                {/* hay que poner "index" para que "Outlet" funcione */}
                {/* Como el "Route" de abajo no tiene "path" definido... el componente "<Inicio/>" se va a mostrar donde ponga "Outlet" */}
                <Route index element = {<Inicio/>}/> 

                {/* Como es interna... seria lo mismo que poner al ruta "/clientes/nuevo" */}
                <Route path='nuevo' element = {<NuevoCliente/>}/>

                <Route path='editar/:id' element = {<EditarCliente/>}/>

                <Route path=':id' element = {<VerCliente/>}/>
            </Route>
        </Routes>
    </BrowserRouter>
  )
}

export default App
