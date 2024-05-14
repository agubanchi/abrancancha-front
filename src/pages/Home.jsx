import Header from "../components/Header";
import Hero from "../components/Hero";
import Galeria from "../components/Galeria";
import Contacto from "../components/Contacto";
import Footer from "../components/Footer";
export default function Home(props) {
  return (
    <>
    
    <Header/>
    <Hero/>
      <Galeria/>
      <Contacto/>
      <Footer/>
    </>
  )
}
