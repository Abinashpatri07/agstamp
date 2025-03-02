// import React from "react";

// const Home: React.FC = () => {
//   return (
//     <div className="flex flex-col items-center w-full min-h-screen bg-blue-500 text-white text-center px-6 py-8">
//       {/* Header Section */}
//       <header className="w-full">
//         <h1 className="text-4xl font-bold text-red-300">AG STAMP</h1>
//         <p className="text-lg font-medium mt-2">Specializing in philately of Russia & Area</p>
//       </header>

//       {/* Main Content */}
//       <main className="flex flex-col items-center w-full max-w-3xl mt-6">
//         {/* eBay Sales Announcement */}
//         <h2 className="text-2xl font-bold text-red-300 mt-6">Welcome to AG STAMP</h2>
//         <p className="text-lg font-medium mt-2">
//           We specialize in selling Russian stamps, including Imperial, RSFSR, USSR, Zemstvo stamps, and Postal History.
//         </p>
//         <p className="mt-4">
//           Most of our sales go through{" "}
//           <a href="https://ebay.com" target="_blank" rel="noopener noreferrer" className="text-yellow-300 font-bold">
//             eBay
//           </a>, and we prepare two sales every month.
//         </p>
//         <p className="mt-2">
//           Follow our{" "}
//           <a href="https://ebay.com" target="_blank" rel="noopener noreferrer" className="text-yellow-300">
//             eBay link
//           </a>{" "}
//           to view current offerings.
//         </p>
//         <p className="mt-2">
//           For sale announcements, contact us via{" "}
//           <a href="mailto:info@example.com" className="text-yellow-300 underline">email</a>.
//         </p>

//         {/* Subscription Section */}
//         <div className="mt-20 flex flex-col md:flex-row items-center bg-blue-800 mx-0 py-3 rounded-xl justify-center lg:justify-around gap-4 px-4 w-full max-w-4xl">
//           {/* Subscription Text */}
//           <div className="md:text-2xl lg:text-4xl w-full lg:w-2/5 text-center font-semibold text-gray-100">
//             Please <span className="text-blue-400">subscribe to our mailing list!</span>
//           </div>

//           {/* Input & Button */}
//           <div className="flex md:gap-4 bg-blue-900 px-4 py-3 items-center rounded-xl w-full lg:w-3/5 justify-between">
//             <input
//               className="bg-transparent text-gray-100 font-semibold lg:text-lg text-sm px-4 py-2 outline-none w-full placeholder-gray-300"
//               placeholder="Email@example.com"
//             />
//             <button className="rounded-lg lg:text-lg text-xs font-serif bg-gray-900 text-white px-6 py-3">
//               Subscribe
//             </button>
//           </div>
//         </div>
//       </main>
//     </div>
//   );
// };

// export default Home;

import React, { useState } from "react";

const Home: React.FC = () => {
  const [email, setEmail] = useState("");

  const handleSubscribe = () => {
    if (!email) {
      alert("Please enter a valid email address!");
      return;
    }
    alert(`Subscribed with: ${email}`);
    setEmail(""); // Clear input field after subscribing
  };

  return (
    <div className="flex flex-col items-center w-full min-h-screen bg-blue-500 text-white text-center px-6 py-8">
      {/* Header Section */}
      <header className="w-full">
        <h1 className="text-4xl font-bold text-red-300">AG STAMP</h1>
        <p className="text-lg font-medium mt-2">Specializing in philately of Russia & Area</p>
      </header>

      {/* Main Content */}
      <main className="flex flex-col items-center w-full max-w-3xl mt-6">
        {/* eBay Sales Announcement */}
        <h2 className="text-2xl font-bold text-red-300 mt-6">Welcome to AG STAMP</h2>
        <p className="text-lg font-medium mt-2">
          We specialize in selling Russian stamps, including Imperial, RSFSR, USSR, Zemstvo stamps, and Postal History.
        </p>
        <p className="mt-4">
          Most of our sales go through{" "}
          <a href="https://ebay.com" target="_blank" rel="noopener noreferrer" className="text-yellow-300 font-bold">
            eBay
          </a>, and we prepare two sales every month.
        </p>
        <p className="mt-2">
          Follow our{" "}
          <a href="https://ebay.com" target="_blank" rel="noopener noreferrer" className="text-yellow-300">
            eBay link
          </a>{" "}
          to view current offerings.
        </p>
        <p className="mt-2">
          For sale announcements, contact us via{" "}
          <a href="mailto:info@example.com" className="text-yellow-300 underline">email</a>.
        </p>

        {/* Subscription Section */}
        <div className="mt-20 flex flex-col md:flex-row items-center bg-blue-800 mx-0 py-3 rounded-xl justify-center lg:justify-around gap-4 px-4 w-full max-w-4xl">
          {/* Subscription Text */}
          <div className="md:text-2xl lg:text-4xl w-full lg:w-2/5 text-center font-semibold text-gray-100">
            Please <span className="text-blue-400">subscribe to our mailing list!</span>
          </div>

          {/* Input & Button */}
          <div className="flex md:gap-4 bg-blue-900 px-4 py-3 items-center rounded-xl w-full lg:w-3/5 justify-between">
            <input
              className="bg-transparent text-gray-100 font-semibold lg:text-lg text-sm px-4 py-2 outline-none w-full placeholder-gray-300"
              placeholder="Email@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <button
              className="rounded-lg lg:text-lg text-xs font-serif bg-gray-900 text-white px-6 py-3 cursor-pointer hover:bg-gray-700 transition"
              onClick={handleSubscribe}
            >
              Subscribe
            </button>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Home;