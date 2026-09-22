export function Header() {
  return (
    <header className="sticky top-0 z-10 border-b border-line bg-bg">
      <nav className="mx-auto flex max-w-[1100px] flex-col items-center 
      gap-3 px-6 py-4 sm:flex-row sm:justify-between">
        <a href="#hero" className="text-xl font-bold">
          Brew<span className="text-ember">Haus</span>
        </a>
        <ul className="flex flex-wrap justify-center gap-4 sm:gap-6">
          <li><a href="#hero" className="text-ink-soft transition-colors hover:text-ember">Home</a></li>
          <li><a href="#shop" className="text-ink-soft transition-colors hover:text-ember">Shop</a></li>
          <li><a href="#about" className="text-ink-soft transition-colors hover:text-ember">About</a></li>
          <li><a href="#contact" className="text-ink-soft transition-colors hover:text-ember">Contact</a></li>
        </ul>
      </nav>
    </header>
  )
}