import Header from "../components/Header";
import Hero from "../components/Hero";
import Galeria from "../components/Galeria";
import Contacto from "../components/Contacto";
import Footer from "../components/Footer";
import Faq from "../components/Faq";
import Backtop from "../components/Backtop";
export default function Home(props) {
  return (
    <>
    
    <Header/>
    <Hero/>
      <Galeria/>
      <Contacto/>
      <Faq/>
      <Backtop/>
      <Footer/>
    </>
  )
}
