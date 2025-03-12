import Menu from "../components/menu";
import { auth } from "../firebase";

export default function Home(){
    const logOut = () => {
        auth.signOut();
    };
    
    return (
      <h1>
        <Menu/>
        {/* /<button onClick={logOut}>Log Out</button> */}
      </h1>
      );
}