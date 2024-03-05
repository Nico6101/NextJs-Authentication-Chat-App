import { Inter } from "next/font/google";
import { userService } from "@/services";
import { Link } from "@/components";

const inter = Inter({ subsets: ["latin"] });

const Home = () => {
  return (
    <div className="p-4">
      <div className="container">
        <h1>Hi {userService.userValue?.username}!</h1>
        <p>You&apos;re logged in with Next.js & JWT!!</p>
        <p><Link href="/chat">CHAT</Link></p>
      </div>
    </div>
  );
};

export default Home;
