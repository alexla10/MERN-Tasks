import taskImage from '../img/tasks.jpg'

function HomePage() {
  return (
    <div className="justify-center items-center flex min-h-screen bg-cover bg-center" style={{ backgroundImage: `url(${taskImage})` }}>
      <div className="max-w-4xl w-full px-6 py-12 bg-zinc-600 rounded-lg shadow-md mt-4">
        <h1 className="text-2xl md:text-4xl font-bold text-center text-white mb-6">
          Organiza y gestiona tus tareas de manera eficiente.
        </h1>
        <h4 className='text-sm text-center'>Habilitar las cookies</h4>
        
      </div>
    </div>
  )
}

export default HomePage
