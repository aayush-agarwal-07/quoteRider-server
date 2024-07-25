import { Link } from 'react-router-dom';
import { BsFacebook, BsInstagram, BsTwitter, BsGithub, BsDribbble } from 'react-icons/bs';

export default function FooterCom() {
  return (
    <footer className='border-t-8 border-teal-500 bg-gray-100 dark:bg-gray-900'>
      <div className='w-full max-w-7xl mx-auto py-8 px-4'>
        {/* <div className='grid gap-8 sm:grid-cols-2 md:grid-cols-3'>
          <div>
            <Link
              to='/'
              className='flex items-center text-lg sm:text-xl font-semibold dark:text-white'
            >
              <span className='px-2 py-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-lg text-white'>
                Sahand's
              </span>
              Blog
            </Link>
          </div>
          <div>
            <h2 className='text-lg font-semibold text-gray-900 dark:text-white mb-4'>About</h2>
            <ul>
              <li>
                <a
                  href='https://www.100jsprojects.com'
                  target='_blank'
                  rel='noopener noreferrer'
                  className='text-teal-500 hover:underline'
                >
                  100 JS Projects
                </a>
              </li>
              <li>
                <Link
                  to='/about'
                  className='text-teal-500 hover:underline'
                >
                  Sahand's Blog
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h2 className='text-lg font-semibold text-gray-900 dark:text-white mb-4'>Follow us</h2>
            <ul>
              <li>
                <a
                  href='https://www.github.com/sahandghavidel'
                  target='_blank'
                  rel='noopener noreferrer'
                  className='text-teal-500 hover:underline'
                >
                  Github
                </a>
              </li>
              <li>
                <a
                  href='#'
                  className='text-teal-500 hover:underline'
                >
                  Discord
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h2 className='text-lg font-semibold text-gray-900 dark:text-white mb-4'>Legal</h2>
            <ul>
              <li>
                <a
                  href='#'
                  className='text-teal-500 hover:underline'
                >
                  Privacy Policy
                </a>
              </li>
              <li>
                <a
                  href='#'
                  className='text-teal-500 hover:underline'
                >
                  Terms &amp; Conditions
                </a>
              </li>
            </ul>
          </div>
        </div> */}
        <hr className='my-6 border-gray-300 dark:border-gray-700' />
        <div className='flex flex-col sm:flex-row items-center justify-between'>
          <p className='text-gray-500 dark:text-gray-400'>
            &copy; {new Date().getFullYear()} <Link to='/' className='text-teal-500 hover:underline'>Quote Rider</Link>. All rights reserved.
          </p>
          <div className='flex gap-6 mt-4 sm:mt-0'>
            <a href='#' className='text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'>
              <BsFacebook className='h-6 w-6' />
            </a>
            <a href='#' className='text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'>
              <BsInstagram className='h-6 w-6' />
            </a>
            <a href='#' className='text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'>
              <BsTwitter className='h-6 w-6' />
            </a>
            <a href='https://github.com/sahandghavidel' className='text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'>
              <BsGithub className='h-6 w-6' />
            </a>
            <a href='#' className='text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'>
              <BsDribbble className='h-6 w-6' />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
