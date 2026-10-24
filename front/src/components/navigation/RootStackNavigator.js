// src/navigation/RootStackNavigator.js
import React, { useState } from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { View } from 'react-native';
import MobileTopNav from './childNav/mobileNav/MobileTopNav';
import Sidebar from './childNav/sidebar/Sidebar';

// Import all your screens
import HomeScreen from '../screens/Home/HomeScreen';
import LoginScreen from '../screens/registry/LoginScreen';
import RegisterScreen from '../screens/registry/RegisterScreen';

import CategoriesScreen from '../screens/CategoriesScreen';
import SalesScreen from '../screens/SalesScreen';
import AccountScreen from '../screens/AccountScreen';
import AllProducts from '../screens/productPages/All/AllProducts';
import CategoryProducts from '../screens/productPages/category/CategoryProducts';
import SellerShop from '../screens/shop/SellerShop';
import ProductDetail from '../productDetails/ProductDetail';
import Cart from '../cart/cart';
import Wishlist from '../wishlist/WishlistPage';
import CheckoutForm from '../paying/checkout/CheckoutForm';
import PaymentForm from '../paying/Payments/Pay';
import Registration from '../registry/register/register';
import Login from '../registry/login/login';
import ProfilePage from '../registry/profile/Profile';



import BlogDetail from '../Blogs/blogdetails/BlogDetail';
import BlogList from '../Blogs/bloglist/blogLists';


import CombinedChat from '../Chat/CombinedChat';

import ServiceCategoryList from '../digitalserrvices/ServiceCategoryList';

import ServicesList from '../shopService/list/ServicesList';
import ServiceDetails from '../shopService/details/servicesDetail';

import DashboardLayout from '../dashboard/DashboardLayout';

//admin//





const Stack = createNativeStackNavigator();

// Define which screens should hide navigation
const FULL_SCREEN_SCREENS = [
  'ProductDetail', 
  'cartProducts', 
  'wishlistProducts', 
  'CheckoutForm', 
  'PaymentForm', 
  'Login', 
  'Register',
  'ProfilePage',
  'SellerShop',
  'ServicesList',
  'ServiceDetails',
];

const RootStackNavigator = () => {
  const [isSidebarVisible, setIsSidebarVisible] = useState(false);

  // Screen with navigation header
  const ScreenWithHeader = ({ component: Component, routeName, ...props }) => (
    <View style={{ flex: 1 }}>
      <MobileTopNav onMenuPress={() => setIsSidebarVisible(true)} />
      <Component {...props} />
      <Sidebar 
        isVisible={isSidebarVisible} 
        onClose={() => setIsSidebarVisible(false)}
        activeRoute={routeName}
      />
    </View>
  );

  // Screen without navigation (full screen)
  const FullScreen = ({ component: Component, ...props }) => (
    <View style={{ flex: 1 }}>
      <Component {...props} />
    </View>
  );

  return (
    <Stack.Navigator 
      screenOptions={{ 
        headerShown: false 
      }}
    >
      {/* Screens with navigation header */}
      <Stack.Screen name="Home">
        {(props) => (
          <ScreenWithHeader 
            component={HomeScreen} 
            routeName="Home" 
            {...props} 
          />
        )}
      </Stack.Screen>
      
      <Stack.Screen name="Blogs">
        {(props) => (
          <ScreenWithHeader 
            component={BlogsScreen} 
            routeName="BlogList " 
            {...props} 
          />
        )}
      </Stack.Screen>
      
      <Stack.Screen name="Categories">
        {(props) => (
          <ScreenWithHeader 
            component={CategoriesScreen} 
            routeName="Categories" 
            {...props} 
          />
        )}
      </Stack.Screen>
      
      <Stack.Screen name="Sales">
        {(props) => (
          <ScreenWithHeader 
            component={SalesScreen} 
            routeName="Sales" 
            {...props} 
          />
        )}
      </Stack.Screen>
      
      <Stack.Screen name="Account">
        {(props) => (
          <ScreenWithHeader 
            component={AccountScreen} 
            routeName="Account" 
            {...props} 
          />
        )}
      </Stack.Screen>
      
      <Stack.Screen name="AllProducts">
        {(props) => (
          <ScreenWithHeader 
            component={AllProducts} 
            routeName="AllProducts" 
            {...props} 
          />
        )}
      </Stack.Screen>

      <Stack.Screen name="CategoryProducts">
        {(props) => (
          <ScreenWithHeader 
            component={CategoryProducts} 
            routeName="CategoryProducts" 
            {...props} 
          />
        )}
      </Stack.Screen>

      {/* Full screen screens (no navigation) */}
      <Stack.Screen name="ProductDetail" component={ProductDetail} />
      <Stack.Screen name="cartProducts" component={Cart} />
      <Stack.Screen name="wishlistProducts" component={Wishlist} />
      <Stack.Screen name="CheckoutForm" component={CheckoutForm} />
      <Stack.Screen name="PaymentForm" component={PaymentForm} />
      <Stack.Screen name="Login" component={Login} />
      <Stack.Screen name="Register" component={Registration} />
      <Stack.Screen name="ProfilePage" component={ProfilePage} />
      <Stack.Screen name="SellerShop" component={SellerShop} />

       <Stack.Screen name="BlogDetail" component={BlogDetail} />
      <Stack.Screen name="BlogList" component={BlogList} />

      <Stack.Screen name="services" component={ServiceCategoryList} />
     
      <Stack.Screen name="serviceShop" component={ServicesList} />
      <Stack.Screen name="serviceShopDetails" component={ServiceDetails} />

        <Stack.Screen name="chat" component={CombinedChat} />
        <Stack.Screen name="DashboardLayout" component={DashboardLayout} />
        
      

    </Stack.Navigator>
  );
};

export default RootStackNavigator;