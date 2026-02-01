import TiltScriptLoader from '@/components/common/TiltscriptLoader'
import '@/styles/public.css'
import Navbar from '@/components/common/Navbar'
import Footer from '@/components/common/Footer'



export default function PublicLayout({ children }) {
  return (
    <>
      <Navbar />
       <link
        rel="stylesheet"
        href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css"  />
        <link 
         rel="icon" 
         type="image/x-icon" href="assets/favicon/favicon.ico" />
      <main>{children}</main>
      <TiltScriptLoader />
      <Footer />
    </>
  )
}