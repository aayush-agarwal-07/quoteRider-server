import {
  HiUser,
  HiArrowSmRight,
  HiDocumentText,
  HiOutlineUserGroup,
  HiAnnotation,
  HiChartPie,
} from 'react-icons/hi';
import { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { signoutSuccess } from '../redux/user/userSlice';
import { useDispatch, useSelector } from 'react-redux';

export default function DashSidebar() {
  const location = useLocation();
  const dispatch = useDispatch();
  const { currentUser } = useSelector((state) => state.user);
  const [tab, setTab] = useState('');

  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const tabFromUrl = urlParams.get('tab');
    if (tabFromUrl) {
      setTab(tabFromUrl);
    }
  }, [location.search]);

  const handleSignout = async () => {
    try {
      const res = await fetch('/api/user/signout', {
        method: 'POST',
      });
      const data = await res.json();
      if (!res.ok) {
        console.log(data.message);
      } else {
        dispatch(signoutSuccess());
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  const navItems = [
    { to: '/dashboard?tab=dash', icon: HiChartPie, label: 'Dashboard', adminOnly: true },
    { to: '/dashboard?tab=profile', icon: HiUser, label: currentUser.isAdmin ? 'Admin' : 'User' },
    { to: '/dashboard?tab=posts', icon: HiDocumentText, label: 'Posts', adminOnly: true },
    { to: '/dashboard?tab=users', icon: HiOutlineUserGroup, label: 'Users', adminOnly: true },
    { to: '/dashboard?tab=comments', icon: HiAnnotation, label: 'Comments', adminOnly: true },
  ];

  return (
    <div className='w-full md:w-56 bg-gray-800 text-white h-full flex flex-col'>
      <div className='flex flex-col gap-1 p-4'>
        {navItems.map(({ to, icon: Icon, label, adminOnly }) =>
          (!adminOnly || currentUser.isAdmin) && (
            <Link key={to} to={to}>
              <div
                className={`flex items-center p-2 rounded-md cursor-pointer hover:bg-gray-700 ${tab === new URLSearchParams(to.split('?')[1]).get('tab') ? 'bg-gray-600' : ''}`}
              >
                <Icon className='h-6 w-6 mr-3' />
                <span>{label}</span>
              </div>
            </Link>
          )
        )}
        <div
          className='flex items-center p-2 rounded-md cursor-pointer hover:bg-gray-700 mt-auto'
          onClick={handleSignout}
        >
          <HiArrowSmRight className='h-6 w-6 mr-3' />
          <span>Sign Out</span>
        </div>
      </div>
    </div>
  );
}
