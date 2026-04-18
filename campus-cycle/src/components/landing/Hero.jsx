import heroBg from '../../assets/hero-bg.jpg'
import { useNavigate } from 'react-router-dom'

export default function Hero(){
    const navigate = useNavigate()

    return (
    <section
        id='home'
        className='min-h-screen bg-cover bg-center flex flex-col justify-center items-center text-center px-6'
        style={{backgroundImage: `linear-gradient(rgba(0,0,0,.4),rgba(0,0,0,.4)), url(${heroBg})`}}
    >
        <h1 className='text-white text-6xl md:text-8xl font-medium leading-tight'>Give Old Stuff <br/> A New Semester</h1>
        <p className='text-white/90 text-xl md:text-2xl max-w-4xl mt-6'>CampusCycle connects senior students with their juniors to buy and sell books, gadgets, furniture, hostel essentials and more — matched to budget, branch, semester and interests.</p>
        <button onClick={() => navigate('/auth')} className='mt-10 px-10 py-4 rounded-full bg-[#d29b00] text-white text-xl cursor-pointer hover:bg-[#b88a00]'>Explore Campus Marketplace</button>
    </section>
    )
}
