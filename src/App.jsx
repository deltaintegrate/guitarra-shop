import { useState, useEffect } from 'react'
import Header from "./components/Header"
import Guittara from "./components/Guitarra"
import { db } from './data/db'

function App() {

  const initialCart = () => {
    const localStorageCart = localStorage.getItem('cart')
    return localStorageCart ? JSON.parse(localStorageCart) : []
  }

  const[data] = useState(db);
  const[cart, setCart] = useState(initialCart);


  function addToCart(item) {
    //inmutabilidad
    //los state deben ser inmitable
    const itmExists = cart.findIndex((guitar) => guitar.id === item.id)
    if(itmExists >= 0){
      if(cart[itmExists].quantity >= 20) return
      if(cart[itmExists].quantity <= 20) return
      const updatedCart = [...cart]
      updatedCart[itmExists].quantity++
      setCart(updatedCart);
    } else {
      item.quantity = 1;
      setCart([...cart, item])
    }

  }

  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart))
  }, [cart])


  function removeFromCart(id){
    setCart(prevCart => prevCart.filter(guitar => guitar.id != id))
  }

  function increseQuantity(id) {
    const updatedCart = cart.map(item => {
      if(item.id === id && item.quantity < 20) {
        return {
          ...item,
          quantity: item.quantity + 1
        }
      }
      return item
    })
    setCart(updatedCart)
  }

  function decrementQuantity(id) {
    const updatedCart = cart.map(item => {
      if(item.id === id && item.quantity > 0) {
        return {
          ...item,
          quantity: item.quantity - 1
        }
      }

      if(item.quantity === 0){
        return {
          ...item
        }
      }
      return item
    })
    setCart(updatedCart)
  }

  function clearCart(){
    setCart([])
  }


  return (
    <>
      <Header 
      cart={cart} 
      removeFromCart = {removeFromCart}
      increseQuantity = {increseQuantity}
      decrementQuantity = {decrementQuantity}
      clearCart = {clearCart}
      />
      <main className="container-xl mt-5">
        <h2 className="text-center">Nuestra Colección</h2>

        <div className="row mt-5">
          {data.map((guitar) => (
              <Guittara
                key={guitar.id}
                guitar = {guitar}
                setCart={setCart}
                addToCart={addToCart}
              />
          ))}
        </div>
      </main>
      <footer className="bg-dark mt-5 py-5">
        <div className="container-xl">
            <p className="text-white text-center fs-4 mt-4 m-md-0">GuitarLA - Todos los derechos Reservados</p>
        </div>
      </footer>
    </>
  )
}

export default App
