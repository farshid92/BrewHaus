export function Hero() {
    return (
        <section id="hero" className="mx-auto max-w-[1100px] px-6 pt-20 pb-16">
            <p className="mb-4 text-xs tracking-[0.15em] text-clay uppercase">
                Roasted weekly · Shipped worldwide
            </p>
            <h1 className="max-w-xl text-6xl leading-[1.05] font-bold">
                Coffee worth <span className="text-ember">getting up</span> for.
            </h1>
            <p className="mt-5 max-w-lg text-lg text-ink-soft">
                Single-origin beans and the equipment to do them justice.
                No over extraction, no under extraction, just good coffee.
            </p>
            <a
                href="#shop"
                className="mt-8 inline-block rounded-full bg-ember px-7 py-3 font-semibold text-white transition hover:-translate-y-px hover:bg-[#a5431f]"
            >
                Shop the beans
            </a>
        </section>
    )
}