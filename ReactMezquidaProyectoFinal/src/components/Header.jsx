import logoImg from '../assets/logo.jpg';
export default function Header() {
    return <header id="main-header">
        <div id="title">
            <img src={logoImg} alt="A Cat Shop" />
            <h1>Kitty Costumes</h1>

        </div>
        <nav>
            <button>Cart (0)</button>
        </nav>
    </header>

}