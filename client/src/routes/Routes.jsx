import { createBrowserRouter } from "react-router-dom";
import AboutPage from "../pages/rootpage/AboutPage.jsx";
import { UserAuth } from "./protected routes/UserAuth.jsX";
import { OwnerAuth } from "./protected routes/OwnerAuth.jsx";
import { AdminAuth } from "./protected routes/AdminAuth.jsx";
import RootLayout from "../layouts/user/RootLayout.jsx";
import UserLayout from "../layouts/user/UserLayout.jsx";
import ClientLayout from "../layouts/client/ClientLayout.jsx";
import ClientSecuredLayout from "../layouts/client/ClientSecuredLayout.jsx";
import AdminSecureLayout from "../layouts/admin/AdminSecureLayout.jsx";
import AdminLayout from "../layouts/admin/AdminLayout.jsx";
import { lazy,Suspense } from 'react';
import Loader from "../components/Loader.jsx";
import AdminTheaterPayment from "../pages/AdminPage/AdminTheaterPayment.jsx";



// root layout
const HomePage = lazy(() => import('../pages/rootpage/HomePage.jsx'));
const LoginPage = lazy(() => import('../pages/rootpage/LoginPage.jsx'));
const SignupPage = lazy(() => import('../pages/rootpage/SignupPage.jsx'));
const OtpRegisterPage = lazy(() => import('../pages/rootpage/OtpRegisterPage.jsx'));



// userPage
const MovieListPage = lazy(() => import('../pages/userpage/MovieListPage.jsx'));
const MovieSinglePage = lazy(() => import('../pages/userpage/MovieSinglePage.jsx'));
const UserProfile = lazy(() => import('../pages/userpage/UserProfile.jsx'));
const BookedMovies = lazy(() => import('../pages/userpage/BookedMovies.jsx'));
const BookSeat = lazy(() => import('../pages/userpage/BookSeat.jsx'));
const PaymentSuccessPage = lazy(() => import('../pages/userpage/PaymentSuccessPage.jsx'));
const PaymentCancelPage = lazy(() => import('../pages/userpage/PaymentCancelPage.jsx'));


// Owner
const LoginPageClient = lazy(() => import('../pages/clientPage/LoginPageClient.jsx'));
const SignupPageClient = lazy(() => import('../pages/clientPage/SignupPageClient.jsx'));
const ClientOtp = lazy(() => import('../components/client and adminComponents/ClientOtp.jsx'));
const HomePageClient = lazy(() => import('../pages/clientPage/HomePageClient.jsx'));
const CreateMoviePage = lazy(() => import('../pages/clientPage/CreateMoviePage.jsx'));
const CreateTheaterPageClient = lazy(() => import('../pages/clientPage/CreateTheaterPageClient.jsx'));
const ProfilePageClient = lazy(() => import('../pages/clientPage/ProfilePageClient.jsx'));
const TheaterDetailsPage = lazy(() => import('../pages/clientPage/TheaterDetailsPage.jsx'));
const MovieShedulePage = lazy(() => import('../pages/clientPage/MovieShedulePage.jsx'));
const TheaterList = lazy(() => import('../pages/clientPage/TheaterList.jsx'));
const MovieTime = lazy(() => import('../components/Clients/MovieTime.jsx'));
const TheaterSeat = lazy(() => import('../pages/clientPage/TheaterSeat.jsx'));

// admin
const AdminHomePage = lazy(() => import('../pages/AdminPage/AdminHomePage.jsx'));
const AdminLoginPage = lazy(() => import('../pages/AdminPage/AdminLoginPage.jsx'));
const AdminSignupPage = lazy(() => import('../pages/AdminPage/AdminSignupPage.jsx'));
const AdminProfilePage = lazy(() => import('../pages/AdminPage/AdminProfilePage.jsx'));
const AdminOtp = lazy(() => import('../components/Admin/admincomponents/AdminOtp.jsx'));

// admin dashboard
const AdminReviewPage = lazy(() => import('../pages/AdminPage/AdminReviewPage.jsx'));
const AdminOwnersList = lazy(() => import('../pages/AdminPage/AdminOwnersList.jsx'));
const UserListPage = lazy(() => import('../pages/AdminPage/AdminUserListPage.jsx'));
const PaymentPage = lazy(() => import('../pages/clientPage/PaymentPage.jsx'));



export const router = createBrowserRouter([
  {
    path: "/",
    element:( 
      <Suspense fallback={<Loader/>}>
    <RootLayout />
    </Suspense>
    ),

    children: [
      {
        path: "",

        element: <HomePage />
      
        
      },
      {
        path: "about",
        element: <AboutPage />,
      },
      {
        path: "login",
        element: <LoginPage />,
      },
      {
        path: "sign-up",
        element: <SignupPage />,
      },
      {
        path:"account-restore",
        element: <OtpRegisterPage />
      }
    ],
  },
  {
    path: "user",
    element: (
      <UserAuth>
           <Suspense fallback={<Loader/>}> 
        <UserLayout />
        </Suspense>
      </UserAuth>
    ),

    children: [
      {
        path: "movies",
        element: <MovieListPage />,
      },
      {
        path: "about",
        element: <AboutPage />,
      },

      {
        path: "single-page/:id",
        element: <MovieSinglePage />,
      },
      {
        path: "profile",
        element: <UserProfile />,
      },
      {
        path: "booked-movies",
        element: <BookedMovies />,
      },
      {
        path:"movie/:movieId/book-seat/:id",
        element:<BookSeat/>
      },
      {
        path: "payment/success/:movie/:theater",
        element: <PaymentSuccessPage />,
    },
    {
      path: "payment/cancel",
      element: <PaymentCancelPage />,
  },
    ],
  },
  {
    path: "client",
    element: (
      <Suspense fallback={<Loader/>}>
    <ClientLayout />
    </Suspense> 
    ),

    children: [
      {
        path: "login",
        element: <LoginPageClient />,
      },
      {
        path: "signup",
        element: <SignupPageClient />,
      },
      {
        path: "account-client",
        element: <ClientOtp />,
      },
    ],
  },
  {
    path: "clients",
    element: (
      <OwnerAuth>
         <Suspense fallback={<Loader/>}>
        <ClientSecuredLayout />
        </Suspense>
      </OwnerAuth>
    ),

    children: [
      {
        path: "",
        element: <HomePageClient />,
      },
      {
        path: "about",
        element: <AboutPage />,
      },
      {
        path:"create-movie/:id",
        element:<CreateMoviePage/>
      },
      {
        path:"theater-detail",
        element:<TheaterDetailsPage/>,

        children:[{
          path:"theater-showTime/:movieId",
          element:<MovieTime/>
        }]
      },
      {
        path:"profile",
        element:<ProfilePageClient/>
      },
      {
        path:"create-theater",
        element:<CreateTheaterPageClient/>
      },
      {
        path:"movie-shedule/:theaterId",
        element:<MovieShedulePage />
      },
      {
        path:"theater-list",
        element:<TheaterList />
      },
      {
        path:"theater-seat/:theaterId",
        element:<TheaterSeat/>
      },
      {
        path:"theater-payment",
        element:<PaymentPage/>
      }
    ],
  },
  {
    path:"admin",
    element:(
      <Suspense fallback={<Loader/>}>
       <AdminLayout/>
       </Suspense>
    ),

    children:[
      {
        path:"login",
        element:<AdminLoginPage />
      },
      {
        path:"signup",
        element:<AdminSignupPage />
      },
      {
        path: "account-admin",
        element: <AdminOtp />,
      },
    ]
  },
  {
    path:"admins",
    element:(
      <AdminAuth>
         <Suspense fallback={<Loader/>}>
      <AdminSecureLayout/>
      </Suspense>
      </AdminAuth>
    ),

    children:[
      {
        path:'',
        element:<AdminHomePage />
      },
      {
        path: "users",
        element: <UserListPage />,
      },
      {
        path: "owners",
        element: <AdminOwnersList />,
      },
      {
        path: "review",
        element: <AdminReviewPage />,
      },
     
 
      {
        path:"profile",
        element:<AdminProfilePage />
      },
      {
        path:"payment",
        element:<AdminTheaterPayment />
      }
    ]

  },
  // {
  //   path:"list",
  //   element:(
  //     <AdminAuth>
  //   <AdminDashboard />
  //   </AdminAuth>
  // ),

  // children:[
  //  {
  //   path:"user-list",
  //   element:<UserList/>
  //  }
  // ]
  // }

 
  

]);

