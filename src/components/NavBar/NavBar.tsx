import Logo from "../ui/Logo/Logo";
interface NavBar
{
    showNavSide : string;
}
export default function NavBar({ showNavSide } : NavBar) {
  return (
    <nav className=" flex shadow shadow-black/5 justify-between py-6 px-20">
      <Logo/>
      <div className={` ${showNavSide}`}>

      </div>
    </nav>
  )
}
