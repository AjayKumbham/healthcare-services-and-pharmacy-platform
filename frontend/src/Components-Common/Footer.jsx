const Footer = () => {
  return (
    <div className="bg-[#2A6041] p-2 md:p-4 lg:p-8 w-full">
      <a href="/" className="text-2xl text-white font-bold hover:text-[#A5D6A7] transition-colors flex items-center inline-flex">
        <span>Price </span>
        <img
          src="https://res.cloudinary.com/dzymyjltu/image/upload/v1737485868/pam-logo_mpxeqp.png"
          alt="A"
          className="h-11 w-10 mx-1 inline-block"
        />
        <span>Med</span>
      </a>

      <div className="p-2 md:p-4 lg:p-8 flex flex-col items-center justify-center text-white text-center">
        <div className="flex justify-center gap-4 mb-12">
          <a href="https://www.facebook.com/Evernorth/" target="_blank">
            <img src="https://res.cloudinary.com/dkezdazmt/image/upload/v1735888341/Evernorth/pgglffxrc7dsliffqpvh.svg" />
          </a>
          <a href="https://www.instagram.com/evernorth/" target="_blank">
            <img src="https://res.cloudinary.com/dkezdazmt/image/upload/v1735888341/Evernorth/fksrmgl2aanoigq8um5a.svg" />
          </a>
          <a href="https://www.linkedin.com/company/evernorth/" target="_blank">
            <img src="https://res.cloudinary.com/dkezdazmt/image/upload/v1735888650/Evernorth/linkedin_logo.svg" />
          </a>
          <a href="https://www.youtube.com/evernorth" target="_blank">
            <img src="https://res.cloudinary.com/dkezdazmt/image/upload/v1735888341/Evernorth/xtbz3wciplqnunyapd9m.svg" />
          </a>
        </div>
        <p className="w-[70%] text-gray-300 font-custom">
          © 2025 Evernorth Health, Inc. All rights reserved. One Express Way, St. Louis, MO 63121.
          All products and services are provided by or through operating subsidiaries or affiliates of Evernorth.
        </p>
      </div>
    </div>
  );
};

export default Footer;
