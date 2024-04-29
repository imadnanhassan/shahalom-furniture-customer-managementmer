import { createBrowserRouter } from 'react-router-dom'
import DashboardLayout from '../layout/Dashboard/DashboardLayout'

import Dashboard from '../pages/Admin/Dashboard/Dashboard'
import ProductsList from '../pages/Admin/Products/ProductsList'
import AddProduct from '../pages/Admin/Products/AddProduct'
import ProductsDetails from '../pages/Admin/Products/ProductsDetails'
import Categories from '../pages/Admin/Products/Categories'

import AddAttributes from '../pages/Admin/Products/Attributes/AddAttributes'
import AddColor from '../pages/Admin/Products/Color/AddColor'
import Settings from '../pages/Admin/Settings/Settings'
import OrderList from '../pages/Admin/Order/OrderList'
import Theme from '../pages/Theme'

import ErrorPage from '../pages/Admin/Error/ErrorPage'
import CouponsList from '../pages/Admin/Coupons/CouponsList'
import CreateCoupon from '../pages/Admin/Coupons/CreateCoupon'
import OrderTracking from '../pages/Admin/Order/OrderTracking'
import BlogList from '../pages/Admin/Blogs/BlogList'
import BlogCategories from '../pages/Admin/Blogs/BlogCategories'
import BlogAdd from '../pages/Admin/Blogs/BlogAdd'
import BlogTags from '../pages/Admin/Blogs/BlogTags'
import UploadedFiles from '../pages/Admin/UploadedFiles/UploadedFiles'
import CampaignAdd from '../pages/Admin/Campaign/CampaignAdd'
import CampaignList from '../pages/Admin/Campaign/CampaignList'
import Banner from '../pages/Admin/Banner/Banner'
import UserList from '../pages/Admin/User/UserList'
import UserProfile from '../pages/Admin/User/UserProfile'
import UserProfileSettings from '../pages/Admin/User/UserProfileSettings'
import SignIn from '../pages/Admin/Auth/SignIn'
import SignUp from '../pages/Admin/Auth/SignUp'
import FrontendLayout from '../layout/Frontend/FrontendLayout'
import HomePage from '../pages/Frontend/Home/HomePage'
import Brand from '../pages/Admin/Products/Brand/Brand'
import AddValue from '../pages/Admin/Products/Attributes/AddValue'
import ForgotPassword from '../pages/Admin/Auth/ForgotPassword'

const router = createBrowserRouter([
  {
    path: '/',
    element: <FrontendLayout />,
    children: [{ path: '/', element: <HomePage /> }],
  },

  {
    path: '/',
    element: <DashboardLayout />,
    errorElement: <ErrorPage />,
    children: [
      { path: '/dashboard', element: <Dashboard /> },
      { path: 'dashboard/products-list', element: <ProductsList /> },
      { path: 'dashboard/add-product', element: <AddProduct /> },
      { path: 'dashboard/products-details', element: <ProductsDetails /> },
      { path: 'dashboard/category', element: <Categories /> },
      { path: 'dashboard/brand', element: <Brand /> },
      { path: 'dashboard/attributes', element: <AddAttributes /> },
      { path: 'dashboard/attributes/add-value/1', element: <AddValue /> },
      { path: 'dashboard/color', element: <AddColor /> },
      { path: 'dashboard/coupons-list', element: <CouponsList /> },
      { path: 'dashboard/create-coupon', element: <CreateCoupon /> },
      { path: 'dashboard/user-list', element: <UserList /> },
      { path: 'dashboard/user-profile', element: <UserProfile /> },
      {
        path: 'dashboard/userprofile-settings',
        element: <UserProfileSettings />,
      },
      { path: 'dashboard/order-list', element: <OrderList /> },
      { path: 'dashboard/blog-list', element: <BlogList /> },
      { path: 'dashboard/blog-category', element: <BlogCategories /> },
      { path: 'dashboard/add-post', element: <BlogAdd /> },
      { path: 'dashboard/blog-tag', element: <BlogTags /> },
      { path: 'dashboard/banner', element: <Banner /> },
      { path: 'dashboard/uploaded-files', element: <UploadedFiles /> },
      { path: 'dashboard/campaign-add', element: <CampaignAdd /> },
      { path: 'dashboard/campaign-list', element: <CampaignList /> },
      { path: 'dashboard/settings', element: <Settings /> },

      { path: 'dashboard/theme', element: <Theme /> },
      { path: 'dashboard/order-tracking', element: <OrderTracking /> },
    ],
  },
  { path: 'dashboard/signin', element: <SignIn /> },
  { path: 'dashboard/signup', element: <SignUp /> },
  { path: 'dashboard/signin/forgetpassword', element: <ForgotPassword /> },
])

export default router
