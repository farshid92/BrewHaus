export function Footer() {
  return (
    <footer id="contact" className="border-t border-line bg-white">
      <div className="mx-auto grid max-w-[1100px] gap-8 px-6 py-12 md:grid-cols-[2fr_1fr_1fr]">
        <div>
          <p className="text-lg font-bold">
            Brew<span className="text-ember">Haus</span>
          </p>
          <p className="mt-2 max-w-sm text-sm text-ink-soft">
            Single-origin coffee and the equipment to do it justice.
          </p>
        </div>
        <div>
          <h3 className="mb-3 text-sm font-semibold">Shop</h3>
          <ul className="flex flex-col gap-2 text-sm text-ink-soft">
            <li><a href="#shop" className="hover:text-ember">Beans</a></li>
            <li><a href="#shop" className="hover:text-ember">Equipment</a></li>
          </ul>
        </div>
        <div>
          <h3 className="mb-3 text-sm font-semibold">Contact</h3>
          <p className="text-sm text-ink-soft">hello@brewhaus.example</p>
          <p className="text-sm text-ink-soft">123 Roastery Lane, Portland, OR</p>
        </div>
      </div>
      <p className="border-t border-line py-4 text-center text-xs text-ink-soft">
        &copy; 2026 BrewHaus. Built as a learning project.
      </p>
    </footer>
  )
}