import { Nav } from "@/components";
import { userService } from "@/services";
import "@/styles/globals.css";
import 'bootstrap/dist/css/bootstrap.min.css';
import type { AppProps } from "next/app";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export default function App({ Component, pageProps }: AppProps) {
  const router = useRouter();
  const [user, setUser] = useState(null);
  const [authorized, setAuthorized] = useState(false);

  useEffect(() => {
    // on initial load - run auth check 
    authCheck(router.asPath);

    // on route change start - hide page content by setting authorized to false  
    const hideContent = () => setAuthorized(false);
    router.events.on('routeChangeStart', hideContent);

    // on route change complete - run auth check 
    router.events.on('routeChangeComplete', authCheck)

    // unsubscribe from events in useEffect return function
    return () => {
      router.events.off('routeChangeStart', hideContent);
      router.events.off('routeChangeComplete', authCheck);
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function authCheck(url: string) {
    // redirect to login page if accessing a private page and not logged in 
    console.log('url = ', url);
    setUser(userService.userValue);
    console.log('user = ', user);
    const publicPaths = ['/account/login', '/account/register'];
    const path = url.split('?')[0];
    if (!userService.userValue?.username && !publicPaths.includes(path)) {
      setAuthorized(false);
      router.push({
        pathname: '/account/login',
        query: { returnUrl: router.asPath }
      });
    } else {
      setAuthorized(true);
    }
  }
  return <div className={`app-container ${user ? 'bg-light' : ''}`}>
    <Nav />
    {authorized &&
      <Component {...pageProps} />
    }
  </div>
}
