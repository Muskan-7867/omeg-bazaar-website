
const ContactMap = () => {
    return (
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-12">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">Our Location</h2>
          <div className="h-96 w-full bg-gray-200 rounded-lg overflow-hidden">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d426.128021629306!2d75.583209!3d31.303077!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x391a5b3b79997171%3A0x2a17d9f210b903a!2sOm%20Enterprises%20Group!5e0!3m2!1sen!2sin!4v1749018727184!5m2!1sen!2sin"
              width="100%"
              height="100%"
              loading="lazy"
              allowFullScreen
              className="border-0"
            ></iframe>
          </div>
        </div>
    )
  }
  
  export default ContactMap;
  