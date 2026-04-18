import { useNavigate } from 'react-router-dom'

export default function CTA(){
    const navigate = useNavigate()

    return (
    <section id='launch' className='min-h-[80vh] bg-cover bg-center flex flex-col justify-center items-center text-center px-6' style={{backgroundImage:"linear-gradient(rgba(0,0,0,.45),rgba(0,0,0,.45)),url('https://images.unsplash.com/photo-1500937386664-56d1dfef3854?auto=format&fit=crop&w=1600&q=80')"}}>
        <h2 className='text-white text-5xl md:text-7xl font-medium'>Don't Throw It Away.<br/>Pass It Forward.</h2>
        <p className='text-white/90 text-xl mt-6'>Launch the smartest reuse network for your college campus.</p>
        <button onClick={() => navigate('/auth')} className='mt-10 px-10 py-4 rounded-full bg-[#d29b00] text-white text-xl hover:cursor-pointer hover:bg-[#b8860b]'>Launch For My College</button>
    </section>
    )
}