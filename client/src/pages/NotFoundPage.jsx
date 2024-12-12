import {Link} from 'react-router-dom'

function NotFoundPage() {
  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="text-center">
        <h1 className="font-bold text-4xl">404 - Not found page</h1>
        <h2 className="mt-4">Go to the <Link to={'/'} className="text-cyan-400 underline">Landing Page</Link></h2>
      </div>
    </div>
  )
}

export default NotFoundPage
