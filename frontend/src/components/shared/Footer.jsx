// import React from 'react';

// const Footer = () => {
//   return (
//     <footer className="border-t border-t-gray-200 py-8">
//       <div className="container mx-auto px-4">
//         <div className="flex flex-col md:flex-row justify-between items-center">
//           <div className="mb-4 md:mb-0">
//             <h2 className="text-xl font-bold">Job Hunt</h2>
//             <p className="text-sm">© 2024 Your Company. All rights reserved.</p>
//           </div>
          
//           <div className="flex space-x-4 mt-4 md:mt-0">
//             <a href="https://facebook.com" className="hover:text-gray-400" aria-label="Facebook">
//               <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M22.676 0H1.324C.593 0 0 .592 0 1.324v21.352C0 23.408.593 24 1.324 24H12.82V14.706H9.692v-3.578h3.128V8.408c0-3.1 1.893-4.787 4.657-4.787 1.325 0 2.463.1 2.794.144v3.238l-1.918.001c-1.503 0-1.794.715-1.794 1.762v2.31h3.587l-.468 3.578h-3.119V24h6.116C23.407 24 24 23.408 24 22.676V1.324C24 .592 23.407 0 22.676 0z" /></svg>
//             </a>
//             <a href="https://twitter.com" className="hover:text-gray-400" aria-label="Twitter">
//               <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M24 4.557a9.835 9.835 0 01-2.828.775 4.934 4.934 0 002.165-2.724 9.867 9.867 0 01-3.127 1.195 4.924 4.924 0 00-8.38 4.49A13.978 13.978 0 011.67 3.149 4.93 4.93 0 003.16 9.724a4.903 4.903 0 01-2.229-.616v.062a4.93 4.93 0 003.946 4.827 4.902 4.902 0 01-2.224.084 4.93 4.93 0 004.6 3.417A9.869 9.869 0 010 21.543a13.978 13.978 0 007.548 2.212c9.057 0 14.01-7.507 14.01-14.01 0-.213-.004-.425-.015-.636A10.012 10.012 0 0024 4.557z" /></svg>
//             </a>
//             <a href="https://linkedin.com" className="hover:text-gray-400" aria-label="LinkedIn">
//               <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M20.447 20.452H16.85v-5.569c0-1.327-.027-3.037-1.852-3.037-1.854 0-2.137 1.446-2.137 2.94v5.666H9.147V9.756h3.448v1.464h.05c.48-.91 1.653-1.871 3.401-1.871 3.634 0 4.307 2.39 4.307 5.498v5.605zM5.337 8.29c-1.105 0-2-.896-2-2 0-1.106.895-2 2-2 1.104 0 2 .895 2 2 0 1.104-.896 2-2 2zM7.119 20.452H3.553V9.756h3.566v10.696zM22.225 0H1.771C.791 0 0 .774 0 1.729v20.542C0 23.226.792 24 1.771 24h20.451c.979 0 1.771-.774 1.771-1.729V1.729C24 .774 23.205 0 22.225 0z" /></svg>
//             </a>
//           </div>
//         </div>
//       </div>
//     </footer>
//   );
// }

// export default Footer;

import React from "react";

export const Footer = () => {
  return (
    <footer className="border-t border-gray-500 bg-gray-300 py-8">
      <div className="max-w-6xl mx-auto px-4 flex flex-col md:flex-row justify-between items-center">
        
        {/* Left */}
        <div className="mb-4 md:mb-0">
          <h2 className="text-xl font-bold">Job Portal</h2>
          <p className="text-sm text-gray-500">
            © 2026 Job Portal. All rights reserved.
            Designed & Developed by <span className="text-cyan-400">Pranshu</span>
          </p>
        </div>

        {/* Right */}
        {/* Right Icons */}
        <div className="flex space-x-4">
          
          {/* Facebook */}
          <a href="https://www.facebook.com/profile.php?id=100060241005471" className="hover:text-gray-400" aria-label="Facebook">
            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
              <path d="M22 12a10 10 0 10-11.5 9.9v-7h-2v-3h2V9.5c0-2 
              1.2-3.1 3-3.1.9 0 1.8.2 1.8.2v2h-1c-1 0-1.3.6-1.3 
              1.2V12h2.3l-.4 3H13v7A10 10 0 0022 12z"/>
            </svg>
          </a>

          {/* Twitter */}
          <a href="https://www.instagram.com/pranshu.55556/" className="hover:text-gray-400" aria-label="Instagram">
            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
              <path d="M22 5.8c-.7.3-1.5.5-2.3.6.8-.5 1.4-1.3 
              1.7-2.2-.8.5-1.7.8-2.6 1-1.5-1.6-4-1.6-5.5 
              0-1 1-1.4 2.4-1 3.7-3-.2-5.7-1.6-7.5-3.8-1 
              1.8-.5 4.1 1.2 5.3-.6 0-1.2-.2-1.7-.5 0 
              2.1 1.5 3.9 3.6 4.3-.6.2-1.2.2-1.8.1.5 
              1.8 2.2 3.1 4.1 3.1A8.3 8.3 0 012 19.5 
              11.7 11.7 0 008.3 21c7.5 0 11.6-6.3 
              11.6-11.7v-.5c.8-.5 1.5-1.2 2.1-2z"/>
            </svg>
          </a>

          {/* LinkedIn */}
          <a href="https://www.linkedin.com/in/pranshu-kumar-48683b298/" className="hover:text-gray-400" aria-label="LinkedIn">
            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
              <path d="M20.4 20.4h-3.6v-5.4c0-1.3 0-3-1.8-3s-2.1 
              1.4-2.1 2.9v5.5H9.3V9h3.4v1.6h.1c.5-.9 
              1.6-1.8 3.3-1.8 3.6 0 4.3 2.4 4.3 
              5.4v6.2zM5.3 7.4a2.1 2.1 0 110-4.2 
              2.1 2.1 0 010 4.2zM7.1 20.4H3.6V9h3.5v11.4z"/>
            </svg>
          </a>

          {/* GitHub */}
          <a href="https://github.com/pranshuabhishek" className="hover:text-gray-400" aria-label="GitHub">
            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 .5a12 12 0 00-3.8 23.4c.6.1.8-.3.8-.6v-2.2c-3.3.7-4-1.6-4-1.6-.6-1.4-1.3-1.8-1.3-1.8-1.1-.7.1-.7.1-.7 
              1.2.1 1.9 1.2 1.9 1.2 1.1 1.9 2.8 1.4 3.5 
              1.1.1-.8.4-1.4.8-1.7-2.7-.3-5.6-1.4-5.6-6.1 
              0-1.3.5-2.4 1.2-3.3-.1-.3-.5-1.5.1-3.1 
              0 0 1-.3 3.3 1.2a11.5 11.5 0 016 0c2.3-1.5 
              3.3-1.2 3.3-1.2.6 1.6.2 2.8.1 3.1.8.9 
              1.2 2 1.2 3.3 0 4.7-2.9 5.8-5.6 
              6.1.4.4.9 1.1.9 2.2v3.3c0 .3.2.7.8.6A12 
              12 0 0012 .5z"/>
            </svg>
          </a>

        </div>

        {/* <div className="flex space-x-4">
          <a href="#" className="hover:text-gray-400">Facebook</a>
          <a href="#" className="hover:text-gray-400">Twitter</a>
          <a href="#" className="hover:text-gray-400">LinkedIn</a>
          <a href="#" className="hover:text-gray-400">GitHub</a>
        </div> */}

      </div>
    </footer>
  );
};

export default Footer;

// NgnEB3V7soqsv1ap////pranshubarhat_db_user