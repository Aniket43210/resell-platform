export default function Features(){
    return (
        <section className='py-20 px-6 sm:px-10 lg:px-16'>
            <div className='mx-auto max-w-6xl text-center'>
                <p className='text-sm font-semibold uppercase tracking-[0.35em] text-[#d29b00]'>What we offer</p>
                <h2 className='mt-4 text-4xl font-semibold text-slate-900 sm:text-5xl'>Designed for students, built for campus life.</h2>
                <p className='mx-auto mt-4 max-w-2xl text-slate-600'>CampusCycle connects student sellers and buyers with safe exchange, smart matching, and smarter savings each semester.</p>
            </div>

            <div className='mt-14 grid gap-6 md:grid-cols-3'>
                <article className='group rounded-4xl border border-amber-200/40 bg-linear-to-br from-white via-amber-50 to-amber-100 p-8 shadow-[0_24px_120px_-48px_rgba(245,158,11,0.30)] transition duration-300 ease-out hover:-translate-y-1 hover:shadow-[0_30px_120px_-32px_rgba(245,158,11,0.35)]'>
                    <div className='mb-6 flex h-16 w-16 items-center justify-center rounded-[1.35rem] bg-linear-to-br from-amber-200 to-amber-300 text-amber-800 shadow-lg shadow-amber-200/50 ring-1 ring-amber-200/60'>
                        <span className='text-4xl'>🎓</span>
                    </div>
                    <h3 className='text-2xl font-semibold text-slate-900 mb-3'>Verified Students</h3>
                    <p className='text-slate-600 leading-7'>Trusted exchanges through campus IDs and student accounts.</p>
                </article>

                <article className='group rounded-4xl border border-sky-200/40 bg-linear-to-br from-white via-sky-50 to-sky-100 p-8 shadow-[0_24px_120px_-48px_rgba(56,189,248,0.24)] transition duration-300 ease-out hover:-translate-y-1 hover:shadow-[0_30px_120px_-32px_rgba(56,189,248,0.28)]'>
                    <div className='mb-6 flex h-16 w-16 items-center justify-center rounded-[1.35rem] bg-linear-to-br from-sky-200 to-sky-300 text-sky-800 shadow-lg shadow-sky-200/50 ring-1 ring-sky-200/60'>
                        <span className='text-4xl'>🤖</span>
                    </div>
                    <h3 className='text-2xl font-semibold text-slate-900 mb-3'>AI Recommendations</h3>
                    <p className='text-slate-600 leading-7'>Smart matches based on budget, hostel, branch and interests.</p>
                </article>

                <article className='group rounded-4xl border border-emerald-200/40 bg-linear-to-br from-white via-emerald-50 to-emerald-100 p-8 shadow-[0_24px_120px_-48px_rgba(16,185,129,0.25)] transition duration-300 ease-out hover:-translate-y-1 hover:shadow-[0_30px_120px_-32px_rgba(16,185,129,0.30)]'>
                    <div className='mb-6 flex h-16 w-16 items-center justify-center rounded-[1.35rem] bg-linear-to-br from-emerald-200 to-emerald-300 text-emerald-800 shadow-lg shadow-emerald-200/50 ring-1 ring-emerald-200/60'>
                        <span className='text-4xl'>💰</span>
                    </div>
                    <h3 className='text-2xl font-semibold text-slate-900 mb-3'>Semester Savings</h3>
                    <p className='text-slate-600 leading-7'>Reduce waste and cut setup costs every new semester.</p>
                </article>
            </div>
        </section>
    )
}
