
import { Outlet } from 'react-router-dom'
import Nav from '../components/auth/nav'


export default function AuthLayout() {
    return (
      <>
        <Nav />
        <main>
          <Outlet />
        </main>
      </>
    )
}