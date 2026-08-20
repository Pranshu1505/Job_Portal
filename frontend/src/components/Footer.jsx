// import React from 'react'

// function Footer() {
//   return (
//     <div>Footer</div>
//   )
// }

// export default Footer

// import React from "react";

// const Footer = () => {
//   return (
//     <footer className="bg-gray-900 text-gray-300 mt-10">

//       {/* Main Footer */}
//       <div className="max-w-6xl mx-auto px-6 py-8 text-center">

//         <h2 className="text-xl font-semibold text-white">JobPortal</h2>

//         <p className="text-sm mt-2 text-gray-400">
//           Find jobs, connect with companies, and grow your career.
//         </p>

//         {/* Links */}
//         <div className="flex justify-center gap-6 mt-4 text-sm">
//           <a href="#" className="hover:text-cyan-400">Home</a>
//           <a href="#" className="hover:text-cyan-400">Jobs</a>
//           <a href="#" className="hover:text-cyan-400">Contact</a>
//           <a href="#" className="hover:text-cyan-400">About</a>
//         </div>

//         {/* Social Links */}
//         <div className="flex justify-center gap-6 mt-5 text-sm">
//           <a
//             href="https://facebook.com"
//             target="_blank"
//             rel="noreferrer"
//             className="hover:text-cyan-400"
//           >
//             Facebook
//           </a>

//           <a
//             href="https://instagram.com"
//             target="_blank"
//             rel="noreferrer"
//             className="hover:text-cyan-400"
//           >
//             Instagram
//           </a>

//           <a
//             href="https://linkedin.com"
//             target="_blank"
//             rel="noreferrer"
//             className="hover:text-cyan-400"
//           >
//             LinkedIn
//           </a>

//           <a
//             href="https://github.com"
//             target="_blank"
//             rel="noreferrer"
//             className="hover:text-cyan-400"
//           >
//             GitHub
//           </a>
//         </div>

//       </div>

//       {/* Bottom */}
//       <div className="border-t border-gray-700 py-4 text-center text-sm text-gray-500">
//         © 2026 JobPortal. All rights reserved. <br />
//         Designed & Developed by <span className="text-cyan-400">Pranshu</span>
//       </div>

//     </footer>
//   );
// };

// export default Footer;

import React from "react";

export const Footer = () => {
  return (
    <footer className="border-t border-gray-200 py-8">
      <div className="max-w-6xl mx-auto px-4 flex flex-col md:flex-row justify-between items-center">
        
        {/* Left */}
        <div className="mb-4 md:mb-0">
          <h2 className="text-xl font-bold">Job Hunt</h2>
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